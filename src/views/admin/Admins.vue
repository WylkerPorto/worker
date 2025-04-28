<template>
  <main>
    <section class="card">
      <header>
        <h1>Administradores</h1>
        <button class="rounded" @click="showFormAdminModal = true">
          <Icon icon="tdesign:user-add" />
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
          <button class="rounded success" @click="handleEditAdmin(item)">
            <Icon icon="carbon:edit" />
          </button>
          <button class="rounded danger" @click="handleConfirmDelete(item)">
            <Icon icon="carbon:trash-can" />
          </button>
        </template>
      </DataTable>
    </section>
  </main>
  <FormAdminModal
    :show="showFormAdminModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onSave="getAdmins"
  />
  <DeleteAdminModal
    :show="showDeleteAdminModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onConfirm="getAdmins"
  />
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import FormAdminModal from '@/components/admin/FormAdminModal.vue'
import DeleteAdminModal from '@/components/admin/DeleteAdminModal.vue'
import { type IAdminItem, type IAdminColumnItem } from '@/interfaces/IAdmin'
import { list } from '@/api/user'

export default {
  name: 'AdminController',
  components: {
    DataTable,
    Icon,
    FormAdminModal,
    DeleteAdminModal,
  },
  data() {
    return {
      showFormAdminModal: false,
      showDeleteAdminModal: false,
      loading: false,
      columns: [
        { title: 'Nome', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Criado', key: 'createdAt', type: 'date' },
      ] as IAdminColumnItem[],
      items: [] as IAdminItem[],
      editItem: {} as IAdminItem,
      total: 0,
      page: 1,
      search: '',
    }
  },
  mounted() {
    this.getAdmins()
  },
  methods: {
    async getAdmins() {
      this.closeAllModals()
      this.loading = true
      try {
        const response = await list(this.filters)
        this.items.push(...response.data.data)
        this.total = response.data.total
      } catch (error) {
        this.$snotify.error('Erro ao buscar os administradores: ' + error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(el: string) {
      this.search = el
      this.page = 1
      this.getAdmins()
    },
    handleNewAdmin() {
      this.editItem = {} as IAdminItem
      this.showFormAdminModal = true
    },
    handleEditAdmin(item: IAdminItem) {
      this.editItem = item
      this.showFormAdminModal = true
    },
    handleConfirmDelete(item: IAdminItem) {
      this.editItem = item
      this.showDeleteAdminModal = true
    },
    closeAllModals() {
      this.editItem = {} as IAdminItem
      this.showFormAdminModal = false
      this.showDeleteAdminModal = false
    },
    handleLoadMore() {
      this.page += 1
      this.getAdmins()
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
