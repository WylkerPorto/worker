import axios from 'axios'
import router from '@/router' // ajuste se necessário

const getUrl = () => {
  return import.meta.env.VITE_BASE_BACKEND_URL
}

const http = new (function () {
  this.api = function () {
    return axios.create({
      baseURL: getUrl(),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Retorna uma inst ncia de axios com token de autentica  para fazer requisi es
   * para endpoints que exigem autentica .
   * Interceptor de resposta para tratar 401 e redirecionar para a p gina de login ou not-found
   * @returns {AxiosInstance} - Inst ncia de axios com token de autentica .
   */
/*******  f6dcc84e-4d65-471b-b7d6-40975f3d2951  *******/  this.authApi = function () {
    const token = localStorage.getItem('token') || ''

    const instance = axios.create({
      baseURL: getUrl(),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    // Interceptor de resposta para tratar 401
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          const logado = localStorage.getItem('token')
          if (!logado) {
            router.push({ name: 'login' }) // ajuste a rota conforme sua aplicação
            return Promise.reject(error)
          }
          router.push({ name: 'not-found' }) // ajuste a rota conforme sua aplicação
        }
        return Promise.reject(error)
      },
    )

    return instance
  }
})()

export default http
