import { toQueryString } from '@/utils/conversores'
import http from './http'

export const list = (params: object) => http.authApi().get(`/talent-pool?${toQueryString(params)}`)
