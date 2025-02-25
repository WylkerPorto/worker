<template>
  <RouterView />
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

export default {
  name: 'EmptyLayout',
  components: {
    RouterView,
  },
}
</script>

<style lang="scss" scoped></style>
