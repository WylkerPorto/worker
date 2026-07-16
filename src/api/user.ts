import { toQueryString } from '@/utils/conversores'
import http from './http'

export const create = (params: unknown) => http.authApi().post('/person', params)

export const get = (id: string) => http.authApi().get(`/person/${id}`)

export const list = (params: Record<string, unknown>) =>
  http.authApi().get(`/person?${toQueryString(params)}`)

export const update = (id: string, params: unknown) => http.authApi().put(`/person/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/person/${id}`)
