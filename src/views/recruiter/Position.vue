<template>
  <main>
    <section class="card">
      <header>
        <h1>Cargos</h1>
        <button class="rounded" @click="showFormPositionModal = true" title="Novo Cargo">
          <Icon icon="qlementine-icons:new-16" />
        </button>
      </header>
      <DataTable :items="items" :columns="columns" :loading="loading" :total="items.length" :loadMore="loadMore"
        @onLoadMore="handleLoadMore" @onSearch="handleSearch">
        <template #actions="{ item }">
          <button v-if="item.status" class="rounded warning" @click="handleTogglePosition(item)" title="Pausar">
            <Icon icon="ic:round-pause" />
          </button>
          <button v-else class="rounded primary" @click="handleTogglePosition(item)" title="Ativar">
            <Icon icon="ic:round-play-arrow" />
          </button>
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
import { list, update } from '@/api/position'

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
      page: 1,
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
        const response = await list(this.filters)
        this.items.push(...response.data)
        this.total = response.data.total
      } catch (error) {
        this.$snotify.error('Erro ao buscar os cargos: ' + error)
      } finally {
        this.loading = false
      }
    },
    async handleTogglePosition(item: IPositionItem) {
      this.loading = true
      try {
        item.status = !item.status
        await update(item.id, { status: item.status })
        this.$snotify.success('Cargo atualizado com sucesso!')
      } catch (error) {
        this.$snotify.error('Erro ao atualizar o cargo: ' + error)
        item.status = !item.status
      } finally {
        this.loading = false
      }
    },
    handleSearch(el: string) {
      this.search = el
      this.page = 1
      this.items = []
      this.getPositions()
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
    handleLoadMore() {
      this.page += 1
      this.getPositions()
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
