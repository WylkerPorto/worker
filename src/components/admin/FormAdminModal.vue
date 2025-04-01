<template>
  <ModalBase :open="show" :loading="loading" title="Novo Administrador" @onClose="closeModal">
    <template #content>
      <form @submit.prevent="validate(saveAdmin)">
        <FormInput
          label="Nome"
          type="text"
          placeholder="Digite o nome"
          v-model="form.name"
          :error="errors.name"
          required
        />
        <FormInput
          label="E-mail"
          type="email"
          placeholder="Digite o e-mail"
          v-model="form.email"
          :error="errors.email"
          required
        />
        <FormInput
          label="Senha"
          type="password"
          placeholder="Digite a senha"
          v-model="form.password"
          :error="errors.password"
          required
        />
      </form>
    </template>
    <template #actions>
      <MyButton class="btn success" :loading="loading" @click="validate(saveAdmin)">
        Salvar
      </MyButton>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import * as yup from 'yup'
import ModalBase from '@/components/core/ModalBase.vue'
import FormInput from '@/components/core/FormInput.vue'
import MyButton from '../core/MyButton.vue'
import { type IAdminForm } from '@/interfaces/IAdmin'

export default {
  name: 'FormAdminModal',
  components: {
    ModalBase,
    FormInput,
    MyButton,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    dataForm: {
      type: Object,
    },
  },
  emits: ['onClose', 'onSave'],
  data() {
    return {
      form: {} as IAdminForm,
      errors: {} as IAdminForm,
      loading: false,
    }
  },
  watch: {
    dataForm() {
      this.form = { ...this.dataForm }
    },
  },
  methods: {
    async saveAdmin(values) {
      this.loading = true
      try {
        //contador de 5 segundos que dispara um erro
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log('saveAdmin', values)
        this.$emit('onSave', values)
        this.$snotify.success('Administrador salvo com sucesso!')
      } catch (error) {
        this.$snotify.error('Erro ao salvar o administrador: ' + error)
      } finally {
        this.loading = false
      }
    },
    validate(callback) {
      const schema = yup.object({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        password: this.form.id
          ? yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
          : yup
              .string()
              .min(6, 'Senha deve ter pelo menos 6 caracteres')
              .required('Senha é obrigatória'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          callback(this.form)
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    closeModal() {
      this.form = {} as IAdminForm
      this.errors = {} as IAdminForm
      this.$emit('onClose')
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
