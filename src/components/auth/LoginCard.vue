<template>
  <form class="card" @submit.stop.prevent="validate">
    <h2>Login</h2>
    <FormInput label="E-mail" v-model="form.email" :error="errors.email" type="email" placeholder="Digite seu e-mail" />
    <FormInput label="Senha" v-model="form.password" :error="errors.password" type="password"
      placeholder="Digite sua senha" />
    <div class="flex">
      <MySwitch v-model="admin" />
      <span @click="admin = !admin">{{ admin ? 'Empresa' : 'Candidato' }}</span>
    </div>
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
import MySwitch from '../core/SwitchButton.vue'
import { adminAuth, userAuth } from '@/api/auth'
import { ILoginForm } from '@/interfaces/IEnter'

export default {
  name: 'LoginCard',
  components: {
    FormInput,
    MyButton,
    MySwitch,
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
      admin: false,
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
        const response = await (this.admin ? adminAuth(this.form) : userAuth(this.form))
        this.setAuth(response.data.access_token, response.data.permission, response.data.uid)
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
    setAuth(token: string, role: string, uid: number) {
      // Armazenar o token e a role no localStorage
      localStorage.setItem('login', 'true')
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      localStorage.setItem('uid', uid.toString())
      this.sendToDashboard(role)
    },
    sendToDashboard(role: number) {
      switch (role) {
        case 1:
          this.$router.push({ name: 'adminDashboard' })
          return
        case 2:
          this.$router.push({ name: 'supervisorDashboard' })
          return
        case 3:
          this.$router.push({ name: 'recruiterDashboard' })
          return
        case 4:
          this.$router.push({ name: 'userAplication' })
          return
        default:
          this.$snotify.error('Erro ao logar: Regra invalida')
          return
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

  .flex {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      cursor: pointer;
    }
  }

  >a {
    text-align: right;
  }
}
</style>
