<template>
  <ModalBase :open="show" :loading="loading" title="Nova Escolaridade" @onClose="$emit('onClose')">
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
import { type IGraduationForm, educationLevels, educationStatus } from '@/interfaces/IGraduation'
import { create, update } from '@/api/graduation'

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
        institutionName: yup.string().required('Nome da instituição é obrigatório'),
        courseName: yup.string().required('Nome do curso é obrigatório'),
        educationLevel: yup
          .string()
          .oneOf(Object.values(educationLevels), 'Nível inválido')
          .required('Nível é obrigatório'),
        status: yup
          .string()
          .oneOf(Object.values(educationStatus), 'Status inválido')
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
      return Object.keys(educationLevels).map((key) => {
        return {
          id: key,
          title: educationLevels[key],
        }
      })
    },
    statusList() {
      return Object.keys(educationStatus).map((key) => {
        return {
          id: key,
          title: educationStatus[key],
        }
      })
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
