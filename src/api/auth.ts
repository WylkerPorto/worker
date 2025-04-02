import http from './http'

export const authenticated = (params) => http.api().post('/login', params)
