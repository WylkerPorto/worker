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
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Auth.vue'),
      meta: { layout: 'dashboard' },
    },
  ],
})

export default router
