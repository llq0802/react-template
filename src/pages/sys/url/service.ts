import type { PageQueryType } from '@ccs-design/rc-pro';
import { get, post } from '@/services/http';
import type { SysUrlGroupType, SysUrlType } from './type';

export const queryPageUrlGroup = (param: PageQueryType) =>
  post('/service-sysmgr/auth/UrlController/pageUrlGroup', param);

export const queryPageUrl = (param: PageQueryType) =>
  post('/service-sysmgr/auth/UrlController/pageUrl', param);

export const queryGroupUrl = (param: { groupId: number }) =>
  get('/service-sysmgr/auth/UrlController/getCheckedUrlGroupUrl', param);

export const createGroupUrl = (param: { groupId?: number; urlIds: string[] }) =>
  post('/service-sysmgr/auth/UrlController/doUrlGroupRelaUrl', param);

export const createGroup = (param: SysUrlGroupType) => {
  if (param.groupId) {
    return post('/service-sysmgr/auth/UrlController/updateUrlGroup', param);
  }
  return post('/service-sysmgr/auth/UrlController/createUrlGroup', param);
};

export const createUrl = (param: SysUrlType) => {
  if (param.urlId) {
    return post('/service-sysmgr/auth/UrlController/updateUrl', param);
  }
  return post('/service-sysmgr/auth/UrlController/createUrl', param);
};
