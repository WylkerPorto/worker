import http from './http'

export const adminAuth = (params: string) => http.api().post('/auth/login', params)

export const userAuth = (params: string) => http.api().post('/auth/login-candidate', params)

export const remember = (params: string) => http.api().post('/login/remember', params)
