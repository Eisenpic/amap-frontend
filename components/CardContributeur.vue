<template>
  <div class="column p-0 is-one-quarter-desktop is-half-tablet is-full-mobile card">
    <nuxt-link :to="{name: 'contributeurs-recettes-id', params: { id: contributeur.id }}">
      <div class="card-image m-2">
        <figure class="image is-4by3">
          <img :src="contributeur.url_img" alt="Photo de profil">
        </figure>
      </div>
      <p class="has-text-centered m-2">
        {{ fullname }}
      </p>
    </nuxt-link>
    <div v-if="$auth.loggedIn" class="card-content has-text-centered px-1 py-1">
      <b-button v-if="suivi" rounded class="is-small" @click="unfollow">
        Ne plus suivre
      </b-button>
      <b-button v-else rounded class="is-small" @click="follow">
        Suivre
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContributeur',
  // eslint-disable-next-line vue/require-prop-types,vue/prop-name-casing
  props: ['contributeur', 'followers'],
  data () {
    return {
      suivi: false
    }
  },
  computed: {
    fullname () {
      return this.contributeur.prenom + ' ' + this.contributeur.nom
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.isFollowing()
    }
  },
  methods: {
    isFollowing () {
      const res = this.followers.find(el => el.id === this.contributeur.id)
      if (res) {
        this.suivi = true
      }
    },
    unfollow () {
      this.$axios.delete(`/api/contributeur/${this.$auth.user.id}/unfollow/${this.contributeur.id}`)
        .then((response) => {
          this.suivi = false
        })
        .catch(() => {
          this.$buefy.toast.open('Une erreur est survenue')
        })
    },
    follow () {
      this.$axios.post(`/api/contributeur/${this.$auth.user.id}/suivre/${this.contributeur.id}`)
        .then((response) => {
          this.suivi = true
        })
        .catch(() => {
          this.$buefy.toast.open('Une erreur est survenue')
        })
    }
  }
}
</script>

<style scoped>

</style>
