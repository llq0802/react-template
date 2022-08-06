import { get, post } from '@/services/http';
import type { SysOrgType } from './type';

// 获取节点
export const queryOrgs = (params: any) =>
  get('/service-sysmgr/auth/OrgController/getOrgChildren', params.query || params);

// 菜单新增修改
export const saveOrg = (param: SysOrgType) => {
  if (param.orgId) {
    return post('/service-sysmgr/auth/OrgController/updateOrg', param);
  }
  return post('/service-sysmgr/auth/OrgController/createOrg', param);
};

// 编码校验
export const validateOrg = (params: { orgCode: string }) =>
  get('/service-sysmgr/auth/OrgController/checkOrgCode', params);
