<template>
  <form action="#" @submit.stop.prevent="true">
    <h2>Criar conta</h2>
    <FormInput label="Nome" type="text" placeholder="Digite seu nome" />
    <FormInput label="E-mail" type="email" placeholder="Digite seu e-mail" />
    <FormInput label="Senha" type="password" placeholder="Digite sua senha" />
    <MyButton type="login-button">Cadastrar</MyButton>
    <hr />
    <span>
      Já é cadastrado?
      <a href="#" @click="localForm.type = 'login'">Entrar</a>
    </span>
  </form>
</template>
<script lang="ts">
import FormInput from '../core/FormInput.vue'
import MyButton from '../core/MyButton.vue'

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
