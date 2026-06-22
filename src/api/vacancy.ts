import { toQueryString } from '@/utils/conversores'
import http from './http'

export const create = (params: string) => http.authApi().post('/vacancy', params)

export const get = (id: string) => http.authApi().get(`/vacancy/${id}`)

export const list = (params: string) => http.authApi().get(`/vacancy?${toQueryString(params)}`)

export const update = (id: string, params: string) => http.authApi().put(`/vacancy/${id}`, params)

export const remove = (id: string) => http.authApi().delete(`/vacancy/${id}`)

export const getBySlug = (slug: string) => http.authApi().get(`/vacancy/slug/${slug}`)

export const publicList = (params: string) =>
  http.api().get(`/vacancy/public?${toQueryString(params)}`)

export const transfer = (id: string, recruiterId: string) =>
  http.authApi().patch(`/vacancy/${id}/recruiter`, { recruiterId })

export const log = (id: string) => http.authApi().get(`/vacancy/${id}/activity-log`)
