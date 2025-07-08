<template>
  <ModalBase :open="show" title="Confirmação de Exclusão" @onClose="$emit('onClose')">
    <template #content>
      <p>Você tem certeza que deseja excluir este item?</p>
      <p>Esta ação não pode ser desfeita.</p>
    </template>
    <template #actions>
      <MyButton class="btn danger" @click="$emit('onConfirm')">Excluir</MyButton>
      <MyButton class="btn secondary" @click="$emit('onClose')">Cancelar</MyButton>
    </template>
  </ModalBase>
</template>
<script lang="ts">
import ModalBase from '../core/ModalBase.vue'
import MyButton from '../core/MyButton.vue'

export default {
  name: 'DeleteConfirmationModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['onClose', 'onConfirm'],
  components: {
    ModalBase,
    MyButton,
  },
}
</script>
<style lang="scss" scoped></style>
