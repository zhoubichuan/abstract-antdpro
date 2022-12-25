export default [
  {
    path: '/home',
    name: 'home',
    icon: 'smile',
    component: './home',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    //access: 'canAdmin',
    routes: [
      {
        path: '/admin/user',
        name: 'user',
        icon: 'user',
        component: './admin/User',
      },
    ],
  },
  {
    path: '/DataEntity',
    name: 'list.data-entity',
    icon: 'crown',
    component: './DataEntity',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
