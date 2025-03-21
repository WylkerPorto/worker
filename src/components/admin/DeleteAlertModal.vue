<template>
  <ModalBase :open="show" title="Confirmar Exclusão" @onClose="$emit('onClose')">
    <template #content>
      <section>
        <Icon icon="carbon:warning" />

        <div>
          <p>
            Tem certeza que deseja excluir o administrador <span>{{ userName }}</span
            >?
          </p>
          <p>Essa ação não pode ser desfeita!</p>
        </div>
      </section>
    </template>
    <template #actions>
      <button class="btn danger" @click="$emit('onConfirm')">Confirmar</button>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import ModalBase from '@/components/core/ModalBase.vue'
import { Icon } from '@iconify/vue'

export default {
  name: 'DeleteAlertModal',
  components: {
    ModalBase,
    Icon,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      default: '',
    },
  },
  emits: ['onClose', 'onConfirm'],
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
