import http from './http'

export const create = (params) => http.authApi().post('/vacancy', params)

export const get = (id) => http.authApi().get(`/vacancy/${id}`)

export const list = (params) => http.authApi().get('/vacancy', params)

export const update = (id, params) => http.authApi().put(`/vacancy/${id}`, params)

export const remove = (id) => http.authApi().delete(`/vacancy/${id}`)
