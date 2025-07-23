export const workModels = {
  PRESENCIAL: 'Presencial',
  HIBRIDO: 'Híbrido',
  REMOTO: 'Remoto',
} as const

export type WorkModel = (typeof workModels)[keyof typeof workModels]

export const employmentTypes = {
  CLT: 'CLT',
  PJ: 'PJ',
  ESTAGIO: 'Estágio',
  FREELANCER: 'Freelancer',
  TEMPORARIO: 'Temporário',
} as const

export type EmploymentType = (typeof employmentTypes)[keyof typeof employmentTypes]

export interface IVacancyItem {
  id: number
  title: string
  description: string
  niceToHave: string
  responsibilities: string
  requirements: string
  workModel: WorkModel
  employmentType: EmploymentType
  salary: number
  hideSalary: boolean
  city: string
  state: string
  departmentId: number
  positionId: number
  recruiter: number
}

export interface IVacancyForm {
  title: string
  description: string
  niceToHave: string
  responsibilities: string
  requirements: string
  workModel: WorkModel
  employmentType: EmploymentType
  salary: number
  hideSalary: boolean
  city: string
  state: string
  departmentId: number
  positionId: number
  recruiter: number
}

export interface IVacancyColumnItem {
  title: string
  employmentType: EmploymentType
  createdAt: string
}
