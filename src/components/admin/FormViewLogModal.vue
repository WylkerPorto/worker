<template>
  <ModalBase :open="show" :loading="loading" title="Visualizar Log" @onClose="$emit('onClose')">
    <template #content>
      <section>
        <p>{{ dataForm?.message }}</p>
      </section>
    </template>
  </ModalBase>
</template>

<script lang="ts">
import ModalBase from '@/components/core/ModalBase.vue'

export default {
  name: 'FormViewLogModal',
  components: {
    ModalBase,
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
}
</script>
<style lang="scss" scoped></style>
