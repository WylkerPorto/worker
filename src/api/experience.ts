import http from './http'
import { toQueryString } from '@/utils/conversors'

export const create = (uid: string, params: string) =>
  http.authApi().post(`/person/${uid}/work-experience`, params)

export const get = (uid: string, id: string) =>
  http.authApi().get(`/person/${uid}/work-experience/${id}`)

export const list = (uid: string, params: string) =>
  http.authApi().get(`/person/${uid}/work-experience?${toQueryString(params)}`)

export const update = (uid: string, id: string, params: string) =>
  http.authApi().put(`/person/${uid}/work-experience/${id}`, params)

export const remove = (uid: string, id: string) =>
  http.authApi().delete(`/person/${uid}/work-experience/${id}`)
