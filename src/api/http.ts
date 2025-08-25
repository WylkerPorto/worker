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

  this.authApi = function () {
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
          router.push({ name: 'logout' }) // ajuste a rota conforme sua aplicação
        }
        return Promise.reject(error)
      },
    )

    return instance
  }
})()

export default http
