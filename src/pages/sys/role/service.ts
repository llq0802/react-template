import type { PageQueryType } from '@ccs-design/rc-pro';
import { get, post } from '@/services/http';
import type { SysRoleType } from './type';

// 角色分页
export const queryPageRole = (param: PageQueryType) =>
  post('/service-sysmgr/auth/RoleController/pageRole', param);

// 角色创建 更新
export const saveRole = (param: SysRoleType) => {
  if (param.roleId) {
    return post('/service-sysmgr/auth/RoleController/updateRole', param);
  }
  return post('/service-sysmgr/auth/RoleController/createRole', param);
};

// 角色关联菜单查询
export const queryMenu = (param: { roleId: number }) =>
  get('/service-sysmgr/auth/AuthController/getCheckedRoleTreeNode', param);

// 角色关联菜单
export const saveMenu = (param: { roleId: number; menuCodes: String[]; halfMenuCodes: String[] }) =>
  post('/service-sysmgr/auth/AuthController/doRoleRelaMenu', param);

// 角色关联url组
export const saveGroups = (param: { roleId: number; groupIds: number[] }) =>
  post('/service-sysmgr/auth/AuthController/doRoleRelaUrlGroup', param);

// 角色已关联URL
export const queryUrl = (param: { roleId: string }) =>
  get('/service-sysmgr/auth/AuthController/getCheckedRoleUrlGroup', param);
