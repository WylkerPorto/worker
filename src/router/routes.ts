export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { layout: 'default' },
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
    path: '/admin/dashboard',
    name: 'adminDashboard',
    component: () => import('@/views/admin/Index.vue'),
    meta: { layout: 'adminDashboard', requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/admins',
    name: 'adminController',
    component: () => import('@/views/admin/Admins.vue'),
    meta: { layout: 'adminDashboard', requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/recruiters',
    name: 'recruitersController',
    component: () => import('@/views/admin/Recruiters.vue'),
    meta: { layout: 'adminDashboard', requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/logs',
    name: 'logsController',
    component: () => import('@/views/admin/Logs.vue'),
    meta: { layout: 'adminDashboard', requiresAuth: true, role: 'admin' },
  },
  {
    path: '/recruter/dashboard',
    name: 'recruterDashboard',
    component: () => import('@/views/recruter/Index.vue'),
    meta: { layout: 'recruterDashboard', requiresAuth: true, role: 'recruiter' },
  },
  {
    path: '/user/dashboard',
    name: 'userDashboard',
    component: () => import('@/views/user/Index.vue'),
    meta: { layout: 'userDashboard', requiresAuth: true, role: 'user' },
  },
]
