<template>
  <ModalBase :open="show" :loading="loading" title="Confirmar Exclusão" @onClose="$emit('onClose')">
    <template #content>
      <section>
        <Icon icon="carbon:warning" />

        <div>
          <p>
            Tem certeza que deseja excluir o recrutador
            <span>{{ dataForm?.name }}</span>
            ?
          </p>
          <p>Essa ação não pode ser desfeita!</p>
        </div>
      </section>
    </template>
    <template #actions>
      <MyButton class="btn danger" :loading="loading" @click="deleteRecrutador">Confirmar</MyButton>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import ModalBase from '@/components/core/ModalBase.vue'
import { Icon } from '@iconify/vue'
import MyButton from '../core/MyButton.vue'
import { remove } from '@/api/user'

export default {
  name: 'DeleteRecruiterModal',
  components: {
    ModalBase,
    Icon,
    MyButton,
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
    }
  },
  methods: {
    async deleteRecrutador() {
      this.loading = true
      try {
        await remove(this.dataForm.id)
        this.$snotify.success('Recrutador excluído com sucesso!')
        this.$emit('onConfirm')
        this.$emit('onClose')
      } catch (error) {
        this.$snotify.error('Erro ao excluir o recrutador: ' + error)
      } finally {
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

    span {
      font-weight: bolder;
    }
  }
}
</style>
