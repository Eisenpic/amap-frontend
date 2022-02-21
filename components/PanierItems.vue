<template>
  <div class="is-flex is-justify-content-space-between">
    <div>
      <p>{{ nom }}</p>
    </div>
    <div>
      <button class="button is-danger" @click="deleteItem">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanierItems',
  props: ['nom', 'idprod'],
  methods: {
    deleteItem () {
      this.$axios.$delete(`/api/panier/${this.$auth.user.id}/${this.idprod}`)
      this.$emit('refresh', this.idprod)
    }
  }
}
</script>

<style scoped>

</style>
