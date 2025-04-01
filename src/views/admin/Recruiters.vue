<template>
  <main>
    <section class="card">
      <header>
        <h1>Recrutadores</h1>
        <button class="rounded" @click="showFormRecruiterModal = true">
          <Icon icon="tdesign:user-add"></Icon>
        </button>
      </header>
      <DataTable
        :items="items"
        :columns="columns"
        :loading="loading"
        :total="1"
        @onSearch="handleSearch"
      >
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
    :show="showFormRecruiterModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onSave="getRecruiters"
  />
  <DeleteRecruiterModal
    :show="showDeleteRecruiterModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onConfirm="getRecruiters"
  />
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import FormRecruiterModal from '@/components/admin/FormRecruiterModal.vue'
import DeleteRecruiterModal from '@/components/admin/DeleteRecruiterModal.vue'
import { type IRecruiterItem, type IRecruiterColumnItem } from '@/interfaces/IRecruiter'

export default {
  name: 'RecruiterController',
  components: {
    DataTable,
    Icon,
    FormRecruiterModal,
    DeleteRecruiterModal,
  },
  data() {
    return {
      showDeleteRecruiterModal: false,
      showFormRecruiterModal: false,
      loading: false,
      columns: [
        { key: 'name', title: 'Nome' },
        { key: 'email', title: 'Email' },
        { key: 'created', title: 'Criado em' },
      ] as IRecruiterColumnItem[],
      items: [] as IRecruiterItem[],
      editItem: {} as IRecruiterItem,
    }
  },
  mounted() {
    this.getRecruiters()
  },
  methods: {
    async getRecruiters() {
      this.closeAllModals()
      this.loading = true
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.items = [
          {
            id: 1,
            name: 'João',
            email: 'BZb3P@example.com',
            created: '2022-01-01',
          },
        ]
      } catch (error) {
        this.$snotify.error('Erro ao buscar os recrutadores: ' + error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(el: string) {
      console.log(el)
    },
    handleNewRecruiter() {
      this.editItem = {} as IRecruiterItem
      this.showFormRecruiterModal = true
    },
    handleEditRecruiter(item: IRecruiterItem) {
      this.editItem = item
      this.showFormRecruiterModal = true
    },
    handleConfirmDelete(item: IRecruiterItem) {
      this.editItem = item
      this.showDeleteRecruiterModal = true
    },
    closeAllModals() {
      this.editItem = {} as IRecruiterItem
      this.showFormRecruiterModal = false
      this.showDeleteRecruiterModal = false
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
