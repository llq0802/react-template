import routerSys from './router.sys';
import routerDemo from './router.demo';

// name: 当前路由在菜单和面包屑中的名称，注意这里是国际化配置的 key，具体展示菜单名可以在 /src/locales/zh-CN.ts 进行配置。
// icon: 当前路由在菜单下的图标名。
// hideInMenu: 当前路由在菜单中不展现，默认 false。
// hideChildrenInMenu: 当前路由的子级在菜单中不展现，默认 false。
// hideInBreadcrumb: 当前路由在面包屑中不展现，默认 false。

const routes = [
  {
    path: '/auth',
    redirect: '/auth/login',
  },
  {
    path: '/auth/login',
    component: './login',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    component: '@/layouts/AuthLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/dashboard',
            name: '工作台',
            component: './dashboard/workplace',
            hiddenBreadcrumb: true,
          },
          { ...routerSys }, // 系统管理路由
          { ...routerDemo }, // demo路由

          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
] as const;

export default routes;
