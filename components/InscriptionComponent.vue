<template>
  <div class="column is-8">
    <div class="card">
      <h1 class="has-text-centered is-size-4 pt-4">
        <b>Inscription</b>
      </h1>
      <section class="pb-4 pl-6 pr-6 mt-4">
        <div class="is-flex is-justify-content-center">
          <b-field
            label="Nom"
            class="column is-6"
          >
            <b-input
              v-model="nom"
              type="text"
              placeholder="entrez votre nom"
            />
          </b-field>
          <b-field
            label="Prénom"
            class="column is-6"
          >
            <b-input
              v-model="prenom"
              type="text"
              placeholder="entrez votre prénom"
            />
          </b-field>
        </div>
        <div class="is-flex is-justify-content-center">
          <b-field
            label="Email"
            class="column is-6"
          >
            <b-input
              v-model="email"
              type="text"
              placeholder="entrez votre email"
            />
          </b-field>
          <b-field
            label="Téléphone"
            class="column is-6"
          >
            <b-input
              v-model="numtel"
              type="text"
              placeholder="entrez votre numéro de téléphone"
              minlength="10"
              maxlength="10"
            />
          </b-field>
        </div>
        <div class="is-flex is-justify-content-center">
          <b-field
            label="Mot de passe"
            class="column is-6"
          >
            <b-input
              v-model="password"
              type="password"
              placeholder="entrez votre mot de passe"
            />
          </b-field>
          <b-field
            label="Confirmation du mot de passe"
            class="column is-6"
          >
            <b-input
              v-model="confpassword"
              type="password"
              placeholder="confirmez votre mot de passe"
            />
          </b-field>
        </div>
        <div class="is-flex is-justify-content-center">
          Êtes-vous un expert en cuisine ? &nbsp;
          <b-radio
            v-model="radio"
            name="expertRatio"
            native-value="oui"
            @click.native="seen = true"
          >
            oui
          </b-radio>
          <b-radio
            v-model="radio"
            name="expertRatio"
            native-value="non"
            checked
            @click.native="seen = false; selectedExpertises = []"
          >
            non
          </b-radio>
        </div>
        <div v-if="seen && ready" id="expert" class="columns is-flex-wrap-wrap mt-4" style="border:solid lightgrey 1px;">
          <div v-for="expertise in paginateExpertises" :key="expertise.id" class="column is-4 is-offset-2">
            <input :id="expertise.id" v-model="selectedExpertises" type="checkbox" :value="expertise.id">
            <label :for="expertise.id">{{ expertise.nom }}</label>
          </div>
          <b-pagination
            v-if="total > perPage"
            v-model="current"
            class="my-2"
            :total="total"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :rounded="isRounded"
            :per-page="perPage"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          />
        </div>
        <div class="is-flex is-justify-content-center pb-4 pt-4">
          <b-button type="is-primary" outlined @click="inscription">
            Inscription
          </b-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InscriptionComponent',
  data () {
    return {
      nom: '',
      numtel: '',
      prenom: '',
      email: '',
      password: '',
      allExpertises: [],
      selectedExpertises: [],
      confpassword: '',
      radio: 'non',
      seen: false,
      ready: false,

      // pagination
      total: 0,
      current: 1,
      perPage: 6,
      rangeBefore: 1,
      rangeAfter: 1,
      order: 'is-centered',
      size: 'is-small',
      isRounded: true
    }
  },
  computed: {
    paginateExpertises () {
      let debut
      if (this.current === 1) {
        debut = 0
      } else {
        debut = this.current * this.perPage - this.perPage
      }
      const fin = debut + this.perPage
      return this.allExpertises.slice(debut, fin)
    }
  },
  mounted () {
    this.$axios.get('/api/expertises')
      .then((response) => {
        this.allExpertises = response.data
        this.total = this.allExpertises.length
        this.ready = true
      })
  },
  methods: {
    inscription () {
      if (this.nom && this.prenom && this.email && this.numtel && this.password && this.confpassword) {
        if (this.password === this.confpassword) {
          this.$axios.post('/api/auth/register', {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            telephone: this.numtel,
            password: this.password,
            expertise: this.selectedExpertises
          }).then((response) => {
            if (response.data.code) {
              this.$buefy.toast.open(response.data.message)
            } else {
              this.$router.push('/connexion')
            }
          })
        } else {
          this.$buefy.toast.open('Les mots de passe ne correspondent pas')
        }
      } else {
        this.$buefy.toast.open('Renseigner tous les champs')
      }
    }
  }
}

</script>

<style scoped>
#expert nav {
  width: 70%;
  margin: 0 auto;
}
</style>
