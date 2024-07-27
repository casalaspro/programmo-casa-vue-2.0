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
      apartment: null,
      clientIp: '',
      views: ''
    }
  },
  watch:{
    apartment(newApartment, oldApartment){
      console.log('watch apartment ', this.apartment)
    },

    clientIp(newClientIp, oldClientIp){
      console.log('watch ip ', this.clientIp)
      this.addView()
      this.showViews()
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
    },
    addView(){
      let data = {
        ip: this.clientIp,
        apartmentId: this.id
      }

      console.log('data ',data)
      console.log('ip in data',this.clientIp)
      console.log('id in data',this.apartment.id)

      axios.post('http://127.0.0.1:8000/api/views/', data)
      .then(res => {
        console.log('res views', res)
      })
    },
    // showViews(){
    //   let data = {
    //     apartmentId: this.id
    //   }

    //   axios.post('http://127.0.0.1:8000/api/show/views/', data)
    //     .then(res => {
    //       console.log('res visualizzazioni', res.data)
    //       this.views = res.data
    //     })
    // }
  },
  components:{
    AppShowApartmentCard
  },
  mounted(){
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(({ ip }) => {
        
        this.clientIp = ip;
      });
  },
  created() {
    this.fetchApartment()
    // console.log(this.id)
    
  }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/show-apartment'
</style>