<template>
  <main>
    <div class="wrapper">
      <label v-if="label" class="label">{{ label }}</label>

      <div class="select" :class="{ error: !!error }" @click="toggleDropdown">
        <span class="value">
          {{ selectedLabel }}
        </span>
        <span class="arrow" :class="{ open: isOpen }"><Icon icon="bx:down-arrow" /></span>
      </div>

      <ul v-if="isOpen" class="dropdown">
        <li
          v-for="option in options"
          :key="option.id"
          @click.stop="toggleOption(option)"
          class="option"
          :class="{ selected: isSelected(option.id) }"
        >
          <span class="checkbox" :class="{ checked: isSelected(option.id) }">
            <Icon v-if="isSelected(option.id)" icon="mdi:check" />
          </span>
          <span>{{ option.title }}</span>
        </li>
      </ul>
    </div>
    <span v-if="error" class="error">{{ error }}</span>
  </main>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'

type SelectOption = {
  id: string | number
  title: string
}

export default {
  name: 'MyMultSelect',
  props: {
    modelValue: {
      type: Array as () => (string | number)[],
      default: () => [],
    },
    options: {
      type: Array as () => SelectOption[],
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      default: 'Selecione',
    },
    error: {
      type: String,
      required: false,
    },
  },
  components: {
    Icon,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    selectedLabel(): string {
      const selectedTitles = this.options
        .filter((opt) => this.modelValue.includes(opt.id))
        .map((opt) => opt.title)

      return selectedTitles.length ? selectedTitles.join(', ') : this.placeholder
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
    isSelected(id: string | number) {
      return this.modelValue.includes(id)
    },
    toggleOption(option: SelectOption) {
      const nextValue = this.isSelected(option.id)
        ? this.modelValue.filter((id) => id !== option.id)
        : [...this.modelValue, option.id]

      this.$emit('update:modelValue', nextValue)
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover,
      &.selected {
        background: var(--glass);
      }

      .checkbox {
        width: 16px;
        height: 16px;
        border: 1px solid var(--border);
        border-radius: 3px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;

        &.checked {
          border-color: var(--text);
        }
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
