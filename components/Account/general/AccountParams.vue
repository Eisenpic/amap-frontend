<template>
  <div>
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
</template>

<script>
export default {
  name: 'AccountParams',
  data () {
    return {
      path: ''
    }
  },
  methods: {
    moove (path) {
      this.path = path
      console.log(this.path)
    }
  }
}
</script>

<style scoped>
</style>
