<template>
  <section class="columns is-centered">
    <div id="container" class="column is-9 box pl-5 pr-5 p-5 mt-6">
      <div>
        <account-layout />
      </div>
      <div v-if="recettes.message" class="column box has-text-centered">
        <p>Vous n'avez créé aucune recette</p>
      </div>
      <div v-if="ready && !recettes.message" class="box">
        <div class="has-text-centered title is-4">
          Mes recettes
        </div>

        <div v-if="recettes.sixDernieres" class="m-5 mt-6">
          <p class="title is-5 mb-1">
            Dernières recettes
          </p>

          <VueSlickCarousel v-bind="carouselSettings">
            <CardUserRecipe
              v-for="recette in recettes.sixDernieres"
              @refresh="deleteRecipe"
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

        <div v-if="recettes.recettes" class="m-5 mt-6">
          <p class="title is-5 mb-1">
            Autres recettes
          </p>
          <div class="columns is-multiline is-justify-content-center">
            <CardUserRecipe
              v-for="recette in recettes.recettes"
              @refresh="deleteRecipe"
              :id="recette.id"
              :key="recette.id"
              :difficulty="recette.difficulte"
              :recipename="recette.titre"
              :personnes="recette.nb_pers"
              :photo="recette.url_img"
              :time="recette.temps"
              style="cursor:pointer;"
            />
            <div><p>testa</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'UserRecipes',
  components: {
    VueSlickCarousel
  },
  data () {
    return {
      ready: false,
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
    this.$axios.get(`/api/users/${this.$auth.$state.user.id}/recettes`)
      .then((response) => {
        if (response.data !== []) {
          this.recettes = response.data
          this.ready = true
        }
      })
      .catch(() => {
        console.log('Erreur lors de la récupération des recettes')
      })
  },
  methods: {
    deleteRecipe (id) {
      this.$buefy.dialog.confirm({
        message: "La <b>suppression</b> de la recette n'est pas réversible. Êtes vous sûre de vouloir continuer?",
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open('Suppression confirmée')
          this.$axios.delete(`/api/recettes/${id}`)
          this.$router.go()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
