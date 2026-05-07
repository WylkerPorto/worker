import { toQueryString } from '@/utils/conversors'
import http from './http'

export const list = (params: object) => http.authApi().get(`/talent-pool?${toQueryString(params)}`)
