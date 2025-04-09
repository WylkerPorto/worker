<template>
  <main v-if="open">
    <section class="card">
      <header>
        <h1>{{ title }}</h1>
        <button class="rounded" @click="$emit('onClose')" :disabled="loading">
          <Icon icon="carbon:close-outline" />
        </button>
      </header>
      <slot name="content" />
      <slot name="actions" />
    </section>
  </main>
</template>
<script lang="ts">
import { Icon } from '@iconify/vue'
export default {
  name: 'ModalBase',
  props: {
    title: {
      type: String,
      default: 'Modal title',
    },
    open: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Icon,
  },
  emits: ['onClose'],
}
</script>
<style lang="scss" scoped>
main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  section {
    max-width: 650px;
    width: 100%;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-size: 1.5rem;
        font-weight: 500;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 25px;
      }
    }
  }
}
</style>
