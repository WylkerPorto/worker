<template>
  <button :type="type" @click="$emit('click')" :disabled="loading">
    <slot v-if="!loading" />
    <Icon v-else icon="svg-spinners:3-dots-move" />
  </button>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'

export default {
  name: 'MyButton',
  emits: ['click'],
  props: {
    type: {
      type: String,
      default: 'default',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Icon,
  },
  computed: {
    pointerStyle() {
      return this.loading ? 'progress' : 'pointer'
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  cursor: v-bind(pointerStyle);
}
</style>
