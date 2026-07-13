<template>
  <ModalBase :open="show" :loading="loading" title="Transferir Vaga" @onClose="$emit('onClose')">
    <template #content>
      <section>
        <Icon icon="carbon:warning" />

        <div>
          <p>
            Transferir a vaga <b>{{ dataForm?.title }}</b> ao recrutador
            <MySelect v-model="selectedRecruiter" :options="recruiters" />
          </p>
        </div>
      </section>
    </template>
    <template #actions>
      <MyButton class="btn success" :loading="loading" @click="linkVacancy">Confirmar</MyButton>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import { list } from '@/api/recruiter'
import { transfer } from '@/api/vacancy'
import ModalBase from '@/components/core/ModalBase.vue'
import { Icon } from '@iconify/vue'
import MyButton from '../core/MyButton.vue'
import MySelect from '../core/MySelect.vue'

export default {
  name: 'TransferVacancyModal',
  components: {
    ModalBase,
    Icon,
    MyButton,
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
  emits: ['onClose', 'onConfirm'],
  data() {
    return {
      loading: false,
      recruiters: [],
      selectedRecruiter: null,
    }
  },
  mounted() {
    this.fetchRecruiters()
  },
  methods: {
    async fetchRecruiters() {
      try {
        const data = await list('')
        this.recruiters = data.data.map((recruiter: any) => ({
          id: recruiter.id,
          title: recruiter.name,
        }))
      } catch (error) {
        this.$snotify.error('Erro ao buscar recrutadores: ' + error.response.data.message)
      }
    },
    async linkVacancy() {
      this.loading = true
      try {
        if (this.dataForm?.id && this.selectedRecruiter) {
          await transfer(this.dataForm.id, this.selectedRecruiter)
          this.$snotify.success('Vaga transferida ao recrutador com sucesso!')
          this.$emit('onConfirm')
          this.$emit('onClose')
        } else {
          this.$snotify.error('Selecione um recrutador para transferir a vaga.')
        }
      } catch (error) {
        this.$snotify.error('Erro ao transferir a vaga: ' + error.response.data.message)
      } finally {
        this.selectedRecruiter = null
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  gap: 1rem;
  align-items: center;

  .iconify {
    font-size: 100px;
    color: var(--red);
  }

  p {
    font-size: 20px;

    b {
      font-weight: bold;
    }
  }
}
</style>
