<template>
  <div class="container p-3">
    <div v-if="error">
      <p>{{errorMessage}}</p>
    </div>
    <div v-else>
      <b-input v-model="search" type="text" placeholder="Rechercher une question..." class="mb-5" expanded />
      <div class="level">
        <div class="level-left">
          <b-field class="level-item" style="margin-bottom:0em;">
          <b-checkbox v-model="checkMyExpertises" native-value="false" @click.native="filterByMyExpertises()">
            Filtrer selon mes expertises
          </b-checkbox>
          </b-field>
          <b-field class="level-item">
            <b-checkbox v-model="checkResolved" native-value="false" @click.native="filterByResolved()">
              Résolues
            </b-checkbox>
          </b-field>
        </div>

        <div class="level-right">
          <b-dropdown
            v-model="filteredExpertises"
            class="mt-2"
            multiple
            aria-role="list"
          >
            <template #trigger>
              <b-button
                type="is-primary"
                icon-right="menu-down"
              >
                Expertises ({{ filteredExpertises.length }})
              </b-button>
            </template>

            <b-dropdown-item v-for="expertise in expertises" :key="expertise.id" :value="expertise.id" @click="filterByExpertises()" aria-role="listitem">
              <span>{{ expertise.nom }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <b-loading v-model="loading" :is-full-page="false" />
      <div v-if="filteredQuestions">
        <template v-for="question in filteredSearchQuestions">
          <QuestionComponent
            :id="question.id"
            :key="question.id"
            class="mb-5"
            :recette="question.id_recette"
            :question="question.question"
            :user="question.nom"
            :id_user="question.id_user"
            :expertise="question.id_expertise"
            :date="question.date"
            :resolu="question.resolu"
          />
        </template>
      </div>
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
      questions: null,
      filteredQuestions: null,
      search: '',
      myExpertises: [],
      expertises: null,
      filteredExpertises: [],
      checkMyExpertises: false,
      checkResolved: false
    }
  },
  computed: {
    filteredSearchQuestions () {
      return this.filteredQuestions.filter((question) => {
        return question?.question?.toLowerCase().includes(this.search?.toLowerCase())
      })
    }
  },
  created () {
    this.$axios
      .get('/api/questions')
      .then((response) => {
        this.questions = response.data
        this.filteredQuestions = response.data
        this.error = false
      })
      .catch((erreur) => {
        this.error = true
      })
      .finally(() => {
        this.loading = false
      })

    if (this.$store.state.auth.user) {
      this.$axios.get(`/api/users/${this.$store.state.auth.user.id}/expertises`)
        .then((response) => {
          response.data.forEach((expertise) => {
            this.myExpertises.push(expertise.id)
          })
        })
        .catch((error) => {
          this.error = true
          this.errorMessage = 'Erreur lors de la récupération de mes expertises.\n Erreur: ' + error
        })
    }

    this.$axios.get('/api/expertises')
      .then((response) => {
        this.expertises = response.data
        response.data.forEach((expertise) => {
          this.filteredExpertises.push(expertise.id)
        })
      })
      .catch((error) => {
        this.error = true
        this.errorMessage = 'Erreur lors de la récupération des expertises.\n Erreur: ' + error
      })
  },
  methods: {
    filterByMyExpertises () {
      if (!this.checkMyExpertises) {
        this.filteredQuestions = this.filteredQuestions.filter((question) => { return this.myExpertises.includes(question.id_expertise) })
      } else {
        this.filterByExpertises()
      }
    },

    filterByExpertises () {
      this.filteredQuestions = this.questions
      this.filteredQuestions = this.filteredQuestions.filter((question) => { return this.filteredExpertises.includes(question.id_expertise) })
    },

    filterByResolved () {
      if (!this.checkResolved) {
        this.filteredQuestions = this.filteredQuestions.filter(question => question.resolu)
      } else {
        this.filterByExpertises()
      }
    }
  }
}
</script>

<style scoped>

</style>
