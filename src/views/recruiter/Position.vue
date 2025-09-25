<template>
  <main>
    <section class="card">
      <header>
        <h1>Cargos</h1>
        <button class="rounded" @click="showFormPositionModal = true" title="Novo Cargo">
          <Icon icon="qlementine-icons:new-16" />
        </button>
      </header>
      <DataTable :items="filteredItems" :columns="columns" :loading="loading" :totalItems="total"
        @onSearch="handleSearch">
        <template #actions="{ item }">
          <button class="rounded success" @click="handleEditPosition(item)">
            <Icon icon="carbon:edit" />
          </button>
          <button class="rounded danger" @click="handleConfirmDelete(item)">
            <Icon icon="carbon:trash-can" />
          </button>
        </template>
      </DataTable>
    </section>
  </main>
  <FormPositionModal :show="showFormPositionModal" :dataForm="editItem" @onClose="closeAllModals" @onSave="refresh" />
  <DeletePositionModal :show="showDeletePositionModal" :dataForm="editItem" @onClose="closeAllModals"
    @onConfirm="refresh" />
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import FormPositionModal from '@/components/recruiter/FormPositionModal.vue'
import DeletePositionModal from '@/components/recruiter/DeletePositionModal.vue'
import { type IPositionItem, type IPositionColumnItem } from '@/interfaces/IPosition'
import { list } from '@/api/position'

export default {
  name: 'RecruiterPosition',
  components: {
    DataTable,
    Icon,
    FormPositionModal,
    DeletePositionModal,
  },
  data() {
    return {
      showFormPositionModal: false,
      showDeletePositionModal: false,
      loading: false,
      columns: [
        { key: 'name', title: 'Nome' },
        { key: 'status', title: 'Status', type: 'boolean' },
        { key: 'createdAt', title: 'Criado em', type: 'date' },
      ] as IPositionColumnItem[],
      items: [] as IPositionItem[],
      editItem: {} as IPositionItem,
      total: 0,
      search: '',
    }
  },
  mounted() {
    this.getPositions()
  },
  methods: {
    refresh() {
      this.items = []
      this.getPositions()
    },
    async getPositions() {
      this.closeAllModals()
      this.loading = true
      try {
        const { data } = await list()
        this.items = data
        this.total = data.length
      } catch (error) {
        this.$snotify.error('Erro ao buscar os cargos: ' + error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(el: string) {
      this.search = el
    },
    handleNewPosition() {
      this.editItem = {} as IPositionItem
      this.showFormPositionModal = true
    },
    handleEditPosition(item: IPositionItem) {
      this.editItem = item
      this.showFormPositionModal = true
    },
    handleConfirmDelete(item: IPositionItem) {
      this.editItem = item
      this.showDeletePositionModal = true
    },
    closeAllModals() {
      this.editItem = {} as IPositionItem
      this.showFormPositionModal = false
      this.showDeletePositionModal = false
    },
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
  }
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
