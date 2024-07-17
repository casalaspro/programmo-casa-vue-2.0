<script>
// import { defineAsyncComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      
    }
  }
}
</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style lang="scss">
@use './style/general.scss';
</style>
