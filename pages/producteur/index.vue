<template>
  <div>
    <h3 class="title is-3">
      Bienvenue sur la page d'éditions de panier.
    </h3>
    <h3 class="subtitle is-3">
      Ici vous pourrez éditer votre panier de la semaine afin que les amapiens puissent consulté les recettes lié !
    </h3>
    <hr>
    <b-field label="Trouver par nom : ">
      <b-autocomplete
        v-model="selecting"
        placeholder="ex: Aubergine"
        :keep-first="false"
        :open-on-focus="true"
        :data="filteredDataObj"
        field="nom"
        :clearable="true"
        expanded
        @select="option => (selected = option)"
      />
      <button class="button" @click.prevent="addToCart">
        Ajouter
      </button>
    </b-field>
    <div class="mt-3">
      <template v-for="ing in panier">
        <PanierItems :key="ing.id" :idprod="ing.id" :nom="ing.nom" class="mt-3" @refresh="majPanier" />
      </template>
    </div>
  </div>
</template>

<script>

import PanierItems from '../../components/PanierItems'

export default {
  name: 'ProducteurPage',
  components: { PanierItems },
  middleware: ['auth', 'producteur'],
  data () {
    return {
      panier: [],
      ingredients: [],
      selecting: '',
      selected: null
    }
  },
  computed: {
    filteredDataObj () {
      return this.ingredients.filter((option) => {
        return (
          option.nom.toString().toLowerCase().includes(this.selecting.toLowerCase())
        )
      })
    }
  },
  mounted () {
    this.$axios.get('/api/ingredients').then((response) => {
      this.ingredients = response.data
    })
    this.$axios.get(`/api/panier/${this.$auth.user.id}`).then((response) => {
      this.panier = response.data
    })
  },
  methods: {
    addToCart () {
      if (this.selected !== null) {
        this.$axios.post(`/api/panier/${this.$auth.user.id}/${this.selected.id}`).then((response) => {
          const res = {
            id: this.selected.id,
            nom: this.selected.nom
          }

          this.panier.push(res)
        }).catch(() => {
          this.$buefy.snackbar.open({
            message: "Impossible d'ajouter un élement déjà présent dans votre panier.",
            type: 'is-danger',
            position: 'is-bottom'
          })
        })
      } else {
        this.$buefy.snackbar.open({
          message: 'Vous devez spécifier un ingrédient à ajouter avant de valider',
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
    },
    majPanier (id) {
      this.panier = this.panier.filter(el => el.id !== id)
    }
  }
}
</script>

<style scoped>

</style>
