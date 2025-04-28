<template>
  <main>
    <section class="card">
      <header>
        <h1>Supervisores</h1>
        <button class="rounded" @click="showFormSupervisorModal = true">
          <Icon icon="tdesign:user-add"></Icon>
        </button>
      </header>
      <DataTable
        :items="items"
        :columns="columns"
        :loading="loading"
        :total="total"
        :loadMore="loadMore"
        @onSearch="handleSearch"
      >
        <template #actions="{ item }">
          <button class="rounded success" @click="handleEditSupervisor(item)">
            <Icon icon="carbon:edit"></Icon>
          </button>
          <button class="rounded danger" @click="handleConfirmDelete(item)">
            <Icon icon="carbon:trash-can"></Icon>
          </button>
        </template>
      </DataTable>
    </section>
  </main>
  <FormSupervisorModal
    :show="showFormSupervisorModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onSave="getSupervisors"
  />
  <DeleteSupervisorModal
    :show="showDeleteSupervisorModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onConfirm="getSupervisors"
  />
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import FormSupervisorModal from '@/components/admin/FormSupervisorModal.vue'
import DeleteSupervisorModal from '@/components/admin/DeleteSupervisorModal.vue'
import { type ISupervisorItem, type ISupervisorColumnItem } from '@/interfaces/ISupervisor'
import { list } from '@/api/user'

export default {
  name: 'SupervisorController',
  components: {
    DataTable,
    Icon,
    FormSupervisorModal,
    DeleteSupervisorModal,
  },
  data() {
    return {
      showDeleteSupervisorModal: false,
      showFormSupervisorModal: false,
      loading: false,
      columns: [
        { key: 'name', title: 'Nome' },
        { key: 'email', title: 'Email' },
        { key: 'created', title: 'Criado em' },
      ] as ISupervisorColumnItem[],
      items: [] as ISupervisorItem[],
      editItem: {} as ISupervisorItem,
      total: 0,
      page: 1,
      search: '',
    }
  },
  mounted() {
    this.getSupervisors()
  },
  methods: {
    async getSupervisors() {
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
      this.getSupervisors()
    },
    handleNewSupervisor() {
      this.editItem = {} as ISupervisorItem
      this.showFormSupervisorModal = true
    },
    handleEditSupervisor(item: ISupervisorItem) {
      this.editItem = item
      this.showFormSupervisorModal = true
    },
    handleConfirmDelete(item: ISupervisorItem) {
      this.editItem = item
      this.showDeleteSupervisorModal = true
    },
    closeAllModals() {
      this.editItem = {} as ISupervisorItem
      this.showFormSupervisorModal = false
      this.showDeleteSupervisorModal = false
    },
    handleLoadMore() {
      this.page += 1
      this.getSupervisors()
    },
  },
  computed: {
    filters() {
      return {
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
