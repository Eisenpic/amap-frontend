<template>
  <section class="section">
    <div class="container my-3">
      <b-field grouped>
        <b-field label="Rechercher" expanded>
          <b-dropdown
            v-model="selectedOptions"
            multiple
            aria-role="list"
            @input="sortArray"
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
          <b-button
            type="is-primary"
            icon-right="filter"
            @click="filterHide = !filterHide"
          >
            Filtre
          </b-button>
        </b-field>
      </b-field>
      <div v-if="!filterHide" id="cardFilter" style="border: solid 1px lightgrey" class="p-2">
        <div class="is-flex is-justify-content-center">
          <b-dropdown
            v-model="saisonFilter"
            multiple
            aria-role="list"
          >
            <template #trigger>
              <b-button
                type="is-primary"
                icon-right="menu-down"
              >
                Saisons ({{ saisonFilter.length }})
              </b-button>
            </template>

            <b-dropdown-item value="toutes" aria-role="listitem">
              <span>Toutes</span>
            </b-dropdown-item>

            <b-dropdown-item value="printemps" aria-role="listitem">
              <span>Printemps</span>
            </b-dropdown-item>

            <b-dropdown-item value="été" aria-role="listitem">
              <span>Été</span>
            </b-dropdown-item>

            <b-dropdown-item value="automne" aria-role="listitem">
              <span>Automne</span>
            </b-dropdown-item>

            <b-dropdown-item value="hiver" aria-role="listitem">
              <span>Hiver</span>
            </b-dropdown-item>
          </b-dropdown>

          <b-dropdown
            v-model="difficulteFilter"
            multiple
            aria-role="list"
          >
            <template #trigger>
              <b-button
                type="is-primary"
                icon-right="menu-down"
              >
                Difficulté ({{ difficulteFilter.length }})
              </b-button>
            </template>

            <b-dropdown-item value="1" aria-role="listitem">
              <span>Facile</span>
            </b-dropdown-item>

            <b-dropdown-item value="2" aria-role="listitem">
              <span>Normale</span>
            </b-dropdown-item>

            <b-dropdown-item value="3" aria-role="listitem">
              <span>Difficile</span>
            </b-dropdown-item>
          </b-dropdown>

          <b-dropdown
            v-model="regimeFilter"
            multiple
            aria-role="list"
          >
            <template #trigger>
              <b-button
                type="is-primary"
                icon-right="menu-down"
              >
                Régime ({{ regimeFilter.length }})
              </b-button>
            </template>

            <b-dropdown-item value="sans gluten" aria-role="listitem">
              <span>Sans gluten</span>
            </b-dropdown-item>

            <b-dropdown-item value="végétarien" aria-role="listitem">
              <span>Végétarien</span>
            </b-dropdown-item>

            <b-dropdown-item value="vegan" aria-role="listitem">
              <span>Vegan</span>
            </b-dropdown-item>

            <b-dropdown-item value="flexitarien" aria-role="listitem">
              <span>Flexitarien</span>
            </b-dropdown-item>

            <b-dropdown-item value="hypocalorique" aria-role="listitem">
              <span>Hypocalorique</span>
            </b-dropdown-item>

            <b-dropdown-item value="carnivore" aria-role="listitem">
              <span>Carnivore</span>
            </b-dropdown-item>

            <b-dropdown-item value="omnivore" aria-role="listitem">
              <span>Omnivore</span>
            </b-dropdown-item>
          </b-dropdown>

          <b-dropdown
            v-model="produitFilter"
            multiple
            aria-role="list"
          >
            <template #trigger>
              <b-button
                type="is-primary"
                icon-right="menu-down"
              >
                Produit ({{ produitFilter.length }})
              </b-button>
            </template>

            <b-dropdown-item v-for="produit in produits" :key="produit.id" :value="produit.id" aria-role="listitem">
              <span>{{ produit.nom }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div style="width:100%;" class="is-flex is-justify-content-center mt-2">
          <button class="button" @click="filtrer()">
            Filtrer
          </button>
        </div>
      </div>
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
        v-for="recipe in searchRecipes"
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
      filterHide: true,
      recipes: [],
      filteredRecipes: [],
      search: '',
      selectedOptions: [],
      idUserSuivis: [],
      saisonFilter: ['toutes', 'printemps', 'été', 'automne', 'hiver'],
      difficulteFilter: ['1', '2', '3'],
      regimeFilter: ['sans gluten', 'végétarien', 'vegan', 'flexitarien', 'hypocalorique', 'carnivore', 'omnivore'],
      produits: [],
      produitFilter: []
    }
  },
  computed: {
    searchRecipes () {
      return this.filteredRecipes.filter((recipe) => {
        return recipe.titre.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created () {
    this.$axios
      .get('/api/recettes')
      .then((response) => {
        this.recipes = response.data
        this.filteredRecipes = response.data
        this.error = false
      })
      .catch(() => {
        this.error = true
      })
      .finally(() => {
        this.loading = false
      })

    this.$axios
      .get('/api/produits')
      .then((response) => {
        this.produits = response.data
        this.produits.forEach((produit) => {
          this.produitFilter.push(produit.id)
        })
        this.error = false
      })
      .catch(() => {
        this.error = true
      })
  },
  methods: {
    sortArray () {
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (this.selectedOptions[i] === 'alpha') {
          this.filteredRecipes.sort((a, b) => {
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
          this.filteredRecipes.sort((a, b) => {
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
          this.filteredRecipes.sort((a, b) => {
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
              this.filteredRecipes = this.filteredRecipes.filter((recipe) => {
                return this.idUserSuivis.includes(recipe.id_createur)
              })
            })
        }
      }
    },

    async filtrer () {
      let arrayFilter = this.recipes

      arrayFilter = arrayFilter.filter((recipe) => { return this.saisonFilter.includes(recipe.saison) })
      arrayFilter = arrayFilter.filter((recipe) => { return this.difficulteFilter.includes((recipe.difficulte).toString()) })
      arrayFilter = arrayFilter.filter((recipe) => { return this.regimeFilter.includes(recipe.regime) })

      const asyncFilter = async (arr, predicate) => {
        const results = await Promise.all(arr.map(predicate))
        return arr.filter((_v, index) => results[index])
      }

      arrayFilter = await asyncFilter(arrayFilter, (recipe) => {
        return this.productInRecipe(recipe)
      })
      this.filteredRecipes = arrayFilter
    },

    async productInRecipe (recipe) {
      const produitsRecetteArray = []
      await this.$axios
        .get('/api/recette/produits/' + recipe.id)
        .then((response) => {
          const produitsRecette = response.data
          produitsRecette.forEach((produit) => {
            produitsRecetteArray.push(produit.id_produit)
          })
        })
      const res = produitsRecetteArray.every((element) => {
        return this.produitFilter.includes(element)
      })
      return res
    }
  }
}
</script>
