<template>
  <form @submit.prevent="validate">
    <p>Preencha os campos abaixo para atualizar seu currículo.</p>

    <div class="group">
      <FormInput
        v-model="form.name"
        :error="errors.name"
        type="text"
        placeholder="Digite seu nome"
        label="Name"
      />
    </div>
    <div class="group">
      <FormInput
        v-model="form.email"
        :error="errors.email"
        type="email"
        placeholder="Digite seu e-mail"
        label="Email"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.cpf"
        :error="errors.cpf"
        type="text"
        placeholder="Digite seu CPF"
        label="CPF"
      />
      <FormInput
        v-model="form.rg"
        :error="errors.rg"
        type="text"
        placeholder="Digite seu RG"
        label="RG"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.cnh"
        :error="errors.cnh"
        type="text"
        placeholder="Digite sua CNH"
        label="CNH"
      />
      <FormInput
        v-model="form.typeCnh"
        :error="errors.typeCnh"
        type="text"
        placeholder="Digite o tipo de CNH"
        label="Tipo de CNH"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.hasDisability"
        :error="errors.hasDisability"
        type="checkbox"
        placeholder="Digite o tipo de CNH"
        label="Possui deficiência?"
      />
      <FormInput
        v-model="form.typeDisability"
        :error="errors.typeDisability"
        type="text"
        placeholder="Digite o tipo de deficiência"
        label="Tipo de deficiência"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.gender"
        :error="errors.gender"
        type="text"
        placeholder="Digite o gênero"
        label="Gênero"
      />
      <FormInput
        v-model="form.marital_status_id"
        :error="errors.marital_status_id"
        type="text"
        placeholder="Digite o estado civil"
        label="Estado Civil"
      />
    </div>
    <div class="group">
      <FormInput
        v-model="form.nationality"
        :error="errors.nationality"
        type="text"
        placeholder="Digite a nacionalidade"
        label="Nacionalidade"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.phoneNumber"
        :error="errors.phoneNumber"
        type="tel"
        placeholder="(99) 99999-9999"
        label="Telefone"
      />
      <FormInput
        v-model="form.phoneNumber2"
        :error="errors.phoneNumber2"
        type="tel"
        placeholder="(99) 99999-9999"
        label="Telefone 2"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.available_to_travel"
        :error="errors.available_to_travel"
        type="checkbox"
        placeholder="Digite o estado civil"
        label="Disponível para viajar?"
      />
      <FormInput
        v-model="form.salary_claim"
        :error="errors.salary_claim"
        type="checkbox"
        placeholder="Digite o estado civil"
        label="Pretensão Salarial"
      />
    </div>
    <div class="group">
      <FormInput
        v-model="form.first_job"
        :error="errors.first_job"
        type="checkbox"
        placeholder="Digite o estado civil"
        label="Primeiro Emprego?"
      />
    </div>
    <div class="group">
      <FormInput
        v-model="form.status"
        :error="errors.status"
        type="text"
        placeholder="Digite o estado civil"
        label="Status"
      />
    </div>
    <div class="group">
      <FormInput
        v-model="form.presentation"
        :error="errors.presentation"
        type="checkbox"
        placeholder="Digite o estado civil"
        label="Apresentação"
      />
    </div>
    <div class="group">
      <FormInput
        v-model="form.postal_code"
        :error="errors.postal_code"
        type="text"
        placeholder="Digite o CEP"
        label="CEP"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.street"
        :error="errors.street"
        type="text"
        placeholder="Digite a rua"
        label="Rua"
      />
      <FormInput
        v-model="form.number"
        :error="errors.number"
        type="text"
        placeholder="Digite o número"
        label="Número"
      />
    </div>
    <div class="group">
      <FormInput
        v-model="form.complement"
        :error="errors.complement"
        type="text"
        placeholder="Digite o complemento"
        label="Complemento"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.neighborhood"
        :error="errors.neighborhood"
        type="text"
        placeholder="Digite o bairro"
        label="Bairro"
      />
      <FormInput
        v-model="form.city"
        :error="errors.city"
        type="text"
        placeholder="Digite a cidade"
        label="Cidade"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.state"
        :error="errors.state"
        type="text"
        placeholder="Digite o estado"
        label="Estado"
      />
      <FormInput
        v-model="form.country"
        :error="errors.country"
        type="text"
        placeholder="Digite o país"
        label="País"
      />
    </div>
    <div class="group flex">
      <FormInput
        v-model="form.facebook_url"
        :error="errors.facebook_url"
        type="text"
        placeholder="Digite o link do facebook"
        label="Facebook"
      />
      <FormInput
        v-model="form.instagram_url"
        :error="errors.instagram_url"
        type="text"
        placeholder="Digite o link do instagram"
        label="Instagram"
      />
      <FormInput
        v-model="form.linkedin_url"
        :error="errors.linkedin_url"
        type="text"
        placeholder="Digite o link do linkedin"
        label="LinkedIn"
      />
      <FormInput
        v-model="form.personal_url"
        :error="errors.personal_url"
        type="text"
        placeholder="Digite o link pessoal"
        label="Site Pessoal"
      />
    </div>
  </form>
</template>
<script lang="ts">
import * as yup from 'yup'
import FormInput from '../core/FormInput.vue'
import { getDisabilities, getGenders, getMaritalstatus, getNationalities } from '@/api/filters'
import { get as getUser, update as updateUser } from '@/api/user'

export default {
  name: 'UserCurriculum',
  data() {
    return {
      form: {
        name: '' as string,
        email: '' as string,
        cpf: '' as string,
        rg: '' as string,
        cnh: '' as string,
        typeCnh: '' as string,
        hasDisability: '' as number,
        typeDisability: '' as string,
        gender: '' as string,
        marital_status_id: '' as number,
        nationality: '' as string,
        phoneNumber: '' as string,
        phoneNumber2: '' as string,
        available_to_travel: '' as number,
        salary_claim: '' as number,
        first_job: '' as number,
        status: '' as number,
        presentation: '' as string,
        street: '' as string,
        number: '' as number,
        complement: '' as string,
        neighborhood: '' as string,
        city: '' as string,
        state: '' as string,
        postal_code: '' as string,
        country: '' as string,
        facebook_url: '' as string,
        instagram_url: '' as string,
        linkedin_url: '' as string,
        personal_url: '' as string,
      },
      disabilities: [],
      genders: [],
      maritalStatus: [],
      nationalities: [],
      errors: {},
      loading: false,
    }
  },
  components: {
    FormInput,
  },
  created() {
    // Fetch initial data for dropdowns or other components if needed
    this.loadFilters()
    this.loadData()
  },
  methods: {
    validate() {
      const schema = yup.object({
        name: yup
          .string()
          .min(3, 'Nome deve ter pelo menos 3 caracteres')
          .required('Nome é obrigatório'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.submitForm()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    submitForm() {
      // Handle form submission logic here
      console.log('Form submitted with data:', this.form)
      if (false) {
        updateUser(this.form)
      }
    },
    async loadFilters() {
      try {
        const disabilities = await getDisabilities()
        const genders = await getGenders()
        const maritalStatus = await getMaritalstatus()
        const nationality = await getNationalities()

        this.disabilities = disabilities.data
        this.genders = genders.data
        this.maritalStatus = maritalStatus.data
        this.nationalities = nationality.data
      } catch (error) {
        console.error('Error loading filters:', error)
      }
    },
    async loadData() {
      try {
        const uid = localStorage.getItem('uid')
        const response = await getUser(uid)
        this.form = { ...response.data }
      } catch (error) {
        console.error('Error loading data:', error)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.group {
  margin-bottom: 1rem;

  &.flex {
    display: flex;
    gap: 1rem;

    main {
      flex: 1;
    }
  }
}
</style>
