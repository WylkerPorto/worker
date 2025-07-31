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
    redirect: { name: '/logout' },
  },

  {
    path: '/admin',
    meta: { layout: 'adminDashboard', requiresAuth: true, role: '1' },
    children: [
      {
        path: '',
        redirect: { name: 'adminDashboard' }, // redireciona de /admin para /admin/dashboard
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
        redirect: { name: 'supervisorDashboard' }, // redireciona de /supervisor para /supervisor/dashboard
      },
      {
        path: 'dashboard',
        name: 'supervisorDashboard',
        component: () => import('@/views/supervisor/Index.vue'),
      },
      {
        path: 'recruiters',
        name: 'recruiterController',
        component: () => import('@/views/supervisor/Recruiters.vue'),
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
        redirect: { name: 'recruiterDashboard' }, // redireciona de /recruiter para /recruiter/dashboard
      },
      {
        path: 'dashboard',
        name: 'recruiterDashboard',
        component: () => import('@/views/recruiter/Index.vue'),
      },
      {
        path: 'vacancys',
        name: 'recruiterVacancy',
        component: () => import('@/views/recruiter/Vacancy.vue'),
      },
      {
        path: 'vacancy/:id?',
        name: 'recruiterVacancyForm',
        component: () => import('@/views/recruiter/VacancyCreate.vue'),
      },
      {
        path: 'positions',
        name: 'recruiterPosition',
        component: () => import('@/views/recruiter/Position.vue'),
      },
      {
        path: 'departments',
        name: 'recruiterDepartment',
        component: () => import('@/views/recruiter/Department.vue'),
      },
    ],
  },

  {
    path: '/user',
    meta: { layout: 'userDashboard', requiresAuth: true, role: '3' },
    children: [
      {
        path: '',
        redirect: { name: 'userAplication' }, // redireciona de /user para /user/dashboard
      },
      {
        path: '/user/aplication',
        name: 'userAplication',
        component: () => import('@/views/user/Aplication.vue'),
        meta: { layout: 'userDashboard', requiresAuth: true, role: '4' },
      },
      {
        path: '/user/vacancy',
        name: 'userVacancy',
        component: () => import('@/views/user/Vacancy.vue'),
        meta: { layout: 'userDashboard', requiresAuth: true, role: '4' },
      },
      {
        path: '/user/profile',
        name: 'userProfile',
        component: () => import('@/views/user/Profile.vue'),
        meta: { layout: 'userDashboard', requiresAuth: true, role: '4' },
      },
    ],
  },
]
