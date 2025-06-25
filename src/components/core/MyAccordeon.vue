<template>
  <div class="accordeon">
    <div class="header" @click="toggle" :class="{ expanded: expanded }">
      <span class="title">{{ title }}</span>
      <Icon icon="bx:down-arrow" />
    </div>
    <div class="body" v-show="expanded">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'
export default {
  name: 'MyAccordeon',
  props: {
    title: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: false,
    }
  },
  components: {
    Icon,
  },
  mounted() {
    this.expanded = this.isOpen
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    },
  },
}
</script>

<style lang="scss" scoped>
.accordeon {
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--white);
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 1rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  background: var(--link);
  user-select: none;
  color: var(--white);

  &.expanded {
    svg {
      transform: rotate(180deg);
      transition: transform 0.2s;
    }
  }
}

.title {
  font-weight: 600;
  font-size: 1.1rem;
}

.body {
  padding: 1rem;
  border-top: 1px solid #eee;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
