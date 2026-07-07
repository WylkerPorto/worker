<template>
  <main class="main">
    <section class="card">
      <header>
        <h1>Lista de talentos</h1>
      </header>

      <div class="filters">
        <h1>Filtros</h1>
        <div class="group flex">
          <FormInput class="f1" v-model="search" type="text" placeholder="Teste@k.com"
            label="Nome, Email ou Parte da Apresentação" />
          <MySelect class="w2" :options="genders" v-model="gender" label="Genero*" />
        </div>
        <div class="group flex">
          <FormInput v-model="city" type="text" placeholder="Cidade" label="Cidade" />
          <FormInput v-model="state" type="text" placeholder="Estado" label="Estado" />
          <FormInput v-model="country" type="text" placeholder="País" label="País" />
        </div>

        <div class="group flex">
          <div class="switch">
            <span>Disponibilidade para viagem</span>
            <MySwitch v-model="availableToTravel" />
          </div>
          <div class="switch">
            <span>Disponibilidade para deslocamento para Araraquara</span>
            <MySwitch v-model="availableToCommuteToAraraquara" />
          </div>
          <div class="switch">
            <span>Disposto a se mudar para Araraquara</span>
            <MySwitch v-model="willingToRelocateToAraraquara" />
          </div>
        </div>

        <div class="group flex">
          <div class="switch">
            <span>Primeiro Emprego?</span>
            <MySwitch v-model="firstJob" />
          </div>
          <FormInput v-model="salaryMin" type="number" placeholder="20" label="Pretenção minima" />
          <FormInput v-model="salaryMax" type="number" placeholder="50" label="Pretenção maxima" />
        </div>

        <div class="group flex">
          <div class="switch">
            <span>Possui deficiência?</span>
            <MySwitch v-model="hasDisability" />
          </div>
          <MySelect class="w2" v-if="hasDisability" :options="disabilities" v-model="typeDisability"
            label="Deficiência" />
          <MySelect class="w2" :options="timeAvailabilities" v-model="timeAvailability"
            label="Disponibilidade de Tempo" />
        </div>

        <div class="group flex">
          <MySelect class="w2" :options="educationLevels" v-model="educationLevel" label="Nível de Educação" />
          <MySelect class="w2" :options="educationStatuses" v-model="educationStatus" label="Status de Educação" />
          <FormInput class="f1" v-model="graduationCourse" type="text" placeholder="Digite o curso" label="Curso" />
          <FormInput class="f1" v-model="graduationInstitution" type="text" placeholder="Digite a instituição"
            label="Instituição" />
        </div>

        <div class="group flex">
          <FormInput class="f1" v-model="experiencePosition" type="text" placeholder="Comerciante"
            label="Cargo da experiência" />
          <FormInput v-model="experienceCompany" type="text" placeholder="Avon" label="Empresa da experiência" />
          <MySelect class="w2" :options="experienceEmploymentTypes" v-model="experienceEmploymentType"
            label="Tipo de emprego" />
        </div>

        <div class="group flex">
          <div class="switch flex gap">
            <span>Trabalha atualmente?</span>
            <MySwitch v-model="isCurrentJob" />
          </div>
          <FormInput v-model="language" type="text" placeholder="Digite o idioma" label="Idioma" />
          <MySelect class="w2" :options="languageLevels" v-model="languageLevel" label="Nível de proficiência" />
        </div>

        <div class="group flex right">
          <MyButton @click="clearFilters" :loading="loading" class="danger">Limpar</MyButton>
          <MyButton @click="getUsers" :loading="loading" class="success">Buscar</MyButton>
        </div>
      </div>
      <DataTable :items="users" :columns="columns" :loading="loading" :totalItems="total" :totalPage="totalPage"
        :currentPage="page" @onNextPage="handleLoadMore(+1)" @onPreviousPage="handleLoadMore(-1)" :showFilter="false">
        <template #actions="{ item }">
          <RouterLink class="rounded primary" :to="{ name: 'internalCandidateDetail', params: { id: item.id } }"
            title="Ver Candidato" target="_blank">
            <Icon icon="mdi:user" />
          </RouterLink>
        </template>
      </DataTable>
    </section>
  </main>
</template>
<script lang="ts">
import { getDisabilities, getEducationLevels, getEducationStatus, getEmploymentTypes, getGenders, getLanguageLevels, getTimeAvailability } from '@/api/filters';
import { list } from '@/api/talent';
import DataTable from '@/components/core/DataTable.vue';
import FormInput from '@/components/core/FormInput.vue';
import MyButton from '@/components/core/MyButton.vue';
import MySelect from '@/components/core/MySelect.vue';
import MySwitch from '@/components/core/SwitchButton.vue';
import { Icon } from '@iconify/vue';

export default {
  name: 'RecruiterTalentPool',
  components: {
    DataTable,
    MyButton,
    FormInput,
    MySwitch,
    MySelect,
    Icon,
  },
  data() {
    return {
      users: [],
      disabilities: [],
      genders: [],
      timeAvailabilities: [],
      educationLevels: [],
      educationStatuses: [],
      experienceEmploymentTypes: [],
      languageLevels: [],
      columns: [
        { key: 'name', title: 'Nome' },
        { key: 'email', title: 'Email' },
        { key: 'city', title: 'Cidade' },
        { key: 'state', title: 'Estado' },
        { key: 'createdAt', title: 'Resgistrado', type: 'date' },
      ],
      loading: false,
      total: 0,
      page: 1,
      totalPage: 0,
      search: '',
      city: '',
      state: '',
      country: '',
      salaryMin: '',
      salaryMax: '',
      availableToTravel: null,
      availableToCommuteToAraraquara: null,
      willingToRelocateToAraraquara: null,
      hasDisability: null,
      typeDisability: '',
      firstJob: null,
      gender: '',
      timeAvailability: '',
      educationLevel: '',
      educationStatus: '',
      graduationCourse: '',
      graduationInstitution: '',
      experiencePosition: '',
      experienceCompany: '',
      experienceEmploymentType: '',
      isCurrentJob: null,
      language: '',
      languageLevel: '',
    }
  },
  mounted() {
    this.getUsers()
    this.loadFilters()
  },
  methods: {
    async loadFilters() {
      try {
        const disabilities = await getDisabilities()
        const genders = await getGenders()
        const times = await getTimeAvailability()
        const levels = await getEducationLevels()
        const stats = await getEducationStatus()
        const types = await getEmploymentTypes()
        const language = await getLanguageLevels()


        this.disabilities = disabilities.data.map((data) => ({ id: data.title, title: data.title }))
        this.genders = genders.data.map((data) => ({ id: data.title, title: data.title }))
        this.timeAvailabilities = times.data.map((time) => ({ id: time.title, title: time.title }))
        this.educationLevels = levels.data.map((level) => ({ id: level.title, title: level.title }))
        this.educationStatuses = stats.data.map((status) => ({ id: status.title, title: status.title }))
        this.experienceEmploymentTypes = types.data.map((type) => ({ id: type.title, title: type.title }))
        this.languageLevels = language.data.map((level) => ({ id: level.title, title: level.title }))
      } catch (error) {
        console.error('Error loading filters:', error)
      }
    },
    async getUsers() {
      this.loading = true
      try {
        const { data } = await list(this.filters)
        console.log(data.meta);
        this.users = data.data
        this.total = data.meta.total
        this.totalPage = Math.ceil(data.meta.total / data.meta.rows)
      } catch (error) {
        this.$snotify.error(error)
      } finally {
        this.loading = false
      }
    },
    clearFilters() {
      this.search = ''
      this.city = ''
      this.state = ''
      this.country = ''
      this.salaryMin = ''
      this.salaryMax = ''
      this.availableToTravel = null
      this.availableToCommuteToAraraquara = null
      this.willingToRelocateToAraraquara = null
      this.hasDisability = null
      this.typeDisability = ''
      this.firstJob = null
      this.gender = ''
      this.timeAvailability = ''
      this.educationLevel = ''
      this.educationStatus = ''
      this.graduationCourse = ''
      this.graduationInstitution = ''
      this.experiencePosition = ''
      this.experienceCompany = ''
      this.experienceEmploymentType = ''
      this.isCurrentJob = null
      this.language = ''
      this.languageLevel = ''
    },
    handleSearch(search: string) {
      this.search = search
      this.page = 1
      this.users = []
      this.getUsers()
    },
    handleLoadMore(page: number) {
      this.page += page
      this.getUsers()
    },
  },
  computed: {
    filters() {
      return {
        page: this.page,
        q: this.search,
        city: this.city,
        state: this.state,
        country: this.country,
        salaryMin: this.salaryMin,
        salaryMax: this.salaryMax,
        availableToTravel: this.availableToTravel,
        availableToCommuteToAraraquara: this.availableToCommuteToAraraquara,
        willingToRelocateToAraraquara: this.willingToRelocateToAraraquara,
        hasDisability: this.hasDisability,
        typeDisability: this.typeDisability,
        firstJob: this.firstJob,
        gender: this.gender,
        timeAvailability: this.timeAvailability,
        educationLevel: this.educationLevel,
        educationStatus: this.educationStatus,
        graduationCourse: this.graduationCourse,
        graduationInstitution: this.graduationInstitution,
        experiencePosition: this.experiencePosition,
        experienceCompany: this.experienceCompany,
        experienceEmploymentType: this.experienceEmploymentType,
        isCurrentJob: this.isCurrentJob,
        language: this.language,
        languageLevel: this.languageLevel,
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
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
      margin-bottom: 0.25rem;
      border-bottom: 1px solid var(--text);

      h1 {
        margin: 0;
      }
    }

    .filters {
      display: flex;
      flex-wrap: wrap;

      h1 {
        margin-bottom: 0.5rem;
      }

      .group {
        margin-bottom: 1rem;
        flex-wrap: wrap;

        &.flex {
          display: flex;
          gap: 1rem;
          align-items: center;
          width: 100%;
          width: -webkit-fill-available;
          width: -moz-available;

          .f1 {
            flex: 1;
            min-width: 300px;
          }

          .w2 {
            width: 220px;
          }

          .switch {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          &.right {
            justify-content: flex-end;
          }
        }
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
</style>
