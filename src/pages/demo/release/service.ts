import type { PageQueryType } from '@ccs-design/rc-pro';
import { get, post } from '@/services/http';
import type { BussReleaseType } from './type';

export const queryPagePub = (param: PageQueryType) =>
  post('/service-sysmgr/auth/PubController/pagePub', param);

export const createPub = (param: BussReleaseType) => {
  if (param.pubId) {
    return post('/service-sysmgr/auth/PubController/updatePub', param);
  }
  return post('/service-sysmgr/auth/PubController/createPub', param);
};

export const getPubContent = (param: { pubId: number }) =>
  get('/service-sysmgr/auth/PubController/getPubContent', param);
