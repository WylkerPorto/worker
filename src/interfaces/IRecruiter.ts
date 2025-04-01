interface IRecruiterItem {
  id: string
  name: string
  email: string
  created: string
}

interface IRecruiterForm {
  name: string
  email: string
  password: string
}

interface IRecruiterColumnItem {
  title: string
  key: string
}

export { IRecruiterItem, IRecruiterForm, IRecruiterColumnItem }
