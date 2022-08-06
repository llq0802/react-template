import type { PageQueryType } from '@ccs-design/rc-pro';
import { post } from '@/services/http';
import type { SysEncryptType } from './type';

// 列表
export const queryPageEncrypt = (param: PageQueryType) =>
  post('/service-sysmgr/auth/EncryptConfigController/pageEncryptConfig', param);

// 保存
export const saveEncrypt = (param: SysEncryptType) => {
  if (param.id) {
    return post('/service-sysmgr/auth/EncryptConfigController/updateEncryptConfig', param);
  }
  return post('/service-sysmgr/auth/EncryptConfigController/createEncryptConfig', param);
};
