<template>
  <ModalBase :open="show" @onClose="$emit('onClose')" title="Novo Idioma">
    <template #content>
      <form @submit.prevent="validate">
        <div class="flex">
          <FormInput
            label="Nome do Idioma"
            type="text"
            placeholder="Português"
            v-model="form.language"
            :error="errors.language"
            required
          />
          <MySelect
            label="Nível de Proficiência"
            :options="statusList"
            v-model="form.level"
            :error="errors.level"
            required
          />
        </div>
        <FormInput
          label="Url do Certificado"
          type="text"
          placeholder="https://example.com/certificado"
          v-model="form.certificateUrl"
          :error="errors.certificateUrl"
          required
        />
      </form>
    </template>
    <template #actions>
      <MyButton class="btn success" :loading="loading" @click="validate">Salvar</MyButton>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import * as yup from 'yup'
import ModalBase from '../core/ModalBase.vue'
import MyButton from '../core/MyButton.vue'
import FormInput from '../core/FormInput.vue'
import MySelect from '../core/MySelect.vue'
import { type ILanguageForm } from '@/interfaces/ILanguages'
import { create, update } from '@/api/language'
import { getLanguageLevels } from '@/api/filters'

export default {
  name: 'LanguageModal',
  components: {
    ModalBase,
    MyButton,
    FormInput,
    MySelect,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    dataForm: {
      type: Object,
    },
  },
  emits: ['onClose', 'onSave'],
  data() {
    return {
      form: {} as ILanguageForm,
      errors: {} as ILanguageForm,
      loading: false,
      languageStatus: [],
    }
  },
  watch: {
    dataForm() {
      if (this.dataForm) {
        this.form = { ...this.form, ...this.dataForm }
      } else {
        this.form = {} as ILanguageForm
      }
    },
  },
  async mounted() {
    try {
      const status = await getLanguageLevels()
      this.languageStatus = status.data
    } catch (error) {
      this.$snotify.error('Erro ao carregar os níveis de proficiência: ' + error)
    }
  },
  methods: {
    validate() {
      const schema = yup.object().shape({
        language: yup.string().required('O nome do idioma é obrigatório'),
        level: yup
          .string()
          .oneOf(
            this.languageStatus.map((status) => status.title),
            'Nível inválido',
          )
          .required('O nível de proficiência é obrigatório'),
        certificateUrl: yup.string().url('URL do certificado deve ser uma URL válida').nullable(),
      })

      schema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {} as ILanguageForm
          this.saveLanguage()
        })
        .catch((err) => {
          const errors = {}
          err.inner.forEach((error) => {
            errors[error.path] = error.message
          })
          this.errors = errors
        })
    },
    async saveLanguage() {
      this.loading = true
      try {
        const isEdit = !!this.form.id
        const uid = localStorage.getItem('uid')

        if (isEdit) {
          delete this.form.id
          delete this.form.createdAt
          delete this.form.updatedAt
          delete this.form.deletedAt
        }

        if (isEdit) {
          await update(uid, this.dataForm.id, this.form)
        } else {
          await create(uid, this.form)
        }

        this.$snotify.success(`Idioma ${isEdit ? 'atualizado' : 'criado'} com sucesso`)
        this.$emit('onSave')
        this.closeModal()
      } catch (error) {
        this.$snotify.error('Erro ao salvar idioma:', error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.form = {} as ILanguageForm
      this.errors = {} as ILanguageForm
      this.$emit('onClose')
    },
  },
  computed: {
    statusList() {
      return this.languageStatus.map((status) => ({
        id: status.title,
        title: status.title,
      }))
    },
  },
}
</script>
<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .flex {
    display: flex;
    gap: 1rem;

    main {
      flex: 1;
    }
  }
}
</style>
