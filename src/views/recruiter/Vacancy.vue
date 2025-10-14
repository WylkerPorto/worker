<template>
  <main>
    <section class="card">
      <header>
        <h1>Vagas</h1>
        <button class="rounded" @click="() => $router.push({ name: 'recruiterVacancyForm' })" title="Nova Vaga">
          <Icon icon="qlementine-icons:new-16" />
        </button>
      </header>
      <div class="filters">
        <MyButton class="btn primary" v-for="stt in vacancyStatus" :key="stt.id" @click="handleChangeFilter(stt.title)">
          {{ stt.title }}s
        </MyButton>
      </div>
      <DataTable :items="items" :columns="columns" :loading="loading" :totalItems="total" :totalPage="totalPage"
        :currentPage="page" @onSearch="handleSearch" @onNextPage="handleLoadMore(+1)"
        @onPreviousPage="handleLoadMore(-1)">
        <template #actions="{ item }">
          <RouterLink class="rounded success" :to="{ name: 'recruiterVacancyForm', params: { id: item.id } }"
            title="Editar">
            <Icon icon="carbon:edit" />
          </RouterLink>
          <button class="rounded" @click="toggleDropdown($event, item)" title="Mais Ações">
            <Icon icon="tabler:dots" />
          </button>
        </template>
      </DataTable>
    </section>
    <article v-if="openDropdownItem" ref="dropdown" :style="dropdownStyles" class="dropdown-status">
      <ul>
        <li @click="toogleStatus = !toogleStatus">
          <Icon icon="fluent:status-12-filled" />
          <span>Alterar Status</span>
        </li>

        <li v-show="toogleStatus" v-for="status in vacancyStatus" :key="status.id"
          @click="handleToggleVacancy(openDropdownItem, status.title)">
          {{ status.title }}
        </li>

        <li @click="openNewTab(openDropdownItem.slug)">
          <Icon icon="mdi:share" />
          <span>Compartilhar Vaga</span>
        </li>

        <li @click="openLink(openDropdownItem.id)">
          <Icon icon="mdi:user" />
          <span>Ver Candidatos</span>
        </li>

        <li @click="handleCloneVacancy(openDropdownItem)">
          <Icon icon="zondicons:duplicate" />
          <span>Duplicar Vaga</span>
        </li>

        <li @click="handleConfirmDelete(openDropdownItem)">
          <Icon icon="carbon:trash-can" />
          <span>Excluir Vaga</span>
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
import MyButton from '@/components/core/MyButton.vue'

export default {
  name: 'RecruiterVacancy',
  components: {
    DataTable,
    DeleteVacancyModal,
    Icon,
    MyButton
  },
  data() {
    return {
      openDropdownItem: null as IVacancyItem | null,
      toogleStatus: false,
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
      status: 'Ativa'
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
    openNewTab(slug: string) {
      const url = this.$router.resolve({ name: 'jobDetail', params: { slug } }).href
      window.open(url, '_blank')
      this.openDropdownItem = null
      this.toogleStatus = false
    },
    openLink(id: number) {
      this.$router.push({ name: 'recruiterVacancyDetail', params: { id } })
    },
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
      this.openDropdownItem = null
      this.loading = false
      this.toogleStatus = false
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
        this.toogleStatus = false
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
        top: `${rect.bottom + window.scrollY + 5}px`,
        left: `${rect.left + window.scrollX - 150}px`,
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
          this.toogleStatus = false
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
        this.openDropdownItem = null
        this.loading = false
        this.toogleStatus = false
      }
    },
    handleChangeFilter(status: string) {
      this.status = status
      this.page = 1
      this.items = []
      this.getVacancies()
    },
  },
  computed: {
    filters() {
      return {
        page: this.page,
        search: this.search,
        status: this.status
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

    .filters {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      flex-wrap: wrap;
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
      display: flex;
      gap: 10px;

      &:hover {
        background-color: var(--blue);
        color: white;
      }
    }
  }
}
</style>
