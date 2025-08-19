<template>
  <main class="container">
    <header>
      <h1>Vagas disponiveis {{ total }}</h1>
      <form @submit.stop.prevent="handleSearch">
        <SearchInput v-model="search" />
      </form>
    </header>
    <section>
      <div class="card" v-for="item in items" :key="item.id">
        <h2>{{ item.title }}</h2>
        <article>
          <p>
            <Icon icon="solar:point-on-map-bold" /> {{ item.city }} - {{ item.state }}
          </p>
          <p>
            <Icon icon="material-symbols:home-work" /> {{ item.employmentType }}
          </p>
          <p>
            <Icon icon="ic:baseline-work" /> {{ item.workModel }}
          </p>
          <p>
            <Icon icon="solar:calendar-bold" /> {{ toFormatDate(item.expirationDate) }}
          </p>
        </article>

        <RouterLink class="btn primary" :to="{ name: 'userVacancyDetail', params: { id: item.id } }" target="_blank">
          Detalhes
        </RouterLink>
      </div>
    </section>
    <MyButton @click="handleLoadMore" v-if="loadMore">Carregar mais</MyButton>
  </main>
</template>

<script lang="ts">
import SearchInput from '@/components/core/SearchInput.vue'
import { type IVacancyItem } from '@/interfaces/IVacancy'
import { list as getVacancy } from '@/api/vacancy'
import { Icon } from '@iconify/vue'
import { toFormatDate } from '@/utils/conversors'
import MyButton from '@/components/core/MyButton.vue'

export default {
  name: 'UserVacancy',
  components: {
    SearchInput,
    MyButton,
    Icon,
  },
  data() {
    return {
      toFormatDate,
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
        this.total = response.data?.total
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
  },
  computed: {
    filters() {
      return {
        page: this.page,
        search: this.search,
      }
    },
    loadMore() {
      return this.items.length < this.total
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
  background-color: var(--glass);
  margin-top: 10px;

  header {
    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }

    form {
      width: fit-content;
      margin: 0 20px 0 auto;
    }
  }

  section {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    flex: 1;
    padding: 1rem;
    border-radius: 0.5rem;
    gap: 1rem;
    justify-content: space-evenly;

    .card {
      height: auto;
      flex: 1 1 300px;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid var(--border);

      &:hover {
        box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
      }

      h2 {
        text-wrap: balance;
        word-wrap: anywhere;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      article {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem; // opcional, para espaçamento entre os <p>

        p {
          flex: 1 1 calc(50% - 0.5rem); // 2 por linha
          max-width: 50%;
        }
      }

      .btn {
        text-align: center;
      }
    }
  }

  button {
    margin-bottom: 30px;
  }
}
</style>
