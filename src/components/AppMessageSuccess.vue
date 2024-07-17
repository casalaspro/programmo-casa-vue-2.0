<template>
  <div class="container">
    <h2 class="my-4 text-center">Molto bene! Messaggio inviato!</h2>
    <div class="row justify-content-center ">
      <div class="card" style="width: 18rem;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Nome: </strong>{{ message.results.name }} {{ message.results.surname }}</li>
        <li class="list-group-item"><strong>Email: </strong>{{ message.results.email_sender }}</li>
        <li class="list-group-item"><strong>Numero di Telefono: </strong>{{ message.results.phone_number }}</li>
      </ul>
      <div class="card-body">
        <strong>Il tuo Messaggio:</strong>
        <!-- <hr> -->
        <p class="card-text">{{ message.results.text }}</p>
      </div>
      
      <ul class="list-group list-group-flush">
        <RouterLink :to="'/apartments/' + this.id" href="" class="card-link m-3">Torna all'Appartamento</RouterLink>
        <!-- <a href="#" class="card-link">Another link</a> -->
      </ul>
    </div> 
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';


export default {
  data() {
    return {
      
    }
  },
  
  methods: {
    
  },
  created() {
    console.log('questo arriva dal messaggio di successo: ', this.id)
  },
  props:{
    message: {
      type: Object,
      required: false
    },
    id: {
    type: String,
    required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>