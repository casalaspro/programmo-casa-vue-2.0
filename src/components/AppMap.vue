<template>
  <section class="my-map">
    <div class="container">
      <div id="map"></div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      apartmentsResearch: {
        required: true
      }
    },
    watch:{
      apartmentsResearch(newApartmentsResearch, oldApartmentsResearch){
        console.log('watch', this.apartmentsResearch)

        this.addMarker()        
      }
    },
    // mounted() {

    //   let center = [12.4963655, 41.9027835];
    //   const milan = [9.1859243, 45.4654219];
    //   // const lonLat = [this.apartmentsResearch.longitude, this.apartmentsResearch.latitude]
      
    //   const map = tt.map({
    //     key: 'SmzJJ1e9vacLwiqfqgxPWAvQ7Ey33PfG',
    //     container: 'map',
    //     center: center,
    //     zoom: 2,
    //   });

    //   map.on('load', () => {
    //     new tt.Marker().setLngLat(center).addTo(map);
    //     new tt.Marker().setLngLat(milan).addTo(map);
    //   });
    // },
    methods:{
      addMarker(){
        const center = [this.apartmentsResearch[0].longitude, this.apartmentsResearch[0].latitude]

        const map = tt.map({
          key: 'SmzJJ1e9vacLwiqfqgxPWAvQ7Ey33PfG',
          container: 'map',
          center: center,
          zoom: 10,
        });

        var markerHeight = 10, markerRadius = 10, linearOffset = 25;

        var popupOffsets = {
          'top': [0, 0],
          'top-left': [0,0],
          'top-right': [0,0],
          'bottom': [0, -markerHeight],
          'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
          'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
          'left': [markerRadius, (markerHeight - markerRadius) * -1],
          'right': [-markerRadius, (markerHeight - markerRadius) * -1]
        };

        this.apartmentsResearch.forEach(element => {
          const lonLat = [element.longitude, element.latitude];

          console.log(lonLat)
          
          let customMarker = document.createElement("div")
          customMarker.innerHTML = `<img src="http://127.0.0.1:8000/storage/${element.img_apartment}">`
          customMarker.classList.add("marker");

          const marker = new tt.Marker({element: customMarker}).setLngLat(lonLat).addTo(map);
          // map.on('load', () => {
            // new tt.Popup({offset: popupOffsets, className: 'my-class'}).setLngLat(lonLat)
            //   .setHTML(element.title_apartment)
            //   .addTo(map)
          // });

          marker.getElement().addEventListener('click', ()=>{
            this.$router.push({ name: 'apartment.show', params: { id: element.id } });
          })

          let Popup = null;
          marker.getElement().addEventListener('mouseenter', () => {
            Popup = new tt.Popup({ offset: popupOffsets, className: 'my-class' })
              .setLngLat(lonLat)
              // .setHTML(element.title_apartment)
              .setHTML(`
                <div>
                  <h5>${element.title_apartment}</h5>  
                  <img src="http://127.0.0.1:8000/storage/${element.img_apartment}">
                </div>
              `)
              .addTo(map);
          });

          marker.getElement().addEventListener('mouseleave', () => {
            // Rimuovi il popup quando il mouse esce dal marcatore
            Popup.remove();
          });
        });

      }
    }
  }
</script>

<style lang="scss">
  #map{
    width: 100%;
    height: 300px;
  }

  .marker{
    // background-image: url('../assets/logo_programmo_casa_grande.png');
    // background-color: black;
    background-size: cover;
    background-repeat: no-repeat;
    border: 4px solid white;
    width: 50px;
    border-radius: 10px;

    img{
      width: 100%;
      border-radius: 10px;
    }
  }

  .my-class{
    img{
      width: 100%;
      height: 100px;
      object-fit: cover;
    }
  }

  
</style>