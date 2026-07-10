import { toQueryString } from '@/utils/conversores'
import http from './http'

export const create = (params: string) => http.authApi().post('/user', params)

export const get = (id: string) => http.authApi().get(`/user/${id}`)

export const getRecruitersBySupervisor = (supervisorId: string) =>
  http.authApi().get(`/user/recruiters?supervisorId=${supervisorId}`)

export const list = () => http.authApi().get(`/user/recruiters`)

export const listFree = () => http.authApi().get(`/user/recruiters/unassigned`)

export const update = (id: string, params: string) => http.authApi().put(`/user/${id}`, params)

export const linkSupervisor = (id: string, supervisorId: string) =>
  http.authApi().patch(`/user/recruiter/${id}/supervisor`, { supervisorId })

export const remove = (id: string) => http.authApi().delete(`/user/${id}`)

export const getRecruiterKPI = (period: string, recruiterId?: string) =>
  http.authApi().get(`/dashboard/summary?${toQueryString({ period, recruiterId })}`)
