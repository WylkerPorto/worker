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
            class="rounded success"
            :to="{ name: 'vacancyEdit', params: { id: item.id } }"
            title="Editar"
          >
            <Icon icon="carbon:edit" />
          </RouterLink>

          <button class="rounded" @click="toggleDropdown($event, item)" title="Mais Ações">
            <Icon icon="tabler:dots" />
          </button>
        </template>
      </DataTable>
    </section>

    <article v-if="openDropdownItem" ref="dropdown" :style="dropdownStyles" class="dropdown-status">
      <ul>
        <li>
          <RouterLink
            :to="{ name: 'supervisorVacancyDetail', params: { id: openDropdownItem.id } }"
          >
            <Icon icon="mdi:user" />
            <span>Ver Candidatos</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            :to="{ name: 'jobDetail', params: { slug: openDropdownItem.slug } }"
            target="_blank"
          >
            <Icon icon="mdi:share" />
            <span>Compartilhar Vaga</span>
          </RouterLink>
        </li>

        <li>
          <button @click="handleTransferVacancy(openDropdownItem)">
            <Icon icon="carbon:follow-up-work-order" />
            <span>Transferir Vaga</span>
          </button>
        </li>

        <li>
          <button @click="handleViewLog(openDropdownItem)">
            <Icon icon="mdi:history" />
            <span>Ver Log</span>
          </button>
        </li>
      </ul>
    </article>
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
      openDropdownItem: null as IVacancyItem | null,
      dropdownStyles: {
        position: 'absolute',
        top: '0px',
        left: '0px',
      },
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
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
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
    toggleDropdown(event: Event, item: IVacancyItem) {
      const rect = (event.target as HTMLElement).getBoundingClientRect()

      // Toggle
      if (this.openDropdownItem === item) {
        this.openDropdownItem = null
        return
      }

      this.dropdownStyles = {
        position: 'absolute',
        top: `${rect.bottom + window.scrollY + 5}px`,
        left: `${rect.left + window.scrollX - 150}px`,
      }
      this.openDropdownItem = item
    },
    handleClickOutside(event: MouseEvent) {
      setTimeout(() => {
        const dropdown = this.$refs.dropdown as HTMLElement | undefined
        const target = event.target as Node
        const buttonClicked = (event.target as HTMLElement).closest('.actions')

        if (
          dropdown &&
          !dropdown.contains(target) &&
          !buttonClicked // garante que o botão também não foi clicado
        ) {
          this.openDropdownItem = null
        }
      }, 0)
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

    a,
    button {
      padding: 10px 20px;
      cursor: pointer;
      display: flex;
      gap: 10px;
      width: 100%;
      border: 0;
      color: var(--link);

      &:hover {
        background-color: var(--blue);
        color: white;
      }

      .iconify {
        font-size: 20px;
      }

      span {
        font-size: 16px;
      }
    }
  }
}
</style>
