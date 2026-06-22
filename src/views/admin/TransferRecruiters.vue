<template>
  <main>
    <section class="card">
      <header>
        <h1>Transferir Recrutadores</h1>
      </header>
      <DataTable
        :items="items"
        :columns="columns"
        :loading="loading"
        :totalItems="total"
        :totalPage="totalPage"
        :currentPage="page"
        @onSearch="handleSearch"
        @onNextPage="handleLoadMore(+1)"
        @onPreviousPage="handleLoadMore(-1)"
      >
        <template #actions="{ item }">
          <button
            class="rounded success"
            @click="handleLinkRecruiter(item)"
            title="Transferir Recrutador"
          >
            <Icon icon="material-symbols:group-add-outline-rounded"></Icon>
          </button>
        </template>
      </DataTable>
    </section>
  </main>
  <LinkRecruiterModal
    :show="showLinkRecruiterModal"
    :dataForm="editItem"
    @onClose="closeAllModals"
    @onConfirm="refresh"
  />
</template>
<script lang="ts">
import { list } from '@/api/recruiter'
import LinkRecruiterModal from '@/components/admin/LinkRecruiterModal.vue'
import DataTable from '@/components/core/DataTable.vue'
import { type IRecruiterColumnItem, type IRecruiterItem } from '@/interfaces/IRecruiter'
import { Icon } from '@iconify/vue'

export default {
  name: 'RecruiterFreeController',
  components: {
    DataTable,
    Icon,
    LinkRecruiterModal,
  },
  data() {
    return {
      showLinkRecruiterModal: false,
      loading: false,
      columns: [
        { key: 'name', title: 'Nome' },
        { key: 'email', title: 'Email' },
        { key: 'createdAt', title: 'Criado em', type: 'date' },
      ] as IRecruiterColumnItem[],
      items: [] as IRecruiterItem[],
      editItem: {} as IRecruiterItem,
      total: 0,
      page: 1,
      totalPage: 0,
      search: '',
    }
  },
  mounted() {
    this.getRecruiters()
  },
  methods: {
    refresh() {
      this.items = []
      this.getRecruiters()
    },
    async getRecruiters() {
      this.closeAllModals()
      this.loading = true
      try {
        const { data } = await list(this.filters)
        this.items = data
        this.total = data.length //data.total
        this.totalPage = 0 //Math.ceil(data.total / data.per_page)
      } catch (error) {
        this.$snotify.error('Erro ao buscar os recrutadores: ' + error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(el: string) {
      this.search = el
      this.page = 1
      this.items = []
      this.getRecruiters()
    },
    handleLinkRecruiter(item: IRecruiterItem) {
      this.editItem = item
      this.showLinkRecruiterModal = true
    },
    closeAllModals() {
      this.editItem = {} as IRecruiterItem
      this.showLinkRecruiterModal = false
    },
    handleLoadMore(pageChange: number) {
      this.page += pageChange
      this.getRecruiters()
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
