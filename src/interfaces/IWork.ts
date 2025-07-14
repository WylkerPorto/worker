export interface IWorkItem {
  id: number
  position: string
  department: string
  companyName: string
  startDate: string
  endDate: string
  description: string
  salary: number
  employmentType: string
  isCurrentJob: boolean
}

export interface IWorkForm {
  position: string
  department: string
  companyName: string
  startDate: string
  endDate: string
  description: string
  salary: number
  employmentType: string
  isCurrentJob: boolean
}
