export default {
  path: '/demo',
  name: '一些DEMO',
  icon: 'dingding',
  routes: [
    {
      path: '/demo/release',
      name: '发布管理',
      component: './demo/release',
    },
    {
      path: '/demo/popup',
      name: '弹出框',
      component: './demo/popup',
    },
    {
      path: '/demo/anchor',
      name: '锚点',
      component: './demo/anchor',
    },
    {
      path: '/demo/sticky',
      name: 'table吸顶',
      component: './demo/sticky',
    },
    {
      path: '/demo/tab',
      name: 'tab组件',
      component: './demo/tab',
    },
    {
      path: '/demo/tree-table',
      name: '树表联动组件',
      component: './demo/tree-table',
    },
  ],
};
