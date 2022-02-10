<template>
  <section class="section">
    <div class="container my-3">
      <b-field grouped>
        <b-field label="Rechercher" expanded>
          <b-dropdown
            @input="sortArray"
            v-model="selectedOptions"
            multiple
            aria-role="list"
          >
            <template #trigger>
              <b-button
                type="is-primary"
                icon-right="menu-down"
              >
                Trier par... ({{ selectedOptions.length }})
              </b-button>
            </template>
            <b-dropdown-item value="alpha" aria-role="listitem">
              <span>Ordre alphabétique</span>
            </b-dropdown-item>

            <b-dropdown-item value="difficulte" aria-role="listitem">
              <span>Difficulté</span>
            </b-dropdown-item>

            <b-dropdown-item value="tpsrea" aria-role="listitem">
              <span>Temps de réalisation</span>
            </b-dropdown-item>

            <b-dropdown-item v-if="$auth.loggedIn" value="utisuivis" aria-role="listitem">
              <span>Utilisateurs suivis</span>
            </b-dropdown-item>
          </b-dropdown>
          <b-input v-model="search" type="text" placeholder="Rechercher..." expanded />
        </b-field>
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
        v-for="recipe in filteredRecipes"
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
      recipes: [],
      search: '',
      selectedOptions: [],
      idUserSuivis: []
    }
  },
  computed: {
    filteredRecipes () {
      return this.recipes.filter((recipe) => {
        return recipe.titre.toLowerCase().includes(this.search.toLowerCase())
      })
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
  },
  methods: {
    sortArray () {
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (this.selectedOptions[i] === 'alpha') {
          this.recipes.sort((a, b) => {
            if (a.titre.toLowerCase() < b.titre.toLowerCase()) {
              return -1
            }
            if (a.titre.toLowerCase() > b.titre.toLowerCase()) {
              return 1
            }
            return 0
          })
        }
        if (this.selectedOptions[i] === 'difficulte') {
          this.recipes.sort((a, b) => {
            if (a.difficulte < b.difficulte) {
              return -1
            }
            if (a.difficulte > b.difficulte) {
              return 1
            }
            return 0
          })
        }
        if (this.selectedOptions[i] === 'tpsrea') {
          this.recipes.sort((a, b) => {
            if (a.temps < b.temps) {
              return -1
            }
            if (a.temps > b.temps) {
              return 1
            }
            return 0
          })
        }
        if (this.selectedOptions[i] === 'utisuivis') {
          this.$axios.get(`/api/contributeurs/suivis/${this.$auth.user.id}`)
            .then((response) => {
              response.data.forEach((user) => {
                this.idUserSuivis.push(user.id)
              })
              this.recipes = this.recipes.filter((recipe) => {
                return this.idUserSuivis.includes(recipe.id_createur)
              })
            })
        }
      }
    }
  }
}
</script>
