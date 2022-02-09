<template>
  <div>
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
