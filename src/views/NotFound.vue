<template>
  <main>
    <Icon icon="iconoir:file-not-found" />
    <p>Página não encontrada</p>
  </main>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'

export default {
  name: 'NotFoundView',
  components: {
    Icon,
  },
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .iconify {
    font-size: 250px;
  }

  p {
    font-size: 40px;
    font-weight: 500;
  }
}
</style>
