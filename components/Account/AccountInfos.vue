<template>
  <div class="p-2">
    <h1 class="pb-4 is-size-5">
      Informations Personnelles
    </h1>
    <div v-if="edit.length > 0">
      <form @submit.prevent="putInfos">
        <div v-if="edit.indexOf('prenom') !== -1" class="is-flex">
          <b-tooltip label="Annuler" position="is-top">
            <i class="fas fa-undo is-clickable" @click="cancelInfos('prenom')" />
          </b-tooltip>
          <p class="pb-2">
            <span class="is-underlined">Prénom :</span>
            <b-input v-model="prenom" />
          </p>
        </div>
        <div v-else class="is-flex">
          <b-tooltip label="Modifier" position="is-top">
            <i class="fas fa-pen is-clickable" @click="editInfos('prenom')" />
          </b-tooltip>
          <p class="pb-2">
            <span class="is-underlined">Prénom</span> : {{ prenom }}
          </p>
        </div>
        <div v-if="edit.indexOf('nom') !== -1" class="is-flex">
          <b-tooltip label="Annuler" position="is-top">
            <i class="fas fa-undo is-clickable" @click="cancelInfos('nom')" />
          </b-tooltip>
          <p class="pb-2">
            <span class="is-underlined">Nom :</span>
            <b-input v-model="nom" />
          </p>
        </div>
        <div v-else class="is-flex">
          <b-tooltip label="Modifier" position="is-top">
            <i class="fas fa-pen is-clickable" @click="editInfos('nom')" />
          </b-tooltip>
          <p class="pb-2">
            <span class="is-underlined">Nom</span> : {{ nom }}
          </p>
        </div>

        <div v-if="edit.indexOf('tel') !== -1" class="is-flex">
          <b-tooltip label="Annuler" position="is-top">
            <i class="fas fa-undo is-clickable" @click="cancelInfos('tel')" />
          </b-tooltip>
          <p class="pb-2">
            <span class="is-underlined">Téléphone :</span>
            <b-input v-model="tel" type="number" />
          </p>
        </div>
        <div v-else class="is-flex">
          <b-tooltip label="Modifier" position="is-top">
            <i class="fas fa-pen is-clickable" @click="editInfos('tel')" />
          </b-tooltip>
          <p class="pb-2">
            <span class="is-underlined">Téléphone</span> : {{ tel }}
          </p>
        </div>
        <div class="has-text-centered">
          <button class="button" outlined>
            Valider
          </button>
        </div>
      </form>
    </div>
    <div v-else>
      <div class="is-flex">
        <b-tooltip label="Modifier" position="is-top">
          <i class="fas fa-pen is-clickable" @click="editInfos('prenom')" />
        </b-tooltip>
        <p class="pb-2">
          <span class="is-underlined">Prénom</span> : {{ prenom }}
        </p>
      </div>
      <div class="is-flex">
        <b-tooltip label="Modifier" position="is-top">
          <i class="fas fa-pen is-clickable" @click="editInfos('nom')" />
        </b-tooltip>
        <p class="pb-2">
          <span class="is-underlined">Nom</span> : {{ nom }}
        </p>
      </div>
      <div class="is-flex">
        <b-tooltip label="Modifier" position="is-top">
          <i class="fas fa-pen is-clickable" @click="editInfos('tel')" />
        </b-tooltip>
        <p class="pb-2">
          <span class="is-underlined">Téléphone</span> : {{ tel }}
        </p>
      </div>
      <div v-if="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: this.$auth.state.user,
      edit: [],
      message: '',
      prenom: this.$auth.state.user.prenom,
      nom: this.$auth.state.user.nom,
      tel: this.$auth.state.user.telephone
    }
  },
  methods: {
    editInfos (name) {
      this.edit.push(name)
    },
    cancelInfos (name) {
      this.edit.splice(this.edit.indexOf(name), 1)
    },
    putInfos () {
      this.$axios.put(`/api/users/${this.user.id}`, {
        prenom: this.prenom,
        nom: this.nom,
        tel: this.tel
      }).then((response) => {
        this.edit = []
        this.message = 'Informations mises à jour'
        this.$auth.$storage.setState('user', response.data)
        this.$auth.setUser(response.data)
        this.$router.go()
      })
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
