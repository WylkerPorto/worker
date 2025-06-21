import http from './http'

export const getDisabilities = () => http.authApi().get('/filter/disability')

export const getGenders = () => http.authApi().get('/filter/gender')

export const getMaritalstatus = () => http.authApi().get('/filter/maritalstatus')

export const getNationalities = () => http.authApi().get('/filter/nationality')
