import axios from 'axios'

// Tipagem da resposta do ViaCEP
export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

// Cria instância separada para o ViaCEP
const viaCepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const getAddressByCep = async (cep: string): Promise<ViaCepResponse> => {
  // Remove caracteres não numéricos
  const cleanCep = cep.replace(/\D/g, '')

  if (cleanCep.length !== 8) {
    throw new Error('CEP inválido. Deve conter 8 dígitos.')
  }

  const { data } = await viaCepApi.get<ViaCepResponse>(`${cleanCep}/json/`)

  if (data.erro) {
    throw new Error('CEP não encontrado.')
  }

  return data
}
