import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { layout: 'default' },
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
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
      path: '/admin/dashboard',
      name: 'adminDashboard',
      component: () => import('@/views/admin/Index.vue'),
      meta: { layout: 'adminDashboard' },
    },
    {
      path: '/user/dashboard',
      name: 'userDashboard',
      component: () => import('@/views/user/Index.vue'),
      meta: { layout: 'userDashboard' },
    },
    {
      path: '/recruter/dashboard',
      name: 'recruterDashboard',
      component: () => import('@/views/recruter/Index.vue'),
      meta: { layout: 'recruterDashboard' },
    },
  ],
})

export default router
