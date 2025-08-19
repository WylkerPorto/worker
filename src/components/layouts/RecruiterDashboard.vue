<template>
  <div class="dashboard-layout" @click="handleClickOutside">
    <header>
      <span>Bem-vindo, {{ userName }}</span>
      <div class="dropdown" ref="dropdown">
        <div @click="toggleDropdown">
          <button>Perfil</button>
          <Icon v-if="!dropdownOpen" icon="iconamoon:arrow-down-2-bold" />
          <Icon v-else icon="majesticons:close-line" />
        </div>

        <div v-if="dropdownOpen" class="dropdown-menu">
          <router-link :to="{ name: 'recruiterProfile' }">Perfil</router-link>
          <router-link :to="{ name: 'logout' }">Logout</router-link>
        </div>
      </div>
    </header>
    <main>
      <RecruiterAsideMenu :items="menuItems" />
      <section>
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import RecruiterAsideMenu from '@/components/admin/SideMenu.vue'
import { Icon } from '@iconify/vue'
import { RouterView } from 'vue-router'

export default {
  name: 'RecruiterLayout',
  components: {
    RouterView,
    RecruiterAsideMenu,
    Icon,
  },
  data() {
    return {
      userName: 'Recrutador',
      dropdownOpen: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    handleClickOutside(event: MouseEvent) {
      const dropdown = this.$refs.dropdown as HTMLElement
      if (dropdown && !dropdown.contains(event.target as Node)) {
        this.dropdownOpen = false
      }
    },
    getMenuItems() {
      return [
        {
          label: 'Dashboard',
          name: 'recruiterDashboard',
          icon: 'stash:dashboard',
        },
        {
          label: 'Cargos',
          name: 'recruiterPosition',
          icon: 'ic:outline-workspace-premium',
        },
        {
          label: 'Setor',
          name: 'recruiterDepartment',
          icon: 'streamline-sharp:workspace-desk',
        },
        {
          label: 'Vagas',
          name: 'recruiterVacancy',
          icon: 'material-symbols:work-outline',
        },
        {
          label: 'Sair',
          name: 'logout',
          icon: 'mdi:login',
        },
      ]
    },
  },
  computed: {
    menuItems() {
      return this.getMenuItems()
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  header {
    background-color: var(--white);
    color: var(--text);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .dropdown {
      position: relative;

      button {
        background: none;
        border: none;
        color: var(--text);
        cursor: pointer;
      }

      .dropdown-menu {
        position: absolute;
        right: 0;
        background-color: #fff;
        color: var(--text);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 0.25rem;
        overflow: hidden;
        z-index: 5;

        a {
          display: block;
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: inherit;
          text-wrap: nowrap;

          &:hover {
            background-color: var(--glass);
          }
        }
      }
    }
  }

  >main {
    display: flex;
    flex: 1;

    section {
      flex: 1;
      padding: 1rem;
    }
  }
}
</style>
