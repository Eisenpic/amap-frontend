<template>
    <div v-if="error">
        <p>{{errorMessage}}</p>
    </div>
    <div v-else class="container">
    <b-loading v-model="loading" :is-full-page="false" />
        <div class="box">
        <h5 class="subtitle is-5 mt-5">
            {{ question.question }}
        </h5>
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
        <textarea v-model="message" class="textarea" placeholder="Ecrivez votre messages ici" rows="5" />
        <button class="button is-primary mt-2" @click="sendMessage">
        Envoyer
        </button>
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
      message: ''
    }
  },
  created () {
    this.$axios.get(`/api/question/${this.$route.params.id}`)
      .then((response) => {
        this.question = response.data
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
      })
      .catch((error) => {
        this.error = true
        this.errorMessage = 'Erreur lors de la récupération des réponses.\n Erreur: ' + error
      })
  },
  methods: {
    sendMessage () {
      this.$axios.post(`/api/question/${this.question.id}/reponse`, {
        id_question: this.question.id,
        id_user: this.$store.state.auth.user.id,
        reponse: this.message
      }).then((response) => {
        this.responses.push(response.data)
        console.log(response.data)
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
    }
  }
}
</script>
