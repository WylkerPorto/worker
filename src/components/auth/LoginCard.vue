<template>
  <form action="#" @submit.stop.prevent="true">
    <h2>Login</h2>
    <FormInput label="E-mail" type="email" placeholder="Digite seu e-mail" />
    <FormInput label="Senha" type="password" placeholder="Digite sua senha" />
    <a href="#" @click="localForm.type = 'forgot-password'">Esqueci minha senha</a>
    <MyButton type="login-button">Entrar</MyButton>
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
}
</script>
<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 2rem;
  max-width: 500px;
  background: var(--backgroundCardLogin);
  border-radius: 1rem;
  backdrop-filter: blur(10px);

  h2 {
    text-align: center;
  }

  > a {
    text-align: right;
  }
}
</style>
