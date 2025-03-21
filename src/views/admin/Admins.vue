<template>
  <main>
    <section class="card">
      <header>
        <h1>Administradores</h1>
        <button class="rounded" @click="showFormAdminModal = true">
          <Icon icon="tdesign:user-add" />
        </button>
      </header>
      <DataTable :items="items" :columns="columns" :total="1">
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
  <FormAdminModal :show="showFormAdminModal" :dataForm="editItem" @onClose="closeAllModals" />
  <DeleteAlertModal :show="showAlertModal" :userName="editItem.name" @onClose="closeAllModals" />
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import FormAdminModal from '@/components/admin/FormAdminModal.vue'
import DeleteAlertModal from '@/components/admin/DeleteAlertModal.vue'

interface Column {
  title: string
  key: string
}

interface Item {
  name: string
  email: string
  created: string
}

export default {
  name: 'AdminController',
  components: {
    DataTable,
    Icon,
    FormAdminModal,
    DeleteAlertModal,
  },
  data() {
    return {
      showFormAdminModal: false,
      showAlertModal: false,
      columns: [
        { title: 'Nome', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Criado', key: 'created' },
      ] as Column[],
      items: [
        {
          name: 'Admin',
          email: 'tRZQs@example.com',
          created: '10/10/2020',
        },
      ] as Item[],
      editItem: {} as Item,
    }
  },
  mounted() {},
  methods: {
    handleNewAdmin() {
      this.editItem = {} as Item
      this.showFormAdminModal = true
    },
    handleEditAdmin(item: Item) {
      this.editItem = item
      this.showFormAdminModal = true
    },
    handleConfirmDelete(item: Item) {
      this.editItem = item
      this.showAlertModal = true
    },
    closeAllModals() {
      this.editItem = {} as Item
      this.showFormAdminModal = false
      this.showAlertModal = false
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

        .iconify {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
