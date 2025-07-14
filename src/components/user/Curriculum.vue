<template>
  <form @submit.prevent="validate">
    <MyAccordeon title="Dados pessoais" :isOpen="true">
      <div class="group">
        <FormInput
          v-model="form.name"
          :error="errors.name"
          type="text"
          placeholder="Digite seu nome"
          label="Name"
        />
      </div>

      <div class="group">
        <FormInput
          v-model="form.email"
          :error="errors.email"
          type="email"
          placeholder="Digite seu e-mail"
          label="Email"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.cpf"
          :error="errors.cpf"
          type="text"
          placeholder="Digite seu CPF"
          label="CPF"
        />
        <FormInput
          v-model="form.rg"
          :error="errors.rg"
          type="text"
          placeholder="Digite seu RG"
          label="RG"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.cnh"
          :error="errors.cnh"
          type="text"
          placeholder="Digite sua CNH"
          label="CNH"
        />
        <FormInput
          v-model="form.typeCnh"
          :error="errors.typeCnh"
          type="text"
          placeholder="Digite o tipo de CNH"
          label="Tipo de CNH"
        />
      </div>

      <div class="group flex">
        <div class="switch">
          <span>Possui deficiência?</span>
          <MySwitch v-model="form.hasDisability" />
        </div>
        <MySelect
          v-if="form.hasDisability"
          :options="disabilities"
          v-model="form.typeDisability"
          label="Deficiência"
          :error="errors.typeDisability"
        />
      </div>

      <div class="group flex">
        <MySelect :options="genders" v-model="form.gender" label="Sexo" :error="errors.gender" />
        <MySelect
          :options="maritalStatus"
          v-model.number="form.maritalStatusId"
          label="Estado Civil"
          :error="errors.maritalStatusId"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.phoneNumber"
          :error="errors.phoneNumber"
          type="tel"
          mask="tel"
          placeholder="(99) 99999-9999"
          label="Telefone"
        />
        <FormInput
          v-model="form.phoneNumber2"
          :error="errors.phoneNumber2"
          type="tel"
          mask="tel"
          placeholder="(99) 99999-9999"
          label="Telefone 2"
        />
      </div>
    </MyAccordeon>

    <MyAccordeon title="Localidade">
      <div class="group">
        <MySelect
          :options="nationalities"
          v-model="form.nationality"
          label="Nacionalidade"
          :error="errors.nationality"
        />
      </div>

      <div class="group">
        <FormInput
          v-model="form.postalCode"
          :error="errors.postalCode"
          type="text"
          placeholder="Digite o CEP"
          label="CEP"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.street"
          :error="errors.street"
          type="text"
          placeholder="Digite a rua"
          label="Rua"
        />
        <FormInput
          v-model.number="form.number"
          :error="errors.number"
          type="number"
          placeholder="555"
          label="Número"
        />
      </div>

      <div class="group">
        <FormInput
          v-model="form.complement"
          :error="errors.complement"
          type="text"
          placeholder="Fundo A"
          label="Complemento"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.neighborhood"
          :error="errors.neighborhood"
          type="text"
          placeholder="Limeira"
          label="Bairro"
        />
        <FormInput
          v-model="form.city"
          :error="errors.city"
          type="text"
          placeholder="São Paulo"
          label="Cidade"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.state"
          :error="errors.state"
          type="text"
          placeholder="SP"
          label="Estado"
        />
        <FormInput
          v-model="form.country"
          :error="errors.country"
          type="text"
          placeholder="Brasil"
          label="País"
        />
      </div>
    </MyAccordeon>

    <MyAccordeon title="Profissional" class="school">
      <div class="group flex">
        <div class="switch">
          <span>Disponibilidade para viagem?</span>
          <MySwitch v-model="form.availableToTravel" />
        </div>

        <div class="switch">
          <span>Primeiro Emprego?</span>
          <MySwitch v-model="form.firstJob" />
        </div>

        <FormInput
          v-model.number="form.salaryClaim"
          :error="errors.salaryClaim"
          type="number"
          placeholder="5000"
          label="Pretensão Salarial"
        />
      </div>

      <div class="flex mt">
        <h2>Experiência Profissional</h2>
        <MyButton class="primary" type="button" @click="() => (showWorkExperienceModal = true)">
          Nova Experiência
        </MyButton>
      </div>
      <ul v-if="workExperiences.length > 0">
        <li v-for="work in workExperiences" :key="work.id">
          <div>
            <p>{{ work.position }}</p>
            <p>
              {{ work.companyName }} - {{ toFormatDate(work.startDate) }} até
              {{ toFormatDate(work.endDate) || (work.isCurrentJob && 'Atualmente') }}
            </p>
          </div>
          <div class="btns">
            <MyButton class="info" type="button" @click="editWorkExperience(work)">
              <Icon icon="iconamoon:pen" />
            </MyButton>
            <MyButton class="danger" type="button" @click="() => confirmDeleteWorkExperience(work)">
              <Icon icon="iconamoon:trash" />
            </MyButton>
          </div>
        </li>
      </ul>
    </MyAccordeon>

    <MyAccordeon title="Conhecimento" class="school">
      <div class="flex">
        <h2>Graduações</h2>
        <MyButton class="primary" type="button" @click="() => (showGraduationModal = true)">
          Nova Graduação
        </MyButton>
      </div>
      <ul v-if="graduations.length > 0">
        <li v-for="graduation in graduations" :key="graduation.id">
          <div>
            <p>{{ graduation.courseName }}</p>
            <p>{{ graduation.status }} - {{ toFormatDate(graduation.endDate) }}</p>
          </div>
          <div class="btns">
            <MyButton class="info" type="button" @click="editGraduation(graduation)">
              <Icon icon="iconamoon:pen" />
            </MyButton>
            <MyButton
              class="danger"
              type="button"
              @click="() => confirmDeleteGraduation(graduation)"
            >
              <Icon icon="iconamoon:trash" />
            </MyButton>
          </div>
        </li>
      </ul>

      <div class="flex mt">
        <h2>Cursos</h2>
        <MyButton class="primary" type="button" @click="() => (showCoursesModal = true)">
          Novo Curso
        </MyButton>
      </div>
      <ul v-if="courses.length > 0">
        <li v-for="course in courses" :key="course.id">
          <div>
            <p>{{ course.courseName }}</p>
            <p>
              Duração: {{ course.durationHours }}
              {{ course.durationHours > 1 ? 'horas' : 'hora' }} -
              {{ toFormatDate(course.completionDate) }}
            </p>
            <a :href="course.certificateUrl" target="_blank" v-if="course.certificateUrl"
              >Certificado</a
            >
          </div>
          <div class="btns">
            <MyButton class="info" type="button" @click="editCourse(course)">
              <Icon icon="iconamoon:pen" />
            </MyButton>
            <MyButton class="danger" type="button" @click="() => confirmDeleteCourse(course)">
              <Icon icon="iconamoon:trash" />
            </MyButton>
          </div>
        </li>
      </ul>

      <div class="flex mt">
        <h2>Idiomas</h2>
        <MyButton class="primary" type="button" @click="() => (showLanguageModal = true)">
          Novo Idioma
        </MyButton>
      </div>
      <ul v-if="languages.length > 0">
        <li v-for="language in languages" :key="language.id">
          <div>
            <p>{{ language.language }} - {{ language.level }}</p>
            <a :href="language.certificateUrl" target="_blank" v-if="language.certificateUrl"
              >Certificado</a
            >
          </div>
          <div class="btns">
            <MyButton class="info" type="button" @click="editLanguage(language)">
              <Icon icon="iconamoon:pen" />
            </MyButton>
            <MyButton class="danger" type="button" @click="() => confirmDeleteLanguage(language)">
              <Icon icon="iconamoon:trash" />
            </MyButton>
          </div>
        </li>
      </ul>
    </MyAccordeon>

    <MyAccordeon title="Social">
      <div class="group">
        <textarea
          class="textarea"
          v-model="form.presentation"
          :error="errors.presentation"
          placeholder="Apresentação"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.facebookUrl"
          :error="errors.facebookUrl"
          type="url"
          placeholder="Digite o link do facebook"
          label="Facebook"
        />
        <FormInput
          v-model="form.instagramUrl"
          :error="errors.instagramUrl"
          type="url"
          placeholder="Digite o link do instagram"
          label="Instagram"
        />
      </div>

      <div class="group flex">
        <FormInput
          v-model="form.linkedinUrl"
          :error="errors.linkedinUrl"
          type="url"
          placeholder="Digite o link do linkedin"
          label="LinkedIn"
        />
        <FormInput
          v-model="form.personalUrl"
          :error="errors.personalUrl"
          type="url"
          placeholder="Digite o link pessoal"
          label="Site Pessoal"
        />
      </div>
    </MyAccordeon>

    <MyButton class="primary" :loading="loading">Atualizar</MyButton>
  </form>

  <GraduationModal
    :show="showGraduationModal"
    @onClose="closeModals"
    @onSave="loadGraduations"
    :dataForm="selectedGraduation"
  />

  <CoursesModal
    :show="showCoursesModal"
    @onClose="closeModals"
    @onSave="loadCourses"
    :dataForm="selectedCourse"
  />

  <LanguageModal
    :show="showLanguageModal"
    @onClose="closeModals"
    @onSave="loadLanguages"
    :dataForm="selectedLanguage"
  />

  <WorkExperienceModal
    :show="showWorkExperienceModal"
    @onClose="closeModals"
    @onSave="loadWorkExperiences"
    :dataForm="selectedWorkExperience"
  />

  <DeleteConfirmationModal
    :show="showDeleteModal"
    @onClose="closeModals"
    @onConfirm="handleDelete"
  />
</template>
<script lang="ts">
import * as yup from 'yup'
import FormInput from '../core/FormInput.vue'
import MySwitch from '../core/SwitchButton.vue'
import MySelect from '../core/MySelect.vue'
import MyButton from '../core/MyButton.vue'
import MyAccordeon from '../core/MyAccordeon.vue'
import GraduationModal from './GraduationModal.vue'
import CoursesModal from './CoursesModal.vue'
import LanguageModal from './LanguageModal.vue'
import WorkExperienceModal from './WorkExperienceModal.vue'
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'

import { Icon } from '@iconify/vue'

import { getDisabilities, getGenders, getMaritalstatus, getNationalities } from '@/api/filters'
import { get as getUser, update as updateUser } from '@/api/user'
import { list as listGraduation, remove as removeGraduation } from '@/api/graduation'
import { list as listCourses, remove as removeCourse } from '@/api/course'
import { list as listLanguages, remove as removeLanguage } from '@/api/language'
import { list as listWork, remove as removeWork } from '@/api/experience'

import { type IGraduationItem } from '@/interfaces/IGraduation'
import { type ICourseItem } from '@/interfaces/ICourses'
import { type ILanguageItem } from '@/interfaces/ILanguages'
import { type IWorkItem } from '@/interfaces/IWork'
import { toFormatDate } from '@/utils/conversors'

export default {
  name: 'UserCurriculum',
  data() {
    return {
      toFormatDate,
      id: null,
      form: {
        name: '' as string,
        email: '' as string,
        password: '' as string,
        cpf: '' as string,
        rg: '' as string,
        cnh: '' as string,
        typeCnh: '' as string,
        hasDisability: false as boolean,
        typeDisability: '' as string,
        gender: '' as string,
        maritalStatusId: null as number,
        nationality: '' as string,
        phoneNumber: '' as string,
        phoneNumber2: '' as string,
        availableToTravel: false as boolean,
        salaryClaim: null as number,
        firstJob: false as boolean,
        presentation: '' as string,
        postalCode: '' as string,
        street: '' as string,
        number: null as number,
        complement: '' as string,
        neighborhood: '' as string,
        city: '' as string,
        state: '' as string,
        country: '' as string,
        facebookUrl: '' as string,
        instagramUrl: '' as string,
        linkedinUrl: '' as string,
        personalUrl: '' as string,
      },
      disabilities: [],
      genders: [],
      maritalStatus: [],
      nationalities: [],
      graduations: [] as IGraduationItem[],
      courses: [] as ICourseItem[],
      languages: [] as ILanguageItem[],
      workExperiences: [] as IWorkItem[],
      errors: {},
      loading: false,
      showGraduationModal: false,
      selectedGraduation: null as number | null,
      showCoursesModal: false,
      selectedCourse: null as number | null,
      showDeleteModal: false,
      selectedLanguage: null as number | null,
      showLanguageModal: false,
      showWorkExperienceModal: false,
      selectedWorkExperience: null as number | null,
    }
  },
  components: {
    FormInput,
    MySwitch,
    MySelect,
    MyButton,
    MyAccordeon,
    GraduationModal,
    CoursesModal,
    LanguageModal,
    WorkExperienceModal,
    DeleteConfirmationModal,
    Icon,
  },
  watch: {
    'form.hasDisability'(newVal) {
      if (!newVal) {
        this.form.typeDisability = ''
      }
    },
  },
  created() {
    // Fetch initial data for dropdowns or other components if needed
    this.id = localStorage.getItem('uid')
  },
  mounted() {
    this.loadFilters()
    this.loadData()
    this.loadGraduations()
    this.loadCourses()
    this.loadLanguages()
    this.loadWorkExperiences()
  },
  methods: {
    validate() {
      const schema = yup.object({
        name: yup
          .string()
          .min(3, 'Nome deve ter pelo menos 3 caracteres')
          .required('Nome é obrigatório'),
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        gender: yup.string().min(1, 'Selecione um sexo').required('Sexo é obrigatório'),
        maritalStatus: yup
          .string()
          .min(1, 'Selecione um estado civil')
          .required('Estado civil é obrigatório'),
        nationality: yup
          .string()
          .min(1, 'Selecione uma nacionalidade')
          .required('Nacionalidade é obrigatória'),
        phoneNumber: yup.string().min(10, 'Telefone inválido').required('Telefone é obrigatório'),
        postalCode: yup.string().min(8, 'CEP inválido').required('CEP é obrigatório'),
        street: yup
          .string()
          .min(3, 'Rua deve ter pelo menos 3 caracteres')
          .required('Rua é obrigatória'),
        number: yup
          .number()
          .typeError('Número deve ser um número')
          .required('Número é obrigatório'),
        neighborhood: yup
          .string()
          .min(3, 'Bairro deve ter pelo menos 3 caracteres')
          .required('Bairro é obrigatório'),
        city: yup
          .string()
          .min(3, 'Cidade deve ter pelo menos 3 caracteres')
          .required('Cidade é obrigatória'),
        state: yup
          .string()
          .min(2, 'Estado deve ter pelo menos 2 caracteres')
          .required('Estado é obrigatório'),
        country: yup
          .string()
          .min(3, 'País deve ter pelo menos 3 caracteres')
          .required('País é obrigatório'),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {}
          this.submitForm()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async submitForm() {
      // Handle form submission logic here
      this.loading = true
      try {
        delete this.form.id
        delete this.form.password
        delete this.form.createdAt
        delete this.form.updatedAt
        delete this.form.deletedAt

        await updateUser(this.id, this.form)

        this.$snotify.success('Perfil atualizado com sucesso!')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async loadFilters() {
      try {
        const disabilities = await getDisabilities()
        const genders = await getGenders()
        const maritalStatus = await getMaritalstatus()
        const nationality = await getNationalities()

        this.disabilities = disabilities.data.map((data) => ({ id: data.title, title: data.title }))
        this.genders = genders.data.map((data) => ({ id: data.title, title: data.title }))
        this.maritalStatus = maritalStatus.data.map((data) => ({ id: data.id, title: data.title }))
        this.nationalities = nationality.data.map((data) => ({ id: data.title, title: data.title }))
      } catch (error) {
        console.error('Error loading filters:', error)
      }
    },
    async loadData() {
      try {
        const response = await getUser(this.id)
        this.form = {
          ...this.form, // valores default
          ...response.data,
          hasDisability: !!response.data.hasDisability, // garante boolean
          availableToTravel: !!response.data.availableToTravel,
          firstJob: !!response.data.firstJob,
        }
      } catch (error) {
        console.error('Error loading data:', error)
      }
    },
    async loadGraduations() {
      try {
        this.closeModals()
        const response = await listGraduation(this.id)
        this.graduations = response.data
      } catch (error) {
        this.$snotify.error('Erro ao carregar graduação:', error)
      }
    },
    editGraduation(graduation: IGraduationItem) {
      this.selectedGraduation = graduation
      this.showGraduationModal = true
    },
    confirmDeleteGraduation(graduation: IGraduationItem) {
      this.closeModals()
      this.selectedGraduation = graduation
      this.showDeleteModal = true
    },
    async deleteGraduation() {
      try {
        await removeGraduation(this.id, this.selectedGraduation.id)
      } catch (error) {
        this.$snotify.error('Erro ao excluir graduação:', error)
      } finally {
        this.loadGraduations()
      }
    },
    closeModals() {
      this.selectedGraduation = null
      this.selectedCourse = null
      this.selectedLanguage = null
      this.selectedWorkExperience = null
      this.showGraduationModal = false
      this.showCoursesModal = false
      this.showLanguageModal = false
      this.showWorkExperienceModal = false
      this.showDeleteModal = false
    },
    handleDelete() {
      if (this.selectedGraduation) {
        this.deleteGraduation()
      } else if (this.selectedCourse) {
        this.deleteCourse()
      } else if (this.selectedLanguage) {
        this.deleteLanguage()
      } else if (this.selectedWorkExperience) {
        this.deleteWorkExperience()
      }
    },
    async loadCourses() {
      try {
        this.closeModals()
        const response = await listCourses(this.id)
        this.courses = response.data
      } catch (error) {
        this.$snotify.error('Erro ao carregar cursos:', error)
      }
    },
    editCourse(course: ICourseItem) {
      this.selectedCourse = course
      this.showCoursesModal = true
    },
    confirmDeleteCourse(course: ICourseItem) {
      this.closeModals()
      this.selectedCourse = course
      this.showDeleteModal = true
    },
    async deleteCourse() {
      try {
        await removeCourse(this.id, this.selectedCourse.id)
      } catch (error) {
        this.$snotify.error('Erro ao excluir curso:', error)
      } finally {
        this.loadCourses()
      }
    },
    async loadLanguages() {
      try {
        this.closeModals()
        const response = await listLanguages(this.id)
        this.languages = response.data
      } catch (error) {
        this.$snotify.error('Erro ao carregar idiomas:', error)
      }
    },
    editLanguage(language: ILanguageItem) {
      this.selectedLanguage = language
      this.showLanguageModal = true
    },
    confirmDeleteLanguage(language: ILanguageItem) {
      this.closeModals()
      this.selectedLanguage = language
      this.showDeleteModal = true
    },
    async deleteLanguage() {
      try {
        await removeLanguage(this.id, this.selectedLanguage.id)
      } catch (error) {
        this.$snotify.error('Erro ao excluir idioma:', error)
      } finally {
        this.loadLanguages()
      }
    },
    async loadWorkExperiences() {
      try {
        this.closeModals()
        const response = await listWork(this.id)
        this.workExperiences = response.data
      } catch (error) {
        this.$snotify.error('Erro ao carregar experiências de trabalho:', error)
      }
    },
    editWorkExperience(work: IWorkItem) {
      this.selectedWorkExperience = work
      this.showWorkExperienceModal = true
    },
    confirmDeleteWorkExperience(work: IWorkItem) {
      this.closeModals()
      this.selectedWorkExperience = work
      this.showDeleteModal = true
    },
    async deleteWorkExperience() {
      try {
        await removeWork(this.id, this.selectedWorkExperience.id)
      } catch (error) {
        this.$snotify.error('Erro ao excluir experiência de trabalho:', error)
      } finally {
        this.loadWorkExperiences()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  padding: 10px 0;

  .group {
    margin-bottom: 1rem;

    &.flex {
      display: flex;
      gap: 1rem;

      main {
        flex: 1;
      }

      .switch {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
    }
  }

  .school {
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      &.mt {
        margin-top: 5rem;
        border-top: 3px double var(--border);
        padding-top: 1rem;
      }

      button {
        margin-left: auto;
      }
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        padding-bottom: 10px;
        gap: 1rem;

        &:not(:last-child) {
          border-bottom: 1px solid var(--grey);
        }

        div {
          &:first-child {
            flex-grow: 1;
          }

          p {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
