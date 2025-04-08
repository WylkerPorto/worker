<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
  </header>
  <main>
    <aside>supervisor menu</aside>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

export default {
  name: 'SupervisorLayout',
  components: {
    RouterView,
  },
}
</script>

<style lang="scss" scoped></style>
