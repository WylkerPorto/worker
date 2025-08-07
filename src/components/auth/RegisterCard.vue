<template>
  <form class="card" @submit.stop.prevent="validate">
    <h2>Criar conta</h2>
    <FormInput label="Nome" v-model="form.name" :error="errors.name" type="text" placeholder="Digite seu nome" />
    <FormInput label="E-mail" v-model="form.email" :error="errors.email" type="email" placeholder="Digite seu e-mail" />
    <FormInput label="Senha" v-model="form.password" :error="errors.password" type="password"
      placeholder="Digite sua senha" />
    <FormInput label="Telefone" v-model="form.phoneNumber" :error="errors.phoneNumber" type="tel"
      placeholder="(99) 99999-9999" mask="tel" />
    <MyButton class="primary" :loading="loading">Cadastrar</MyButton>
    <hr />
    <span>
      Já é cadastrado?
      <a href="#" @click="localForm.type = 'login'">Entrar</a>
    </span>
  </form>
</template>
<script lang="ts">
import * as yup from 'yup'
import FormInput from '../core/FormInput.vue'
import MyButton from '../core/MyButton.vue'
import { create } from '@/api/user'
import { IRegisterForm } from '@/interfaces/IEnter'

export default {
  name: 'RegisterCard',
  components: {
    FormInput,
    MyButton,
  },
  props: {
    dataForm: {
      type: Object,
    },
  },
  data() {
    return {
      form: {} as ILoginForm,
      localForm: this.dataForm,
      errors: {} as IRegisterForm,
      loading: false,
    }
  },
  methods: {
    validate() {
      const schema = yup.object({
        name: yup
          .string()
          .min(3, 'Nome deve ter pelo menos 3 caracteres')
          .required('Nome é obrigatório'),
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        password: yup
          .string()
          .min(6, 'Senha deve ter pelo menos 6 caracteres')
          .required('Senha é obrigatória'),
        phoneNumber: yup
          .string()
          .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone deve estar no formato (12) 12345-1234')
          .required('Telefone é obrigatório'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.registerAccount()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async registerAccount() {
      this.loading = true
      try {
        await create(this.form)
        this.$snotify.success('Cadastro realizado com sucesso!')
      } catch (error) {
        this.$snotify.error('Erro ao cadastrar: ' + error.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
form {
  h2 {
    text-align: center;
  }

  >a {
    text-align: right;
  }
}
</style>
