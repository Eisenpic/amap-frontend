<template>
  <div v-if="ready" class="box mt-6">
    <div class="has-text-centered title is-4">
      Recettes de {{ fullname }}
    </div>
    <div v-if="recettes.topRecette">
      <p>Top recette</p>
      <div class="box columns my-5 p-0">
        <figure class="column is-3 image p-0">
          <img :src="recettes.topRecette.url_img" style="width: 100%; object-fit: cover">
        </figure>
        {{ recettes.topRecette }}
      </div>
    </div>

    <div v-if="recettes.sixDernieres">
      <p>Dernières recettes</p>
      <div v-for="recette in recettes.sixDernieres" :key="recette.id">
        {{ recette.titre }}
      </div>
    </div>

    <div>
      <p>Autres recettes</p>
      <div v-for="recette in recettes.recettes" :key="recette.id">
        {{ recette.titre }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecettesContributeur',
  data () {
    return {
      ready: false,
      contributeur: [],
      recettes: []
    }
  },
  computed: {
    fullname () {
      return this.contributeur.prenom + ' ' + this.contributeur.nom
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
