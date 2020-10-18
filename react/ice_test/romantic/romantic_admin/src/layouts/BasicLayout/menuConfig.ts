const headerMenuConfig = [];

const asideMenuConfig = [
  { name: 'Dashboard', path: '/', icon: 'smile' },
  { 
    path: '/', 
    name: '题库系统',
    icon: 'chart-bar' ,
    children:[
      { path: '/subject/subjectList', name: '题库列表' },
      { path: '/subject/subjectCreate', name: '创建题库' },
    ]
  },
  { name: '登录', path: '/user/login', icon: 'account' }
];

export { headerMenuConfig, asideMenuConfig };
