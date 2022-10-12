import { history } from 'umi';
import { stringify } from 'qs';
import type { Reducer } from 'redux';
import type { MenuType, MenuParentType } from '@ccs-design/rc-pro';
import type { Effect } from 'umi';
import { doLogin, logout, refreshToken, getCaptchaImg } from '@/pages/login/service';
import { getPageQuery, getStroage, setStroage } from '@/utils';
import GlobalConfig from '@/global';
import { USER_TOKEN } from '@/constants';

// 获取菜单列表,url,按钮标识 （鉴权用,将树形结构转换成一维数组）
const getMenus = (menus: MenuType[] = [], parents: MenuParentType[] = []): MenuType[] =>
  menus.reduce((keys: any, item: MenuType) => {
    keys.push({ ...item, parents });
    if (+item.nodeData.menuType === 0) {
      return keys.concat(
        getMenus(item.children, [
          ...parents,
          { key: item.nodeId, url: item.nodeData.menuUrl, name: item.nodeData.menuName },
        ]),
      );
    }
    return keys;
  }, []);

export interface UserDetailType {
  menuData?: MenuType[];
  userName?: string;
  loginCode?: string;
  urls?: string[];
  token?: string;
  loginId?: number;
  orgs?: any[];
  roles?: any[];
}

export interface AuthModelState {
  error?: any;
  userDetail: UserDetailType;
  menus: MenuType[];
}

interface AuthModelType {
  namespace: string;
  state: AuthModelState;
  effects: {
    login: Effect;
    captcha: Effect;
    refresh: Effect;
    logout: Effect;
  };
  reducers: {
    save: Reducer<AuthModelState>;
    saveImg: Reducer<AuthModelState>;
  };
}

const LoginModel: AuthModelType = {
  namespace: 'authModel',
  state: {
    error: null,
    userDetail: {},
    menus: [],
  },
  effects: {
    // 验证码接口
    *captcha(_, { call, put }) {
      const response: Response = yield call(getCaptchaImg);
      yield put({
        type: 'saveImg',
        payload: { img: response },
      });
    },
    // 登录接口
    *login({ payload }, { call, put }) {
      const response: Record<string, any> = yield call(doLogin, payload);
      if (response.success) {
        yield put({
          type: 'save',
          payload: response,
        });
        sessionStorage.setItem(USER_TOKEN, response.data.token);
        // 开发环境缓存用户信息
        if (process.env.NODE_ENV === 'development') {
          setStroage(USER_TOKEN, response);
        }

        const params = getPageQuery();
        let { redirect = '/' } = params as { redirect: string };

        if (redirect.startsWith(GlobalConfig.Context)) {
          redirect = `/${redirect.substr(GlobalConfig.Context.length)}`;
        }

        yield put({
          type: 'saveImg',
          payload: { error: null },
        });
        history.replace(redirect || '/');
        return;
      }
      // eslint-disable-next-line consistent-return
      return response;
    },
    // 刷新token
    *refresh({ payload }, { call, put }) {
      const userInfo: Record<string, any> = yield call(getStroage, USER_TOKEN);
      if (process.env.NODE_ENV === 'development' && userInfo && !payload?.force) {
        yield put({
          type: 'save',
          payload: userInfo,
        });
        return;
      }
      const response: Record<string, any> = yield call(refreshToken, payload);
      if (response.success) {
        sessionStorage.setItem(USER_TOKEN, response.data.token);
        // 开发环境缓存用户信息
        if (process.env.NODE_ENV === 'development') {
          setStroage(USER_TOKEN, response);
        }
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    // 退出登录
    *logout({ payload }, { put, call }) {
      // 获取 redirect
      let redirect = window.location.pathname;
      const { hash } = window.location;
      if (hash && hash.startsWith('#')) {
        redirect = hash.replace('#', '');
      }

      if (
        !window.location.hash.includes('/auth/login') &&
        !window.location.pathname.includes('/auth/login')
      ) {
        // 去登录
        history.push({
          pathname: '/auth/login',
          search: stringify({ redirect }),
        });
        yield call(logout, payload);
        sessionStorage.removeItem(USER_TOKEN);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      // 添加首页
      const treeNodes: MenuType[] = [
        {
          nodeId: '0',
          nodeName: '工作台',
          leaf: true,
          icon: 'DashboardOutlined',
          nodeData: {
            menuName: '工作台',
            menuUrl: '/dashboard',
            menuType: 1,
          },
        },
        ...(payload.data.treeNodes || []),
      ];
      const { loginId, loginCode, orgs, roles, token, workerName } = payload.data;
      return {
        ...state,
        error: payload.success ? null : payload.msg,
        userDetail: {
          menuData: treeNodes,
          avatar: '',
          userName: workerName,
          loginCode,
          token,
          loginId,
          orgs,
          roles,
        },
        menus: getMenus(treeNodes).filter((t) => t.nodeData?.menuType === 1),
      };
    },
    saveImg(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default LoginModel;
