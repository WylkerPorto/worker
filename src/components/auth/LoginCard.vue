<template>
  <form class="card" action="#" @submit.stop.prevent="loginAccount">
    <h2>Login</h2>
    <FormInput
      label="E-mail"
      v-model="localForm.email"
      type="email"
      placeholder="Digite seu e-mail"
    />
    <FormInput
      label="Senha"
      v-model="localForm.password"
      type="password"
      placeholder="Digite sua senha"
    />
    <a href="#" @click="localForm.type = 'forgot-password'">Esqueci minha senha</a>
    <MyButton type="submit" @click="loginAccount">Entrar</MyButton>
    <hr />
    <span>
      Ainda não tem conta?
      <a href="#" @click="localForm.type = 'register'">Cadastre-se</a>
    </span>
  </form>
</template>
<script lang="ts">
import FormInput from '../core/FormInput.vue'
import MyButton from '../core/MyButton.vue'

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
      localForm: this.dataForm,
    }
  },
  methods: {
    loginAccount() {
      switch (this.localForm.password) {
        case 'admin':
          this.$router.push({ name: 'adminDashboard' })
          break
        case 'recruter':
          this.$router.push({ name: 'recruterDashboard' })
          break
        default:
          this.$router.push({ name: 'userDashboard' })
          break
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
      } else if (localStorage.getItem('role') === 'recruiter') {
        this.$router.push({ name: 'recruterDashboard' })
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
