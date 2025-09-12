<template>
  <main>
    <section class="card">
      <header>
        <h1>Vagas</h1>
      </header>
      <DataTable :items="items" :columns="columns" :loading="loading" :totalItems="total" :totalPage="totalPage"
        :currentPage="page" @onSearch="handleSearch" @onNextPage="handleLoadMore(+1)"
        @onPreviousPage="handleLoadMore(-1)">
        <template #actions="{ item }">
          <RouterLink class="rounded primary" :to="{ name: 'supervisorVacancyDetail', params: { id: item.id } }"
            title="Ver Candidatos">
            <Icon icon="mdi:user" />
          </RouterLink>
          <RouterLink class="rounded primary" :to="{ name: 'jobDetail', params: { slug: item.slug } }" target="_blank"
            title="Compartilhar Vaga">
            <Icon icon="mdi:share" />
          </RouterLink>
        </template>
      </DataTable>
    </section>
  </main>
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import { type IVacancyItem, type IVacancyColumnItem } from '@/interfaces/IVacancy'
import { list } from '@/api/vacancy'

export default {
  name: 'SupervisorVacancy',
  components: {
    DataTable,
    Icon,
  },
  data() {
    return {
      loading: false,
      columns: [
        { key: 'title', title: 'Título' },
        { key: 'employmentType', title: 'Tipo de vaga' },
        { key: 'status', title: 'Status' },
        { key: 'expirationDate', title: 'Data de Expiração', type: 'date' },
      ] as IVacancyColumnItem[],
      items: [] as IVacancyItem[],
      total: 0,
      page: 1,
      totalPage: 0,
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
        const { data } = await list(this.filters)
        console.log(data);
        this.items = data.vacancies
        this.total = data.total
        this.totalPage = Math.ceil(data.total / data.rows)
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(search: string) {
      this.search = search
      this.page = 1
      this.items = []
      this.getVacancies()
    },
    handleLoadMore(pageChange: number) {
      this.page += pageChange
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
