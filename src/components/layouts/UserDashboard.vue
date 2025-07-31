<template>
  <header>
    <nav>
      <router-link :to="{ name: 'userAplication' }">Aplicação</router-link>
      <router-link :to="{ name: 'userVacancy' }">Vagas</router-link>
      <router-link :to="{ name: 'userProfile' }">Currículo</router-link>
      <router-link to="/logout">Sair</router-link>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

export default {
  name: 'UserLayout',
  components: {
    RouterView,
  },
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 5px 10px;
  background: var(--text);

  a {
    text-decoration: none;
    padding: 10px 25px;
    border-radius: 16px;
    color: var(--background);

    &:hover {
      background: var(--background);
      color: var(--text);
    }
  }
}
</style>
