import { toQueryString } from '@/utils/conversors'
import http from './http'

export const create = (params: string) => http.authApi().post('/user', params)

export const get = (id: string) => http.authApi().get(`/user/${id}`)

export const list = (params: string) =>
  http.authApi().get(`/user/recruiters?${toQueryString(params)}`)

export const listFree = (params: string) =>
  http.authApi().get(`/user/recruiters/unassigned?${toQueryString(params)}`)

export const update = (id: string, params: string) => http.authApi().put(`/user/${id}`, params)

export const linkSupervisor = (id: string, supervisorId: string) =>
  http.authApi().patch(`/user/recruiter/${id}/supervisor`, { supervisorId })

export const remove = (id: string) => http.authApi().delete(`/user/${id}`)
