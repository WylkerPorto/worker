<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
  </header>
  <main>
    <aside>user menu</aside>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

export default {
  name: 'DashboardLayout',
  components: {
    RouterView,
  },
}
</script>

<style lang="scss" scoped></style>
