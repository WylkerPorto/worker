<template>
  <main>
    <label :for="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event?.target?.value)"
      :id="label"
      ref="input"
      :class="{ error: error }"
    />
    <span>{{ error }}</span>
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
    modelValue: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
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
  display: flex;
  flex-direction: column;

  .error {
    border: 1px solid red;
  }

  span {
    color: red;
    font-size: 0.8rem;
    margin-left: 15px;
  }
}
</style>
