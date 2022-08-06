import type { Context, RequestMethod, RequestOptionsInit } from 'umi-request';
import { extend } from 'umi-request';
import _throttle from 'lodash/throttle';
import NProgress from 'nprogress';
import { getDvaApp } from 'umi';
import qs from 'qs';
import { message } from 'antd';
import { showNotification } from '@/utils';
import GlobalConfig from '@/global';
import { CODE_MESSAGE, USER_TOKEN } from '@/constants';

type URLType = {
  new (url: string | URL, base?: string | URL | undefined): URL;
  prototype: URL;
  createObjectURL(obj: Blob | MediaSource): string;
  revokeObjectURL(url: string): void;
};

/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

// 异常退出
const logout = _throttle(
  () => {
    message.error('登录已失效、请重新登录。');
    // eslint-disable-next-line no-underscore-dangle
    getDvaApp()._store.dispatch({
      type: 'authModel/logout',
    });
  },
  1000,
  { leading: true, trailing: false },
);

// 配置request请求时的默认参数
const httpHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

// 请求实例
const http: RequestMethod = extend({
  headers: httpHeaders,
});

// 请求拦截
http.use(async (ctx: Context, next: () => void) => {
  NProgress.start();
  const {
    req: {
      options: { headers },
      url,
    },
  } = ctx;
  ctx.req.options.headers = {
    ...headers,
    token: sessionStorage.getItem(USER_TOKEN) as any,
  };
  // ctx.req.url = url.startsWith('/mockApi') ? url : `${GlobalConfig.Api}${url}`;
  ctx.req.url = `${GlobalConfig.Api}${url}`; // '/api/xxx/xxx'
  await next();
});

// 响应拦截
http.interceptors.response.use(async (res: Response) => {
  NProgress.done();
  const { status } = res;
  if (status === 401) {
    logout();
    return { success: false };
  }
  if (status !== 200) {
    const errorText = CODE_MESSAGE[status] || res.statusText;
    showNotification('error', `请求错误 ${status}`, errorText);
    return { success: false };
  }
  let result;
  try {
    result = await res.clone().json();
    if (!result.success) {
      message.error(result.msg || '系统错误');
    }
  } catch (error) {
    message.error('网络异常');
  }
  return result;
});

/**
 * 下载文件请求
 * @param url
 * @param options
 * @returns
 */
async function fileDownload(url: string, options: RequestOptionsInit): Promise<Response> {
  const { response }: { response: Response } = await http(url, {
    method: options?.method ?? 'POST',
    responseType: 'blob',
    getResponse: true,
    ...options,
  });
  if (response.status === 200) {
    const blob: Blob = await response.clone().blob();
    // const fileName: string = getFileName(options, response);
    const fileName: string = `${new Date().toLocaleString().replace(/\//g, '-')}.xlsx`;
    const selfURL: URLType = window[window.webkitURL ? 'webkitURL' : 'URL'];
    const aElement: HTMLAnchorElement = document.createElement('a');
    aElement.download = fileName;
    aElement.style.display = 'none';
    aElement.target = '_blank';
    aElement.href = selfURL.createObjectURL(blob);
    document.body.appendChild(aElement);
    aElement.click();
    selfURL.revokeObjectURL(aElement.href);
    document.body.removeChild(aElement);
    return response;
  }
  return { success: false } as unknown as Response;
}

/**
 * get请求
 * @param url
 * @param data
 * @param params
 * @returns
 */
function post(url: string, data?: any, params?: any) {
  const newUrl = params ? `${url}?${qs.stringify(params)}` : url;
  return http(newUrl, {
    data,
    method: 'POST',
  });
}
/**
 * post请求
 * @param url
 * @param params
 * @returns
 */
function get(url: string, params?: any) {
  return http(url, { params });
}

export { http, post, get, fileDownload };
