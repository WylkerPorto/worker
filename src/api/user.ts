import http from './http'

export const create = (params) => http.authApi().post('/user', params)

export const get = (id) => http.authApi().get(`/user/${id}`)

export const list = (params) => http.authApi().get('/user', params)

export const update = (id, params) => http.authApi().put(`/user/${id}`, params)

export const remove = (id) => http.authApi().delete(`/user/${id}`)
