<template>
  <main class="container">
    <header>
      <RouterLink :to="{ name: 'home' }">
        <Icon icon="lets-icons:back" />
      </RouterLink>
      <h1>Detalhes da vaga</h1>
    </header>
    <section>
      <h2>{{ vacancy.title }}</h2>
      <div class="flex">
        <span><b>Criado em: </b>{{ toFormatDate(vacancy.createdAt) }}</span>
        <span><b>Data de expiração: </b>{{ toFormatDate(vacancy.expirationDate) }}</span>
      </div>
      <hr />
      <p><b>Modelo de trabalho: </b>{{ vacancy.workModel }} - {{ vacancy.employmentType }}</p>
      <p v-if="!vacancy.hideSalary"><b>Salário: </b>{{ vacancy.salary }}</p>
      <p><b>Local: </b>{{ vacancy.city }} - {{ vacancy.state }}</p>
      <hr />
      <h3>Detalhes da vaga</h3>
      <div v-html="vacancy.description"></div>
      <p><b>Conhecimentos:</b></p>
      <div v-html="vacancy.niceToHave"></div>
      <p><b>Responsabilidades:</b></p>
      <div v-html="vacancy.responsibilities"></div>
      <p><b>Requisitos:</b></p>
      <div v-html="vacancy.requirements"></div>
      <MyButton v-if="candidato" class="btn success" type="button" :loading="loading" @click="apply">
        Candidatar-se
      </MyButton>
      <RouterLink v-if="!logado" class="btn success" :to="{ name: 'login', query: { redirect: vacancy.id } }">
        Cadastre-se
      </RouterLink>
    </section>
  </main>
</template>
<script lang="ts">
import { Icon } from '@iconify/vue'
import { getBySlug } from '@/api/vacancy'
import { create as apply, update as remove } from '@/api/aplication'
import { type IVacancyItem } from '@/interfaces/IVacancy'
import { toFormatDate } from '@/utils/conversors'
import MyButton from '@/components/core/MyButton.vue'

export default {
  name: 'JobDetail',
  components: {
    Icon,
    MyButton,
  },
  data() {
    return {
      toFormatDate,
      vacancy: {} as IVacancyItem,
      loading: false,
    }
  },
  mounted() {
    this.getVacancy()
  },
  methods: {
    async getVacancy() {
      try {
        const response = await getBySlug(this.$route.params.slug)
        this.vacancy = response.data
      } catch (error) {
        this.$snotify.error(error.response.data.message)
      }
    },
    async apply() {
      this.loading = true
      try {
        await apply({ vacancyId: parseInt(this.vacancy.id), status: 'Candidatura Enviada' })
        this.$snotify.success('Vaga aplicada com sucesso!')
        this.vacancy.isApplied = true
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    async remove() {
      this.loading = true
      try {
        await remove(this.vacancy.applications[0].id, { vacancyId: parseInt(this.vacancy.id), status: 'Candidatura Retirada' })
        this.$snotify.success('Candidatura removida com sucesso!')
        this.vacancy.isApplied = false
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
  },
  computed: {
    logado() {
      return !!localStorage.getItem('login')
    },
    candidato() {
      return this.vacancy.status === 'Ativa' && !this.vacancy.isApplied && this.logado
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  background: var(--white);
  max-width: 80vw;
  margin: auto;

  header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--text);

    a {
      cursor: pointer;
      font-size: 25px;
    }

    h1 {
      margin: 0 auto;
    }
  }

  section {
    margin-top: 10px;

    h2 {
      font-size: 34px;
      margin-bottom: 10px;
      text-align: center;
    }

    .flex {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
    }

    hr {
      color: var(--white);
    }

    h3 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 10px;

      b {
        font-weight: bold;
      }
    }

    .btn {
      margin-top: 1rem;
    }
  }
}
</style>

<style>
section {
  div {
    margin-bottom: 1rem;

    ul {
      padding-left: 20px;
      list-style: disc;
      margin-bottom: 1rem;
    }

    ol {
      padding-left: 20px;
      list-style: decimal;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 0.8rem;
    }

    strong,
    b {
      font-weight: bold;
    }
  }
}
</style>
