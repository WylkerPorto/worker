<template>
  <main>
    <section class="card">
      <header>
        <h1>Recrutadores</h1>
        <button class="rounded">
          <Icon icon="tdesign:user-add"></Icon>
        </button>
      </header>
      <DataTable :items="items" :columns="columns" :total="1" @onSearch="handleSearch">
        <template #actions="{ item }" v-if="item">
          <button class="rounded success">
            <Icon icon="carbon:edit"></Icon>
          </button>
          <button class="rounded danger">
            <Icon icon="carbon:trash-can"></Icon>
          </button>
        </template>
      </DataTable>
    </section>
  </main>
  <FormRecruiterModal
    :show="showFormRecruiterModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
  />
  <DeleteAlertModal :show="showAlertModal" :userName="editItem?.name" @onClose="closeAllModals" />
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import FormRecruiterModal from '@/components/admin/FormRecruiterModal.vue'
import DeleteAlertModal from '@/components/admin/DeleteAdminModal.vue'
import { IRecruiter } from '@/interfaces/IRecruiter'

interface Column {
  key: string
  title: string
}

export default {
  name: 'RecruiterController',
  components: {
    DataTable,
    Icon,
    FormRecruiterModal,
    DeleteAlertModal,
  },
  data() {
    return {
      showAlertModal: false,
      showFormRecruiterModal: false,
      columns: [
        { key: 'name', title: 'Nome' },
        { key: 'email', title: 'Email' },
        { key: 'created', title: 'Criado em' },
      ] as Column[],
      items: [] as IRecruiter[],
      editItem: {} as IRecruiter,
    }
  },
  methods: {
    handleSearch(el: string) {
      console.log(el)
    },
    handleNewRecruiter() {
      this.editItem = {} as Item
      this.showFormRecruiterModal = true
    },
    handleEditRecruiter(item: Item) {
      this.editItem = item
      this.showFormRecruiterModal = true
    },
    handleConfirmDelete(item: Item) {
      this.editItem = item
      this.showAlertModal = true
    },
    closeAllModals() {
      this.editItem = {} as Item
      this.showFormRecruiterModal = false
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
