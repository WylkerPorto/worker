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
          <button
            v-if="item.status"
            class="rounded warning"
            @click="handleToggleVacancy(item)"
            title="Pausar"
          >
            <Icon icon="ic:round-pause" />
          </button>
          <button v-else class="rounded primary" @click="handleToggleVacancy(item)" title="Ativar">
            <Icon icon="ic:round-play-arrow" />
          </button>
          <button class="rounded success" @click="handleEditVacancy(item)" title="Editar">
            <Icon icon="carbon:edit" />
          </button>
          <button class="rounded danger" @click="handleConfirmDelete(item)" title="Excluir">
            <Icon icon="carbon:trash-can" />
          </button>
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
import { list } from '@/api/vacancy'
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
      showDeleteVacancyModal: false,
      loading: false,
      columns: [
        { key: 'title', title: 'Título' },
        { key: 'employmentType', title: 'Tipo de vaga' },
        { key: 'createdAt', title: 'Criado em', type: 'date' },
      ] as IVacancyColumnItem[],
      items: [] as IVacancyItem[],
      editItem: {} as IVacancyItem,
      total: 0,
      page: 1,
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
</style>
