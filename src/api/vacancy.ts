import http from './http'
import { toQueryString } from '@/utils/conversors'

export const create = (params: string) => http.authApi().post('/vacancy', params)

export const get = (id: string) => http.authApi().get(`/vacancy/${id}`)

export const list = (params: string) => http.authApi().get(`/vacancy?${toQueryString(params)}`)

export const update = (id: string, params: string) => http.authApi().put(`/vacancy/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/vacancy/${id}`)

export const getBySlug = (slug: string) => http.authApi().get(`/vacancy/slug/${slug}`)
