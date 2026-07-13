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
        :totalItems="total"
        :totalPage="totalPage"
        :currentPage="page"
        nested="recruiters"
        :nestedColumns="nestedColumn"
        @onSearch="handleSearch"
        @onNextPage="handleLoadMore(+1)"
        @onPreviousPage="handleLoadMore(-1)"
      >
        <template #actions="{ item }">
          <button class="rounded success" @click="handleEditSupervisor(item)">
            <Icon icon="carbon:edit"></Icon>
          </button>
          <button class="rounded danger" @click="handleConfirmDelete(item)">
            <Icon icon="carbon:trash-can"></Icon>
          </button>
          <button
            class="rounded success"
            @click="handleTransferRecruiter(item)"
            title="Transferir Recrutador"
          >
            <Icon icon="material-symbols:group-add-outline-rounded"></Icon>
          </button>
        </template>
      </DataTable>
    </section>
  </main>
  <FormSupervisorModal
    :show="showFormSupervisorModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onSave="refresh"
  />
  <DeleteSupervisorModal
    :show="showDeleteSupervisorModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onConfirm="refresh"
  />
  <TransferRecruiterModal
    :show="showTransferRecruiterModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onConfirm="refresh"
  />
</template>
<script lang="ts">
import { hierarchy } from '@/api/supervisor'
import DeleteSupervisorModal from '@/components/admin/DeleteSupervisorModal.vue'
import FormSupervisorModal from '@/components/admin/FormSupervisorModal.vue'
import TransferRecruiterModal from '@/components/admin/TransferRecruiterModal.vue'
import DataTable from '@/components/core/DataTable.vue'
import type { IRecruiterItem } from '@/interfaces/IRecruiter'
import { type ISupervisorColumnItem, type ISupervisorItem } from '@/interfaces/ISupervisor'
import { Icon } from '@iconify/vue'

export default {
  name: 'SupervisorController',
  components: {
    DataTable,
    Icon,
    FormSupervisorModal,
    DeleteSupervisorModal,
    TransferRecruiterModal,
  },
  data() {
    return {
      showDeleteSupervisorModal: false,
      showFormSupervisorModal: false,
      showTransferRecruiterModal: false,
      loading: false,
      columns: [
        { key: 'name', title: 'Nome' },
        { key: 'email', title: 'Email' },
      ] as ISupervisorColumnItem[],
      nestedColumn: ['name', 'email'],
      items: [] as ISupervisorItem[],
      editItem: {} as ISupervisorItem,
      total: 0,
      page: 1,
      totalPage: 0,
      search: '',
    }
  },
  mounted() {
    this.getSupervisors()
  },
  methods: {
    refresh() {
      this.items = []
      this.getSupervisors()
    },
    async getSupervisors() {
      this.closeAllModals()
      this.loading = true
      try {
        const { data } = await hierarchy(this.filters)
        this.items = data.data
        this.total = data.total //data.total
        this.totalPage = Math.ceil(data.total / data.per_page)
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
      this.showTransferRecruiterModal = false
    },
    handleLoadMore(pageChange: number) {
      this.page += pageChange
      this.getSupervisors()
    },
    handleTransferRecruiter(item: IRecruiterItem) {
      this.editItem = item
      this.showTransferRecruiterModal = true
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
