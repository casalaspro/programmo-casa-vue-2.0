<script>
// import { defineAsyncComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


export default {
  components: {
    AppHeader,
    AppFooter
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
  <AppFooter />
</template>

<style lang="scss">
@use './style/general.scss';
</style>
