<template>
  <main>
    <section class="card">
      <header>
        <h1>Candidatos a vaga {{ vaga.title }}</h1>
        <span>{{ vaga.workModel }} - {{ vaga.employmentType }}</span>
        <div v-html="vaga.description"></div>
      </header>
      <DataTable :items="items" :columns="columns" :loading="loading" :total="total" :loadMore="loadMore"
        @onLoadMore="handleLoadMore" @onSearch="handleSearch">
      </DataTable>
    </section>
  </main>
</template>
<script lang="ts">
import { getAplicationsByVacancy } from '@/api/aplication'
import { get } from '@/api/vacancy'
import DataTable from '@/components/core/DataTable.vue'
import { type IVacancyItem } from '@/interfaces/IVacancy'

export default {
  name: 'AplicationsVacancy',
  components: {
    DataTable,
  },
  data() {
    return {
      vaga: {} as IVacancyItem,
      items: [],
      columns: [
        { key: 'person.name', title: 'Nome' },
        { key: 'person.email', title: 'Email' },
        { key: 'status', title: 'Estado' },
        { key: 'createdAt', title: 'Criado em', type: 'date' },
      ],
      loading: false,
      total: 0,
      page: 1,
      search: '',
    }
  },
  mounted() {
    this.getAplicationsByVacancy()
    this.getVacancyDetail()
  },
  methods: {
    async getAplicationsByVacancy() {
      this.loading = true
      try {
        const response = await getAplicationsByVacancy(this.$route.params.id, this.filters)
        this.items.push(...response.data.data)
        this.total = response.data.meta.total
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    async getVacancyDetail() {
      this.loading = true
      try {
        const response = await get(this.$route.params.id)
        this.vaga = response.data
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    handleLoadMore() {
      this.page++
      this.getAplicationsByVacancy()
    },
    handleSearch(search: string) {
      this.search = search
      this.page = 1
      this.items = []
      this.getAplicationsByVacancy()
    }
  },
  computed: {
    filters() {
      return {
        page: this.page,
        search: this.search,
      }
    },
    loadMore() {
      return this.page < this.total
    },
  },
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    width: 100%;
    max-width: 80vw;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--text);

      h1 {
        margin: 0;
      }
    }

    .actions {

      button,
      a {
        padding: 5px;
        border: none;
        display: flex;

        .iconify {
          font-size: 15px;
        }
      }
    }
  }
}

article {
  background: var(--background);
  border: 1px solid var(--text);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 10px 20px;
      cursor: pointer;

      &:hover {
        background-color: var(--blue);
        color: white;
      }
    }
  }
}
</style>
