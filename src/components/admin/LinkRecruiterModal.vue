<template>
  <ModalBase :open="show" :loading="loading" title="Confirmar Exclusão" @onClose="$emit('onClose')">
    <template #content>
      <section>
        <Icon icon="carbon:warning" />

        <div>
          <p>
            Atribuir o recrutador <b>{{ dataForm?.name }}</b> ao supervisor
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
import { linkSupervisor } from '@/api/recruiter'
import { list } from '@/api/supervisor'
import ModalBase from '@/components/core/ModalBase.vue'
import { Icon } from '@iconify/vue'
import MyButton from '../core/MyButton.vue'
import MySelect from '../core/MySelect.vue'

export default {
  name: 'LinkRecruiterModal',
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
      supervisors: [],
      selectedSupervisor: null,
    }
  },
  mounted() {
    this.fetchSupervisors()
  },
  methods: {
    async fetchSupervisors() {
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
    async linkRecruiter() {
      this.loading = true
      try {
        if (this.dataForm?.id && this.selectedSupervisor) {
          await linkSupervisor(this.dataForm.id, this.selectedSupervisor)
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
