import _random from 'lodash/random';
import { RsaEncrypt, stringToHex } from '@/utils';
import { get, http } from '@/services/http';
import type { FormDataType } from './index';

const doLogin = async (params: FormDataType) => {
  const password = RsaEncrypt(params.password);
  const param = { ...params, password: stringToHex(password), scope: 'WEB' };
  return http('/service-sysmgr/LoginController/login', {
    method: 'POST',
    params: param,
  });
};

const refreshToken = async () => get('/service-sysmgr/LoginController/auth/refreshToken');

const logout = async () => get('/service-sysmgr/LoginController/logout');

const getCaptchaImg = async () =>
  get(`/service-sysmgr/LoginController/getCaptchaImg?id=_${_random(100000, 999999)}`);

export { doLogin, refreshToken, logout, getCaptchaImg };
