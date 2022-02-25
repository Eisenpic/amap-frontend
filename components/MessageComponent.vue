<template>
  <transition name="fade">
    <div v-if="display" class="box ml-5">
      <div>
        <div class="is-flex">
          <img v-if="img_user" class="mr-2" :src="img_user" width="20" height="20">
          <h1><strong>{{ user }}</strong> : </h1>
          <button v-if="id_user === $store.state.auth.user.id" class="ml-2 button is-small" @click="edit = !edit">
            <i class="fas fa-edit" />
          </button>
          <button v-if="id_user === $store.state.auth.user.id" class="ml-2 button is-small" @click="deleteMsg">
            <i class="fas fa-trash-alt" />
          </button>
        </div>
        <div class="mt-3">
          <span v-html="messageNoEdit" />
        </div>
        <div>
          <p class="has-text-right">
            <i>posté le {{ dateFormat }}</i>
          </p>
        </div>
      </div>
      <div v-if="edit === true">
        <textarea v-model="messageEdit" class="textarea mt-5" placeholder="Ecrivez votre messages ici" rows="5" />
        <button class="button is-primary mt-2" @click="sendEdit">
          Envoyer
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MessageComponent',
  props: ['reponse', 'id_user', 'id_question', 'nom', 'img_user', 'date'],
  data () {
    return {
      messageNoEdit: this.reponse,
      user: this.nom,
      edit: false,
      display: true,
      messageEdit: ''
    }
  },
  computed: {
    dateFormat () {
      return new Date(this.date).toLocaleDateString('fr', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    }
  },
  methods: {
    deleteMsg () {
      this.$axios.delete(`/api/question/${this.$route.params.id}/delete/${this.id_user}`)
        .then((response) => {
          this.display = false
          this.$buefy.toast.open({
            message: 'Le message a été supprimé!',
            type: 'is-success'
          })
          this.$parent.haveMessage = false
        })
        .catch((error) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Le message n\'a pas été supprimé!\n Erreur: ' + error,
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
    },
    sendEdit () {
      if (this.messageEdit) {
        this.$axios.put(`/api/question/${this.$route.params.id}/edit/${this.id_user}`, { reponse: this.messageEdit })
          .then((response) => {
            this.messageNoEdit = this.messageEdit
            this.messageEdit = ''
            this.edit = false
            this.$buefy.toast.open({
              message: 'Le message a été modifié!',
              type: 'is-success'
            })
          })
          .catch((error) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Le message n\'a pas été modifié!\n Erreur: ' + error.message,
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Le message est vide',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .05s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
