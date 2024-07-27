<template>
  <main class="page-apartments">
    <div class="container">
      <div>
        <div class="my-errors text-danger" v-if="errorSearch !== ''">
          {{ errorSearch }}
        </div>
        <form class="d-flex" role="search" @submit.prevent="searchForZone"> 
          <div class="col me-2">
            <input ref="inputZoneListen" v-model="zone" class="form-control" type="search" placeholder="Cerca" aria-label="Search" @keyup="search">
            <div ref="loading" class="loading"><img src="/src/assets/Spinner-2.gif" alt=""></div>
            <!-- :class="zone !== '' ? 'd-block' : 'd-none'" -->
            <ul v-if="suggestions" class="suggestions list-unstyled">
              <li v-for="(suggestion, i) in suggestions" class="suggestion" @click="selectSuggestion(suggestion)">
                {{ suggestion.address.freeformAddress }}
              </li>
            </ul>
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-dark" type="submit">Cerca</button>
          </div>
        </form>
        
      </div>
    </div>

    <!-- <p>My date: {{ new Date() }}</p> -->
  
    <!-- MOSTRIAMO GLI APPARTAMENTI IN EVIDENZA -->
   <div class="container">
      <div class="my_section-title my-5">
        <div class="line mx-5"></div>
        <h1 class="text-2xl my-8 text-center mb-3 my_title">In Evidenza</h1>
      </div>
    </div>
    <section class="section-carousel mt-3 mb-3 text-center">
    
      <!-- row gy-3 gx-3 row-cols-1 row-cols-md-2 row-cols-lg-3 -->
      <div class="carousel" ref="carousel">
        <template v-for="apartment in apartments">
          <!-- I pick the last sponsorship activated and i check if it is still valid -->
          <div class="col-12 col-sm-8 col-md-4 col-lg-3" v-if="apartment.sponsorships.length > 0 && new Date(apartment.sponsorships[apartment.sponsorships.length - 1].pivot.end_datetime) > new Date()">
            <!-- <div class="col-12 col-sm-8 col-md-4 col-lg-3" v-if="apartment.sponsorships[0].pivot.end_datetime > new Date() "></div> -->
             
          <AppApartmentCardSponsored :apartment="apartment"/>
          </div>
        </template>
      </div>
    </section>
    <div class="container">
    <div class="my_section-title my-5">
      <div class="line mx-5"></div>
      <h1 class="text-2xl my-8 text-center mb-3 my_title">Tutti gli Appartamenti</h1>
    </div>
   </div>
    <div class="container my-apartments">
      <div class="row gy-2 gx-2 flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div class="col" v-for="apartment in apartments">
          <AppApartmentCard :apartment="apartment"/>
        </div>
      </div>
      <div v-if="lastPage > 1">
        <ul class="row paginate p-3 justify-content-center list-unstyled">
          <li :class="page === currentPage ? 'bg-yellow-logo' : ''" class="my-page col-auto border border-dark rounded-circle m-2" v-for="(page, i) in lastPage" @click="changePage(page)">
            {{ i+1 }}
          </li>
        </ul>
      </div>
    </div>
  </main>

</template>

<style lang="scss" scoped>
@use '../style/partials/app-apartments';

.my_section-title{
  position: relative;
  .line{
    border: 1px solid;
  }
  .my_title{
    position: absolute;
    font-size: 20px;
    background-color: white;
    top: -12px;
    display: inline;
    margin-left: 50%;
    transform: translate(-50%, 0px);
    padding-left: 10px;
    padding-right: 10px;
  }
}

</style>

<script>
// var  _ =  require ( 'lodash' );
import axios from 'axios'
// import useMath from '@vueuse/math'
import _ from 'lodash'
import AppApartmentCard from '../components/AppApartmentCard.vue'
import AppApartmentCardSponsored from '../components/AppApartmentCardSponsored.vue'

export default {
  components:{
    AppApartmentCard,
    AppApartmentCardSponsored
  },
  data() {
    return {
      zone:'',
      suggestions: '',
      apartments: [],
      currentPage: 1,
      lastPage: null,
      count: 0,
      errorSearch: '',
      sponsorshipDate: ''
    }
  },
  components:{
    AppApartmentCard,
    AppApartmentCardSponsored
  },
  watch:{
   
  },
  methods: {
    bringMeToApartment(id, titleApartment, rooms, beds, bathrooms, sqrMeters, imgApartment, description, latitude, longitude, completeAddress){
    },
    loading(){
      if(this.zone !== ''){
          this.$refs.loading.style.display = 'block'
        }else{
          this.$refs.loading.style.display = 'none'
        }
    },
    changePage(page) {
      if (page === this.currentPage) return
      this.currentPage = page
      this.fetchApartments()
    },
    search: _.debounce(async function() {
      if (!this.zone) {
        this.suggestions = []
        return
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/suggestions?parametro=${this.zone}`)
        this.suggestions = response.data.response.results
        this.$refs.loading.style.display = 'none'
        console.log(response.data.response.results)
      } catch (error) {
        console.error(error)
      }

      sessionStorage.setItem('latitude', '');
      sessionStorage.setItem('longitude', '');

    }, 500),
    fetchApartments() {

      axios.get('http://127.0.0.1:8000/api/apartments', {
        params: {
          page: this.currentPage,
          // perPage: 9
        }
      })
        .then((res) => {
          this.apartments = res.data.results.data
          this.lastPage = res.data.results.last_page
          console.log('Il mio fetch apartments: ', res.data.results);
          console.log(new Date(res.data.results.data[10].sponsorships[0].pivot.end_datetime));
          console.log(new Date());
        })

    },
    searchForZone() {
      if (sessionStorage.getItem('latitude') !== ''){
        sessionStorage.setItem('zone', this.zone);
        this.$router.push('/advanced-search')
        
        return true
      }else{
        this.errorSearch = 'Seleziona una via suggerita'
        return false
      }
    },
    selectSuggestion(el){
      this.zone = el.address.freeformAddress
      this.suggestions = ''

      sessionStorage.setItem('latitude', el.position.lat);
      sessionStorage.setItem('longitude', el.position.lon);
    },
    scrollCarousel(e) {
      e.preventDefault();
      if (e.deltaY > 0){
        this.$refs.carousel.scrollLeft += 100;
      } 
      else {
        this.$refs.carousel.scrollLeft -= 100;
      } 
    }
  },
  mounted(){
    this.$refs.carousel.addEventListener('wheel', this.scrollCarousel);
    this.$refs.inputZoneListen.addEventListener('keyup', this.loading)
  },  
  beforeMount(){
    // this.$refs.carousel.removeEventListener('wheel', this.scrollCarousel);
  },
  created() {
    this.fetchApartments();
    sessionStorage.setItem('latitude', '');
    sessionStorage.setItem('longitude', '');
  }
}
</script>

