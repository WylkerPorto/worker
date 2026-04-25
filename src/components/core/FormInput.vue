<template>
  <main :class="{ 'money-field': mask === 'money' }">
    <label :for="label">{{ label }}</label>
    <div class="money-wrapper" v-if="mask === 'money'">
      <span class="money-prefix">R$</span>
      <input type="text" inputmode="numeric" autocomplete="off" :placeholder="placeholder"
        :value="type === 'date' ? moment(modelValue).format('YYYY-MM-DD') : formatMoneyDisplay(modelValue)"
        @input="handleInput" :id="label" ref="input" :class="{ error: error }" :readonly="readonly"
        :disabled="readonly" />
    </div>
    <input v-else :type="type" :placeholder="placeholder"
      :value="type === 'date' ? moment(modelValue).format('YYYY-MM-DD') : modelValue" @input="handleInput" :id="label"
      ref="input" :class="{ error: error }" :readonly="readonly" :disabled="readonly" />
    <span>{{ error }}</span>
  </main>
</template>
<script lang="ts">
import moment from 'moment';

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
      default: '', // tel | rg | cpf | cnh | money
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      moment,
    }
  },
  emits: ['update:modelValue'],
  watch: {
    readonly: {
      handler(newVal: boolean) {
        if (newVal) {
          this.$emit('update:modelValue', null)
        }
      },
      immediate: true,
    },
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
    handleInput(event: Event) {
      const input = event.target as HTMLInputElement
      let value = input.value
      let emittedValue: string | number = value

      // Aplica máscara se houver
      if (this.mask) {
        if (this.mask === 'money') {
          // Money: centavos automáticos (1 => 0,01 | 10 => 0,10 | 100 => 1,00)
          const digits = value.replace(/\D/g, '').slice(0, 15)

          if (!digits) {
            value = ''
            emittedValue = ''
          } else {
            const amount = Number(digits) / 100
            value = new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(amount)
            emittedValue = Number(amount.toFixed(2))
          }
        } else {
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
      }

      input.value = value
      this.$emit('update:modelValue', emittedValue)
    },
    formatMoneyDisplay(value: string | number) {
      if (value === null || value === undefined || value === '') {
        return ''
      }

      const numberValue = typeof value === 'number'
        ? value
        : Number(String(value).replace(',', '.').replace(/[^\d.-]/g, ''))

      if (Number.isNaN(numberValue)) {
        return ''
      }

      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numberValue)
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;

  .money-wrapper {
    position: relative;

    .money-prefix {
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text);
      pointer-events: none;
      font-size: 1rem;
      font-weight: 400;
    }

    input {
      padding-left: 40px;
      width: 100%;
    }
  }

  .error {
    border: 1px solid var(--red);
  }

  span {
    color: var(--red);
    font-size: 0.8rem;
    margin-left: 15px;
  }

  input[readonly],
  input[disabled] {
    background-color: var(--background);
    color: var(--text);
    cursor: not-allowed;
  }
}
</style>
