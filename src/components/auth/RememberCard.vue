<template>
  <form class="card" @submit.stop.prevent="validate">
    <h2>Recuperar Senha</h2>
    <FormInput
      label="E-mail"
      v-model="localForm.email"
      :error="errors.email"
      type="email"
      placeholder="Digite seu e-mail"
    />
    <MyButton :loading="loading" @click="validate">Recuperar</MyButton>
    <hr />
    <span>
      Lembrou sua senha?
      <a href="#" @click="localForm.type = 'login'">Entrar</a>
    </span>
  </form>
</template>
<script lang="ts">
import * as yup from 'yup'
import FormInput from '../core/FormInput.vue'
import MyButton from '../core/MyButton.vue'
import { remember } from '@/api/auth'
import { IRememberForm } from '@/interfaces/IEnter'

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
      localForm: this.dataForm as IRememberForm,
      errors: {} as IRememberForm,
      loading: false,
    }
  },
  methods: {
    validate() {
      const schema = yup.object({
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
      })

      schema
        .validate(this.localForm, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.rememberAccount()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async rememberAccount() {
      this.loading = true
      try {
        await remember(this.localForm)
      } catch (error) {
        this.$snotify.error('Erro ao recuperar senha: ' + error.message)
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
