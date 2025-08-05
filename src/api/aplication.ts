import http from './http'
import { toQueryString } from '@/utils/conversors'

export const create = (params: string) => http.authApi().post('/application', params)

export const get = (id: string) => http.authApi().get(`/application/${id}`)

export const list = (params: string) => http.authApi().get(`/application?${toQueryString(params)}`)

export const update = (id: string, params: string) =>
  http.authApi().put(`/application/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/application/${id}`)

export const getAplicationsByVacancy = (id: string, params: string) =>
  http.authApi().get(`/application/vacancy/${id}?${toQueryString(params)}`)

export const getAplicationByUser = (id: string, params: string) =>
  http.authApi().get(`/application/person/${id}?${toQueryString(params)}`)
