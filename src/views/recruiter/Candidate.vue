<template>
  <main v-if="loading">
    Carregando candidato...
  </main>
  <main v-else>
    <h1>{{ candidate.name }}</h1>
    <span>{{ candidate.email }}</span>
    <p>{{ candidate.presentation }}</p>
    <p>CNH: {{ candidate.typeCnh }}</p>
    <p v-if="candidate.hasDisability">Deficiência: {{ candidate.typeDisability }}</p>
    <p>Nacionalidade: {{ candidate.nationality }} - Gênero: {{ candidate.gender }}</p>
    <p>Estado Civil: {{ maritalStatus[candidate.maritalStatusId]?.title }}</p>
    <p>Telefone: {{ candidate.phoneNumber }} - {{ candidate.phoneNumber2 }}</p>
    <p>CPF: {{ candidate.cpf }} - RG: {{ candidate.rg }}</p>
    <p>{{ candidate.availableToTravel ? 'Disponivel para viagem' : 'Indisponivel para viagem' }}</p>
    <p>{{ candidate.city }} - {{ candidate.state }} - {{ candidate.country }} - {{ candidate.neighborhood }}</p>
    <div v-if="experience.length > 0">
      <h2>Experiencia</h2>
      <ul>
        <li v-for="(item, index) in experience" :key="index">
          {{ item.companyName }} - {{ toFormatDate(item.startDate) }} - {{ item.isCurrentJob ? 'Atualmente' :
            toFormatDate(item.endDate) }}

          <p>{{ item.position }} - {{ item.department }}</p>
          <p>{{ item.description }}</p>
        </li>
      </ul>
    </div>
    <div v-if="graduation.length > 0">
      <h2>Graduação</h2>
      <ul>
        <li v-for="(item, index) in graduation" :key="index">
          {{ item.institutionName }}
          <p>{{ item.courseName }}</p>
          <p>{{ item.educationLevel }} - {{ item.status }}</p>
          <p>{{ toFormatDate(item.startDate) }} - {{ toFormatDate(item.endDate) }}</p>
        </li>
      </ul>
    </div>
    <div v-if="course.length > 0">
      <h2>Cursos</h2>
      <ul>
        <li v-for="(item, index) in course" :key="index">
          {{ item.institutionName }}
          <p>{{ item.courseName }} - Duração: {{ item.durationHours }} Horas</p>
          <p>{{ toFormatDate(item.completionDate) }}</p>
          <p>{{ item.description }}</p>
          <a :href="item.certificateUrl" v-if="item.certificateUrl" target="_blank">Certificado</a>
        </li>
      </ul>
    </div>
    <div v-if="language.length > 0">
      <h2>Idiomas</h2>
      <ul>
        <li v-for="(item, index) in language" :key="index">
          {{ item.language }} - {{ item.level }}
          <a :href="item.certificateUrl" v-if="item.certificateUrl" target="_blank">Certificado</a>
        </li>
      </ul>
    </div>
  </main>
</template>
<script lang="ts">
import { type IPersonForm } from '@/interfaces/IPerson'
import { type IWorkItem } from '@/interfaces/IWork'
import { type IGraduationItem } from '@/interfaces/IGraduation'
import { type ICourseItem } from '@/interfaces/ICourse'
import { type ILanguageItem } from '@/interfaces/ILanguage'
import { get as getPerson } from '@/api/user'
import { list as getExperience } from '@/api/experience'
import { list as getGraduation } from '@/api/graduation'
import { list as getCourse } from '@/api/course'
import { list as getLanguage } from '@/api/language'
import { getMaritalstatus } from '@/api/filters'
import { toFormatDate } from '@/utils/conversors'

export default {
  name: 'CandidateView',
  data() {
    return {
      toFormatDate,
      uid: this.$route.params.id,
      loading: false,
      candidate: {} as IPersonForm,
      experience: [] as IWorkItem[],
      graduation: [] as IGraduationItem[],
      course: [] as ICourseItem[],
      language: [] as ILanguageItem[],
      maritalStatus: [],
      aplicationStatus: [],
    }
  },
  mounted() {
    this.getCandidate()
    this.getExperience()
    this.getGraduation()
    this.getCourse()
    this.getLanguage()
    this.getFilters()
  },
  methods: {
    async getCandidate() {
      try {
        this.loading = true
        const { data } = await getPerson(this.uid)
        this.candidate = data
      } catch (error) {
        this.$snotify.error('Erro ao carregar o candidato: ' + error)
      } finally {
        this.loading = false
      }
    },
    async getExperience() {
      try {
        this.loading = true
        const { data } = await getExperience(this.uid)
        this.experience = data
      } catch (error) {
        this.$snotify.error('Erro ao carregar as experiências: ' + error)
      } finally {
        this.loading = false
      }
    },
    async getGraduation() {
      try {
        this.loading = true
        const { data } = await getGraduation(this.uid)
        this.graduation = data
      } catch (error) {
        this.$snotify.error('Erro ao carregar as graduações: ' + error)
      } finally {
        this.loading = false
      }
    },
    async getCourse() {
      try {
        this.loading = true
        const { data } = await getCourse(this.uid)
        this.course = data
      } catch (error) {
        this.$snotify.error('Erro ao carregar os cursos: ' + error)
      } finally {
        this.loading = false
      }
    },
    async getLanguage() {
      try {
        this.loading = true
        const { data } = await getLanguage(this.uid)
        this.language = data
      } catch (error) {
        this.$snotify.error('Erro ao carregar os idiomas: ' + error)
      } finally {
        this.loading = false
      }
    },
    async getFilters() {
      try {
        const maritalStatus = await getMaritalstatus()
        this.maritalStatus = maritalStatus.data
      } catch (error) {
        console.error('Error loading filters:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  background: var(--white);
  margin: auto;
  max-width: 70vw;
  padding: 3rem 5rem;

  h1 {
    font-size: 3rem;
  }

  span {
    font-size: 14px;
    margin-bottom: 1rem;
  }

  p {
    font-size: 16px;
    margin: 0.5rem 0;
  }

  div {
    h2 {
      margin: 2rem 0;
      border-bottom: 1px solid var(--text);
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 1.5rem;
        border-bottom: 1px solid var(--glass);

        p {
          margin: 0.2rem 0;
        }

        a {
          color: var(--link);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
