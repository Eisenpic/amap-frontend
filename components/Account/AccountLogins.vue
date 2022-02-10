<template>
  <div class="p-2">
    <h1 class="pb-5 is-size-5">
      Identifiants & Mot de passe
    </h1>
    <div v-if="edit === 'email'" class="is-flex">
      <form @submit.prevent="putInfos">
        <b-tooltip label="Annuler" position="is-top"><i class="fas fa-undo is-clickable" @click="cancelInfos()" /></b-tooltip>
        <p class="pb-2">
          <span class="is-underlined">Email :</span>
          <b-input v-model="email" />
        </p>
        <p class="pb-2">
          <span class="is-underlined">Entrez votre mot de passe pour valider :</span>
          <b-input v-model="verifpassword" class="pt-1" type="password" />
        </p>
        <div class="has-text-centered">
          <button class="button" outlined>Valider</button>
        </div>
      </form>
    </div>
    <div v-else-if="edit === 'password'" class="is-flex">
      <form @submit.prevent="putInfos">
        <div>
            <b-tooltip label="Annuler" position="is-top"><i class="fas fa-undo is-clickable" @click="cancelInfos()" /></b-tooltip>
          <b-input v-model="password" class="pt-1" type="password" placeholder="Nouveau mot de passe" />
        </div>
        <div>
          <b-input v-model="confpassword" class="pt-1" type="password" placeholder="Confirmer le mot de passe" />
        </div>
        <p class="pb-2">
          <span class="is-underlined">Valider avec votre ancien mot de passe :</span>
          <b-input v-model="verifpassword" class="pt-1" type="password" />
        </p>
        <div class="has-text-centered">
          <button class="button" outlined>Valider</button>
        </div>
      </form>
    </div>
    <div v-else>
      <div class="is-flex">
        <b-tooltip label="Modifier" position="is-top"><i class="fas fa-pen is-clickable" @click="editInfos('email')" /></b-tooltip>
        <p class="pb-4"><span class="is-underlined">Email</span> : {{ email }}</p>
      </div>
      <div class="is-flex">
        <b-button @click="editInfos('password')">Changer le mot de passe</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: this.$auth.user,
      edit: '',
      email: this.$auth.$state.user.email,
      password: '',
      confpassword: '',
      verifpassword: '',
      message: ''
    }
  },
  methods: {
    verifEmail () {
    },
    editInfos (name) {
      this.edit = name
      if (name === 'email') {
        this.verifEmail()
      }
    },
    cancelInfos () {
      this.edit = ''
    },
    verifPassword () {
      // Need to get the user's password
    },
    putInfos () {
      if (this.password === this.confpassword) {
        this.$axios.put(`/api/users/${this.user.id}`, {
          email: this.email,
          password: this.password
        }).then(() => {
          this.edit = []
          this.message = 'Informations mises à jour'
          this.$router.go()
        })
      }
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
