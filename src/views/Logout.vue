<template>
  <section>
    <p>Saindo <Icon icon="svg-spinners:3-dots-bounce" /></p>
  </section>
</template>
<script lang="ts">
import { Icon } from '@iconify/vue'

export default {
  name: 'LogoutView',
  components: {
    Icon,
  },
  mounted() {
    localStorage.removeItem('login')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.$router.push({ name: 'login' })
  },
}
</script>
<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  p {
    font-size: 40px;
    display: flex;
    align-items: flex-start;

    .iconify {
      font-size: 50px;
    }
  }
}
</style>
