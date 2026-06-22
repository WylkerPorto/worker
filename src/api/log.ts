import http from './http'
import { toQueryString } from '@/utils/conversores'

export const list = (params: string) => http.authApi().get(`/application?${toQueryString(params)}`)
