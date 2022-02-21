<template>
  <div class="p-2">
    <h1 class="pb-4 is-size-5">
      Identifiants & Mot de passe
    </h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: this.$auth.$state.user
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  text-decoration: underline;
}
i {
  float: left;
  margin-right: 7px;
}
</style>
