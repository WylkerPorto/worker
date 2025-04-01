interface ILogItem {
  id: string
  type: string
  created: string
}

interface ILogColumnItem {
  title: string
  key: string
}

export { ILogItem, ILogColumnItem }
