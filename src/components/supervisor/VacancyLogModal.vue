<template>
  <ModalBase :open="show" title="Visualizar Log" @onClose="$emit('onClose')">
    <template #content>
      <section>
        <h3>
          Informações da vaga: <b>{{ dataForm?.title }}</b>
        </h3>
        <div v-if="loading" class="loading">
          <Icon class="loader" icon="svg-spinners:3-dots-scale" />
        </div>
        <div v-else>
          <article v-for="item in log" :key="item.id">
            <p>
              Ator: <b>{{ item.actor.name }}</b>
            </p>
            <p>
              Ação: <b>{{ item.actionType }}</b> | Data: <b>{{ toFormatDate(item.occurredAt) }}</b>
            </p>
            <details>
              <summary>ver Payload</summary>
              <pre>{{ item.payload }}</pre>
            </details>
          </article>
        </div>
      </section>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import { log } from '@/api/vacancy'
import ModalBase from '@/components/core/ModalBase.vue'
import { toFormatDate } from '@/utils/conversores'
import { Icon } from '@iconify/vue'

export default {
  name: 'VacancyLogModal',
  components: {
    ModalBase,
    Icon,
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
  emits: ['onClose'],
  data() {
    return {
      toFormatDate,
      loading: false,
      log: [] as any[],
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.getLog()
      }
    },
  },
  methods: {
    async getLog() {
      this.loading = true
      try {
        const { data } = await log(this.dataForm.id)
        this.log = data
      } catch (error) {
        this.$snotify.error('Erro ao carregar o log: ' + error.response.data.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
b {
  font-weight: bold;
}

div {
  margin-top: 1rem;
  max-height: 350px;
  overflow-y: auto;
  padding-right: 1rem;

  article {
    border: 1px solid var(--blue);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;

    details {
      margin-top: 0.5rem;

      summary {
        cursor: pointer;
        font-weight: bold;
      }

      pre {
        background-color: var(--background);
        padding: 0.5rem;
        border-radius: 0.25rem;
        overflow-x: auto;
      }
    }
  }
}
</style>
