export interface IAdminItem {
  id: number
  name: string
  email: string
  created: string
}

export interface IAdminForm {
  name: string
  email: string
  password: string
  permissionId: number
}

export interface IAdminColumnItem {
  title: string
  key: string
}
