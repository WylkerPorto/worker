import http from './http'
import { type IWorkForm, type IWorkItem } from '@/interfaces/IWork'

export const create = (uid: string, params: IWorkForm) =>
  http.authApi().post(`/person/${uid}/work-experience`, params)

export const get = (uid: string, id: string) =>
  http.authApi().get(`/person/${uid}/work-experience/${id}`)

export const list = (uid: string) => http.authApi().get(`/person/${uid}/work-experience`)

export const update = (uid: string, id: string, params: IWorkItem) =>
  http.authApi().put(`/person/${uid}/work-experience/${id}`, params)

export const remove = (uid: string, id: string) =>
  http.authApi().delete(`/person/${uid}/work-experience/${id}`)
