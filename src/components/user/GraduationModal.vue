<template>
  <ModalBase :open="show" :loading="loading" title="Nova Graduação" @onClose="$emit('onClose')">
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
          label="Curso"
          type="text"
          placeholder="Ciência da Computação"
          v-model="form.courseName"
          :error="errors.courseName"
          required
        />

        <MySelect
          label="Nível"
          :options="levelList"
          v-model="form.educationLevel"
          :error="errors.educationLevel"
          required
        />
        <MySelect
          label="Status"
          :options="statusList"
          v-model="form.status"
          :error="errors.status"
          required
        />

        <div class="flex">
          <FormInput
            label="Data de inicio"
            type="date"
            v-model="form.startDate"
            :error="errors.startDate"
            required
          />
          <FormInput
            label="Data de conclusão"
            type="date"
            v-model="form.endDate"
            :error="errors.endDate"
            required
          />
        </div>
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
import MySelect from '../core/MySelect.vue'
import { type IGraduationForm } from '@/interfaces/IGraduation'
import { create, update } from '@/api/graduation'
import { getEducationLevels, getEducationStatus } from '@/api/filters'

export default {
  name: 'GraduationModal',
  components: { ModalBase, FormInput, MyButton, MySelect },
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
      form: {} as IGraduationForm,
      errors: {} as IGraduationForm,
      loading: false,
      educationLevels: [],
      educationStatus: [],
    }
  },
  watch: {
    dataForm() {
      if (this.dataForm) {
        this.form = { ...this.form, ...this.dataForm }
      } else {
        this.form = {} as IGraduationForm
      }
    },
  },
  async mounted() {
    try {
      const levels = await getEducationLevels()
      const stats = await getEducationStatus()
      this.educationLevels = levels.data.map((level) => ({ id: level.title, title: level.title }))
      this.educationStatus = stats.data.map((status) => ({ id: status.title, title: status.title }))
    } catch (error) {
      this.$snotify.error('Erro ao carregar os níveis e status de educação: ' + error)
    }
  },
  methods: {
    validate() {
      const schema = yup.object({
        institutionName: yup.string().required('Nome da instituição é obrigatório'),
        courseName: yup.string().required('Nome do curso é obrigatório'),
        educationLevel: yup
          .string()
          .oneOf(
            this.educationLevels.map((level) => level.title),
            'Nível inválido',
          )
          .required('Nível é obrigatório'),
        status: yup
          .string()
          .oneOf(
            this.educationStatus.map((status) => status.title),
            'Status inválido',
          )
          .required('Status é obrigatório'),
        startDate: yup.string().required('Data de início é obrigatória'),
        endDate: yup.string().required('Data de conclusão é obrigatória'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.saveGraduation()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async saveGraduation() {
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

        this.$snotify.success(`Graduação ${idEdit ? 'atualizada' : 'criada'} com sucesso`)
        this.$emit('onSave')
        this.closeModal()
      } catch (error) {
        this.$snotify.error('Erro ao salvar a graduação: ' + error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.form = {} as IGraduationForm
      this.errors = {} as IGraduationForm
      this.$emit('onClose')
    },
  },
  computed: {
    levelList() {
      return this.educationLevels.map((level) => ({
        id: level.id,
        title: level.title,
      }))
    },
    statusList() {
      return this.educationStatus.map((status) => ({
        id: status.id,
        title: status.title,
      }))
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
