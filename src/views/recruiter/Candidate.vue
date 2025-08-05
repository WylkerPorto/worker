<template>
  <div>Viu esse cara que maneiro</div>
</template>
<script lang="ts">
import { type IPersonForm } from '@/interfaces/IPerson'
import { get } from '@/api/user'
import { getAplicationStatus } from '@/api/filters'

export default {
  name: 'CandidateView',
  data() {
    return {
      loading: false,
      candidate: {} as IPersonForm,
      aplicationStatus: [],
    }
  },
  mounted() {
    this.getCandidate()
    this.getAplicationStatus()
  },
  methods: {
    async getCandidate() {
      try {
        this.loading = true
        const { data } = await get(this.$route.params.id)
        this.candidate = data
      } catch (error) {
        this.$snotify.error('Erro ao carregar o candidato: ' + error)
      } finally {
        this.loading = false
      }
    },
    async getAplicationStatus() {
      try {
        this.loading = true
        const { data } = await getAplicationStatus()
        this.aplicationStatus = data
      } catch (error) {
        this.$snotify.error('Erro ao carregar os status: ' + error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
