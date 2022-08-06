export default {
  path: '/sys',
  name: '系统管理',
  icon: 'user',
  routes: [
    {
      path: '/sys/menu',
      name: '菜单管理',
      component: './sys/menu',
    },
    {
      path: '/sys/user',
      name: '用户管理',
      component: './sys/user',
    },
    {
      path: '/sys/org',
      name: '组织管理',
      component: './sys/org',
    },
    {
      path: '/sys/role',
      name: '角色管理',
      component: './sys/role',
    },
    {
      path: '/sys/url',
      name: 'URL权限管理',
      component: './sys/url',
    },
    {
      path: '/sys/property',
      name: '静态值管理',
      component: './sys/property',
    },
    {
      path: '/sys/encrypt',
      name: '加密管理',
      component: './sys/encrypt',
    },
  ],
};
