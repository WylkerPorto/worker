export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/Logout.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/logoff',
    redirect: '/logout',
  },

  {
    path: '/admin',
    meta: { layout: 'adminDashboard', requiresAuth: true, role: '1' },
    children: [
      {
        path: '',
        redirect: 'dashboard', // redireciona de /admin para /admin/dashboard
      },
      {
        path: 'dashboard',
        name: 'adminDashboard',
        component: () => import('@/views/admin/Index.vue'),
      },
      {
        path: 'admins',
        name: 'adminController',
        component: () => import('@/views/admin/Admins.vue'),
      },
      {
        path: 'supervisors',
        name: 'supervisorController',
        component: () => import('@/views/admin/Supervisors.vue'),
      },
      {
        path: 'logs',
        name: 'logsController',
        component: () => import('@/views/admin/Logs.vue'),
      },
    ],
  },

  {
    path: '/supervisor',
    meta: { layout: 'supervisorDashboard', requiresAuth: true, role: '2' },
    children: [
      {
        path: '',
        redirect: 'dashboard', // redireciona de /supervisor para /supervisor/dashboard
      },
      {
        path: 'dashboard',
        name: 'supervisorDashboard',
        component: () => import('@/views/supervisor/Index.vue'),
      },
      {
        path: 'recruiters',
        name: 'recruiterController',
      },
      {
        path: 'vacancys',
        name: 'vacancyController',
      },
    ],
  },

  {
    path: '/recruiter',
    meta: { layout: 'recruiterDashboard', requiresAuth: true, role: '3' },
    children: [
      {
        path: '',
        redirect: 'dashboard', // redireciona de /recruiter para /recruiter/dashboard
      },
      {
        path: 'dashboard',
        name: 'recruiterDashboard',
        component: () => import('@/views/recruiter/Index.vue'),
      },
    ],
  },

  {
    path: '/user',
    meta: { layout: 'recruiterDashboard', requiresAuth: true, role: '3' },
    children: [
      {
        path: '/user/dashboard',
        name: 'userDashboard',
        component: () => import('@/views/user/Index.vue'),
        meta: { layout: 'userDashboard', requiresAuth: true, role: '4' },
      },
    ],
  },
]
