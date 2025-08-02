<template>
  <main class="container">
    <header>
      <RouterLink :to="{ name: 'userVacancy' }">
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
      <p>{{ vacancy.description }}</p>
      <p><b>Conhecimentos:</b></p>
      <p>{{ vacancy.niceToHave }}</p>
      <p><b>Responsabilidades:</b></p>
      <p>{{ vacancy.responsibilities }}</p>
      <p><b>Requisitos:</b></p>
      <p>{{ vacancy.requirements }}</p>
      <MyButton
        v-if="vacancy.status === 'Ativa'"
        class="btn success"
        type="button"
        :loading="loading"
        @click="apply"
      >
        Aplicar
      </MyButton>
    </section>
  </main>
</template>
<script lang="ts">
import { Icon } from '@iconify/vue'
import { get } from '@/api/vacancy'
import { create as apply } from '@/api/aplication'
import { type IVacancyItem } from '@/interfaces/IVacancy'
import { toFormatDate } from '@/utils/conversors'
import MyButton from '@/components/core/MyButton.vue'

export default {
  name: 'UserVacancyDetail',
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
        const response = await get(this.$route.params.id)
        this.vacancy = response.data
      } catch (error) {
        this.$snotify.error(error.response.data.message)
      }
    },
    async apply() {
      this.loading = true
      try {
        await apply({ vacancyId: parseInt(this.$route.params.id), status: 'applied' })
        this.$snotify.success('Vaga aplicada com sucesso!')
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
  },
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
  }
}
</style>
