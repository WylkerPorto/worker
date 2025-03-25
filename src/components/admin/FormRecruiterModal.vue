<template>
  <ModalBase :open="show" title="Novo Administrador" @onClose="closeModal">
    <template #content>
      <form @submit.prevent="handleSubmit(saveRecruiter)">
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
      <MyButton class="btn success" :loading="loading" @click="handleSubmit(saveRecruiter)">
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

interface Form {
  name: string
  email: string
  password: string
}

export default {
  name: 'FormRecruiterModal',
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
      form: {} as Form,
      errors: {} as Form,
      loading: false,
    }
  },
  watch: {
    dataForm() {
      this.form = { ...this.dataForm }
    },
  },
  methods: {
    async saveRecruiter(values) {
      this.loading = true
      try {
        //contador de 5 segundos que dispara um erro
        await new Promise((resolve) => setTimeout(resolve, 5000))
        console.log('saveRecruiter', values)
        this.$emit('onSave', values)
        this.$snotify.success('Recrutador salvo com sucesso!')
      } catch (error) {
        this.$snotify.error('Erro ao salvar o recrutador: ' + error)
      } finally {
        this.loading = false
      }
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
