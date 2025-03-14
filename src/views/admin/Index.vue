<template>
  <main>
    <div>admin dashboard</div>
    <DataTableComponent :items="items" :columns="menuItems" :total="80" />
  </main>
</template>
<script lang="ts">
import DataTableComponent from '@/components/core/DataTable.vue'
export default {
  name: 'AdminIndex',
  components: {
    DataTableComponent,
  },
  data() {
    return {
      menuItems: [
        { title: 'Nome', key: 'name' },
        { title: 'Idade', key: 'date' },
        { title: 'Logs', key: 'value' },
      ],
      items: [
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
        { name: 'Joaquim', date: '10 anos', value: '10' },
        { value: '35', name: 'João', date: '15 anos' },
        { name: 'Jorel', date: '18 anos', value: '48' },
        { name: 'Jorge', value: '-16', date: '19 anos' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  max-width: 50vw;
  margin: auto;
}
</style>
