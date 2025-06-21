import http from './http'
import { toQueryString } from '@/utils/conversors'

export const create = (params: string) => http.authApi().post('/person', params)

export const get = (id: string) => http.authApi().get(`/person/${id}`)

export const list = (params: string) => http.authApi().get(`/person?${toQueryString(params)}`)

export const update = (id: string, params: string) => http.authApi().put(`/person/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/person/${id}`)
