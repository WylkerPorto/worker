<template>
  <main>
    <label :for="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
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
    mask: {
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
    handleInput(event: Event) {
      const input = event.target as HTMLInputElement
      let value = input.value

      // Aplica máscara se houver
      if (this.mask) {
        // Telefones: mask (99) 99999-9999
        if (this.mask === 'tel') {
          value = value.replace(/\D/g, '').slice(0, 11) // Apenas números
          const match = value.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
          if (match) {
            value = !match[2]
              ? match[1]
              : `(${match[1]}) ${match[2]}` + (match[3] ? `-${match[3]}` : '')
          }
        }
      }

      input.value = value
      this.$emit('update:modelValue', value)
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
