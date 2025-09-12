<template>
  <main>
    <section class="card">
      <header>
        <button class="rounded" @click="$router.push({ name: 'recruiterVacancy' })" title="Voltar">
          <Icon icon="lets-icons:back"></Icon>
        </button>
        <h1>Candidatos a vaga {{ vaga.title }}</h1>
      </header>
      <DataTable :items="items" :columns="columns" :loading="loading" :totalItems="total" :totalPage="totalPage"
        :currentPage="page" @onSearch="handleSearch" @onNextPage="handleLoadMore(+1)"
        @onPreviousPage="handleLoadMore(-1)">
        <template #actions="{ item }">
          <button class="rounded" @click="toggleDropdown($event, item)" title="Editar Status">
            <Icon icon="fluent:status-12-filled" />
          </button>
          <RouterLink class="rounded primary" :to="{ name: 'recruiterCandidateDetail', params: { id: item.person.id } }"
            title="Ver Candidato" target="_blank">
            <Icon icon="mdi:user" />
          </RouterLink>
        </template>
      </DataTable>
    </section>
    <article v-if="openDropdownItem" ref="dropdown" :style="dropdownStyles" class="dropdown-status">
      <ul>
        <li v-for="status in aplicationStatus" :key="status.id"
          @click="handleToggleStatus(openDropdownItem, status.title)">
          {{ status.title }}
        </li>
      </ul>
    </article>
  </main>
</template>
<script lang="ts">
import { getAplicationsByVacancy, update } from '@/api/aplication'
import { getAplicationStatus } from '@/api/filters'
import { get } from '@/api/vacancy'
import DataTable from '@/components/core/DataTable.vue'
import { Icon } from '@iconify/vue'
import { type IVacancyItem } from '@/interfaces/IVacancy'

export default {
  name: 'AplicationsVacancy',
  components: {
    DataTable,
    Icon,
  },
  data() {
    return {
      openDropdownItem: null,
      dropdownStyles: {
        position: 'absolute',
        top: '0px',
        left: '0px',
      },
      vaga: {} as IVacancyItem,
      items: [],
      columns: [
        { key: 'person.name', title: 'Nome' },
        { key: 'person.email', title: 'Email' },
        { key: 'status', title: 'Estado' },
        { key: 'createdAt', title: 'Criado em', type: 'date' },
      ],
      aplicationStatus: [] as string[],
      loading: false,
      total: 0,
      page: 1,
      totalPage: 0,
      search: '',
    }
  },
  mounted() {
    this.getAplicationsByVacancy()
    this.getVacancyDetail()
    this.getAplicationStatus()
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    async getAplicationStatus() {
      try {
        const response = await getAplicationStatus()
        this.aplicationStatus = response.data
      } catch (error) {
        this.$snotify.error(error)
      }
    },
    async getAplicationsByVacancy() {
      this.loading = true
      try {
        const { data } = await getAplicationsByVacancy(this.$route.params.id, this.filters)
        this.items = data.data
        this.total = data.meta.total
        this.totalPage = data.meta.totalPages
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    async getVacancyDetail() {
      this.loading = true
      try {
        const response = await get(this.$route.params.id)
        this.vaga = response.data
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    handleLoadMore(pageChange: number) {
      this.page += pageChange
      this.getAplicationsByVacancy()
    },
    handleSearch(search: string) {
      this.search = search
      this.page = 1
      this.items = []
      this.getAplicationsByVacancy()
    },
    async handleToggleStatus(item, status: string) {
      this.loading = true
      const newItem = { ...item }
      try {
        newItem.status = status
        delete newItem.id
        delete newItem.updatedAt
        delete newItem.createdAt
        delete newItem.vacancy
        delete newItem.person
        console.log('Atualizando candidatura:', newItem);
        await update(item.id, newItem)
        this.$snotify.success('Candidatura atualizada com sucesso!')
        item.status = status
      } catch (error) {
        this.$snotify.error('Erro ao atualizar candidatura: ' + error)
      } finally {
        this.openDropdownItem = null
        this.loading = false
      }
    },
    toggleDropdown(event: Event, Item) {
      const rect = (event.target as HTMLElement).getBoundingClientRect()

      // Toggle
      if (this.openDropdownItem === Item) {
        this.openDropdownItem = null
        return
      }
      this.openDropdownItem = Item
      this.dropdownStyles = {
        position: 'absolute',
        top: `${rect.bottom + 8}px`,
        left: `${rect.left - 60}px`,
      }
    },
    handleClickOutside(event: MouseEvent) {
      setTimeout(() => {
        const dropdown = this.$refs.dropdown as HTMLElement | undefined
        const target = event.target as Node
        const buttonClicked = (event.target as HTMLElement).closest('.actions')

        if (
          dropdown &&
          !dropdown.contains(target) &&
          !buttonClicked
        ) {
          this.openDropdownItem = null
        }
      }, 0)
    }
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
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--text);
      gap: 20px;

      button {
        background: none;
        border: none;
        color: var(--text);
        cursor: pointer;

        svg {
          width: 24px;
          height: 24px;
        }

        &:hover {
          opacity: 0.8;
        }
      }

      h1 {
        margin: 0 auto;
        text-align: center;
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
