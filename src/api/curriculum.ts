import http from './http'

export const create = (params: string) => http.authApi().post('/cv', params)

export const get = (id: string) => http.authApi().get(`/cv/${id}`)

export const list = (params: string) => http.authApi().get('/cv', params)

export const update = (id: string, params: string) => http.authApi().put(`/cv/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/cv/${id}`)
