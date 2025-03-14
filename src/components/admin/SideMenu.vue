<template>
  <aside :class="{ show: showSidebar }" @mouseover="expandSidebar" @mouseleave="minimizeSidebar">
    <Icon icon="stash:burger-arrow-right-duotone" v-if="!showSidebar" @click="toggleSidebar" />
    <Icon icon="stash:burger-arrow-left-duotone" v-else @click="toggleSidebar" />

    <nav>
      <LinkMenu v-for="item in items" :key="item.label" :item="item" />
    </nav>
  </aside>
</template>
<script lang="ts">
import LinkMenu from './LinkMenu.vue'
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
    LinkMenu,
  },
  props: {
    items: {
      type: Array,
    },
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
  }

  > .iconify {
    font-size: 30px;
    margin-bottom: 30px;
  }
}
</style>
