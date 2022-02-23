<template>
  <div>
    <RecetteComposition :id="$route.params.id" />
    <div v-if="ready" id="map-wrap" class="mt-3 box" style="height: 50vh">
      <h5 class="is-5 title">Vous trouverez surement ce qu'il vous manque ici : </h5>
      <client-only>
        <l-map :zoom=14 :center="[this.latclient,this.longclient]">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-marker :lat-lng="[this.latclient,this.longclient]"></l-marker>
          <!-- Marker for magasins -->
          <template  v-for="magasin in magasins">
            <l-marker v-if="isOk(magasin)" :key="magasin.properties.address_line1" :lat-lng="[magasin.properties.lat,magasin.properties.lon]">
              <l-popup>{{ magasin.properties.name }} <br> {{ magasin.properties.address_line2 }}</l-popup>
            </l-marker>
          </template>
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'RecetteVue',
  components: {},
  methods: {
    isOk (data) {
      if (data.properties.categories.includes('commercial.food_and_drink.confectionery') || data.properties.categories.includes('commercial.food_and_drink.bakery')) {
        return false
      } else {
        return true
      }
    }
  },
  data () {
    return {
      latclient: 0,
      longclient: 0,
      magasins: {},
      ready: false
    }
  },
  mounted () {
    axios.get('http://ip-api.com/json/').then((response) => {
      this.latclient = response.data.lat
      this.longclient = response.data.lon
    }).finally(() => {
      axios.get('https://api.geoapify.com/v2/places?categories=commercial.food_and_drink,commercial.marketplace&filter=circle:6.1563105,48.6740234,5000&bias=proximity:' + this.longclient + ',' + this.latclient + '&lang=fr&limit=50&apiKey=a0991a154c034c2eb147ee9e4d329518').then((response) => {
        this.magasins = response.data.features
        this.ready = true
      })
    })
  }
}
</script>

<style scoped>

</style>
