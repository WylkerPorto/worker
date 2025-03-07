<template>
  <main>
    <label :for="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      @input="$emit('update', $event.target.value)"
      :id="label"
    />
  </main>
</template>
<script lang="ts">
export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update'],
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.2rem;
    font-weight: 400;
    font-size: 12px;
  }

  input {
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background: transparent;
    font-size: 16px;
    color: var(--text);
    outline: none;
  }
}
</style>
