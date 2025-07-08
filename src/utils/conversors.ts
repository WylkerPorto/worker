import moment from 'moment'

export const toQueryString = (paramsObj: Record<string, any>): string => {
  const cleanParams = Object.fromEntries(
    Object.entries(paramsObj).filter(([_, v]) => v !== null && v !== undefined),
  )
  return new URLSearchParams(cleanParams).toString()
}

export const toFormatDate = (date: string): string => {
  if (!date) return ''
  const format = moment(date).format('DD/MM/YYYY')
  return format
}
