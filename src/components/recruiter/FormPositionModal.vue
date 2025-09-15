<template>
  <ModalBase :open="show" :loading="loading" title="Novo Cargo" @onClose="closeModal">
    <template #content>
      <form @submit.prevent="validate">
        <FormInput label="Cargo" type="text" placeholder="Digite o cargo" v-model="form.name" :error="errors.name"
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
import { type IPositionForm } from '@/interfaces/IPosition'
import { create, update } from '@/api/position'

export default {
  name: 'FormPositionModal',
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
        name: yup.string().required('Cargo é obrigatório'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.savePosition()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async savePosition() {
      this.loading = true
      try {
        const isEdit = !!this.form.id

        if (isEdit) {
          delete this.form.id
          delete this.form.createdAt
          delete this.form.updatedAt
          delete this.form.deletedAt
        }

        if (isEdit) {
          await update(this.dataForm.id, this.form)
        } else {
          await create(this.form)
        }
        this.$snotify.success(`Cargo ${isEdit ? 'atualizado' : 'criado'} com sucesso`)
        this.$emit('onSave')
        this.closeModal()
      } catch (error) {
        this.$snotify.error('Erro ao salvar o cargo: ' + error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.form = {
        status: true,
      } as IPositionForm
      this.errors = {} as IPositionForm
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
