import http from './http'
import { toQueryString } from '@/utils/conversors'

export const create = (params: string) => http.authApi().post('/user', params)

export const get = (id: string) => http.authApi().get(`/user/${id}`)

export const list = (params: string) => http.authApi().get(`/user?${toQueryString(params)}`)

export const update = (id: string, params: string) => http.authApi().put(`/user/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/user/${id}`)
