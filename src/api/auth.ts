import http from './http'

export const authenticated = (params: string) => http.api().post('/auth/login', params)

export const remember = (params: string) => http.api().post('/login/remember', params)

export const register = (params: string) => http.api().post('/register', params)
