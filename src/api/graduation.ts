import http from './http'

export const create = (uid: string, params: string) =>
  http.authApi().post(`/person/${uid}/graduation`, params)

export const get = (uid: string, id: string) =>
  http.authApi().get(`/person/${uid}/graduation/${id}`)

export const list = (uid: string) => http.authApi().get(`/person/${uid}/graduation`)

export const update = (uid: string, id: string, params: string) =>
  http.authApi().put(`/person/${uid}/graduation/${id}`, params)

export const remove = (uid: string, id: string) =>
  http.authApi().delete(`/person/${uid}/graduation/${id}`)
