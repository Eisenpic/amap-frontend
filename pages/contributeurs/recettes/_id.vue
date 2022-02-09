<template>
  <div v-if="ready" class="box mt-6">
    <div class="has-text-centered title is-4">
      Recettes de {{ fullname }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecettesContributeur',
  data () {
    return {
      ready: false,
      contributeur: []
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
        this.ready = true
      })
  }
}
</script>

<style scoped>

</style>
