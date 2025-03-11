<template>
  <aside :class="{ show: showSidebar }" @mouseover="expandSidebar" @mouseleave="minimizeSidebar">
    <Icon icon="stash:burger-arrow-right-duotone" v-if="!showSidebar" @click="toggleSidebar" />
    <Icon icon="stash:burger-arrow-left-duotone" v-else @click="toggleSidebar" />

    <nav>
      <routerLink :to="{ name: 'adminDashboard' }">
        <Icon icon="stash:dashboard" />
        <span>Dashboard</span>
      </routerLink>
      <routerLink :to="{ name: 'adminDashboard' }">
        <Icon icon="mdi:administrator-outline" />
        <span>Administradores</span>
      </routerLink>
      <routerLink :to="{ name: 'adminDashboard' }">
        <Icon icon="mdi:leads" />
        <span>Recrutadores</span>
      </routerLink>
      <routerLink :to="{ name: 'adminDashboard' }">
        <Icon icon="icon-park-outline:log" />
        <span>Log</span>
      </routerLink>
      <routerLink :to="{ name: 'adminDashboard' }">
        <Icon icon="mdi:login" />
        <span>Sair</span>
      </routerLink>
    </nav>
  </aside>
</template>
<script lang="ts">
import { Icon } from '@iconify/vue'

export default {
  name: 'AdminSideMenu',
  data() {
    return {
      showSidebar: false,
    }
  },
  components: {
    Icon,
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
  },
}
</script>
<style lang="scss" scoped>
aside {
  background-color: var(--text);
  color: var(--background);
  width: 60px;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  overflow: hidden;

  &:hover,
  &.show {
    width: 200px;

    nav {
      .iconify {
        margin: 0 10px 0 0;
      }

      span {
        display: block;
        opacity: 1;
        transition: opacity 0.5s;
      }
    }
  }

  > .iconify {
    font-size: 30px;
    margin-bottom: 30px;
  }

  nav {
    display: flex;
    flex-direction: column;

    a {
      color: var(--white);
      text-decoration: none;
      padding: 0.5rem 1rem;
      width: 100%;
      text-wrap: nowrap;
      display: flex;
      align-items: center;

      &:hover {
        background-color: var(--link);
      }

      .iconify {
        font-size: 25px;
        margin: 0 auto;
      }

      span {
        display: none;
        opacity: 0;
      }
    }
  }

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    margin-bottom: 1rem;
  }
}
</style>
