export interface ISupervisorItem {
  id: number
  name: string
  email: string
  created: string
}

export interface ISupervisorForm {
  name: string
  email: string
  password: string
  permissionId: number
}

export interface ISupervisorColumnItem {
  title: string
  key: string
}
