import http from './http'
import { toQueryString } from '@/utils/conversors'

export const create = (params: string) => http.authApi().post('/department', params)

export const get = (id: string) => http.authApi().get(`/department/${id}`)

export const list = (params: string) => http.authApi().get(`/department?${toQueryString(params)}`)

export const update = (id: string, params: string) =>
  http.authApi().put(`/department/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/department/${id}`)
