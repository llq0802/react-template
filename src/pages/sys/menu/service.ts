import type { PageQueryType } from '@ccs-design/rc-pro';
import { get, post } from '@/services/http';
import type { SysMenuType } from './type';

// 获取节点
export const queryMenu = (params: any) =>
  get('/service-sysmgr/auth/MenuController/getChildren', params.query || params);

// 菜单新增修改
export const saveMenu = (param: SysMenuType) => {
  if (param.menuCode) {
    return post('/service-sysmgr/auth/MenuController/updateMenu', param);
  }
  return post('/service-sysmgr/auth/MenuController/createMenu', param);
};

export const queryPageUrl = (param: PageQueryType) =>
  post('/service-sysmgr/auth/UrlController/pageUrl', param);
