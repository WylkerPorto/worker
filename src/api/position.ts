import http from './http'
import { toQueryString } from '@/utils/conversors'

export const create = (params: string) => http.authApi().post('/position', params)

export const get = (id: string) => http.authApi().get(`/position/${id}`)

export const list = (params: string) => http.authApi().get(`/position?${toQueryString(params)}`)

export const update = (id: string, params: string) => http.authApi().put(`/position/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/position/${id}`)
