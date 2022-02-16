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
        @select="option => (selected = option)"
      />
    </b-field>
    <div class="mt-3">
      <template v-for="ing in panier">
        <PanierItems :key="ing.id" :nom="ing.nom"/>
      </template>
    </div>
  </div>
</template>

<script>

import PanierItems from '../../components/Account/PanierItems'

export default {
  name: 'ProducteurPage',
  components: { PanierItems },
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
      console.log(response.data)
      this.panier = response.data
    })
  }
}
</script>

<style scoped>

</style>
