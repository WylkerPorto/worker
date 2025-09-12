<template>
  <main>
    <section class="card">
      <header>
        <h1>Setores</h1>
        <button class="rounded" @click="showFormDepartmentModal = true" title="Novo Setor">
          <Icon icon="qlementine-icons:new-16" />
        </button>
      </header>
      <DataTable :items="filteredItems" :columns="columns" :loading="loading" :totalItems="total"
        @onSearch="handleSearch">
        <template #actions="{ item }">
          <button v-if="item.status" class="rounded warning" @click="handleToggleDepartment(item)" title="Pausar">
            <Icon icon="ic:round-pause" />
          </button>
          <button v-else class="rounded primary" @click="handleToggleDepartment(item)" title="Ativar">
            <Icon icon="ic:round-play-arrow" />
          </button>
          <button class="rounded success" @click="handleEditDepartment(item)">
            <Icon icon="carbon:edit" />
          </button>
          <button class="rounded danger" @click="handleConfirmDelete(item)">
            <Icon icon="carbon:trash-can" />
          </button>
        </template>
      </DataTable>
    </section>
  </main>
  <FormDepartmentModal :show="showFormDepartmentModal" :dataForm="editItem" @onClose="closeAllModals"
    @onSave="refresh" />
  <DeleteDepartmentModal :show="showDeleteDepartmentModal" :dataForm="editItem" @onClose="closeAllModals"
    @onConfirm="refresh" />
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import FormDepartmentModal from '@/components/recruiter/FormDepartmentModal.vue'
import DeleteDepartmentModal from '@/components/recruiter/DeleteDepartmentModal.vue'
import { type IDepartmentItem, type IDepartmentColumnItem } from '@/interfaces/IDepartment'
import { list, update } from '@/api/department'

export default {
  name: 'RecruiterDepartment',
  components: {
    DataTable,
    Icon,
    FormDepartmentModal,
    DeleteDepartmentModal,
  },
  data() {
    return {
      showFormDepartmentModal: false,
      showDeleteDepartmentModal: false,
      loading: false,
      columns: [
        { key: 'name', title: 'Nome' },
        { key: 'status', title: 'Status', type: 'boolean' },
        { key: 'createdAt', title: 'Criado em', type: 'date' },
      ] as IDepartmentColumnItem[],
      items: [] as IDepartmentItem[],
      editItem: {} as IDepartmentItem,
      total: 0,
      search: '',
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    refresh() {
      this.items = []
      this.getDepartments()
    },
    async getDepartments() {
      this.closeAllModals()
      this.loading = true
      try {
        const { data } = await list(this.filters)
        this.items = data
        this.total = data.length
      } catch (error) {
        this.$snotify.error('Erro ao buscar os setor: ' + error)
      } finally {
        this.loading = false
      }
    },
    async handleToggleDepartment(item: IDepartmentItem) {
      this.loading = true
      try {
        item.status = !item.status
        await update(item.id, { status: item.status })
        this.$snotify.success('Setor atualizado com sucesso!')
      } catch (error) {
        this.$snotify.error('Erro ao atualizar o setor: ' + error)
        item.status = !item.status
      } finally {
        this.loading = false
      }
    },
    handleSearch(el: string) {
      this.search = el
    },
    handleNewDepartment() {
      this.editItem = {} as IDepartmentItem
      this.showFormDepartmentModal = true
    },
    handleEditDepartment(item: IDepartmentItem) {
      this.editItem = item
      this.showFormDepartmentModal = true
    },
    handleConfirmDelete(item: IDepartmentItem) {
      this.editItem = item
      this.showDeleteDepartmentModal = true
    },
    closeAllModals() {
      this.editItem = {} as IDepartmentItem
      this.showFormDepartmentModal = false
      this.showDeleteDepartmentModal = false
    },
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      )
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
