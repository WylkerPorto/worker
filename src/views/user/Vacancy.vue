<template>
  <main class="container">
    <header>
      <h1>Vagas disponiveis</h1>
      <form @submit.stop.prevent="handleSearch">
        <SearchInput v-model="search" />
      </form>
    </header>
    <section>
      <div class="card" v-for="item in items" :key="item.id">
        <article>
          <h2>{{ item.title }}</h2>
          <p>{{ item.employmentType }} - {{ item.workModel }} - {{ item.expirationDate }}</p>
        </article>

        <button class="btn primary" @click="handleApply(item.id)">Candidatar-se</button>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import SearchInput from '@/components/core/SearchInput.vue'
import { type IVacancyItem } from '@/interfaces/IVacancy'
import { list as getVacancy } from '@/api/vacancy'
import { create } from '@/api/aplication'

export default {
  name: 'UserVacancy',
  components: {
    SearchInput,
  },
  data() {
    return {
      loading: false,
      items: [] as IVacancyItem[],
      total: 0,
      page: 1,
      search: '',
    }
  },
  mounted() {
    this.getVacancies()
  },
  methods: {
    async getVacancies() {
      this.loading = true
      try {
        const response = await getVacancy(this.filters)
        this.items.push(...response.data.vacancies)
        this.total = response.total
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.page = 1
      this.items = []
      this.getVacancies()
    },
    handleLoadMore() {
      this.page += 1
      this.getVacancies()
    },
    async handleApply(vacancyId: number) {
      try {
        await create({ vacancyId, status: 'applied' })
        this.$snotify.success('Vaga aplicada com sucesso')
      } catch (error) {
        this.$snotify.error(error.response.data.statusCode === 409 ? 'Vaga ja aplicada' : error)
      }
    },
  },
  computed: {
    filters() {
      return {
        page: this.page,
        search: this.search,
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 90vw;
  margin: auto;

  header {
    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }

    form {
      width: fit-content;
      margin: 0 0 0 auto;
    }
  }

  section {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    flex: 1;
    padding: 1rem;
    background-color: var(--glass);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 1rem;

    .card {
      height: auto;
      flex: 1 1 300px;
      max-width: 350px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid var(--border);

      article {
        h2 {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
