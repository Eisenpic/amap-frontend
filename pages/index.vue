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

            <client-only>
              <b-dropdown-item v-if="$auth.loggedIn" value="utisuivis" aria-role="listitem">
                <span>Utilisateurs suivis</span>
              </b-dropdown-item>
            </client-only>
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
        <p class="has-text-centered mt-5">
          <i>Sélectionnez ou désélectionnez les cases des différentes listes déroulantes puis appuyez sur le bouton "filtrer" pour filtrer à votre guise 😄</i>
        </p>
        <div class="is-flex is-justify-content-center mt-5" style="flex-wrap:wrap;">
          <b-dropdown
            v-model="saisonFilter"
            class="mt-2"
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
            class="mt-2"
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
            class="mt-2"
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
            v-model="typeFilter"
            class="mt-2"
            multiple
            aria-role="list"
          >
            <template #trigger>
              <b-button
                type="is-primary"
                icon-right="menu-down"
              >
                Type ({{ typeFilter.length }})
              </b-button>
            </template>

            <b-dropdown-item value="entrée" aria-role="listitem">
              <span>Entrée</span>
            </b-dropdown-item>

            <b-dropdown-item value="plat" aria-role="listitem">
              <span>Plat</span>
            </b-dropdown-item>

            <b-dropdown-item value="dessert" aria-role="listitem">
              <span>Dessert</span>
            </b-dropdown-item>

            <b-dropdown-item value="collation" aria-role="listitem">
              <span>Collation</span>
            </b-dropdown-item>

            <b-dropdown-item value="boisson" aria-role="listitem">
              <span>Boisson</span>
            </b-dropdown-item>
          </b-dropdown>

          <b-dropdown
            v-model="produitFilter"
            class="mt-2"
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

        <div id="filtrePanier" class="is-flex is-justify-content-center mt-4">
          <p v-if="panierSelected" class="content" style="margin-top:5px;">
            <b>Panier de: </b>
          </p>
          <p v-else class="content" style="margin-top:5px;">
            <b>Filtrez par votre panier</b>
          </p> &nbsp;
          <b-field>
            <b-autocomplete
              v-model="name"
              rounded
              :data="filteredPanierArray"
              field="nom"
              placeholder="Rechercher un producteur"
              icon="magnify"
              clearable
              @select="option => panierSelected = option"
            >
              <template #empty>
                No results found
              </template>
            </b-autocomplete>
          </b-field>
        </div>

        <div style="width:100%;" class="is-flex is-justify-content-center mt-2">
          <button class="button" @click="filtrer()">
            Filtrer
          </button>
        </div>
      </div>
    </div>
    <client-only>
      <div v-if="$auth.loggedIn" class="is-flex">
        <b-button type="is-primary" label="Créer une recette" @click="$router.push('/recette/creation')" />
      </div>
    </client-only>
    <div v-if="error">
      <p>Erreur lors de la récupération des recettes</p>
    </div>
    <div v-else class="columns is-multiline is-justify-content-center">
      <b-loading v-model="loading" :is-full-page="false" />
      <card-recipe
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
      filterHide: true,
      recipes: [],
      filteredRecipes: [],
      search: '',
      selectedOptions: [],
      idUserSuivis: [],
      saisonFilter: ['toutes'],
      difficulteFilter: ['1', '2', '3'],
      regimeFilter: ['sans gluten', 'végétarien', 'vegan', 'flexitarien', 'hypocalorique', 'carnivore', 'omnivore'],
      typeFilter: ['entrée', 'plat', 'dessert', 'collation', 'boisson'],
      produits: [],
      produitFilter: [],
      paniers: [],
      name: '',
      panierSelected: null
    }
  },
  computed: {
    filteredRecipes () {
      return this.recipes.filter((recipe) => {
        return recipe?.titre?.toLowerCase().includes(this.search?.toLowerCase())
      })
    },

    filteredPanierArray () {
      return this.paniers.filter((option) => {
        return (option.nom
          .toString()
          .toLowerCase()
          .includes(this.name.toLowerCase())
        )
      })
    }
  },
  async created () {
    await this.$axios
      .get('/api/recettes')
      .then((response) => {
        this.recipes = response.data
        this.error = false
      })
      .catch((erreur) => {
        this.error = true
        alert('Problème lors de la récupération des recettes: ' + erreur)
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
      })
      .catch((erreur) => {
        alert('Problème lors de la récupération des produits: ' + erreur)
      })

    this.$axios
      .get('/api/producteurs')
      .then((response) => {
        this.paniers = response.data
      })
      .catch((erreur) => {
        alert('Problème lors de la récupération des paniers: ' + erreur)
      })

    const today = Date.parse(new Date())
    const year = new Date().getFullYear()
    const spring = Date.parse(new Date(year, 2, 21))
    const summer = Date.parse(new Date(year, 5, 21))
    const autumn = Date.parse(new Date(year, 8, 21))
    const winter = Date.parse(new Date(year, 11, 21))

    if (today < spring || today >= winter) {
      this.saisonFilter.push('hiver')
    } else if (today < summer && today >= spring) {
      this.saisonFilter.push('printemps')
    } else if (today < autumn && today >= summer) {
      this.saisonFilter.push('été')
    } else {
      this.saisonFilter.push('automne')
    }

    this.filtrer()
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
      this.loading = true
      this.filterHide = !this.filterHide
      let arrayFilter = this.recipes

      arrayFilter = arrayFilter.filter((recipe) => { return this.saisonFilter.includes(recipe.saison) })
      arrayFilter = arrayFilter.filter((recipe) => { return this.difficulteFilter.includes((recipe.difficulte).toString()) })
      arrayFilter = arrayFilter.filter((recipe) => { return this.regimeFilter.includes(recipe.regime) })
      arrayFilter = arrayFilter.filter((recipe) => { return this.typeFilter.includes(recipe.type) })

      const asyncFilter = async (arr, predicate) => {
        const results = await Promise.all(arr.map(predicate))
        return arr.filter((_v, index) => results[index])
      }

      arrayFilter = await asyncFilter(arrayFilter, (recipe) => {
        return this.productInRecipe(recipe)
      })

      if (this.panierSelected) {
        arrayFilter = await asyncFilter(arrayFilter, (recipe) => {
          return this.productInBasket(recipe)
        })
      }
      this.filteredRecipes = arrayFilter
      this.loading = false
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
    },

    async productInBasket (recipe) {
      const produitsRecetteArray = []
      const produitsPanierArray = []
      await this.$axios
        .get('/api/recette/produits/' + recipe.id)
        .then((response) => {
          const produitsRecette = response.data
          produitsRecette.forEach((produit) => {
            produitsRecetteArray.push(produit.id_produit)
          })
        })

      await this.$axios
        .get('/api/panier/produits/' + this.panierSelected.id)
        .then((response) => {
          const produitsPanier = response.data
          produitsPanier.forEach((produit) => {
            produitsPanierArray.push(produit.id_produit)
          })
        })
      return produitsRecetteArray.some(produit => produitsPanierArray.includes(produit))
    }

  }
}
</script>
<style>
.dropdown-menu{
  max-height:200px;
  overflow-y:auto;
}

#filtrePanier > .dropdown-menu{
  overflow-y:hidden;
}

</style>
