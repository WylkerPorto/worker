import http from './http'

export const create = (params: string) => http.authApi().post('/recruiter', params)

export const get = (id: string) => http.authApi().get(`/recruiter/${id}`)

export const list = (params: string) => http.authApi().get('/recruiter', params)

export const update = (id: string, params: string) => http.authApi().put(`/recruiter/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/recruiter/${id}`)
