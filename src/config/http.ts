import 'dotenv/config'
import axios from 'axios'

const getUrl = () => {
  let url = ''
  if (process.env.NODE_ENV === 'development') {
    // url = localhost
    url = `http://localhost:3000`
  } else {
    // url = production
    url = 'https://production.com'
  }
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
