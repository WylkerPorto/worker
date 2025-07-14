<template>
  <main>
    <div class="wrapper">
      <label v-if="label" class="label">{{ label }}</label>

      <div class="select" :class="{ error: !!error }" @click="toggleDropdown">
        <span class="value">
          {{ selectedOptionTitle || 'Selecione' }}
        </span>
        <span class="arrow" :class="{ open: isOpen }"><Icon icon="bx:down-arrow" /></span>
      </div>

      <ul v-if="isOpen" class="dropdown">
        <li
          v-for="option in options"
          :key="option.id"
          @click.stop="selectOption(option)"
          class="option"
          :class="{ selected: option.id === modelValue }"
        >
          {{ option.title }}
        </li>
      </ul>
    </div>
    <span v-if="error" class="error">{{ error }}</span>
  </main>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: [String, Number, null],
      required: true,
    },
    options: {
      type: Array as () => { id: string | number; title: string }[],
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  components: {
    Icon,
  },
  computed: {
    selectedOptionTitle(): string | null {
      const selected = this.options.find((opt) => opt.id === this.modelValue)
      return selected ? selected.title : null
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option: { id: string | number; title: string }) {
      this.$emit('update:modelValue', option.id)
      this.isOpen = false
    },
    handleClickOutside(event: MouseEvent) {
      if (!(this.$el as HTMLElement).contains(event.target as Node)) {
        this.isOpen = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  .label {
    margin-bottom: 0.2rem;
    font-size: 14px;
    font-weight: 400;
    margin-left: 15px;
  }

  .select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    transition: border 0.2s ease;
    background: var(--white);
    padding: 0.7rem;
    border: 1px solid var(--border);
    border-radius: 1.5rem;
    font-size: 18px;
    width: 100%;
    outline: none;
    color: var(--text);

    &.error {
      border-color: var(--red);
    }

    .value {
      flex: 1;
    }

    .arrow {
      margin-left: 8px;
      font-size: 12px;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 20px;
    right: 20px;
    background: var(--white);
    border: 1px solid #ccc;
    z-index: 10;
    border-radius: 4px;
    margin-top: 2px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    .option {
      padding: 8px 12px;
      cursor: pointer;

      &:hover,
      &.selected {
        background: var(--glass);
      }
    }
  }
}

span.error {
  color: var(--red);
  font-size: 0.8rem;
  margin-left: 15px;
}
</style>
