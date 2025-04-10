import http from './http'

export const create = (params: string) => http.authApi().post('/vacancy', params)

export const get = (id: string) => http.authApi().get(`/vacancy/${id}`)

export const list = (params: string) => http.authApi().get('/vacancy', params)

export const update = (id: string, params: string) => http.authApi().put(`/vacancy/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/vacancy/${id}`)
