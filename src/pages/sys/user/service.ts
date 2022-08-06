import type { PageQueryType } from '@ccs-design/rc-pro';
import { post, get } from '@/services/http';
import { stringToHex, RsaEncrypt } from '@/utils';
import type { SysUserType } from './type';

interface LoginId {
  loginId: number;
}

// 用户分页
export const queryWorker = (param: PageQueryType) =>
  post('/service-sysmgr/auth/WorkerController/pageWorker', param);

// 管理角色
export const getRoles = (params: { loginId: string; roleIds: number[] }) =>
  get('/service-sysmgr/auth/AuthController/getCheckedAuthRole', params);

// 获取已关联角色
export const doRole = (param: LoginId) =>
  post('/service-sysmgr/auth/AuthController/doWorkerRelaRole', param);

// 获取已关联的菜单
export const getMenus = (param: LoginId) =>
  get('/service-sysmgr/auth/AuthController/getCheckedAuthTreeNode', param);

// 重置密码
export const resetPwd = (param: LoginId) =>
  post('/service-sysmgr/auth/WorkerController/resetPwd', param);

// 解锁
export const unlock = (param: LoginId) =>
  post('/service-sysmgr/auth/WorkerController/unlockWebLoginLimit', param);

// 免密修改
export const modifyPwd = (params: { newPwd: string; oldPwd: string }) => {
  const { newPwd, oldPwd } = params;
  const param = {
    newPwd: stringToHex(RsaEncrypt(newPwd)),
    oldPwd: stringToHex(RsaEncrypt(oldPwd)),
  };
  return post('/service-sysmgr/auth/WorkerController/modifyPwd', {}, param);
};

export const saveUser = (param: SysUserType) => {
  if (param.loginId) {
    return post('/service-sysmgr/auth/WorkerController/updateWorker', param);
  }
  return post('/service-sysmgr/auth/WorkerController/createWorker', param);
};
