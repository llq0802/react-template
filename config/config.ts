import pageRoutes from './router';
import proxy from './proxy';
import GlobalConfig from '../src/global';
import theme from './theme';
const { REACT_APP_ENV } = process.env;
const isDev = process.env.NODE_ENV === 'development' ? {} : false;
import { defineConfig } from 'umi';

// 配置文件参考 ref: https://umijs.org/config/
export default defineConfig({
  title: GlobalConfig.AppName,
  hash: true,
  antd: {
    dark: GlobalConfig.IsDark, // 开启暗色主题
    // compact: true, // 开启紧凑主题
  },
  dva: {
    hmr: true,
  },
  // history: { type: 'hash' },
  // 更改访问地址（对应nginx）
  base: GlobalConfig.Context,
  publicPath: GlobalConfig.Context,
  // 动态加载组件配置
  dynamicImport: {
    loading: '@/components/common/CcsPageLoading',
  },
  theme,
  // 配置浏览器最低版本
  targets: {
    ie: 11,
  },
  /**
   * Umi 默认编译 node_modules 下的文件，带来一些收益的同时，也增加了额外的编译时间。
   * 如果不希望 node_modules 下的文件走 babel 编译，可通过以下配置减少 40% 到 60% 的编译时间。
   */
  nodeModulesTransform: {
    type: isDev ? 'none' : 'all',
    exclude: [],
  },
  // 使用最低成本的 sourcemap 生成方式，默认是 cheap-module-source-map
  // devtool: 'eval',
  // 路由配置
  routes: pageRoutes,
  // 开发模式使用http代理，解决跨域访问api
  proxy: proxy[REACT_APP_ENV || 'dev'],

  // esbuild IE或者低版本手机可能不兼容情况、可屏蔽
  esbuild: isDev,
  mfsu: isDev,
  webpack5: isDev,
  /**
   * 快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈。
   * 使用时可能会有事件没更新到情况，酌情开启
   */
  // fastRefresh: {},
  // plugins: ['@alitajs/keep-alive'],
  // // 使用 @alitajs/keep-alive实现KeepAlive状态保存
  // // keepalive: ['/list'],
  // keepalive: [], //需要KeepAlive保存状态的path路径
});
