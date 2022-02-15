<template>
  <div v-if="ready" class="box mt-6">
    <div class="has-text-centered title is-4">
      Recettes de {{ fullname }}
    </div>
    <div v-if="recettes.topRecette" class="m-5">
      <p class="title is-5 mb-1">
        Top recette
      </p>
      <nuxt-link :to="{name: 'recette-id', params: {id: recettes.topRecette.id}}" class="box columns m-0 p-0" style="min-height: 160px">
        <figure class="column is-4 image p-0">
          <img :src="recettes.topRecette.url_img" style="width: 100%; height: 100%; object-fit: cover">
        </figure>
        <div class="column is-flex is-flex-direction-column is-justify-content-space-between py-1">
          <div>
            <div class="title is-5 is-underlined m-0">
              {{ recettes.topRecette.titre }}
            </div>
            <div class="mt-2 mb-5">
              {{ recettes.topRecette.description }}
            </div>
          </div>
          <div class="is-flex is-justify-content-space-between has-text-weight-semibold">
            <div>
              {{ level }}
            </div>
            <div>
              {{ timeConv }}
            </div>
            <div>
              {{ recettes.topRecette.nb_pers }}
              <span class="icon">
                <i class="fas fa-utensil-spoon" />
              </span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>

    <div v-if="recettes.sixDernieres" class="m-5 mt-6">
      <p class="title is-5 mb-1">
        Dernières recettes
      </p>

      <VueSlickCarousel v-bind="carouselSettings">
        <CardRecipe
          v-for="recette in recettes.sixDernieres"
          :id="recette.id"
          :key="recette.id"
          :difficulty="recette.difficulte"
          :recipename="recette.titre"
          :personnes="recette.nb_pers"
          :photo="recette.url_img"
          :time="recette.temps"
          style="cursor:pointer;"
        />
      </VueSlickCarousel>
    </div>

    <div class="m-5 mt-6">
      <p class="title is-5 mb-1">Autres recettes</p>
      <div class="columns is-multiline is-justify-content-center">
        <CardRecipe
          v-for="recette in recettes.recettes"
          :id="recette.id"
          :key="recette.id"
          :difficulty="recette.difficulte"
          :recipename="recette.titre"
          :personnes="recette.nb_pers"
          :photo="recette.url_img"
          :time="recette.temps"
          style="cursor:pointer;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'RecettesContributeur',
  components: {
    VueSlickCarousel
  },
  data () {
    return {
      ready: false,
      contributeur: [],
      recettes: [],
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
  computed: {
    fullname () {
      return this.contributeur.prenom + ' ' + this.contributeur.nom
    },
    timeConv () {
      let time = this.recettes.topRecette.temps
      let heures = ''
      let minutes = ''
      let secondes = ''

      if ((time / 3600) >= 1) {
        heures = Math.trunc(time / 3600) + 'h '
        time -= 3600 * Math.trunc(time / 3600)
      }

      if ((time / 60) >= 1) {
        minutes = Math.trunc(time / 60) + 'min '
        time -= 60 * Math.trunc(time / 60)
      }

      if (time > 0) {
        secondes = time + 'sec'
      }

      return heures + minutes + secondes
    },
    level () {
      switch (this.recettes.topRecette.difficulte) {
        case 1:
          return 'Facile'
        case 2:
          return 'Normal'
        case 3:
          return 'Difficile'
        default:
          return 'Not filled in'
      }
    }
  },
  mounted () {
    // récupération des recettes
    this.$axios.get(`/api/contributeur/${this.$route.params.id}`)
      .then((response) => {
        this.contributeur = response.data
        this.$axios.get(`/api/contributeur/${this.$route.params.id}/recettes`)
          .then((response) => {
            this.recettes = response.data
            this.ready = true
          })
          .catch(() => {
            console.log('Erreur lors de la récupération des recettes')
          })
      })
      .catch(() => {
        console.log('Erreur lors de la récupération du contributeur')
      })

    // récupération des 10 recettes les plus récentes
  }
}
</script>

<style scoped>

</style>
