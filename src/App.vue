<template>
  <vue-snotify />
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    RouterView,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'Empty'}Layout`
    },
  },
}
</script>

<style lang="scss" scoped></style>
