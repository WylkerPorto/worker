<template>
  <form class="card" @submit.stop.prevent="validate">
    <h2>Criar conta</h2>
    <FormInput
      label="Nome"
      v-model="localForm.name"
      :error="errors.name"
      type="text"
      placeholder="Digite seu nome"
    />
    <FormInput
      label="E-mail"
      v-model="localForm.email"
      :error="errors.email"
      type="email"
      placeholder="Digite seu e-mail"
    />
    <FormInput
      label="Senha"
      v-model="localForm.password"
      :error="errors.password"
      type="password"
      placeholder="Digite sua senha"
    />
    <MyButton :loading="loading" @click="validate">Cadastrar</MyButton>
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
import { register } from '@/api/auth'
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
      localForm: this.dataForm as IRegisterForm,
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
      })

      schema
        .validate(this.localForm, { abortEarly: false })
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
        await register(this.localForm)
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

  > a {
    text-align: right;
  }
}
</style>
