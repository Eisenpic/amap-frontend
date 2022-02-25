<template>
  <section class="columns is-centered">
    <div id="container" class="column is-9 box pl-5 pr-5 p-5 mt-6">
      <div>
        <account-layout />
      </div>
      <div v-if="recettes.length === 0" class="column box has-text-centered">
        <p>Vous n'avez aucune recette en favoris</p>
      </div>
      <div v-if="ready && recettes.length !== 0" class="box">
        <div class="has-text-centered title is-4">
          Favoris
        </div>
        <div class="columns is-multiline is-justify-content-center">
          <CardFavRecipe
            v-for="recipe in recettes"
            :id="recipe.id"
            :key="recipe.id"
            :difficulty="recipe.difficulte"
            :recipename="recipe.titre"
            :personnes="recipe.nb_pers"
            :photo="recipe.url_img"
            :time="recipe.temps"
            style="cursor:pointer;"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'FavRecipes',
  data () {
    return {
      ready: false,
      recettes: []
    }
  },
  mounted () {
    this.$axios.get(`/api/users/${this.$auth.$state.user.id}/fav`)
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
        message: 'Voulez vous enlever cette recette de vos favoris ?',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open('Recette retirée des favoris')
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
