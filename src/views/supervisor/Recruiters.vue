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
        :total="total"
        :loadMore="loadMore"
        @onLoadMore="handleLoadMore"
        @onSearch="handleSearch"
      >
        <template #createdAt="{ item }">
          <p>{{ item }}</p>
        </template>
        <template #actions="{ item }">
          <button class="rounded success" @click="handleEditRecruiter(item)">
            <Icon icon="carbon:edit"></Icon>
          </button>
          <button class="rounded danger" @click="handleConfirmDelete(item)">
            <Icon icon="carbon:trash-can"></Icon>
          </button>
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
  <DeleteRecruiterModal
    :show="showDeleteRecruiterModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onConfirm="refresh"
  />
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import FormRecruiterModal from '@/components/supervisor/FormRecruiterModal.vue'
import DeleteRecruiterModal from '@/components/supervisor/DeleteRecruiterModal.vue'
import { type IRecruiterItem, type IRecruiterColumnItem } from '@/interfaces/IRecruiter'
import { list } from '@/api/recruiter'

export default {
  name: 'SupervisorController',
  components: {
    DataTable,
    Icon,
    FormRecruiterModal,
    DeleteRecruiterModal,
  },
  data() {
    return {
      showDeleteRecruiterModal: false,
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
        const response = await list(this.filters)
        this.items.push(...response.data.data)
        this.total = response.data.total
      } catch (error) {
        this.$snotify.error('Erro ao buscar os recrutadores: ' + error)
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
    handleConfirmDelete(item: IRecruiterItem) {
      this.editItem = item
      this.showDeleteRecruiterModal = true
    },
    closeAllModals() {
      this.editItem = {} as IRecruiterItem
      this.showRecruiterModal = false
      this.showDeleteRecruiterModal = false
    },
    handleLoadMore() {
      this.page += 1
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
