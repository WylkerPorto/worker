<template>
  <ModalBase :open="show" :loading="loading" title="Novo Setor" @onClose="closeModal">
    <template #content>
      <form @submit.prevent="validate">
        <FormInput label="Setor" type="text" placeholder="Digite o setor" v-model="form.name" :error="errors.name"
          required />
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
import { type IDepartmentForm } from '@/interfaces/IDepartment'
import { create, update } from '@/api/department'

export default {
  name: 'FormDepartmentModal',
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
        status: true,
      } as IPositionForm,
      errors: {} as IPositionForm,
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
        name: yup.string().required('Setor é obrigatório'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.saveDepartment()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async saveDepartment() {
      this.loading = true
      try {
        const isEdit = !!this.form.id

        if (isEdit) {
          delete this.form.id
          delete this.form.createdAt
          delete this.form.updatedAt
          delete this.form.deletedAt

          await update(this.dataForm.id, this.form)
        } else {
          await create(this.form)
        }
        this.$snotify.success(`Setor ${isEdit ? 'atualizado' : 'criado'} com sucesso`)
        this.$emit('onSave')
        this.closeModal()
      } catch (error) {
        this.$snotify.error('Erro ao salvar o setor: ' + error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.form = {
        status: true,
      } as IDepartmentForm
      this.errors = {} as IDepartmentForm
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
