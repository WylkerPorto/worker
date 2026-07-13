<template>
  <main>
    <section class="card">
      <header>
        <h1>Vagas</h1>
      </header>
      <DataTable
        :items="items"
        :columns="columns"
        :loading="loading"
        :totalItems="total"
        :totalPage="totalPage"
        :currentPage="page"
        @onSearch="handleSearch"
        @onNextPage="handleLoadMore(+1)"
        @onPreviousPage="handleLoadMore(-1)"
      >
        <template #actions="{ item }">
          <RouterLink
            class="rounded primary"
            :to="{ name: 'supervisorVacancyDetail', params: { id: item.id } }"
            title="Ver Candidatos"
          >
            <Icon icon="mdi:user" />
          </RouterLink>
          <RouterLink
            class="rounded success"
            :to="{ name: 'jobDetail', params: { slug: item.slug } }"
            target="_blank"
            title="Compartilhar Vaga"
          >
            <Icon icon="mdi:share" />
          </RouterLink>
          <button
            class="rounded warning"
            @click="handleTransferVacancy(item)"
            title="Transferir Vaga"
          >
            <Icon icon="carbon:follow-up-work-order" />
          </button>
          <button class="rounded secondary" @click="handleViewLog(item)" title="Ver Log">
            <Icon icon="mdi:history" />
          </button>
        </template>
      </DataTable>
    </section>
  </main>
  <TransferVacancyModal
    :show="showTransferVacancyModal"
    :dataForm="selectedVacancy"
    @onClose="closeAllModals"
    @onConfirm="refresh"
  />
  <VacancyLogModal
    :show="showVacancyLogModal"
    :dataForm="selectedVacancy"
    @onClose="closeAllModals"
  />
</template>
<script lang="ts">
import { list } from '@/api/vacancy'
import DataTable from '@/components/core/DataTable.vue'
import TransferVacancyModal from '@/components/supervisor/TransferVacancyModal.vue'
import VacancyLogModal from '@/components/supervisor/VacancyLogModal.vue'
import { type IVacancyColumnItem, type IVacancyItem } from '@/interfaces/IVacancy'
import { Icon } from '@iconify/vue'

export default {
  name: 'SupervisorVacancy',
  components: {
    DataTable,
    Icon,
    TransferVacancyModal,
    VacancyLogModal,
  },
  data() {
    return {
      showTransferVacancyModal: false,
      showVacancyLogModal: false,
      loading: false,
      columns: [
        { key: 'title', title: 'Título' },
        { key: 'employmentType', title: 'Tipo de vaga' },
        { key: 'status', title: 'Status' },
        { key: 'expirationDate', title: 'Data de Expiração', type: 'date' },
      ] as IVacancyColumnItem[],
      items: [] as IVacancyItem[],
      selectedVacancy: {} as IVacancyItem,
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
    refresh() {
      this.items = []
      this.getVacancies()
    },
    async getVacancies() {
      this.loading = true
      try {
        const { data } = await list(this.filters)
        console.log(data)
        this.items = data.vacancies
        this.total = data.total
        this.totalPage = Math.ceil(data.total / data.rows)
      } catch (error) {
        this.$snotify.error('Erro ao buscar vagas: ' + error.response.data.message)
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
    handleTransferVacancy(item: IVacancyItem) {
      this.selectedVacancy = item
      this.showTransferVacancyModal = true
    },
    handleViewLog(item: IVacancyItem) {
      this.selectedVacancy = item
      this.showVacancyLogModal = true
    },
    closeAllModals() {
      this.selectedVacancy = {} as IVacancyItem
      this.showTransferVacancyModal = false
      this.showVacancyLogModal = false
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
      a,
      button {
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
