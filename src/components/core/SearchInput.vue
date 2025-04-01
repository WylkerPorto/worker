<template>
  <main>
    <input
      type="search"
      :placeholder="placeholder"
      :value="modelValue"
      :class="{ show: modelValue }"
      @input="$emit('update:modelValue', $event.target.value)"
      ref="input"
    />
    <Icon icon="bi:search" />
  </main>
</template>
<script lang="ts">
import { Icon } from '@iconify/vue'

export default {
  name: 'SearchInput',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  components: {
    Icon,
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    select() {
      this.$refs.input.select()
    },
  },
}
</script>
<style lang="scss" scoped>
main {
  position: relative;
  display: flex;
  justify-content: flex-end;

  input {
    padding: 0.25rem 1.7rem 0.25rem 0.5rem;
    border: 1px solid var(--border);
    border-radius: 1.5rem;
    font-size: 16px;
    width: 0;
    max-width: 250px;
    outline: none;
    color: var(--text);
    transition: width 0.5s;

    &:focus,
    &:active,
    &.show {
      width: 100%;
    }
  }

  .iconify {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text);
    pointer-events: none;
    transition: all 0.5s;
  }
}
</style>
