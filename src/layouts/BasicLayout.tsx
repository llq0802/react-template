import React from 'react';
import type { AuthModelState } from 'umi';
import { history, useDispatch, useSelector } from 'umi';
import { LogoutOutlined, ReloadOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import type { BasicLayoutType } from '@ccs-design/rc-pro';
import { CcsBasicLayout, useEvent } from '@ccs-design/rc-pro';
import logoSvg from '@/assets/icons/logo.svg';
import GlobalConfig from '@/global';
import UserPassword from './Password';
import UserNotice from './Notice';

const { confirm } = Modal;

const BasicLayout: React.FC<BasicLayoutType> = (props) => {
  const { route, children, location } = props;
  const $event = useEvent();

  const { userDetail } = useSelector<any, AuthModelState>((state) => state.authModel);
  const dispatch = useDispatch();

  // 用户操作菜单
  const userOverlayMenu = [
    <Menu.Item
      key="refresh"
      onClick={() => {
        dispatch({ type: 'authModel/refresh', payload: { force: true } });
      }}
    >
      <ReloadOutlined />
      刷新用户
    </Menu.Item>,
    <Menu.Item
      key="password"
      onClick={() => {
        $event.emit();
      }}
    >
      <SafetyCertificateOutlined />
      密码修改
    </Menu.Item>,
    <Menu.Item
      key="logout"
      onClick={() =>
        confirm({
          title: '确认信息',
          content: '确定注销当前登录状态？',
          onOk() {
            if (dispatch)
              dispatch({
                type: 'authModel/logout',
              });
          },
          onCancel() {},
        })
      }
    >
      <LogoutOutlined />
      注销登录
    </Menu.Item>,
  ];

  return (
    <>
      <CcsBasicLayout
        homePage="/dashboard"
        logo={logoSvg}
        history={history}
        location={location}
        dispatch={dispatch}
        userDetail={userDetail}
        userOverlayMenu={userOverlayMenu}
        headerExtra={<UserNotice />}
        layoutConfig={GlobalConfig}
        route={route}
      >
        {children}
      </CcsBasicLayout>

      <UserPassword $event={$event} />
    </>
  );
};

export default BasicLayout;
