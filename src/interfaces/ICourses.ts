export interface ICourseItem {
  id: number
  courseName: string
  institutionName: string
  durationHours: number
  completionDate: string
  certificateUrl: string
  description: string
}

export interface ICourseForm {
  courseName: string
  institutionName: string
  durationHours: number
  completionDate: string
  certificateUrl: string
  description: string
}
