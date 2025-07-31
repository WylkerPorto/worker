import http from './http'

export const getDisabilities = () => http.authApi().get('/filter/disability')

export const getGenders = () => http.authApi().get('/filter/gender')

export const getMaritalstatus = () => http.authApi().get('/filter/maritalstatus')

export const getNationalities = () => http.authApi().get('/filter/nationality')

export const getEducationLevels = () => http.authApi().get('/filter/education-level')

export const getEducationStatus = () => http.authApi().get('/filter/education-status')

export const getLanguageLevels = () => http.authApi().get('/filter/language-level')

export const getWorkModels = () => http.authApi().get('/filter/work-model')

export const getEmploymentTypes = () => http.authApi().get('/filter/employment-type')

export const getVacancyStatus = () => http.authApi().get('/filter/vacancy-status')
