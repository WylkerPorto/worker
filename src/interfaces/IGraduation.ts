// Lista fixa de níveis educacionais aceitos
export const educationLevels = {
  BACHARELADO: 'Bacharelado',
  LICENCIATURA: 'Licenciatura',
  TECNOLOGO: 'Tecnólogo',
  MESTRADO: 'Mestrado',
  DOUTORADO: 'Doutorado',
  POS_GRADUACAO: 'Pós-graduação',
  ENSINO_TECNICO: 'Ensino Técnico',
  ENSINO_MEDIO: 'Ensino Médio',
} as const

// Deriva o tipo aceito a partir dos valores do objeto
export type EducationLevel = (typeof educationLevels)[keyof typeof educationLevels]

export const educationStatus = {
  CONCLUIDO: 'Concluído',
  CURSANDO: 'Cursando',
  TRANCADO: 'Trancado',
  NAO_CONCLUIDO: 'Não concluído',
} as const

export type EducationStatus = (typeof educationStatus)[keyof typeof educationStatus]

// Representa um item completo vindo do backend
export interface IGraduationItem {
  id: number
  institutionName: string
  courseName: string
  educationLevel: EducationLevel
  status: EducationStatus
  startDate: string // formato ISO: yyyy-mm-dd
  endDate: string // idem
}

// Usado para formulários (criação/edição)
export interface IGraduationForm {
  institutionName: string
  courseName: string
  educationLevel: EducationLevel
  status: EducationStatus
  startDate: string
  endDate: string
}
