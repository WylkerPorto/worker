<template>
  <ModalBase :open="show" title="Novo Administrador" @onClose="closeModal">
    <template #content>
      <form @submit.prevent="handleSubmit(saveAdmin)">
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
      <button class="btn success" @click="handleSubmit(saveAdmin)">Salvar</button>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import * as yup from 'yup'
import ModalBase from '@/components/core/ModalBase.vue'
import FormInput from '@/components/core/FormInput.vue'

interface Form {
  name: string
  email: string
  password: string
}

export default {
  name: 'FormAdminModal',
  components: {
    ModalBase,
    FormInput,
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
      form: {} as Form,
      errors: {} as Form,
    }
  },
  watch: {
    dataForm() {
      this.form = { ...this.dataForm }
    },
  },
  methods: {
    async saveAdmin(values) {
      console.log('saveAdmin', values)
      this.$emit('onSave', values)
      this.$snotify.success('Hello, world!')
    },
    handleSubmit(callback) {
      const schema = yup.object({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        password: yup
          .string()
          .min(6, 'Senha deve ter pelo menos 6 caracteres')
          .required('Senha é obrigatória'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
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
      this.form = {} as Form
      this.errors = {} as Form
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
