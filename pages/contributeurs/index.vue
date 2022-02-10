<template>
  <section class="section">
    <div class="columns mt-3">
      <b-field message="Quelle contributeur cherchez-vous?" class="column is-half is-offset-3">
        <b-input
          v-model="search"
          placeholder="Rechercher..."
          type="search"
          icon="magnify"
          expanded
        />
      </b-field>
    </div>
    <div v-if="ready" class="columns is-multiline is-justify-content-center mt-2">
      <template v-for="contributeur in filterByTerm">
        <CardContributeur :key="contributeur.id" :contributeur="contributeur" :followers="followers" />
      </template>
    </div>
  </section>
</template>

<script>
import CardContributeur from '../../components/CardContributeur'
export default {
  name: 'IndexPage',
  components: {
    CardContributeur
  },
  data () {
    return {
      contributeurs: [],
      followers: [],
      search: '',
      ready: false
    }
  },
  computed: {
    filterByTerm () {
      return this.contributeurs.filter((el) => {
        if (this.$auth.loggedIn) {
          if (el.id !== this.$auth.user.id) {
            return el.nom.toLowerCase().includes(this.search.toLowerCase()) || el.prenom.toLowerCase().includes(this.search.toLowerCase())
          } else {
            return false
          }
        } else {
          return el.nom.toLowerCase().includes(this.search.toLowerCase()) || el.prenom.toLowerCase().includes(this.search.toLowerCase())
        }
      })
    }
  },
  mounted () {
    this.$axios.get('/api/contributeurs')
      .then((response) => {
        this.contributeurs = response.data
      })

    if (this.$auth.loggedIn) {
      this.$axios.get(`/api/contributeurs/suivis/${this.$auth.user.id}`)
        .then((response) => {
          this.followers = response.data
          this.ready = true
        })
    } else {
      this.ready = true
    }
  }
}
</script>
