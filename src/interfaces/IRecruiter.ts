export interface IRecruiterItem {
  id: number
  name: string
  email: string
  created: string
}

export interface IRecruiterForm {
  name: string
  email: string
  password: string
  permission_id: number
}

export interface IRecruiterColumnItem {
  title: string
  key: string
}
