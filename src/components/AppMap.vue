<template>
  <section class="my-map">
    <div class="container">
      <div id="map"></div>
    </div>
  </section>
</template>

<script>
  export default {
    mounted() {

      let center = [12.4963655, 41.9027835];
      const milan = [9.1859243, 45.4654219]
      const map = tt.map({
        key: 'SmzJJ1e9vacLwiqfqgxPWAvQ7Ey33PfG',
        container: 'map',
        center: center,
        zoom: 2,
      });

      map.on('load', () => {
        new tt.Marker().setLngLat(center).addTo(map);
        new tt.Marker().setLngLat(milan).addTo(map);
      });
    }
  }
</script>

<style lang="scss" scoped>
  #map{
    width: 100%;
    height: 300px;
  }
</style>