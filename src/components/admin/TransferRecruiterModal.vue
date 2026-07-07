<template>
  <ModalBase
    :open="show"
    :loading="loading"
    title="Confirmar Atribuição"
    @onClose="$emit('onClose')"
  >
    <template #content>
      <section>
        <Icon icon="carbon:warning" />

        <div>
          <p>
            Transferir o recrutador
            <MySelect v-model="selectedRecruiter" :options="recruiters" />
            do surpevisor <b>{{ dataForm?.name }}</b> para o surpevisor
            <MySelect v-model="selectedSupervisor" :options="supervisors" />
          </p>
        </div>
      </section>
    </template>
    <template #actions>
      <MyButton class="btn success" :loading="loading" @click="linkRecruiter">Confirmar</MyButton>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import { getRecruitersBySupervisor, linkSupervisor } from '@/api/recruiter'
import { list } from '@/api/supervisor'
import ModalBase from '@/components/core/ModalBase.vue'
import { Icon } from '@iconify/vue'
import MyButton from '../core/MyButton.vue'
import MySelect from '../core/MySelect.vue'

export default {
  name: 'TransferRecruiterModal',
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
      supervisors: [],
      selectedSupervisor: null,
    }
  },
  watch: {
    dataForm() {
      if (this.dataForm?.id) {
        this.getRecruiters(this.dataForm.id)
      }
    },
  },
  mounted() {
    this.getSupervisors()
  },
  methods: {
    async getSupervisors() {
      try {
        const supervisors = await list('')
        this.supervisors = supervisors.data.map((supervisor: any) => ({
          id: supervisor.id,
          title: supervisor.name,
        }))
      } catch (error) {
        this.$snotify.error('Erro ao buscar supervisores: ' + error)
      }
    },
    async getRecruiters(id: string) {
      try {
        const recruiters = await getRecruitersBySupervisor(id)
        this.recruiters = recruiters.data.map((recruiter: any) => ({
          id: recruiter.id,
          title: recruiter.name,
        }))
      } catch (error) {
        this.$snotify.error('Erro ao buscar recrutadores: ' + error)
      }
    },
    async linkRecruiter() {
      this.loading = true
      try {
        if (this.selectedRecruiter && this.selectedSupervisor) {
          await linkSupervisor(this.selectedRecruiter, this.selectedSupervisor)
          this.$snotify.success('Recrutador vinculado ao supervisor com sucesso!')
          this.$emit('onConfirm')
          this.$emit('onClose')
        } else {
          this.$snotify.error('Selecione um supervisor para vincular o recrutador.')
        }
      } catch (error) {
        this.$snotify.error('Erro ao vincular o recrutador: ' + error)
      } finally {
        this.selectedSupervisor = null
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
  justify-content: center;

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
