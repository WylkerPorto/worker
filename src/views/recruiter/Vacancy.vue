<template>
  <main>
    <section class="card">
      <header>
        <h1>Vagas</h1>
        <button
          class="rounded"
          @click="() => $router.push({ name: 'recruiterVacancyForm' })"
          title="Nova Vaga"
        >
          <Icon icon="qlementine-icons:new-16" />
        </button>
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
          <button class="rounded" @click="toggleDropdown($event, item.id)" title="Editar Status">
            <Icon icon="fluent:status-12-filled" />
          </button>
          <button class="rounded primary" @click="handleEditVacancy(item)" title="Ver Candidatos">
            <Icon icon="mdi:user" />
          </button>
          <button class="rounded success" @click="handleEditVacancy(item)" title="Editar">
            <Icon icon="carbon:edit" />
          </button>
          <button class="rounded danger" @click="handleConfirmDelete(item)" title="Excluir">
            <Icon icon="carbon:trash-can" />
          </button>
          <teleport to="body">
            <article v-if="openDropdownId === item.id" :style="dropdownStyles">
              <ul>
                <li
                  v-for="status in vacancyStatus"
                  @click="handleToggleVacancy(item, status.title)"
                  :key="status.id"
                >
                  {{ status.title }}
                </li>
              </ul>
            </article>
          </teleport>
        </template>
      </DataTable>
    </section>
    <DeleteVacancyModal
      :show="showDeleteVacancyModal"
      :dataForm="editItem"
      @onClose="closeAllModals"
      @onConfirm="refresh"
    />
  </main>
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import { type IVacancyItem, type IVacancyColumnItem } from '@/interfaces/IVacancy'
import { list, update } from '@/api/vacancy'
import { getVacancyStatus } from '@/api/filters'
import DeleteVacancyModal from '@/components/recruiter/DeleteVacancyModal.vue'

export default {
  name: 'RecruiterVacancy',
  components: {
    DataTable,
    DeleteVacancyModal,
    Icon,
  },
  data() {
    return {
      openDropdownId: null as number | null,
      dropdownStyles: {
        position: 'absolute',
        top: '0px',
        left: '0px',
      },
      showDeleteVacancyModal: false,
      loading: false,
      columns: [
        { key: 'title', title: 'Título' },
        { key: 'employmentType', title: 'Tipo de vaga' },
        { key: 'status', title: 'Status' },
        { key: 'expirationDate', title: 'Data de Expiração', type: 'date' },
      ] as IVacancyColumnItem[],
      items: [] as IVacancyItem[],
      editItem: {} as IVacancyItem,
      vacancyStatus: [] as string[],
      total: 0,
      page: 1,
      search: '',
    }
  },
  mounted() {
    this.getVacancies()
    this.getVacancyStatus()
  },
  methods: {
    refresh() {
      this.items = []
      this.getVacancies()
    },
    async getVacancyStatus() {
      try {
        const response = await getVacancyStatus()
        this.vacancyStatus = response.data
      } catch (error) {
        this.$snotify.error('Erro ao carregar status de vagas: ' + error)
      }
    },
    async getVacancies() {
      this.closeAllModals()
      this.loading = true
      try {
        const response = await list(this.filters)
        this.items.push(...response.data.vacancies)
        this.total = response.total
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(el: string) {
      this.search = el
      this.page = 1
      this.items = []
      this.getVacancies()
    },
    handleConfirmDelete(item: IVacancyItem) {
      this.editItem = item
      this.showDeleteVacancyModal = true
    },
    closeAllModals() {
      this.editItem = {} as IVacancyItem
      this.showDeleteVacancyModal = false
    },
    handleLoadMore() {
      this.page++
      this.getVacancies()
    },
    handleEditVacancy(item: IVacancyItem) {
      this.$router.push({ name: 'recruiterVacancyForm', params: { id: item.id } })
    },
    async handleToggleVacancy(item: IVacancyItem, status: string) {
      this.loading = true
      const oldStatus = item.status
      try {
        item.status = status
        const id = item.id
        delete item.id
        delete item.slug
        delete item.createdAt
        delete item.updatedAt
        delete item.deletedAt
        await update(id, item)
        this.$snotify.success('Vaga atualizada com sucesso!')
      } catch (error) {
        this.$snotify.error('Erro ao atualizar a vaga: ' + error)
        item.status = oldStatus
      } finally {
        this.openDropdownId = null
        this.loading = false
      }
    },
    toggleDropdown(event: Event, itemId: number | null) {
      const rect = event.target.getBoundingClientRect()
      this.dropdownStyles = {
        position: 'absolute',
        top: `${rect.bottom + window.scrollY + 10}px`,
        left: `${rect.left + window.scrollX - 30}px`,
      }
      this.openDropdownId = this.openDropdownId === itemId ? null : itemId
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

      button {
        background: none;
        border: none;
        color: var(--text);
        cursor: pointer;
        font-size: 25px;
      }
    }

    .actions {
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
