<template>
  <main>
    <label :for="label">{{ label }}</label>
    <input :type="type" :placeholder="placeholder"
      :value="type === 'date' ? moment(modelValue).format('YYYY-MM-DD') : modelValue" @input="handleInput" :id="label"
      ref="input" :class="{ error: error }" />
    <span>{{ error }}</span>
  </main>
</template>
<script lang="ts">
import moment from 'moment'

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
      default: '', // tel | rg | cpf | cnh
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
  data() {
    return {
      moment,
    }
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
        // Normaliza para números
        value = value.replace(/\D/g, '')

        if (this.mask === 'tel') {
          // Telefones: (99) 99999-9999
          value = value.slice(0, 11)
          const match = value.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
          if (match) {
            value = !match[2]
              ? match[1]
              : `(${match[1]}) ${match[2]}` + (match[3] ? `-${match[3]}` : '')
          }
        }

        if (this.mask === 'rg') {
          // RG: 99.999.999-9
          value = value.slice(0, 9)
          const match = value.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,1})$/)
          if (match) {
            value =
              (match[1] ? match[1] : '') +
              (match[2] ? '.' + match[2] : '') +
              (match[3] ? '.' + match[3] : '') +
              (match[4] ? '-' + match[4] : '')
          }
        }

        if (this.mask === 'cpf') {
          // CPF: 999.999.999-99
          value = value.slice(0, 11)
          const match = value.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/)
          if (match) {
            value =
              (match[1] ? match[1] : '') +
              (match[2] ? '.' + match[2] : '') +
              (match[3] ? '.' + match[3] : '') +
              (match[4] ? '-' + match[4] : '')
          }
        }

        if (this.mask === 'cnh') {
          // CNH: apenas números, 11 dígitos
          value = value.slice(0, 11)
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
    border: 1px solid var(--red);
  }

  span {
    color: var(--red);
    font-size: 0.8rem;
    margin-left: 15px;
  }
}
</style>
