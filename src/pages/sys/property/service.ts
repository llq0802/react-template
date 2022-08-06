import type { PageQueryType } from '@ccs-design/rc-pro';
import { post } from '@/services/http';
import type { SysPropType, SysPropValueType } from './Type';

// 属性分页
export const queryPageProperty = (param: PageQueryType) =>
  post('/service-sysmgr/auth/PropertyController/pageProperty', param);

// 属性值分页
export const queryPageValue = (param: PageQueryType) =>
  post('/service-sysmgr/auth/PropertyController/pageValue', param);

// 创建属性
export const create = (param: SysPropType) => {
  if (param.propId) {
    return post('/service-sysmgr/auth/PropertyController/updateProperty', param);
  }
  return post('/service-sysmgr/auth/PropertyController/createProperty', param);
};

// 创建属性值
export const createValue = (param: SysPropValueType) => {
  if (param.valueId) {
    return post('/service-sysmgr/auth/PropertyController/updateValue', param);
  }
  return post('/service-sysmgr/auth/PropertyController/createValue', param);
};
