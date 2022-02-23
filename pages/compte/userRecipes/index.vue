<template>
  <section class="columns is-centered">
    <div id="container" class="column is-9 box pl-5 pr-5 p-5 mt-6">
      <div>
        <account-layout />
      </div>
      <div v-if="recettes.length === 0" class="column box has-text-centered">
        <p>Vous n'avez créé aucune recette</p>
      </div>
      <div v-if="ready && recettes.length !== 0" class="box">
        <div class="has-text-centered title is-4">
          Mes recettes
        </div>
        <div class="columns is-multiline is-justify-content-center">
          <CardUserRecipe
            v-for="recette in recettes"
            :id="recette.recette.id"
            :key="recette.recette.id"
            :recipename="recette.recette.titre"
            :photo="recette.recette.url_img"
            style="cursor:pointer;"
            @refresh="deleteRecipe"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'UserRecipes',
  data () {
    return {
      ready: false,
      recettes: []
    }
  },
  mounted () {
    this.$axios.get(`/api/users/${this.$auth.$state.user.id}/recettes`)
      .then((response) => {
        if (response.data !== []) {
          this.recettes = response.data
          this.recettes.sort((a, b) => {
            if (a.nbLikes < b.nbLikes) {
              return 1
            }
            if (a.nbLikes > b.nbLikes) {
              return -1
            }
            return 0
          })
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
          this.recettes = this.recettes.filter(el => el.recette.id !== id)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
