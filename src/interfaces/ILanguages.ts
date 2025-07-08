export const languageStatus = {
  BASICO: 'Básico',
  INTERMEDIARIO: 'Intermediário',
  AVANCADO: 'Avançado',
  FLUENTE: 'Fluente',
  NATIVO: 'Nativo',
}

export type LanguageStatus = (typeof languageStatus)[keyof typeof languageStatus]

export interface ILanguageItem {
  id: number
  language: string
  level: LanguageStatus
  certificateUrl: string
}

export interface ILanguageForm {
  language: string
  level: LanguageStatus
  certificateUrl: string
}
