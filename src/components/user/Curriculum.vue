<template>
  <form @submit.prevent="validate">
    <MyAccordeon title="Dados pessoais" :isOpen="true">
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
        <div class="switch">
          <span>Possui deficiência?</span>
          <MySwitch v-model="form.hasDisability" />
        </div>
        <MySelect
          v-if="form.hasDisability"
          :options="disabilities"
          v-model="form.typeDisability"
          label="Deficiência"
          :error="errors.typeDisability"
        />
      </div>

      <div class="group flex">
        <MySelect :options="genders" v-model="form.gender" label="Sexo" :error="errors.gender" />
        <MySelect
          :options="maritalStatus"
          v-model="form.marital_status_id"
          label="Estado Civil"
          :error="errors.marital_status_id"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.phoneNumber"
          :error="errors.phoneNumber"
          type="tel"
          mask="tel"
          placeholder="(99) 99999-9999"
          label="Telefone"
        />
        <FormInput
          v-model="form.phoneNumber2"
          :error="errors.phoneNumber2"
          type="tel"
          mask="tel"
          placeholder="(99) 99999-9999"
          label="Telefone 2"
        />
      </div>
    </MyAccordeon>

    <MyAccordeon title="Localidade">
      <div class="group">
        <MySelect
          :options="nationalities"
          v-model="form.nationality"
          label="Nacionalidade"
          :error="errors.nationality"
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
          type="number"
          placeholder="555"
          label="Número"
        />
      </div>

      <div class="group">
        <FormInput
          v-model="form.complement"
          :error="errors.complement"
          type="text"
          placeholder="Fundo A"
          label="Complemento"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.neighborhood"
          :error="errors.neighborhood"
          type="text"
          placeholder="Limeira"
          label="Bairro"
        />
        <FormInput
          v-model="form.city"
          :error="errors.city"
          type="text"
          placeholder="São Paulo"
          label="Cidade"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.state"
          :error="errors.state"
          type="text"
          placeholder="SP"
          label="Estado"
        />
        <FormInput
          v-model="form.country"
          :error="errors.country"
          type="text"
          placeholder="Brasil"
          label="País"
        />
      </div>
    </MyAccordeon>

    <MyAccordeon title="Profissional">
      <div class="group flex">
        <div class="switch">
          <span>Disponibilidade para viagem?</span>
          <MySwitch v-model="form.available_to_travel" />
        </div>

        <div class="switch">
          <span>Primeiro Emprego?</span>
          <MySwitch v-model="form.first_job" />
        </div>

        <FormInput
          v-model="form.salary_claim"
          :error="errors.salary_claim"
          type="number"
          placeholder="5000"
          label="Pretensão Salarial"
        />
      </div>
    </MyAccordeon>

    <!-- <MyAccordeon title="Escolaridade"> </MyAccordeon> -->

    <MyAccordeon title="Social">
      <div class="group">
        <textarea
          v-model="form.presentation"
          :error="errors.presentation"
          placeholder="Apresentação"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.facebook_url"
          :error="errors.facebook_url"
          type="url"
          placeholder="Digite o link do facebook"
          label="Facebook"
        />
        <FormInput
          v-model="form.instagram_url"
          :error="errors.instagram_url"
          type="url"
          placeholder="Digite o link do instagram"
          label="Instagram"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.linkedin_url"
          :error="errors.linkedin_url"
          type="url"
          placeholder="Digite o link do linkedin"
          label="LinkedIn"
        />
        <FormInput
          v-model="form.personal_url"
          :error="errors.personal_url"
          type="url"
          placeholder="Digite o link pessoal"
          label="Site Pessoal"
        />
      </div>
    </MyAccordeon>

    <MyButton class="primary" :loading="loading">Atualizar</MyButton>
  </form>
</template>
<script lang="ts">
import * as yup from 'yup'
import FormInput from '../core/FormInput.vue'
import MySwitch from '../core/SwitchButton.vue'
import MySelect from '../core/MySelect.vue'
import MyButton from '../core/MyButton.vue'
import MyAccordeon from '../core/MyAccordeon.vue'
import {
  getDisabilities,
  getGenders,
  getMaritalstatus,
  getNationalities,
  getEducationLevels,
  getEducationStatus,
  getLanguageLevels,
} from '@/api/filters'
import { get as getUser, update as updateUser } from '@/api/user'

export default {
  name: 'UserCurriculum',
  data() {
    return {
      id: null,
      form: {
        name: '' as string,
        email: '' as string,
        password: '' as string,
        cpf: '' as string,
        rg: '' as string,
        cnh: '' as string,
        typeCnh: '' as string,
        hasDisability: false as boolean,
        typeDisability: '' as string,
        gender: '' as string,
        marital_status_id: null as number,
        nationality: '' as string,
        phoneNumber: '' as string,
        phoneNumber2: '' as string,
        available_to_travel: false as boolean,
        salary_claim: null as number,
        first_job: false as boolean,
        presentation: '' as string,
        postal_code: '' as string,
        street: '' as string,
        number: null as number,
        complement: '' as string,
        neighborhood: '' as string,
        city: '' as string,
        state: '' as string,
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
      educationLevels: [],
      educationStatus: [],
      languageLevels: [],
      errors: {},
      loading: false,
    }
  },
  components: {
    FormInput,
    MySwitch,
    MySelect,
    MyButton,
    MyAccordeon,
  },
  watch: {
    'form.hasDisability'(newVal) {
      if (!newVal) {
        this.form.typeDisability = ''
      }
    },
  },
  created() {
    // Fetch initial data for dropdowns or other components if needed
    this.loadFilters()
    this.loadData()
    this.id = localStorage.getItem('uid')
  },
  methods: {
    validate() {
      const schema = yup.object({
        name: yup
          .string()
          .min(3, 'Nome deve ter pelo menos 3 caracteres')
          .required('Nome é obrigatório'),
        gender: yup.string().min(1, 'Selecione um sexo').required('Sexo é obrigatório'),
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
    async submitForm() {
      // Handle form submission logic here
      this.loading = true
      try {
        delete this.form.id
        delete this.form.password
        delete this.form.createdAt
        delete this.form.updatedAt

        console.log('Form submitted with data:', this.form)
        const resp = await updateUser(this.id, this.form)
        console.log(resp)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async loadFilters() {
      try {
        const disabilities = await getDisabilities()
        const genders = await getGenders()
        const maritalStatus = await getMaritalstatus()
        const nationality = await getNationalities()
        const educationLevels = await getEducationLevels()
        const educationStatus = await getEducationStatus()
        const languageLevels = await getLanguageLevels()

        this.disabilities = disabilities.data
        this.genders = genders.data
        this.maritalStatus = maritalStatus.data
        this.nationalities = nationality.data
        this.educationLevels = educationLevels.data
        this.educationStatus = educationStatus.data
        this.languageLevels = languageLevels.data
      } catch (error) {
        console.error('Error loading filters:', error)
      }
    },
    async loadData() {
      try {
        const uid = localStorage.getItem('uid')
        const response = await getUser(uid)
        this.form = {
          ...this.form, // valores default
          ...response.data,
          hasDisability: !!response.data.hasDisability, // garante boolean
          available_to_travel: !!response.data.available_to_travel,
          first_job: !!response.data.first_job,
        }
      } catch (error) {
        console.error('Error loading data:', error)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
form {
  padding: 10px 0;

  .group {
    margin-bottom: 1rem;

    &.flex {
      display: flex;
      gap: 1rem;

      main {
        flex: 1;
      }

      .switch {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
    }

    textarea {
      flex: 1;
      resize: none;
      height: 200px;
      background: var(--white);
      padding: 0.7rem;
      border: 1px solid var(--border);
      border-radius: 1.5rem;
      font-size: 18px;
      width: 100%;
      outline: none;
      color: var(--text);
    }
  }

  .primary {
    float: right;
  }
}
</style>
