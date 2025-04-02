import http from './http'

export const authenticated = (params) => http.api().post('/login', params)

export const remember = (params) => http.api().post('/login/remember', params)

export const register = (params) => http.api().post('/register', params)
