<template>
  <main class="container">
    <header>
      <h1>Vagas candidatadas {{ total }}</h1>
      <form @submit.stop.prevent="handleSearch">
        <SearchInput v-model="search" />
      </form>
    </header>
    <section>
      <div class="card" v-for="item in items" :key="item.id">
        <h2>{{ item.vacancy.title }}</h2>
        <p>
          <Icon icon="pajamas:status" v-if="item.status == 'Candidatura Enviada'"></Icon>
          <Icon icon="pajamas:error" v-if="item.status == 'Em Análise'"></Icon>
          <Icon icon="pajamas:check-circle-dashed" v-if="item.status == 'Aprovada'"></Icon>
          <Icon icon="pajamas:canceled-circle" v-if="item.status == 'Rejeitada'"></Icon>
          <Icon icon="pajamas:multiple-choice" v-if="item.status == 'Candidatura Retirada'"></Icon>
          {{ item.status }}
        </p>

        <div class="btn-group">
          <RouterLink class="btn primary" :to="{ name: 'userVacancyDetail', params: { id: item.vacancy.id } }"
            target="_blank">
            Ver detalhes
          </RouterLink>
          <MyButton v-if="item.status === 'Candidatura Retirada'" class="btn success" type="button" :loading="loading"
            @click="reApply(item)">
            Recandidatar
          </MyButton>
          <MyButton v-else class="btn danger" type="button" :loading="loading" @click="removeApplication(item)">
            Desistir
          </MyButton>
        </div>
      </div>
    </section>
    <MyButton @click="handleLoadMore" v-if="loadMore">Carregar mais</MyButton>
  </main>
</template>
<script lang="ts">
import { getAplicationByUser } from '@/api/aplication'
import SearchInput from '@/components/core/SearchInput.vue'
import { Icon } from '@iconify/vue'
import { type IVacancyItem } from '@/interfaces/IVacancy'
import MyButton from '@/components/core/MyButton.vue'
import { update } from '@/api/aplication'

export default {
  name: 'UserAplication',
  components: {
    SearchInput,
    Icon,
    MyButton,
  },
  data() {
    return {
      items: [],
      loading: false,
      editItem: {} as IVacancyItem,
      total: 0,
      page: 1,
      search: '',
    }
  },
  mounted() {
    this.getApplications()
  },
  methods: {
    async getApplications() {
      this.loading = true
      try {
        const data = await getAplicationByUser(localStorage.getItem('uid'), this.filters)
        this.total = data.data.meta.total
        this.items.push(...data.data.data)
      } catch (error) {
        this.$snotify.error('Erro ao buscar as vagas: ' + error)
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.page = 1
      this.items = []
      this.getApplications()
    },
    handleLoadMore() {
      this.page += 1
      this.getApplications()
    },
    async removeApplication(item) {
      this.loading = true
      try {
        await update(item.id, { vacancyId: item.vacancy.id, status: 'Candidatura Retirada' })
        this.$snotify.success('Candidatura removida com sucesso!')
        item.status = 'Candidatura Retirada'
      } catch (error) {
        this.$snotify.error('Erro ao remover candidatura: ' + error)
      } finally {
        this.loading = false
      }
    },
    async reApply(item) {
      this.loading = true
      try {
        await update(item.id, { vacancyId: item.vacancy.id, status: 'Candidatura Enviada' })
        this.$snotify.success('Candidatura reenviada com sucesso!')
        item.status = 'Candidatura Enviada'
      } catch (error) {
        this.$snotify.error('Erro ao reenviar candidatura: ' + error)
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
    loadMore() {
      return this.items.length < this.total
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 90vw;
  margin: auto;
  background-color: var(--glass);
  margin-top: 10px;

  header {
    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }

    form {
      width: fit-content;
      margin: 0 20px 0 auto;
    }
  }

  section {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    flex: 1;
    padding: 1rem;
    border-radius: 0.5rem;
    gap: 1rem;
    justify-content: space-evenly;

    .card {
      height: auto;
      flex: 1 1 300px;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid var(--border);

      &:hover {
        box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
      }

      h2 {
        text-wrap: balance;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .btn-group {
        display: contents;

        .btn {
          text-align: center;
        }
      }
    }
  }
}
</style>
