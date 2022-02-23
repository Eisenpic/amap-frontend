<template>
  <div class="container p-3">
    <div v-if="error">
      <p>Erreur lors de la récupération des questions</p>
    </div>
    <div v-else>
      <b-loading v-model="loading" :is-full-page="false" />
      <template v-for="question in questions">
        <QuestionComponent
          :id="question.id"
          :key="question.id"
          class="mb-5"
          :recette="question.id_recette"
          :question="question.question"
          :user="question.nom"
          :expertise="question.id_expertise"
          :date="question.date"
        />
      </template>
    </div>
  </div>
</template>

<script>
import QuestionComponent from '../../components/QuestionComponent'
export default {
  name: 'QandAPage',
  components: {
    QuestionComponent
  },
  middleware: 'auth',
  data () {
    return {
      error: false,
      loading: true,
      questions: null
    }
  },
  created () {
    this.$axios
      .get('/api/questions')
      .then((response) => {
        this.questions = response.data
        this.error = false
      })
      .catch((erreur) => {
        this.error = true
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style scoped>

</style>
