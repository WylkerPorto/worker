<template>
  <form class="card" action="#" @submit.stop.prevent="true">
    <h2>Recuperar Senha</h2>
    <FormInput label="E-mail" type="email" placeholder="Digite seu e-mail" />
    <MyButton type="login-button">Recuperar</MyButton>
    <hr />
    <span>
      Lembrou sua senha?
      <a href="#" @click="localForm.type = 'login'">Entrar</a>
    </span>
  </form>
</template>
<script lang="ts">
import FormInput from '../core/FormInput.vue'
import MyButton from '../core/MyButton.vue'

export default {
  name: 'RememberCard',
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
  h2 {
    text-align: center;
  }

  > a {
    text-align: right;
  }
}
</style>
