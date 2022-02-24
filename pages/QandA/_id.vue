<template>
  <div v-if="error">
    <p>{{ errorMessage }}</p>
  </div>
  <div v-else class="container">
    <b-loading v-model="loading" :is-full-page="false" />
    <div class="box">
      <h4 class="subtitle is-4 mt-5 pl-3 pt-3" style="font-family:cursive;"><b>Recette {{question.recette}}</b></h4>
      <div class="level pl-3 pb-3">
        <h5 class="subtitle is-5">
          {{ question.question }}
        </h5>
        <div v-if="$store.state.auth.user">
          <button v-if="question.id_user === $store.state.auth.user.id && !question.resolu" class="ml-2 button" @click="resolved()">Résolue</button>
        </div>
        <p v-if="question.resolu" class="mr-2 p-3" style="background-color:hsl(171, 100%, 41%); color:white; border-radius:10px; font-family:cursive; font-size:1.1em;" disabled>Résolue</p>
      </div>
    </div>
    <template v-for="rep in responses">
      <MessageComponent
        :key="rep.id_user"
        :id_user="rep.id_user"
        :reponse="rep.reponse"
        :id_question="rep.id_question"
        :nom="rep.nom"
        :img_user="rep.img_user"
        :date="rep.date"
      />
    </template>
    <transition name="fade">
      <div v-if="!haveMessage && $store.state.auth.user && expert && !question.resolu">
        <textarea v-model="message" class="textarea" placeholder="Ecrivez votre messages ici" rows="5" />
        <button class="button is-primary mt-2" @click="sendMessage">
          Envoyer
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import MessageComponent from '../../components/MessageComponent'
export default {
  name: 'ConversationCard',
  components: { MessageComponent },
  data () {
    return {
      loading: true,
      error: false,
      errorMessage: '',
      question: {},
      responses: {},
      message: '',
      haveMessage: false,
      expert: false
    }
  },
  created () {
    this.$axios.get(`/api/question/${this.$route.params.id}`)
      .then((response) => {
        this.question = response.data
        if (this.$store.state.auth.user) {
          if (this.$store.state.auth.user.id === this.question.id_user) {
            this.haveMessage = true
          }
        }
      })
      .catch((error) => {
        this.error = true
        this.errorMessage = 'Erreur lors de la récupération de la question.\n Erreur: ' + error
      })
      .finally(() => {
        this.loading = false
      })
    this.$axios.get(`/api/question/${this.$route.params.id}/reponses`)
      .then((response) => {
        this.responses = response.data
        if (this.$store.state.auth.user) {
          this.responses.forEach((response) => {
            if (response.id_user === this.$store.state.auth.user.id) {
              this.haveMessage = true
            }
          })
        }
      })
      .catch((error) => {
        this.error = true
        this.errorMessage = 'Erreur lors de la récupération des réponses.\n Erreur: ' + error
      })
    if (this.$store.state.auth.user) {
      this.$axios.get(`/api/users/${this.$store.state.auth.user.id}/expertises`)
        .then((response) => {
          const expertises = response.data
          expertises.forEach((expertise) => {
            if (expertise.id === this.question.id_expertise) {
              this.expert = true
            }
          })
        })
        .catch((error) => {
          this.error = true
          this.errorMessage = 'Erreur lors de la récupération des réponses.\n Erreur: ' + error
        })
    }
  },
  methods: {
    sendMessage () {
      this.$axios.post(`/api/question/${this.question.id}/reponse`, {
        id_question: this.question.id,
        id_user: this.$store.state.auth.user.id,
        reponse: this.message
      }).then((response) => {
        this.responses.push(response.data)
        this.haveMessage = true
        this.message = ''
      })
        .catch((error) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'Le message n\'a pas été envoyé!\n Erreur: ' + error.message,
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
    },
    resolved () {
      this.$axios.put('/api/question/resolu', {
        id_question: this.question.id,
        resolu: true
      }).then((response) => {
        this.question.resolu = true
        this.$buefy.toast.open({
          message: 'La question est changée en résolue',
          position: 'is-bottom',
          type: 'is-success'
        })
      })
        .catch((error) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'La question ne peux pas être résolu.\n Erreur: ' + error.message,
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
