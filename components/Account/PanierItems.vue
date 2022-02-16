<template>
  <div class="is-flex is-justify-content-space-between">
    <div>
      <p>{{ nom }}</p>
    </div>
    <div>
      <button class="button is-danger">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanierItems',
  props: ['nom']
}
</script>

<style scoped>

</style>
