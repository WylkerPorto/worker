<template>
  <main class="main">
    <section class="card">
      <header>
        <button class="rounded" @click="$router.push({ name: 'recruiterVacancy' })" title="Voltar">
          <Icon icon="lets-icons:back"></Icon>
        </button>
        <h1>Criar Vaga</h1>
      </header>
    </section>

    <form class="card" @submit.prevent="validate">
      <FormInput
        label="Título"
        type="text"
        placeholder="Analista de Sistemas Sênior"
        v-model="form.title"
        :error="errors.title"
        required
      />
      <FormInput
        label="Descrição"
        type="text"
        placeholder="Descrição completa da vaga."
        v-model="form.description"
        :error="errors.description"
        required
      />
      <FormInput
        label="Conhecimento Desejável"
        type="text"
        placeholder="Experiência com Docker, Kubernetes."
        v-model="form.niceToHave"
        :error="errors.niceToHave"
        required
      />
      <FormInput
        label="Responsabilidades"
        type="text"
        placeholder="Desenvolver APIs, integrar sistemas"
        v-model="form.responsibilities"
        :error="errors.responsibilities"
        required
      />
      <FormInput
        label="Requisitos"
        type="text"
        placeholder="Conhecimentos sólidos em NestJS, PostgreSQL."
        v-model="form.requirements"
        :error="errors.requirements"
        required
      />
      <div class="flex">
        <MySelect
          label="Modelo de Trabalho"
          :options="workModelList"
          v-model="form.workModel"
          :error="errors.workModel"
          required
        />
        <MySelect
          label="Tipo de Contratação"
          :options="employmentTypeList"
          v-model="form.employmentType"
          :error="errors.employmentType"
          required
        />
      </div>
      <div class="flex">
        <FormInput label="Validade" type="date" v-model="form.validate" :error="errors.validate" />
        <FormInput
          label="Salário (R$)"
          type="number"
          placeholder="5000"
          v-model.number="form.salary"
          :error="errors.salary"
        />
        <div class="column">
          <span>Esconder salário</span>
          <SwitchButton v-model="form.hideSalary" />
        </div>
      </div>
      <FormInput
        label="Cidade"
        type="text"
        placeholder="São Paulo"
        v-model="form.city"
        :error="errors.city"
      />
      <FormInput
        label="Estado"
        type="text"
        placeholder="SP"
        v-model="form.state"
        :error="errors.state"
      />

      <MyButton
        class="btn success"
        :loading="loading"
        @click.prevent.stop.prevent="$emit('onSave')"
      >
        Salvar Vaga
      </MyButton>
      <MyButton class="btn danger" @click="$router.push({ name: 'recruiterVacancy' })">
        Cancelar
      </MyButton>
    </form>
  </main>
</template>
<script lang="ts">
import * as yup from 'yup'
import { Icon } from '@iconify/vue'
import MyButton from '@/components/core/MyButton.vue'
import MySelect from '@/components/core/MySelect.vue'
import FormInput from '@/components/core/FormInput.vue'
import SwitchButton from '@/components/core/SwitchButton.vue'
import { type IVacancyItem, workModels, employmentTypes } from '@/interfaces/IVacancy'
import { save } from '@/api/vacancy'

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
      form: {} as IVacancyItem,
      errors: {} as IVacancyItem,
      loading: false,
    }
  },
  mounted() {
    this.form.recruiter = localStorage.getItem('uid')
    console.log('workModelList', this.workModelList)
    console.log('employmentTypeList', this.employmentTypeList)
  },
  methods: {
    validate() {
      return false
    },
  },
  computed: {
    workModelList() {
      return Object.entries(workModels).map(([key, value]) => ({
        id: key,
        title: value,
      }))
    },
    employmentTypeList() {
      return Object.entries(employmentTypes).map(([key, value]) => ({
        id: key,
        title: value,
      }))
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
</style>
