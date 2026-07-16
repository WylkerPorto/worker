<template>
  <main>
    <section class="card">
      <header>
        <h1>Recrutadores</h1>
        <button class="rounded" @click="showRecruiterModal = true">
          <Icon icon="tdesign:user-add"></Icon>
        </button>
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
        <template #createdAt="{ item }">
          <p>{{ item }}</p>
        </template>
        <template #actions="{ item }">
          <button class="rounded success" @click="handleEditRecruiter(item)">
            <Icon icon="carbon:edit"></Icon>
          </button>
          <RouterLink :to="{ name: 'adminRecruiterKpi', query: { recruiterId: item.id } }">
            <button class="rounded primary">
              <Icon icon="ix:kpi"></Icon>
            </button>
          </RouterLink>
        </template>
      </DataTable>
    </section>
  </main>
  <FormRecruiterModal
    :show="showRecruiterModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onSave="refresh"
  />
</template>
<script lang="ts">
import { list } from '@/api/recruiter'
import DataTable from '@/components/core/DataTable.vue'
import FormRecruiterModal from '@/components/supervisor/FormRecruiterModal.vue'
import { type IRecruiterColumnItem, type IRecruiterItem } from '@/interfaces/IRecruiter'
import { Icon } from '@iconify/vue'

export default {
  name: 'AdminRecruitersController',
  components: {
    DataTable,
    Icon,
    FormRecruiterModal,
  },
  data() {
    return {
      showRecruiterModal: false,
      loading: false,
      columns: [
        { key: 'name', title: 'Nome' },
        { key: 'email', title: 'Email' },
        { key: 'createdAt', title: 'Criado em', type: 'date' },
      ] as IRecruiterColumnItem[],
      items: [] as IRecruiterItem[],
      editItem: {} as IRecruiterItem,
      total: 0,
      page: 1,
      totalPage: 0,
      search: '',
    }
  },
  mounted() {
    this.getRecruiters()
  },
  methods: {
    refresh() {
      this.items = []
      this.getRecruiters()
    },
    async getRecruiters() {
      this.closeAllModals()
      this.loading = true
      try {
        const { data } = await list(this.filters)
        this.items = data
        this.total = data.length
        this.totalPage = Math.ceil(data.length / data.per_page)
      } catch (error) {
        this.$snotify.error('Erro ao buscar os recrutadores: ' + error.response.data.message)
      } finally {
        this.loading = false
      }
    },
    handleSearch(el: string) {
      this.search = el
      this.page = 1
      this.items = []
      this.getRecruiters()
    },
    handleNewSupervisor() {
      this.editItem = {} as IRecruiterItem
      this.showRecruiterModal = true
    },
    handleEditRecruiter(item: IRecruiterItem) {
      this.editItem = item
      this.showRecruiterModal = true
    },
    closeAllModals() {
      this.editItem = {} as IRecruiterItem
      this.showRecruiterModal = false
      this.showDeleteRecruiterModal = false
    },
    handleLoadMore(pageChange: number) {
      this.page += pageChange
      this.getRecruiters()
    },
  },
  computed: {
    filters() {
      return {
        // rule: 1,
        page: this.page,
        filter: this.search,
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
