<template>
  <main class="main">
    <section class="card">
      <header>
        <button class="rounded" @click="$router.push({ name: 'recruiterVacancy' })" title="Voltar">
          <Icon icon="lets-icons:back"></Icon>
        </button>
        <h1>Criar Vaga</h1>
      </header>

      <form @submit.prevent="validate">
        <FormInput label="Título" type="text" placeholder="Analista de Sistemas Sênior" v-model="form.title"
          :error="errors.title" required />
        <FormInput label="Descrição" type="text" placeholder="Descrição completa da vaga." v-model="form.description"
          :error="errors.description" required />
        <div class="flex">
          <MySelect label="Departamento" :options="departmentList" v-model="form.departmentId"
            :error="errors.departmentId" required />
          <MySelect label="Cargo" :options="positionList" v-model="form.positionId" :error="errors.positionId"
            required />
        </div>
        <FormInput label="Conhecimento Desejável" type="text" placeholder="Experiência com Docker, Kubernetes."
          v-model="form.niceToHave" :error="errors.niceToHave" required />
        <FormInput label="Responsabilidades" type="text" placeholder="Desenvolver APIs, integrar sistemas"
          v-model="form.responsibilities" :error="errors.responsibilities" required />
        <FormInput label="Requisitos" type="text" placeholder="Conhecimentos sólidos em NestJS, PostgreSQL."
          v-model="form.requirements" :error="errors.requirements" required />
        <div class="flex">
          <MySelect label="Modelo de Trabalho" :options="workModelList" v-model="form.workModel"
            :error="errors.workModel" required />
          <MySelect label="Tipo de Contratação" :options="employmentTypeList" v-model="form.employmentType"
            :error="errors.employmentType" required />
        </div>
        <div class="flex">
          <FormInput label="Validade" type="date" v-model="form.expirationDate" :error="errors.expirationDate" />
          <FormInput label="Salário (R$)" type="number" placeholder="5000" v-model.number="form.salary"
            :error="errors.salary" />
          <div class="column">
            <span>Esconder salário</span>
            <SwitchButton v-model="form.hideSalary" />
          </div>
        </div>
        <FormInput label="Cidade" type="text" placeholder="São Paulo" v-model="form.city" :error="errors.city" />
        <FormInput label="Estado" type="text" placeholder="SP" v-model="form.state" :error="errors.state" />

        <MyButton class="btn success" type="submit" :loading="loading"> Salvar Vaga </MyButton>
        <MyButton class="btn danger" @click="$router.push({ name: 'recruiterVacancy' })">
          Cancelar
        </MyButton>
      </form>
    </section>
  </main>
</template>
<script lang="ts">
import * as yup from 'yup'
import { Icon } from '@iconify/vue'
import MyButton from '@/components/core/MyButton.vue'
import MySelect from '@/components/core/MySelect.vue'
import FormInput from '@/components/core/FormInput.vue'
import SwitchButton from '@/components/core/SwitchButton.vue'
import { type IVacancyItem } from '@/interfaces/IVacancy'
import { create, get, update } from '@/api/vacancy'
import { list as getDepartments } from '@/api/department'
import { list as getPositions } from '@/api/position'
import { getWorkModels, getEmploymentTypes } from '@/api/filters'

export default {
  name: 'RecruiterVacancyCreate',
  components: {
    Icon,
    MyButton,
    MySelect,
    FormInput,
    SwitchButton,
  },
  data() {
    return {
      form: {
        hideSalary: false,
      } as IVacancyItem,
      errors: {} as IVacancyItem,
      loading: false,
      workModelList: [] as { id: string; title: string }[],
      employmentTypeList: [] as { id: string; title: string }[],
      departmentList: [] as { id: string; title: string }[],
      positionList: [] as { id: string; title: string }[],
    }
  },
  mounted() {
    if (this.isEditMode) {
      this.loadData(this.$route.params.id)
    }
    this.getFilters()
    this.form.recruiter = localStorage.getItem('uid')
  },
  methods: {
    validate() {
      const schema = yup.object().shape({
        title: yup.string().required('Título é obrigatório'),
        description: yup.string().required('Descrição é obrigatória'),
        niceToHave: yup.string(),
        responsibilities: yup.string(),
        requirements: yup.string(),
        workModel: yup.string().required('Modelo de trabalho é obrigatório'),
        employmentType: yup.string().required('Tipo de contratação é obrigatório'),
        salary: yup.number().min(0, 'Salário deve ser positivo').nullable(),
        hideSalary: yup.boolean(),
        city: yup.string().required('Cidade é obrigatória'),
        state: yup.string().required('Estado é obrigatório'),
        departmentId: yup.number().required('Departamento é obrigatório'),
        positionId: yup.number().required('Cargo é obrigatório'),
        expirationDate: yup.string().nullable(),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.saveVacancy()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async saveVacancy() {
      this.loading = true
      try {
        if (this.isEditMode) {
          delete this.form.id
          delete this.form.createdAt
          delete this.form.updatedAt
          delete this.form.deletedAt
          delete this.form.slug

          await update(this.$route.params.id, this.form)
        } else {
          await create(this.form)
        }
        this.$snotify.success(`Vaga ${this.isEditMode ? 'atualizada' : 'criada'} com sucesso!`)
        //this.$router.push({ name: 'recruiterVacancy' })
      } catch (error) {
        this.$snotify.error('Erro ao salvar a vaga: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    async getFilters() {
      try {
        const [
          workModelsResponse,
          employmentTypesResponse,
          departmentsResponse,
          positionsResponse,
        ] = await Promise.all([
          getWorkModels(),
          getEmploymentTypes(),
          getDepartments(),
          getPositions(),
        ])
        this.workModelList =
          workModelsResponse.data?.map((model: { id: string; title: string }) => ({
            id: model.title,
            title: model.title,
          })) || []
        this.employmentTypeList =
          employmentTypesResponse.data?.map((model: { id: string; title: string }) => ({
            id: model.title,
            title: model.title,
          })) || []
        this.departmentList =
          departmentsResponse.data?.map((dept: { id: string; name: string }) => ({
            id: dept.id,
            title: dept.name,
          })) || []
        this.positionList =
          positionsResponse.data?.map((pos: { id: string; name: string }) => ({
            id: pos.id,
            title: pos.name,
          })) || []
      } catch (error) {
        console.error('Error fetching filters:', error)
      }
    },
    async loadData(id: string) {
      this.loading = true
      try {
        const response = await get(id)
        this.form = response.data
        this.form.departmentId = this.form.department.id
        this.form.positionId = this.form.position.id
        delete this.form.department
        delete this.form.position
      } catch (error) {
        if (error.response.status === 404) {
          this.$snotify.error('Vaga não encontrada')
          this.$router.push({ name: 'recruiterVacancy' })
        }
      } finally {
        this.loading = false
      }
    },
  },
  computed: {
    isEditMode() {
      return !!this.$route.params.id
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .card {
    width: 100%;
    max-width: 800px;

    header {
      display: flex;
      align-items: center;
      color: var(--text);
      border-bottom: 1px solid var(--border);
      margin-bottom: 1rem;

      h1 {
        margin: 0 auto;
      }

      button {
        background: none;
        border: none;
        color: var(--text);
        cursor: pointer;

        svg {
          width: 24px;
          height: 24px;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }

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

        .column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;

          span {
            font-size: 14px;
            color: var(--secondary);
          }
        }
      }
    }
  }
}
</style>
