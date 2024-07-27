<template>
  <div class="card h-100 text-center">
    <!-- mostriamo gli appartamenti in evidenza -->
    <RouterLink :to="{ name: 'apartment.show', params: {id: apartment.id} }">
      <div class="card-body my_card-body">
        <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top img_card" alt="">

        <div class="my_card-title">
          <div class="my_title">
            <h4>{{ apartment.title_apartment }}</h4>
          </div>
          <div class="my-shadow"></div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>

export default {
  props:{
    apartment:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  created() {
    
  }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/apartment-card';
</style>