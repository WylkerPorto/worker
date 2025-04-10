<template>
  <form class="card" @submit.stop.prevent="validate">
    <h2>Login</h2>
    <FormInput
      label="E-mail"
      v-model="form.email"
      :error="errors.email"
      type="email"
      placeholder="Digite seu e-mail"
    />
    <FormInput
      label="Senha"
      v-model="form.password"
      :error="errors.password"
      type="password"
      placeholder="Digite sua senha"
    />
    <a href="#" @click="localForm.type = 'forgot-password'">Esqueci minha senha</a>
    <MyButton class="primary" :loading="loading">Entrar</MyButton>
    <hr />
    <span>
      Ainda não tem conta?
      <a href="#" @click="localForm.type = 'register'">Cadastre-se</a>
    </span>
  </form>
</template>
<script lang="ts">
import * as yup from 'yup'
import FormInput from '../core/FormInput.vue'
import MyButton from '../core/MyButton.vue'
import { authenticated } from '@/api/auth'
import { ILoginForm } from '@/interfaces/IEnter'

export default {
  name: 'LoginCard',
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
      errors: {} as ILoginForm,
      loading: false,
    }
  },
  methods: {
    validate() {
      const schema = yup.object({
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        password: yup
          .string()
          .min(6, 'Senha deve ter pelo menos 6 caracteres')
          .required('Senha é obrigatória'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.loginAccount()
          // this.tempLogin(this.form.password)
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async loginAccount() {
      this.loading = true
      try {
        const response = await authenticated(this.form)
        this.setAuth(response.data.access_token, response.data.permission)
      } catch (error) {
        if (error.response.status === 401) {
          this.$snotify.error('E-mail ou senha inválidos')
        } else if (error.response.status === 403) {
          this.$snotify.error('Acesso negado')
        } else {
          this.$snotify.error('Erro ao logar: ' + error.message)
        }
      } finally {
        this.loading = false
      }
    },
    setAuth(token: string, role: string) {
      localStorage.setItem('login', 'true')
      localStorage.setItem('token', token)
      localStorage.setItem('role', this.getRole(role))

      // Redirecionar para o painel apropriado
      if (localStorage.getItem('role') === 'admin') {
        this.$router.push({ name: 'adminDashboard' })
      } else if (localStorage.getItem('role') === 'user') {
        this.$router.push({ name: 'userDashboard' })
      } else if (localStorage.getItem('role') === 'supervisor') {
        this.$router.push({ name: 'supervisorDashboard' })
      } else if (localStorage.getItem('role') === 'recruiter') {
        this.$router.push({ name: 'recruiterDashboard' })
      } else {
        this.$snotify.error('Erro ao logar: Regra invalida')
      }
    },
    getRole(role: number) {
      switch (role) {
        case 1:
          return 'admin'
        case 2:
          return 'supervisor'
        case 3:
          return 'recruiter'
        case 4:
          return 'user'
        default:
          return ''
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
