<template>
  <div>
    <Curriculum />
  </div>
</template>
<script lang="ts">
import Curriculum from '@/components/user/Curriculum.vue'
export default {
  name: 'UserProfile',
  components: {
    Curriculum,
  },
}
</script>
<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 800px;
}
</style>
