import http from './http'

export const create = (params) => http.authApi().post('/admin', params)

export const get = (id) => http.authApi().get(`/admin/${id}`)

export const list = (params) => http.authApi().get('/admin', params)

export const update = (id, params) => http.authApi().put(`/admin/${id}`, params)

export const remove = (id) => http.authApi().delete(`/admin/${id}`)
