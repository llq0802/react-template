import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import type { AuthModelState, UserDetailType } from 'umi';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import CcsPageLoading from '@/components/common/CcsPageLoading';
import { isEmpty } from '@/utils';
import type { ConnectLoading, DispatchType } from '@/global';
import { USER_TOKEN } from '@/constants';

interface SecurityLayoutProps extends DispatchType {
  loadingAuthModel?: boolean;
  userDetail: UserDetailType;
  children: ReactElement<any, any> | null;
}

/**
 * 权限管理
 *  有token 有用户信息 next
 *  有token 刷新token 获取用户信息
 *  没token 去登录
 */
const AuthLayout: FC<SecurityLayoutProps> = ({
  userDetail,
  children,
  dispatch,
  loadingAuthModel = false,
}) => {
  const [isLogining, setIsLogining] = useState(false);
  const token = sessionStorage.getItem(USER_TOKEN);

  // 没有token跳转登录
  if (!token && !isLogining) {
    let redirect = window.location.pathname;
    const { hash } = window.location;
    if (hash && hash.startsWith('#')) {
      redirect = hash.replace('#', '');
    }
    const queryString = stringify({
      redirect,
    });
    return <Redirect to={`/auth/login?${queryString}`} />;
  }
  // 在请求时刷新接口时的loading
  if ((loadingAuthModel || isLogining) && !userDetail?.token) {
    return <CcsPageLoading />;
  }

  // 没有获取到用户信息时刷新token
  if (token && isEmpty(userDetail)) {
    setIsLogining(true);
    dispatch({
      type: 'authModel/refresh',
    });
    return <CcsPageLoading />;
  }

  return children;
};

export default connect(
  ({ authModel, loading }: { authModel: AuthModelState; loading: ConnectLoading }) => ({
    userDetail: authModel.userDetail,
    loadingAuthModel: loading.models.authModel || false,
  }),
)(AuthLayout);
