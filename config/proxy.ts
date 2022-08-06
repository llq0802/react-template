import { BASE_URL } from '../src/constants';

export default {
  dev: {
    //开发环境
    '/api': {
      // 要代理的地址
      target: BASE_URL,
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
  test: {
    //测试环境
    '/api': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    // 生产环境
    '/api': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
