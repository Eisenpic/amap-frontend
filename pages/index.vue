<template>
  <section class="section">
    <div class="container mt-3">
      <b-field message="Quelle recette cherchez-vous?">
        <b-input
          placeholder="Rechercher..."
          type="search"
          icon="magnify"
          expanded
        />
        <p class="control">
          <b-button type="is-primary" label="Rechercher" />
        </p>
      </b-field>
    </div>
    <div class="is-flex">
      <b-button v-if="$auth.loggedIn" type="is-primary" label="Créer une recette" @click="$router.push('/recette/creation')" />
    </div>
    <div v-if="error">
      <p>Erreur lors de la récupération des recettes</p>
    </div>
    <div v-else class="columns is-multiline is-justify-content-center">
      <b-loading v-model="loading" :is-full-page="false" />
      <CardRecipe
        v-for="recipe in recipes"
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
  </section>
</template>

<script>
import CardRecipe from '../components/CardRecipe'

export default {
  name: 'IndexPage',
  components: {
    CardRecipe
  },
  data () {
    return {
      error: false,
      loading: true,
      recipes: null
    }
  },

  created () {
    this.$axios
      .get('/api/recettes')
      .then((response) => {
        this.recipes = response.data
        this.error = false
      })
      .catch(() => {
        this.error = true
      })
      .finally(() => {
        this.loading = false
      })
  }

}
</script>
