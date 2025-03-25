interface IAdminItem {
  id: string
  name: string
  email: string
  created: string
}

interface IAdminForm {
  name: string
  email: string
  password: string
}

interface IAdminColumnItem {
  title: string
  key: string
}

export { IAdminItem, IAdminForm, IAdminColumnItem }
