<template>
  <section class="columns is-centered">
    <div class="column is-8 box pl-5 pr-5 p-5 mt-6">
      <div>
        <AccountLayout />
      </div>
      <div class="mb-6">
        <AccountProfil :nb-avis="nbAvis" :nb-topics="nbTopics" :member="member" />
      </div>
      <div class="columns mt-5">
        <div class="column is-3 box p-2 has-background-grey-lighter">
          <b-menu>
            <b-menu-list label="Paramètres">
              <b-menu-item v-if="path !== 'default'" @click="moove('default')" icon="information-outline" label="Informations Personnelles" />
              <b-menu-item v-else icon="information-outline" label="Informations Personnelles" disabled />
              <b-menu-item v-if="path !== 'expertises'" @click="moove('expertises')" icon="star" label="Mes Expertises" />
              <b-menu-item v-else icon="star" label="Mes Expertises" disabled />
              <b-menu-item v-if="path !== 'logins'" @click="moove('logins')" icon="key" label="Identifiant et Mot de passe" />
              <b-menu-item v-else label="Identifiant et Mot de passe" disabled/>
              <b-menu-item v-if="path !== 'avatar'" @click="moove('avatar')" icon="account" label="Modification Avatar" />
              <b-menu-item v-else icon="account" label="Modification Avatar" disabled />
              <b-menu-item v-if="path !== 'delete'" @click="moove('delete')" icon="delete" label="Suppression Compte" />
              <b-menu-item v-else icon="delete" label="Suppression Compte" disabled/>
            </b-menu-list>
          </b-menu>
        </div>
        <div v-if="path === 'default' " class="column is-4 is-offset-3 box has-background-grey-lighter" >
          <AccountInfos />
        </div>
        <div v-if="path === 'logins'" class="column is-4 is-offset-3 box has-background-grey-lighter">
            <AccountLogins />
        </div>
        <br />
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
      path: 'default'
    }
  },
  mounted () {
    this.chargerAvis()
    this.chargerTopics()
  },
  methods: {
    moove (path) {
      this.path = path
      console.log(this.path)
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
    }
  }
}
</script>

<style scoped>

</style>
