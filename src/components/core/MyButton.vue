<template>
  <button class="btn" :type="type" @click="$emit('click')" :disabled="loading">
    <slot v-if="!loading" />
    <Icon v-else class="loader" icon="svg-spinners:3-dots-scale" />
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
      default: 'submit',
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

  .loader {
    font-size: 25px;
  }
}
</style>
