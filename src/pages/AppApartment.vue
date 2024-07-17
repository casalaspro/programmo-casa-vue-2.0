<template>
  <main class="page-show">

    <div class="container p-5">
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <AppShowApartmentCard :apartment="apartment"/>
          
          </div>
        </div>
      </div>
  </main>

  
</template>

<script>
import axios from 'axios'
import AppShowApartmentCard from '../components/AppShowApartmentCard.vue'

export default {
  props:{
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      apartment: null
    }
  },
  methods: {
    fetchApartment(){
      axios.get( 'http://127.0.0.1:8000/api/apartments/' + this.id)
      .then(res => {
          this.apartment = res.data.apartment
          console.log(this.apartment)
      })
      .catch((err)=>{
        this.$router.push({
          name: 'not-found',
          params: { pathMatch: this.$route.path.substring(1).split('/') },
        })
      })
    }
  },
  components:{
    AppShowApartmentCard
  },
  created() {
    this.fetchApartment()
    console.log(this.id);
  }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/show-apartment'
</style>