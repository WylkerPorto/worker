<template>
  <routerLink :to="{ name: item.name }">
    <Icon :icon="item.icon" />
    <span>{{ item.label }}</span>
  </routerLink>
</template>
<script lang="ts">
import { Icon } from '@iconify/vue'

export default {
  name: 'LinkMenu',
  components: {
    Icon,
  },
  props: {
    item: {
      type: Object,
    },
  },
}
</script>
<style lang="scss" scoped>
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

aside:hover,
aside.show {
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
</style>
