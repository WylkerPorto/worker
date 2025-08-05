<template>
  <main>
    <section class="card">
      <header>
        <h1>Candidatos a vaga {{ vaga.title }}</h1>
      </header>
      <DataTable
        :items="items"
        :columns="columns"
        :loading="loading"
        :total="total"
        :loadMore="loadMore"
        @onLoadMore="handleLoadMore"
        @onSearch="handleSearch"
      >
        <template #actions="{ item }">
          <RouterLink
            class="rounded primary"
            :to="{ name: 'recruiterCandidateDetail', params: { id: item.person.id } }"
            title="Ver Candidato"
            target="_blank"
          >
            <Icon icon="mdi:user" />
          </RouterLink>
        </template>
      </DataTable>
    </section>
  </main>
</template>
<script lang="ts">
import { getAplicationsByVacancy } from '@/api/aplication'
import { get } from '@/api/vacancy'
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import { type IVacancyItem } from '@/interfaces/IVacancy'

export default {
  name: 'AplicationsVacancy',
  components: {
    DataTable,
    Icon,
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
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--text);

      h1 {
        margin: 0;
      }
    }

    .actions {
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
</style>
