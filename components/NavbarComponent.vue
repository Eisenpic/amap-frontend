<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item>
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="nuxt-link" to="/">
        Recette
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/QandA">
        Q&A
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/contributeurs">
        Producteurs
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item v-if="isAuthentificated" tag="div">
        <div class="buttons">
          <div class="button is-primary mr-2" @click="$router.push(`/compte/params`)">
            <strong> Profil Personnel</strong>
          </div>
          <div class="button is-light" @click="deconnection">
            Déconnexion
          </div>
        </div>
      </b-navbar-item>

      <b-navbar-item v-else tag="div">
        <div class="buttons">
          <nuxt-link to="/inscription">
            <div class="button is-primary mr-2">
              <strong>Inscription</strong>
            </div>
          </nuxt-link>
          <nuxt-link to="/connexion">
            <div class="button is-light">
              Connexion
            </div>
          </nuxt-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavbarComponent',
  computed: {
    isAuthentificated () {
      return this.$auth.loggedIn
    }
  },
  methods: {
    deconnection () {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>

</style>
