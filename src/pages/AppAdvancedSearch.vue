<template>
  <div class="container">

    <h1>Ricerca avanzata</h1>

    <div>
      <div class="my-errors text-danger" v-if="errorSearch !== ''">
        {{ errorSearch }}
      </div>
      <form class="" role="search" @submit.prevent="advancedSearch"> 
        
        <input ref="inputZoneListen" v-model="zone" class="form-control me-2" type="search" placeholder="Cerca" aria-label="Search" @keyup="search">
        <div ref="loading" class="loading"><img src="/src/assets/Spinner-2.gif" alt=""></div>
        <ul v-if="suggestions" class="suggestions list-unstyled">
          <li v-for="(suggestion, i) in suggestions" class="suggestion" @click="selectSuggestion(suggestion)">
            {{ suggestion.address.freeformAddress }}
          </li>
        </ul>
        
        <label for="complete_address" class="form-label">Inserisci la distanza in Chilometri</label>
        <input v-model.number="distance" type="number" class="form-control my-input-address" id="complete_address" name="complete_address" placeholder="Inserisci la Via e scegli tra quelle suggerite">
        
        <label for="customRange1" class="form-label">Inserisci la distanza in Chilometri</label>
        <input v-model.number="distance" step="5" type="range" class="form-range my-input-address" id="customRange1">

        <label for="number_of_rooms" class="form-lable">Inserisci la quantità di stanze</label>
        <input v-model.number="rooms" min="1" type="number" class="form-control" id="number_of_rooms" name="number_of_rooms" placeholder="inserisci il numero di stanze">

        <label for="number_of_beds" class="form-lable">Inserisci il numero di camere da letto</label>
        <input v-model.number="beds" min="1" type="number" class="form-control" id="number_of_beds" name="number_of_beds" placeholder="inserisci il numero di camere da letto">
        
        <div class="services pt-3 ">
          <button :class="('btn btn-outline-dark me-1 mb-1 service-'+service.id)" @click="toggleService(service.id), buttonToggle(service.id) " v-for="(service, index) in services">{{ service.name }}</button>
          <!-- <button @click="advancedSearch">Aggiorna</button> -->
        </div>

        <button class="btn btn-dark mt-3" type="submit">Cerca</button>
        <!-- </RouterLink> -->
      </form>
    </div>
  </div>

  <div class="container search-bar">
    <div class="search-bar_solutions">
      <h4>Distanza: </h4><span>{{ distance }}</span>
    </div>
    <hr>
    <AppMap :apartmentsResearch="apartmentsResearch"/>
    <div class="container">
      <div class="row">
        <!-- IL CODICE COMMENTATO È DA IMPLEMENTARE -->
        <!-- <div class="col-12 col-sm-8 col-md-4 col-lg-3" v-if="apartment.sponsorships.length > 0 && new Date(apartment.sponsorships[apartment.sponsorships.length - 1].pivot.end_datetime) > new Date()"></div> -->
        <!-- <div v-if="lastPage > 1">
        <ul class="row paginate p-3 justify-content-center list-unstyled">
          <li :class="page === currentPage ? 'bg-yellow-logo' : ''" class="my-page col-auto border border-dark rounded-circle m-2" v-for="(page, i) in lastPage" @click="changePage(page)">
            {{ i+1 }}
          </li>
        </ul>
      </div> -->

        <div class="col-3" v-for="apartment in apartmentsResearch"> 
          <AppApartmentCard :apartment="apartment"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  import AppApartmentCard from '../components/AppApartmentCard.vue'
  import AppApartmentCardSponsored from '../components/AppApartmentCardSponsored.vue'
  import AppMap from '../components/AppMap.vue'

  export default {
    components:{
      AppApartmentCard,
      AppApartmentCardSponsored,
      AppMap
    },
    data(){
      return{
        zone:'',
        apartmentsResearch: '',
        suggestion:'',
        suggestions: '',
        errorSearch: '',
        // i set the datas used to calculate the bounds
        latitude: 0,
        longitude: 0,
        distance: 20,
        // -----------------
        rooms: 1,
        beds: 1,
        // ----------------
        buttonColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'],
        services: {},
        activeFilters: [],
        bounds: {
          latMin: 0,
          latMax: 0,
          lonMin: 0,
          lonMax: 0,
        }
      }
    },
    // watch:{
    //   distance(newDistance, oldDistance){
    //     this.advancedSearch()
    //   }
    // },
    methods:{
      // this function takes latitude, longitude, distance in kilometers and calculates the bounds
      calculateLimitsLatLon(){
        const lat = this.latitude;
        const lon = this.longitude;
        const distanceKm = this.distance;
        // i create the constances that i will use
        const kmPerDegreeLat = 110.574; // chilometri per angolo di latitudine
        const kmPerDegreeLon = 111.320 * Math.cos(lat * (Math.PI / 180)); // chilometri per angolo di longitudine

        console.log(lat);

        // // i calculate the bounds
        const latMin = lat - (distanceKm / kmPerDegreeLat);
        const latMax = lat + (distanceKm / kmPerDegreeLat);
        const lonMin = lon - (distanceKm / kmPerDegreeLon);
        const lonMax = lon + (distanceKm / kmPerDegreeLon);

        // // i pass the results to my datas
        this.bounds.latMin = latMin;
        this.bounds.latMax = latMax;
        this.bounds.lonMin = lonMin;
        this.bounds.lonMax = lonMax;
      },
      loading(){
      if(this.zone !== ''){
          this.$refs.loading.style.display = 'block'
        }else{
          this.$refs.loading.style.display = 'none'
        }
      },

      // -----------------------------------------------------
      calculateRoomsAndBeds(){
        const roomsNumber = this.rooms;
        const bedsNumber = this.beds; 
      },

      // -----------------------------------------------------

      fetchServices(){
        axios.get('http://127.0.0.1:8000/api/services')
        .then((res) => {
          this.services = res.data.results
          // console.log(this.services[0])
        })
      },
      toggleService(serviceId){

        const _this = this;
        const id = serviceId;

        if(this.activeFilters.includes(id)){
           let index = _this.activeFilters.indexOf(serviceId);
          this.activeFilters.splice(index, 1);
        }else{
          this.activeFilters.push(serviceId);
        }
        
        console.log(this.activeFilters);
      },
      buttonToggle(serviceId){
        const button = document.querySelector('.service-'+serviceId);
        if(this.activeFilters.includes(serviceId)){
          button.classList.remove('btn-outline-dark');
          button.classList.add('btn-dark');
        }else{
          button.classList.remove('btn-dark');
          button.classList.add('btn-outline-dark');
        }
      },
      advancedSearch(){
        
        if (this.latitude !== ''){
          this.errorSearch = ''
          this.calculateLimitsLatLon()
  
          let data = {
            
            min_lat: this.bounds.latMin,
            max_lat: this.bounds.latMax,
            min_lon: this.bounds.lonMin,
            max_lon: this.bounds.lonMax,
            activeFilters: this.activeFilters,
            roomsNumber: this.rooms,
            bedsNumber: this.beds 
          }
          // let json = JSON.stringify(data);
          // let post_data = { json_data: json }
  
          axios.post('http://127.0.0.1:8000/api/advanced', data)
          .then((res) => {
            // this.services = res.data.results
            this.apartmentsResearch = res.data.response;
            console.log(res.data)
          }).catch(function(error){
            console.log('error axios', error);
          })

          return true
        }else{
          this.errorSearch = 'Seleziona una via suggerita'
          return false
        }
      },
      searchForZone(){
        this.calculateLimitsLatLon()

        axios.get('http://127.0.0.1:8000/api/search',{
        params: {
          // page: this.currentPage,
          min_lat: this.bounds.latMin,
          max_lat: this.bounds.latMax,
          min_lon: this.bounds.lonMin,
          max_lon: this.bounds.lonMax,
          // perPage: 9
        }
        })
        .then((res) => {
          
          this.apartmentsResearch = res.data;
          console.log(res.data)
          console.log(this.zone)
          console.log('array ricerca' + this.apartmentsResearch)
        })
      },
      search: _.debounce(async function() {

      if (!this.zone) {
        this.suggestions = ''
        return
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/suggestions?parametro=${this.zone}`)
        this.suggestions = response.data.response.results
        console.log(response.data.response.results)
        this.$refs.loading.style.display = 'none'
      } catch (error) {
        console.error(error)
      }

      this.latitude = ""
      this.longitude = ""

      }, 500),
      selectSuggestion(el){
      this.zone = el.address.freeformAddress
      this.suggestions = ''

      this.latitude = el.position.lat
      this.longitude = el.position.lon
      
      }
    },
    mounted(){
      // this.zone = sessionStorage.getItem('zone')
      this.$refs.inputZoneListen.addEventListener('keyup', this.loading)
      this.latitude = parseFloat(sessionStorage.getItem('latitude'))
      this.longitude = parseFloat(sessionStorage.getItem('longitude'))
      this.calculateLimitsLatLon()
      // this.advancedSearch()

      this.fetchServices()

      axios.get('http://127.0.0.1:8000/api/search',{
        params: {
          // page: this.currentPage,
          min_lat: this.bounds.latMin,
          max_lat: this.bounds.latMax,
          min_lon: this.bounds.lonMin,
          max_lon: this.bounds.lonMax,
          // perPage: 9
        }
      })
      .then((res) => {
        
        this.apartmentsResearch = res.data;
        console.log(res.data)
        console.log(this.zone)
        console.log('array ricerca' + this.apartmentsResearch)
      })
    }
  }
</script>

<style lang="scss" scoped>

@use '../style/partials/advanced-search.scss';


</style>