<template>
  <section class="columns is-centered">
    <div id="container" class="column is-8 box pl-5 pr-5 p-5 mt-6">
      <div>
        <AccountLayout />
      </div>
      <div class="mb-6">
        <AccountProfil :nb-avis="nbAvis" :nb-topics="nbTopics" :member="member" :member-expertises="memberExpertises" />
      </div>
      <div class="columns mt-5">
        <div class="column is-3 box p-2 has-background-grey-lighter">
          <b-menu>
            <b-menu-list label="Paramètres">
              <b-menu-item v-if="path !== 'default'" icon="information-outline" label="Informations Personnelles" @click="moove('default')" />
              <b-menu-item v-else icon="information-outline" label="Informations Personnelles" disabled />
              <b-menu-item v-if="path !== 'expertises'" icon="star" label="Mes Expertises" @click="moove('expertises')" />
              <b-menu-item v-else icon="star" label="Mes Expertises" disabled />
              <b-menu-item v-if="path !== 'logins'" icon="key" label="Identifiant et Mot de passe" @click="moove('logins')" />
              <b-menu-item v-else label="Identifiant et Mot de passe" disabled />
              <b-menu-item v-if="path !== 'avatar'" icon="account" label="Modification Avatar" @click="moove('avatar')" />
              <b-menu-item v-else icon="account" label="Modification Avatar" disabled />
              <b-menu-item v-if="path !== 'delete'" icon="delete" label="Suppression Compte" @click="moove('delete')" />
              <b-menu-item v-else icon="delete" label="Suppression Compte" disabled />
            </b-menu-list>
          </b-menu>
        </div>
        <div v-if="path === 'default' " class="column is-4 is-offset-3 box has-background-grey-lighter">
          <AccountInfos />
        </div>
        <div v-if="path === 'logins'" class="column is-4 is-offset-3 box has-background-grey-lighter">
          <AccountLogins />
        </div>
        <div v-if="path === 'expertises'" class="column is-5 is-offset-2 box has-background-grey-lighter">
          <AccountExpertise :expertises="expertises" :member-expertises="memberExpertises" :member="member" />
        </div>
        <br>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ParamsPage',
  middleware: 'auth',
  data () {
    return {
      member: this.$auth.$state.user,
      avis: [],
      nbAvis: 0,
      topics: [],
      nbTopics: 0,
      path: 'default',
      expertises: [],
      memberExpertises: []
    }
  },
  mounted () {
    this.chargerAvis()
    this.chargerTopics()
    this.chargerExpertises()
    this.chargerMemberExpertises()
  },
  methods: {
    moove (path) {
      this.path = path
    },
    chargerAvis () {
      this.$axios.get(`/api/users/${this.member.id}/avis`).then((response) => {
        this.avis = response.data
        this.nbAvis = response.data.length
      })
    },
    chargerTopics () {
      this.$axios.get(`/api/users/${this.member.id}/topics`).then((response) => {
        this.topics = response.data
        this.nbTopics = response.data.length
      })
    },
    chargerExpertises () {
      this.$axios.get('/api/expertises').then((response) => {
        this.expertises = response.data
      })
    },
    chargerMemberExpertises () {
      this.$axios.get(`/api/users/${this.member.id}/expertises`).then((response) => {
        this.memberExpertises = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
