import http from './http'
import { toQueryString } from '@/utils/conversors'

export const create = (params: string) => http.authApi().post('/departament', params)

export const get = (id: string) => http.authApi().get(`/departament/${id}`)

export const list = (params: string) => http.authApi().get(`/departament?${toQueryString(params)}`)

export const update = (id: string, params: string) =>
  http.authApi().put(`/departament/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/departament/${id}`)
