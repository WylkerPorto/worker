import http from './http'

export const create = (params) => http.authApi().post('/supervisor', params)

export const get = (id) => http.authApi().get(`/supervisor/${id}`)

export const list = (params) => http.authApi().get('/supervisor', params)

export const update = (id, params) => http.authApi().put(`/supervisor/${id}`, params)

export const remove = (id) => http.authApi().delete(`/supervisor/${id}`)
