<template>
  <ModalBase :open="show" :loading="loading" title="Novo Curso" @onClose="$emit('onClose')">
    <template #content>
      <form @submit.prevent="validate">
        <FormInput
          label="Instituição"
          type="text"
          placeholder="Universidade do Estado de São Paulo"
          v-model="form.institutionName"
          :error="errors.institutionName"
          required
        />
        <FormInput
          label="Nome do Curso"
          type="text"
          placeholder="Ciência da Computação"
          v-model="form.courseName"
          :error="errors.courseName"
          required
        />

        <div class="flex">
          <FormInput
            label="Horas de Duração"
            type="number"
            v-model="form.durationHours"
            :error="errors.durationHours"
          />
          <FormInput
            label="Data de conclusão"
            type="date"
            v-model="form.completionDate"
            :error="errors.completionDate"
          />
        </div>

        <FormInput
          label="Url do Certificado"
          type="text"
          placeholder="https://example.com/certificado"
          v-model="form.certificateUrl"
          :error="errors.certificateUrl"
        />

        <textarea
          class="textarea"
          v-model="form.description"
          placeholder="Descrição do curso"
          rows="7"
        ></textarea>
      </form>
    </template>
    <template #actions>
      <MyButton class="btn success" :loading="loading" @click="validate">Salvar</MyButton>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import * as yup from 'yup'
import ModalBase from '../core/ModalBase.vue'
import MyButton from '../core/MyButton.vue'
import FormInput from '../core/FormInput.vue'
import { type ICoursesForm } from '@/interfaces/ICourses'
import { create, update } from '@/api/course'

export default {
  name: 'CoursesModal',
  components: { ModalBase, FormInput, MyButton },
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
      form: {} as ICoursesForm,
      errors: {} as ICoursesForm,
      loading: false,
    }
  },
  watch: {
    dataForm() {
      if (this.dataForm) {
        this.form = { ...this.form, ...this.dataForm }
      } else {
        this.form = {} as ICoursesForm
      }
    },
  },
  methods: {
    validate() {
      const schema = yup.object({
        institutionName: yup.string().required('Nome da instituição é obrigatório'),
        courseName: yup.string().required('Nome do curso é obrigatório'),
        durationHours: yup
          .number()
          .typeError('Duração deve ser um número')
          .positive('Duração deve ser um número positivo')
          .nullable(),
        completionDate: yup
          .date()
          .typeError('Data de conclusão deve ser uma data válida')
          .nullable(),
        certificateUrl: yup.string().url('URL do certificado deve ser uma URL válida').nullable(),
        description: yup.string().nullable(),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {} as ICoursesForm
          this.saveCourse()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async saveCourse() {
      this.loading = true
      try {
        const idEdit = !!this.form.id
        const uid = localStorage.getItem('uid')

        if (idEdit) {
          delete this.form.id
          delete this.form.createdAt
          delete this.form.updatedAt
          delete this.form.deletedAt
        }

        if (idEdit) {
          await update(uid, this.dataForm.id, this.form)
        } else {
          await create(uid, this.form)
        }

        this.$snotify.success(`Curso ${idEdit ? 'atualizada' : 'criada'} com sucesso`)
        this.$emit('onSave')
        this.closeModal()
      } catch (error) {
        this.$snotify.error('Erro ao salvar curso: ' + error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.form = {} as ICoursesForm
      this.errors = {} as ICoursesForm
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

  .flex {
    display: flex;
    gap: 1rem;

    main {
      flex: 1;
    }
  }
}
</style>
