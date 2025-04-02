import http from './http'

export const create = (params) => http.authApi().post('/cv', params)

export const get = (id) => http.authApi().get(`/cv/${id}`)

export const list = (params) => http.authApi().get('/cv', params)

export const update = (id, params) => http.authApi().put(`/cv/${id}`, params)

export const remove = (id) => http.authApi().delete(`/cv/${id}`)
