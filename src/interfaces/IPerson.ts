export interface IPersonForm {
  id: number
  name: string
  socialName: string
  password: string
  education: string
  educationLevel: string
  cpf: string
  rg: string
  cnh: string
  typeCnh: string
  birthDate: Date
  hasDisability: boolean
  typeDisability: string
  gender: string
  maritalStatusId: number
  email: string
  phoneNumber: string
  phoneNumber2: string
  nationality: string
  presentation: string
  postalCode: string
  street: string
  number: number
  complement: string
  neighborhood: string
  city: string
  state: string
  country: string
  availableToCommuteToAraraquara: boolean
  willingToRelocateToAraraquara: boolean
  availableToTravel: boolean
  acceptsTalentPool: boolean
  timeAvailability: string[]
  firstJob: boolean
  salaryClaim: number
  facebookUrl: string
  instagramUrl: string
  linkedinUrl: string
  personalUrl: string
  createdAt?: string | Date | null
  updatedAt?: string | Date | null
  deletedAt?: string | Date | null
}
