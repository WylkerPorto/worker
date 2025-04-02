import http from './http'

export const create = (params) => http.authApi().post('/recruiter', params)

export const get = (id) => http.authApi().get(`/recruiter/${id}`)

export const list = (params) => http.authApi().get('/recruiter', params)

export const update = (id, params) => http.authApi().put(`/recruiter/${id}`, params)

export const remove = (id) => http.authApi().delete(`/recruiter/${id}`)
