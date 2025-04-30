import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'

const useHash = import.meta.env.VITE_ROUTER_MODE === 'hash'

const router = createRouter({
  history: useHash ? createWebHashHistory() : createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const login = !!(
    localStorage.getItem('login') &&
    localStorage.getItem('login') === 'true' &&
    localStorage.getItem('token')
  )

  // Defina a role do usuário após login
  const userRole = localStorage.getItem('role')

  // Verifica se a rota requer autenticação
  if (!login && to.matched.some((record) => record.meta.requiresAuth)) {
    return next({ name: 'login' })
  }

  // Se o usuário estiver logado e a rota exigir um tipo específico de usuário
  if (login && to.matched.some((record) => record.meta.role)) {
    const requiredRole = to.meta.role

    // Verifica se o papel do usuário corresponde ao papel necessário para acessar a rota
    if (userRole !== requiredRole) {
      return next('/invalid') // ou redirecione para uma página de erro
    }
  }

  next()
})

export default router
