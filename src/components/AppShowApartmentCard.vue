<template>
  <div class="card">
    <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top" alt="">
    <div class="card-body">
      <div class="my-contact mb-3">
        <router-link :to="{name: 'messages', params: {id: apartment_id}}" class="btn btn-dark">Contatta il proprietario</router-link>
      </div>
      <h3 class="card-title">
        {{ apartment.title_apartment }}
      </h3>
      <div class="card-text">
        <p>
          {{apartment.description}}
        </p>
      </div>
      <section class="pt-2">
        <div class="row align-items-center">
          <div class="col-6 col-sm-2 col-md-auto">
            <div class="row flex-nowrap">
              <div class="col-auto ">
                
                <div class="flex-column">
                  <div class="col-auto  text-center ">
                  <img class="icon-service" src="../assets/img/info/info_rooms.svg" alt="">
                  </div>
                  <div class="col-auto  my-name-icon text-center">Stanze</div>
                </div>
    
              </div>
              <div class="col-auto ">
                {{apartment.rooms}}
              </div>
            </div>
          </div>
          <div class="col-6 col-sm-2 col-md-auto">
            <div class="row flex-nowrap">
              <div class="col-auto ">
                
                <div class="flex-column">
                  <div class="col-auto  text-center ">
                  <img class="icon-service" src="../assets/img/info/info_bedrooms.svg" alt="">
                  </div>
                  <div class="col-auto  my-name-icon text-center">Camere Da Letto</div>
                </div>
    
              </div>
              <div class="col-auto ">
                {{apartment.beds}}
              </div>
            </div>
          </div>
          <div class="col-6 col-sm-2 col-md-auto">
            <div class="row flex-nowrap">
              <div class="col-auto ">
                
                <div class="flex-column">
                  <div class="col-auto  text-center ">
                  <img class="icon-service" src="../assets/img/info/info_bathrooms.svg" alt="">
                  </div>
                  <div class="col-auto  my-name-icon text-center">Bagni</div>
                </div>
    
              </div>
              <div class="col-auto">
                {{apartment.bathrooms}}
              </div>
            </div>
          </div>
          <div class="col-6 col-sm-2">
            <div class="row flex-nowrap">
              <div class="col-auto">
                
                <div class="flex-column">
                  <div class="col-auto text-center ">
                  <img class="icon-service" src="../assets/img/info/info_m2.svg" alt="">
                  </div>
                  <div class="col-auto  my-name-icon text-center">M.Q.</div>
                </div>
    
              </div>
              <div class="col-auto">
                {{apartment.sqr_meters}}
              </div>
            </div>
          </div>

          <!-- <div class="col-auto my-col-auto">
            
            <div class="flex-column">
              <div class="col-auto my-col-auto text-center ">
              <img class="icon-service" src="../assets/img/servizi/Risorsa 1.svg" alt="">
              </div>
              <div class="col-auto my-col-auto my-name-icon text-center">Bagni</div>
            </div>

          </div>
          <div v-if="apartment.bathrooms" class="col-auto my-col-auto pe-2 ">
            {{apartment.bathrooms}}
          </div>
          <div class="col-auto my-col-auto">
            
            <div class="flex-column justify-content-center align-items-center align-self-center ">
              <div class="col-auto my-col-auto text-center">
              <img class="icon-service" src="../assets/img/servizi/Risorsa 2.svg" alt="">
              </div>
              <div class="col-auto my-col-auto my-name-icon">Camere</div>
            </div>

          </div>
          <div class="col-auto my-col-auto pe-2">
            {{apartment.beds}}
          </div>
          <div class="col-auto my-col-auto">
            
            <div class="flex-column justify-content-center align-items-center align-self-center">
              <div class="col-auto my-col-auto text-center">
              <img class="icon-service" src="../assets/img/servizi/Risorsa 4.svg" alt="">
              </div>
              <div class="col-auto my-col-auto my-name-icon text-center">M.Q.</div>
            </div>

          </div>
          <div class="col-auto my-col-auto">
            {{apartment.sqr_meters}}
          </div>-->
        </div> 
      </section>
      <section class="my-services pt-3">
        <div class="row align-items-center ">
          <div v-for="service in apartment.services" class="col-6 col-sm-2 my-col-auto p-2">
            <div class="flex-column">
              <div class="col-auto my-col-auto text-center ">
              <img class="icon-service" :src="'../assets/img/servizi/Risorsa '+ service.id +'.svg'" alt="">
              </div>
              <div class="col-auto my-col-auto my-name-icon text-center">{{ service.name }}</div>
            </div>
          </div>
          <!-- <div v-for="service in apartment.services" class="col-auto my-col-auto">
            {{ service.name }}
          </div> -->
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
    }
  }
</script>

<style lang="scss" scoped>
  @use '../style/partials/card-show';
</style>