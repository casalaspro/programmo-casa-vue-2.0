<template>
  <div class="card">
    <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top" alt="">
    <div class="card-body">
      <div class="my-contact mb-3">
        <router-link :to="{name: 'messages', params: {id: apartment.id}}" class="btn btn-dark">Contatta il proprietario</router-link>
      </div>
      <h3 class="card-title">
        {{ apartment.title_apartment }}
      </h3>
      <div class="card-text">
        <p>
          {{apartment.description}}
        </p>
        <p>
          {{ apartment.complete_address }}
        </p>
      </div>
      <section class="pt-2">
        <div class="container">
          <div class="row align-items-center">
            <template v-for="detail in details">
              <div class="col-6 col-sm-3 col-md-3 col-lg-auto">
                <div class="flex-column flex-nowrap align-items-center">
                  <div class="col-auto my-col-auto">
                      <div class="col-auto  text-center ">
                      <img class="icon-service" :src="'/src/assets/info/' + detail.pathImg" alt="">
                      </div>
                      <div class="col-auto  my-name-icon text-center">{{ detail.name }}</div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-sm-3 col-md-3 col-lg-auto">
                {{detail.value}}
              </div>
            </template>
          </div> 
        </div>
      </section>
      <section class="my-services pt-3">
        <div class="container">
          <div class="row align-items-center ">
            <div v-for="service in apartment.services" class="col-6 col-sm-2 my-col-auto">
              <div class="flex-column">
                <div class="col-auto my-col-auto text-center ">
                <img class="icon-service" :src="'/src/assets/servizi/Risorsa '+ service.id +'.svg'" alt="">
                </div>
                <div class="col-auto my-col-auto my-name-icon text-center">{{ service.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      apartment:{
        required: true,
      }
    },
    data(){
      return{
        dataApartment:[],
        details: [{
          name: 'Stanze',
          pathImg: 'info_rooms.svg',
          value: this.apartment.rooms
        }, {
          name: 'Camere Da Letto',
          pathImg: 'info_bedrooms.svg',
          value: this.apartment.beds
        },
        {
          name: 'Bagni',
          pathImg: 'info_bathrooms.svg',
          value: this.apartment.bathrooms
        },
        {
          name: 'M.Q.',
          pathImg: 'info_m2.svg',
          value: this.apartment.sqr_meters
        }]
      }
    },
    created(){
      console.log('cardshow'+ this.apartment)
    }
  }
</script>

<style lang="scss" scoped>
  @use '../style/partials/card-show';
</style>