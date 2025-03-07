<template>
  <button type="button" @click="$emit('click')" :disabled="loading">
    <slot v-if="!loading" />
    <span v-else>Loading...</span>
  </button>
</template>

<script lang="ts">
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
  computed: {
    backgroundColor() {
      return `var(--${this.type})`
    },
    hoverBackgroundColor() {
      return `var(--${this.type}-hover)`
    },
    textColor() {
      return `var(--${this.type}-text)`
    },
    pointerStyle() {
      return this.loading ? 'progress' : 'pointer'
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  padding: 0.5rem 2rem;
  border-radius: 0.25rem;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: v-bind(pointerStyle);
  background-color: v-bind(backgroundColor);
  color: v-bind(textColor);
  transition: background-color 0.3s;

  &:hover {
    background-color: v-bind(hoverBackgroundColor);
  }
}
</style>
