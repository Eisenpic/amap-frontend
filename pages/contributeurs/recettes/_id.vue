<template>
  <div v-if="ready" class="box mt-6">
    <div class="has-text-centered title is-4">
      Recettes de {{ fullname }}
    </div>
    <div>
      <p>Top recette</p>
      <div v-if="recettes.topRecette">
        {{ recettes.topRecette }}
      </div>
    </div>
    <div>
      <p>Autres recettes</p>
      <div v-for="recette in recettes.recettes" :key="recette.id">
        {{ recette }}
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
  }
}
</script>

<style scoped>

</style>
