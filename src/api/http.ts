import axios from 'axios'

const getUrl = () => {
  const url = import.meta.env.VITE_BASE_BACKEND_URL
  return url
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
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''

    return axios.create({
      baseURL: getUrl(),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }
})()

export default http
