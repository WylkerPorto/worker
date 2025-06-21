<template>
  <ModalBase :open="show" :loading="loading" title="Novo Recrutador" @onClose="closeModal">
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
import { type IRecruiterForm } from '@/interfaces/IRecruiter'
import { create, update } from '@/api/recruiter'

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
      form: {
        permission_id: 3,
      } as IRecruiterForm,
      errors: {} as IRecruiterForm,
      loading: false,
    }
  },
  watch: {
    dataForm() {
      if (this.dataForm) {
        this.form = { ...this.form, ...this.dataForm }
      }
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
          this.saveRecruiter()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async saveRecruiter() {
      this.loading = true
      try {
        const isEdit = !!this.form.id

        if (isEdit) {
          delete this.form.id
          delete this.form.createdAt
          delete this.form.updatedAt
        }

        if (isEdit && !this.form.password) {
          delete this.form.password
        }

        if (isEdit) {
          await update(this.dataForm.id, this.form)
        } else {
          await create(this.form)
        }
        this.$snotify.success(`Recrutador ${isEdit ? 'atualizado' : 'criado'} com sucesso`)
        this.$emit('onSave')
        this.closeModal()
      } catch (error) {
        this.$snotify.error('Erro ao salvar o recrutador: ' + error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.form = {
        permission_id: 3,
      } as IRecruiterForm
      this.errors = {} as IRecruiterForm
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
