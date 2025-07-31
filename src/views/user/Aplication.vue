<template>
  <div>Aplicações</div>
</template>
<script lang="ts">
import DataTable from '@/components/core/DataTable.vue'
import { list as getAplication } from '@/api/aplication'

export default {
  name: 'UserAplication',
  components: {
    DataTable,
  },
}
</script>
<style lang=""></style>
