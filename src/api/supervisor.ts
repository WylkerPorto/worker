import http from './http'

export const create = (params: string) => http.authApi().post('/supervisor', params)

export const get = (id: string) => http.authApi().get(`/supervisor/${id}`)

export const list = (params: string) => http.authApi().get('/supervisor', params)

export const update = (id: string, params: string) =>
  http.authApi().put(`/supervisor/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/supervisor/${id}`)
