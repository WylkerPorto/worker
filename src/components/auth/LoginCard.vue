<template>
  <form class="card" @submit.stop.prevent="validate">
    <h2>Login</h2>
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
      localForm: this.dataForm as ILoginForm,
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
          .min(1, 'Senha deve ter pelo menos 6 caracteres')
          .required('Senha é obrigatória'),
      })

      schema
        .validate(this.localForm, { abortEarly: false })
        .then(() => {
          this.errors = {}
          // this.loginAccount()
          this.tempLogin(this.localForm.password)
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
        const response = await authenticated(this.localForm)
        this.setAuth(response.data.token, response.data.role)
      } catch (error) {
        this.$snotify.error('Erro ao logar: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    setAuth(token: string, role: string) {
      localStorage.setItem('login', 'true')
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)

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
    tempLogin(role) {
      switch (role) {
        case 'admin':
          this.$router.push({ name: 'adminDashboard' })
          break
        case 'supervisor':
          this.$router.push({ name: 'supervisorDashboard' })
          break
        case 'recruiter':
          this.$router.push({ name: 'recruiterDashboard' })
          break
        case 'user':
          this.$router.push({ name: 'userDashboard' })
          break
        default:
          this.$snotify.error('Erro ao logar: Regra invalida')
          break
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
