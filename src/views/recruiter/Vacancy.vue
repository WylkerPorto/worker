<template>
  <main>
    <section class="card">
      <header>
        <h1>Vagas</h1>
        <button class="rounded" @click="() => $router.push({ name: 'recruiterVacancyForm' })" title="Nova Vaga">
          <Icon icon="qlementine-icons:new-16" />
        </button>
      </header>
      <DataTable :items="items" :columns="columns" :loading="loading" :totalItems="total" :totalPage="totalPage"
        :currentPage="page" @onSearch="handleSearch" @onNextPage="handleLoadMore(+1)"
        @onPreviousPage="handleLoadMore(-1)">
        <template #actions="{ item }">
          <button class="rounded" @click="toggleDropdown($event, item)" title="Editar Status">
            <Icon icon="fluent:status-12-filled" />
          </button>
          <RouterLink class="rounded primary" :to="{ name: 'jobDetail', params: { slug: item.slug } }" target="_blank"
            title="Compartilhar Vaga">
            <Icon icon="mdi:share" />
          </RouterLink>
          <RouterLink class="rounded warning" :to="{ name: 'recruiterVacancyDetail', params: { id: item.id } }"
            title="Ver Candidatos">
            <Icon icon="mdi:user" />
          </RouterLink>
          <button class="rounded light" @click="handleCloneVacancy(item)" title="Duplicar">
            <Icon icon="zondicons:duplicate" />
          </button>
          <RouterLink class="rounded success" :to="{ name: 'recruiterVacancyForm', params: { id: item.id } }"
            title="Editar">
            <Icon icon="carbon:edit" />
          </RouterLink>
          <button class="rounded danger" @click="handleConfirmDelete(item)" title="Excluir">
            <Icon icon="carbon:trash-can" />
          </button>
        </template>
      </DataTable>
    </section>
    <article v-if="openDropdownItem" ref="dropdown" :style="dropdownStyles" class="dropdown-status">
      <ul>
        <li v-for="status in vacancyStatus" :key="status.id"
          @click="handleToggleVacancy(openDropdownItem, status.title)">
          {{ status.title }}
        </li>
      </ul>
    </article>
    <DeleteVacancyModal :show="showDeleteVacancyModal" :dataForm="editItem" @onClose="closeAllModals"
      @onConfirm="refresh" />
  </main>
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import { type IVacancyItem, type IVacancyColumnItem } from '@/interfaces/IVacancy'
import { list, update, create } from '@/api/vacancy'
import { getVacancyStatus } from '@/api/filters'
import DeleteVacancyModal from '@/components/recruiter/DeleteVacancyModal.vue'

export default {
  name: 'RecruiterVacancy',
  components: {
    DataTable,
    DeleteVacancyModal,
    Icon,
  },
  data() {
    return {
      openDropdownItem: null as IVacancyItem | null,
      dropdownStyles: {
        position: 'absolute',
        top: '0px',
        left: '0px',
      },
      showDeleteVacancyModal: false,
      loading: false,
      columns: [
        { key: 'title', title: 'Título' },
        { key: 'employmentType', title: 'Tipo de vaga' },
        { key: 'status', title: 'Status' },
        { key: 'expirationDate', title: 'Data de Expiração', type: 'date' },
      ] as IVacancyColumnItem[],
      items: [] as IVacancyItem[],
      editItem: {} as IVacancyItem,
      vacancyStatus: [] as string[],
      total: 0,
      page: 1,
      totalPage: 0,
      search: '',
    }
  },
  mounted() {
    this.getVacancies()
    this.getVacancyStatus()
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    refresh() {
      this.items = []
      this.getVacancies()
    },
    async getVacancyStatus() {
      try {
        const response = await getVacancyStatus()
        this.vacancyStatus = response.data
      } catch (error) {
        this.$snotify.error('Erro ao carregar status de vagas: ' + error)
      }
    },
    async getVacancies() {
      this.closeAllModals()
      this.loading = true
      try {
        const { data } = await list(this.filters)
        this.items = data.vacancies
        this.total = data.total
        this.totalPage = Math.ceil(data.total / data.rows)
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(el: string) {
      this.search = el
      this.page = 1
      this.items = []
      this.getVacancies()
    },
    handleConfirmDelete(item: IVacancyItem) {
      this.editItem = item
      this.showDeleteVacancyModal = true
    },
    closeAllModals() {
      this.editItem = {} as IVacancyItem
      this.showDeleteVacancyModal = false
    },
    handleLoadMore(pageChange: number) {
      this.page += pageChange
      this.getVacancies()
    },
    async handleToggleVacancy(item: IVacancyItem, status: string) {
      this.loading = true
      const newItem = { ...item }
      try {
        newItem.status = status
        delete newItem.id
        delete newItem.slug
        delete newItem.createdAt
        delete newItem.position
        delete newItem.department
        await update(item.id, newItem)
        this.$snotify.success('Vaga atualizada com sucesso!')
        this.refresh()
      } catch (error) {
        this.$snotify.error('Erro ao atualizar a vaga: ' + error)
      } finally {
        this.openDropdownItem = null
        this.loading = false
      }
    },
    toggleDropdown(event: Event, item: IVacancyItem) {
      const rect = (event.target as HTMLElement).getBoundingClientRect()

      // Toggle
      if (this.openDropdownItem === item) {
        this.openDropdownItem = null
        return
      }

      this.dropdownStyles = {
        position: 'absolute',
        top: `${rect.bottom + window.scrollY + 10}px`,
        left: `${rect.left + window.scrollX - 30}px`,
      }
      this.openDropdownItem = item
    },
    handleClickOutside(event: MouseEvent) {
      setTimeout(() => {
        const dropdown = this.$refs.dropdown as HTMLElement | undefined
        const target = event.target as Node
        const buttonClicked = (event.target as HTMLElement).closest('.actions')

        if (
          dropdown &&
          !dropdown.contains(target) &&
          !buttonClicked // garante que o botão também não foi clicado
        ) {
          this.openDropdownItem = null
        }
      }, 0)
    },
    async handleCloneVacancy(item: IVacancyItem) {
      this.loading = true
      const newItem = { ...item }
      try {
        newItem.title += '-copia'
        newItem.departmentId = item.department.id
        newItem.positionId = item.position.id
        delete newItem.id
        delete newItem.slug
        delete newItem.createdAt
        delete newItem.position
        delete newItem.department
        await create(newItem)
        this.$snotify.success('Vaga duplicada com sucesso!')
        this.refresh()
      } catch (error) {
        this.$snotify.error('Erro ao duplicar a vaga: ' + error)
      } finally {
        this.loading = false
      }
    },
  },
  computed: {
    filters() {
      return {
        page: this.page,
        search: this.search,
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

      button,
      a {
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

article {
  background: var(--background);
  border: 1px solid var(--text);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 10px 20px;
      cursor: pointer;

      &:hover {
        background-color: var(--blue);
        color: white;
      }
    }
  }
}
</style>
