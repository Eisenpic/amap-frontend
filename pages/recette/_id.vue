<template>
  <div>
    <RecetteComposition :id="$route.params.id" />

    <CommentaireRecipe
      :id="$route.params.id"
    />

    <hr>
    <div v-if="ready" id="map-wrap" class="mt-3" style="height: 50vh">
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
    <br>
    <br>

    <!-------------------- Affichage des recettes similaires -------------------->

    <div v-if="readyRecSimi && recettesSimilaires.length > 0" class="mb-5">
      <hr>
      <br>
      <h5 class="is-5 title">Recettes similaires</h5>
      <VueSlickCarousel v-bind="carouselSettings">
        <CardRecipe
          v-for="recette in recettesSimilaires"
          :id="recette.recette.id"
          :key="recette.recette.id"
          :difficulty="recette.recette.difficulte"
          :recipename="recette.recette.titre"
          :personnes="recette.recette.nb_pers"
          :photo="recette.recette.url_img"
          :time="recette.recette.temps"
          :ingrSimi="recette.prodSimi"
          style="cursor:pointer;"
        />
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueSlickCarousel from 'vue-slick-carousel'
import CommentaireRecipe from '@/components/CommentaireRecipe'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'RecetteVue',
  components: {
    CommentaireRecipe,
    VueSlickCarousel
  },
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
      ready: false,
      readyRecSimi: false,
      recettesSimilaires: [],
      carouselSettings: {
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 5,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      }
    }
  },
  mounted () {
    axios.get('http://ip-api.com/json/').then((response) => {
      this.latclient = response.data.lat
      this.longclient = response.data.lon
    }).finally(() => {
      axios.get('https://api.geoapify.com/v2/places?categories=commercial.food_and_drink,commercial.marketplace&filter=circle:' + this.longclient + ',' + this.latclient + ',5000&bias=proximity:' + this.longclient + ',' + this.latclient + '&lang=fr&limit=50&apiKey=3a3750683e974300a3dc8c1da389fbc2').then((response) => {
        this.magasins = response.data.features
        this.ready = true
      })
    })

    this.$axios.get(`/api/recette/${this.$route.params.id}/similaires`)
      .then((response) => {
        this.recettesSimilaires = response.data
        this.readyRecSimi = true
      })
      .catch(() => {
        console.log('Erreur lors de la récupération des recettes similaires')
      })
  }
}
</script>

<style scoped>

</style>
