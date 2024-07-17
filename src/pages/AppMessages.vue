<template>
  <div v-if="!responseMessage.success" class="container">
    <p><strong>I campi che presentano * sono obligatori</strong></p>
   <!-- <form action="" method="POST"> -->
    <div class="mb-3">
      <label for="name" class="form-label">* Inserisci il tuo Nome</label>
      <input v-model.text="name" type="text" class="form-control" id="name" name="name" placeholder="Inserisci il tuo Nome">
    </div>
    <div class="mb-3">
      <label for="surname" class="form-label">* Inserisci il tuo Cognome</label>
      <input v-model.text="surname" type="text" class="form-control" id="surname" name="surname" placeholder="Inserisci il tuo Cognome">
    </div>
    <div class="mb-3">
      <label for="email_sender" class="form-label">* Inserisci la tua Email</label>
      <input v-model.text="email_sender" type="email" class="form-control" id="email_sender" name="email_sender" placeholder="Inserisci una email valida">
    </div>
    <div class="mb-3">
      <label for="phone_number" class="form-label">Inserisci il tuo Numero di Telefono</label>
      <input v-model.text="phone_number" type="text" class="form-control" id="phone_number" name="phone_number" placeholder="Inserisci il tuo Numero di Telefono">
    </div>
    <div class="mb-3">
      <label for="text" class="form-label">* Inserisci il Messaggio per il Padrone di Casa</label>
      <textarea v-model.text="text" class="form-control" name="text" id="text" cols="30" rows="10" placeholder="Inserisci il testo del tuo messaggio"></textarea>
    </div>
    <button @click="sendMessage" class="btn btn-primary">Invia</button>
   <!-- </form> -->

   <!-- <h5>Nome: </h5><p>{{ name }}</p>
   <h5>Cognome: </h5><p>{{ surname }}</p>
   <h5>Email: </h5><p>{{ email_sender }}</p>
   <h5>Tel: </h5><p>{{ phone_number }}</p>
   <h5>Messaggio: </h5><p>{{ text }}</p> -->
 </div>

 <AppMessageSuccess v-if="responseMessage.success" :message="responseMessage" :id="id_apartment" />
</template>

<script>
import axios from 'axios'
import AppMessageSuccess from '../components/AppMessageSuccess.vue'


export default {
  props:{
    id: {
      type: String,
      required: true,
    }
  },
 data() {
   return {
     name: "",
     surname: "",
     email_sender: "",
     text: "",
     phone_number: "",
     responseMessage: {},
     id_apartment: this.id
     }
   },
   
 methods: {
  sendMessage(){
    let body = {
      message: this.message,
      name: this.name,
      surname: this.surname,
      email_sender: this.email_sender,
      text: this.text,
      phone_number: this.phone_number
    };

    let _this = this;

    axios.post(`http://127.0.0.1:8000/api/messages`, null, { params: {
      message: this.message,
      name: this.name,
      surname: this.surname,
      email_sender: this.email_sender,
      text: this.text,
      phone_number: this.phone_number,
      apartment_id: this.id,
}})
  .then(function (response) {
    // console.log(response.data);
    _this.responseMessage = response.data;
    // console.log(_this.responseMessage);
  });
  },
   changePage(n) {
     if(n === this.currentPage) return
     this.currentPage = n
     this.fetchPosts()
   }
  
 },
 components:{
  AppMessageSuccess,
 },
 created() {
  //  this.fetchApartments();
  //  this.calculateLimitsLatLon(this.latitude, this.longitude, this.distance)
  console.log('Prova id appartamento', this.id)
  console.log('dai data', this.id_apartment);
 },
}
</script>

<style lang="scss" scoped>
.container{
  margin-top: 60px;
}
</style>