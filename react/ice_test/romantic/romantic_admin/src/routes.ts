import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import SubjectList from '@/pages/SubjectList';
import SubjectCreate from '@/pages/SubjectCreate';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: '/login', component: Login },
      { path: '/', redirect: '/user/login' },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/subject/subjectList', component: SubjectList },
      { path: '/subject/subjectCreate', component: SubjectCreate },
      { path: '/', exact: true, component: Dashboard },
    ],
  },
];

export default routerConfig;
