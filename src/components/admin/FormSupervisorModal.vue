<template>
  <ModalBase :open="show" :loading="loading" title="Novo Supervisor" @onClose="closeModal">
    <template #content>
      <form @submit.prevent="validate">
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
      <MyButton class="btn success" :loading="loading" @click="validate"> Salvar </MyButton>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import * as yup from 'yup'
import ModalBase from '@/components/core/ModalBase.vue'
import FormInput from '@/components/core/FormInput.vue'
import MyButton from '../core/MyButton.vue'
import { type ISupervisorForm } from '@/interfaces/ISupervisor'

export default {
  name: 'FormSupervisorModal',
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
      form: {} as ISupervisorForm,
      errors: {} as ISupervisorForm,
      loading: false,
    }
  },
  watch: {
    dataForm() {
      this.form = { ...this.dataForm }
    },
  },
  methods: {
    validate() {
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
          this.saveSupervisor()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async saveSupervisor() {
      this.loading = true
      try {
        //contador de 5 segundos que dispara um erro
        await new Promise((resolve) => setTimeout(resolve, 5000))
        console.log('saveSupervisor', this.form)
        this.$emit('onSave', this.form)
        this.$snotify.success('Supervisor salvo com sucesso!')
      } catch (error) {
        this.$snotify.error('Erro ao salvar o supervisor: ' + error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.form = {} as ISupervisorForm
      this.errors = {} as ISupervisorForm
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
