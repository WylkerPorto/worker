<template>
  <main>
    <section class="card">
      <header>
        <h1>Logs do Sistema</h1>
      </header>
      <DataTable
        :items="items"
        :columns="columns"
        :loading="loading"
        :total="1"
        @onSearch="handleSearch"
      >
        <template #actions="{ item }">
          <button class="rounded primary" @click="showViewLogItem(item)">
            <Icon icon="lsicon:view-outline" />
          </button>
        </template>
      </DataTable>
    </section>
  </main>
  <FormViewLogModal
    :show="showFormViewLogModal"
    :dataForm="editItem"
    @onClose="showFormViewLogModal = false"
  />
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import FormViewLogModal from '@/components/admin/FormViewLogModal.vue'
import { type ILogItem, type ILogColumnItem } from '@/interfaces/ILog'

export default {
  name: 'LogsController',
  components: {
    DataTable,
    Icon,
    FormViewLogModal,
  },
  data() {
    return {
      showFormViewLogModal: false,
      loading: false,
      columns: [
        { title: '#', key: 'id' },
        { title: 'Tipo', key: 'type' },
        { title: 'Criado', key: 'createdAt', type: 'date' },
      ] as ILogColumnItem[],
      items: [] as ILogItem[],
      editItem: {} as ILogItem,
    }
  },
  mounted() {
    this.getLogs()
  },
  methods: {
    async getLogs() {
      this.showFormViewLogModal = false
      this.loading = true
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.items = [
          {
            id: 1,
            type: 'Login',
            created: '2022-01-01',
          },
        ]
      } catch (error) {
        this.$snotify.error('Erro ao buscar os logs: ' + error)
      } finally {
        this.loading = false
      }
    },
    showViewLogItem(item: ILogItem) {
      this.editItem = item
      this.showFormViewLogModal = true
    },
    handleSearch(value: string) {
      console.log('handleSearch', value)
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
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--text);

      h1 {
        margin: 0;
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
