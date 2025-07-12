<template>
  <ModalBase
    :open="show"
    :loading="loading"
    title="Nova Experiência Profissional"
    @onClose="$emit('onClose')"
  >
    <template #content>
      <form @submit.prevent="validate">
        <FormInput
          label="Cargo"
          type="text"
          placeholder="Nome do Cargo"
          v-model="form.position"
          :error="errors.position"
          required
        />
        <FormInput
          label="Departamento"
          type="text"
          placeholder="Nome do Departamento"
          v-model="form.department"
          :error="errors.department"
          required
        />
        <FormInput
          label="Empresa"
          type="text"
          placeholder="Nome da Empresa"
          v-model="form.company_name"
          :error="errors.company_name"
          required
        />
        <div class="flex">
          <FormInput
            label="Data de Início"
            type="date"
            v-model="form.start_date"
            :error="errors.start_date"
            required
          />
          <FormInput
            label="Data de Término"
            type="date"
            v-model="form.end_date"
            :error="errors.end_date"
          />
          <div class="switch">
            <label>Atualmente Trabalhando</label>
            <SwitchButton v-model="form.is_current_job" required />
          </div>
        </div>

        <div class="flex">
          <FormInput
            label="Tipo de Contratação"
            type="text"
            placeholder="full-time, part-time, freelance"
            v-model="form.employment_type"
            :error="errors.employment_type"
            required
          />
          <FormInput
            label="Salário"
            type="number"
            placeholder="Informe seu salário"
            v-model.number="form.salary"
            :error="errors.salary"
          />
        </div>

        <div>
          <textarea
            class="textarea"
            :class="{ error: errors.description }"
            v-model="form.description"
            placeholder="Descreva suas responsabilidades e conquistas"
            rows="5"
          ></textarea>
          <span>{{ errors.description }}</span>
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
import FormInput from '../core/FormInput.vue'
import MyButton from '../core/MyButton.vue'
import SwitchButton from '../core/SwitchButton.vue'
import { type IWorkForm } from '@/interfaces/IWork'
import { create, update } from '@/api/experience'

export default {
  name: 'WorkExperienceModal',
  components: { ModalBase, FormInput, MyButton, SwitchButton },
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
      form: {} as IWorkForm,
      errors: {} as IWorkForm,
      loading: false,
    }
  },
  watch: {
    dataForm() {
      if (this.dataForm) {
        this.form = { ...this.form, ...this.dataForm }
      } else {
        this.form = {
          is_current_job: false,
        } as IWorkForm
      }
    },
  },
  created() {
    // Initialize form with default values
    this.form = {
      is_current_job: false,
    } as IWorkForm
  },
  methods: {
    validate() {
      const schema = yup.object({
        position: yup.string().required('Cargo é obrigatório'),
        department: yup.string().required('Departamento é obrigatório'),
        company_name: yup.string().required('Empresa é obrigatória'),
        start_date: yup.date().required('Data de início é obrigatória'),
        end_date: yup
          .date()
          .nullable()
          .transform((value, originalValue) => {
            return originalValue === '' ? null : value
          }),
        description: yup.string().required('Descrição é obrigatória'),
        salary: yup.number().min(0, 'Salário deve ser um número positivo').nullable(),
        employment_type: yup.string().required('Tipo de contratação é obrigatório'),
        is_current_job: yup.boolean().required('Status de trabalho atual é obrigatório'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {} as IWorkForm
          this.saveWork()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async saveWork() {
      this.loading = true
      try {
        const isEdit = !!this.form.id
        const uid = localStorage.getItem('uid')

        if (isEdit) {
          delete this.form.id
          delete this.form.createdAt
          delete this.form.updatedAt
          delete this.form.deletedAt
        }

        if (isEdit) {
          await update(uid, this.dataForm.id, this.form)
        } else {
          await create(uid, this.form)
        }

        this.$snotify.success(`Experiência ${isEdit ? 'atualizada' : 'criada'} com sucesso!`)
        this.$emit('onSave')
        this.closeModal()
      } catch (error) {
        console.error('Erro ao salvar experiência:', error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.form = {
        is_current_job: false,
      } as IWorkForm
      this.errors = {} as IWorkForm
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

    .switch {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  span {
    color: var(--red);
    font-size: 0.8rem;
    margin-left: 15px;
  }
}
</style>
