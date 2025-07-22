export interface IVacanceItem {
  id: number
  title: string
  description: string
  requirements: string
  salary: number
  location: string
  created: string
  recruiterId: number
}

export interface IVacancyForm {
  title: string
  description: string
  requirements: string
  salary: number
  location: string
}
