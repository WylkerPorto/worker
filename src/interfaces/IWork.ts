export interface IWorkItem {
  id: number
  position: string
  department: string
  company_name: string
  start_date: string
  end_date: string
  description: string
  salary: number
  employment_type: string
  is_current_job: boolean
}

export interface IWorkForm {
  position: string
  department: string
  company_name: string
  start_date: string
  end_date: string
  description: string
  salary: number
  employment_type: string
  is_current_job: boolean
}
