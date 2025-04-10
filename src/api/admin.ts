import http from './http'

export const create = (params: string) => http.authApi().post('/admin', params)

export const get = (id: string) => http.authApi().get(`/admin/${id}`)

export const list = (params: string) => http.authApi().get('/admin', params)

export const update = (id: string, params: string) => http.authApi().put(`/admin/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/admin/${id}`)
