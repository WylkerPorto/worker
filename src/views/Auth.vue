<template>
  <main>
    <LoginCard :dataForm="form" v-if="form.type === 'login'" />
    <RegisterCard :dataForm="form" v-if="form.type === 'register'" />
    <RememberCard :dataForm="form" v-if="form.type === 'forgot-password'" />
  </main>
</template>
<script lang="ts">
import RegisterCard from '@/components/auth/RegisterCard.vue'
import LoginCard from '@/components/auth/LoginCard.vue'
import RememberCard from '@/components/auth/RememberCard.vue'

export default {
  name: 'LoginView',
  components: {
    LoginCard,
    RegisterCard,
    RememberCard,
  },
  data() {
    return {
      form: { type: 'login' },
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
