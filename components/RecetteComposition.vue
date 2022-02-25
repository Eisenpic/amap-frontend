<template>
  <div>
    <div v-if="!loading">
      <div v-if="error">
        <p>{{ messageError }}</p>
      </div>
      <div v-else class="recipe card">

        <!-------------------- Affichage des détails -------------------->

        <div class="recipe card">
          <p class="has-text-centered has-text-weight-semibold is-size-2">
            {{ recipe.titre }} <i class="is-size-4">({{ recipe.regime }})</i>
          </p>
          <div class="recipe-image  ">
            <b-image :src="urlImg(recipe.url_img)" alt="Placeholder image"/>
          </div>
          <div class="has-text-centered">
          <span class="icon-text">
            <span>{{ recipe.nb_pers }}</span>
            <span class="icon">
              <i class="fas fa-utensil-spoon"/>
            </span>
          </span>
          </div>
        </div>
      </div>
    </div>
    <br>
    <p class="has-text-centered">
      <i>Test</i>
    </p>
    <div class="lorem text has-text-centered is-bordered mt-3 p-1">
      <button id="btn-ingredient" class="is-size-4 btnSelect btnSelected" @click="selectChange('ingredient')">
        Ingrédients
      </button>
      <button id="btn-ustensile" class="is-size-4 btnSelect" @click="selectChange('ustensile')">
        Ustensiles
      </button>
    </div>
    <div class="lorem is-bordered mt-1">
      <ul v-if="type === 'ingredient'" class="p-5">
        <li v-for="produit in produits" :key="produit.id_produit">
          {{ produit.nombre }} {{ produit.unite }} {{ produit.nom }}
        </li>
      </ul>
      <ul v-else class="p-5">
        <li v-for="ustensile in ustensiles" :key="ustensile.id_ustensile">
          {{ ustensile.nombre }} {{ ustensile.nom }}
        </li>
      </ul>
    </div>
    <div class="is-flex is-justify-content-center mt-5">
      <button class="button is-medium is-info" @click="displayStep()">
        Commencer la recette
      </button>
    </div>
    <div v-for="etape in etapes" :key="etape.id" class="mt-5">
      <h1><b>ÉTAPE {{ etape.numero }}</b> {{ etape.titre }}</h1>
      <p>{{ etape.contenu }}</p>
    </div>
    <br>
    <div class="recipe-logo has-text-centered is-flex flex-wrap-wrap mt-2">
      <div class="likedislike">
        <b-button type="is-primary" size="is-large" outlined rounded>
          <b-icon
            pack="far"
            icon="thumbs-up"
            size="is-medium"
          />
        </b-button>
        <b-button type="is-primary" size="is-large" outlined rounded>
          <b-icon
            pack="far"
            icon="thumbs-down"
            size="is-medium"
          />
        </b-button>
      </div>
    </div>

    <div>
      <!-------------------- Affichage des étapes -------------------->

      <b-modal v-if="etapes" id="fenetreEtape" v-model="etapeActive">
        <div id="etapeCard" class="card p-4">
          <i class="fas fa-times cross fa-lg"
             style="cursor: pointer;"
             @click="etapeActive = !etapeActive; play = true; startAndStopTimer()"
          />
          <h1 class="is-size-4 ml-4 mt-4">
            <b>ÉTAPE {{ etapes[indexEtape].numero }}</b> {{ etapes[indexEtape].titre }}
          </h1>
          <p v-if="etapes[indexEtape].temps" class="has-text-centered p-3">
            <i id="chrono" class="fas fa-stopwatch fa-2x" style="cursor:pointer;" @click="startAndStopTimer()"/>
            <i id="chronoRestart" class="fas fa-clock-rotate-left fa-2x" style="display:none" @click="restart()"/>
            {{ timerFormat }}
          </p>
          <div class="columns">
            <p class="ml-4 mt-5 contenu column">
              {{ etapes[indexEtape].contenu }}
            </p>
            <img v-if="etapes[indexEtape].url_img" :src="etapes[indexEtape].url_img" alt="" class="imgEtape column">
          </div>
          <footer class="modal-card-foot is-flex is-justify-content-center">
            <button
              v-if="indexEtape === 0"
              class="button is-medium is-primary"
            >
              Précédent
            </button>
            <button
              v-else
              class="button is-medium is-primary"
              @click="indexEtape --; timer = etapes[indexEtape].temps"
            >
              Précédent
            </button>
            <button
              v-if="indexEtape === etapes.length -1"
              class="button is-medium is-primary mr-5"
              @click="indexEtape = 0; etapeActive = !etapeActive"
            >
              Fin
            </button>
            <button
              v-else
              class="button is-medium is-primary mr-5"
              @click="indexEtape ++; timer = etapes[indexEtape].temps"
            >
              Suivant
            </button>
          </footer>
        </div>
      </b-modal>

      <!-------------------- Modal -------------------->

      <b-modal v-if="$auth.$state.user" v-model="modalActive">
        <form action="">
          <input type="hidden" name="id_recette" :value="id">
          <input type="hidden" name="id_user" :value="$auth.$state.user.id">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">
                Question
              </p>
              <button
                type="button"
                class="delete"
                @click="modalActive = !modalActive"
              />
            </header>
            <section class="modal-card-body">
              <b-field label="Email">
                <b-input
                  type="email"
                  placeholder="Your email"
                  required
                />
              </b-field>

              <b-field label="Password">
                <b-input
                  type="password"
                  password-reveal
                  placeholder="Your password"
                  required
                />
              </b-field>

              <b-checkbox>Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
              <b-button
                label="Close"
                @click="modalActive = !modalActive"
              />
              <b-button
                label="Login"
                type="is-primary"
              />
            </footer>
          </div>
        </form>
      </b-modal>

      <div v-if="!loading">
        <!-------------------- Affichage des erreurs -------------------->

        <div v-if="error">
          <p>{{ messageError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import tic from '../assets/sound/tic.mp3'
import finish from '../assets/sound/finish.mp3'
export default {
  name: 'RecetteComp',
  // eslint-disable-next-line vue/require-prop-types
  props: ['id'],
  data () {
    return {
      error: false,
      messageError: '',
      loading: true,
      recipe: null,
      produits: null,
      ustensiles: null,
      etapes: null,
      type: 'ingredient',
      play: false,
      timer: null,
      t: null,
      indexEtape: 0,
      etapeActive: false,
      modalActive: false,
      expertises: null,
      expertiseModal: null,
      messageModal: null
    }
  },
  computed: {
    level () {
      switch (this.recipe.difficulte) {
        case 1:
          return 'Facile'
        case 2:
          return 'Normal'
        case 3:
          return 'Difficile'
        default:
          return 'Not filled in'
      }
    },
    isAuthentificated () {
      return this.$auth.loggedIn
    },
    timerFormat () {
      return this.timeConv(this.timer)
    }
  },
  created () {
    axios
      .get('/api/recette/' + this.id)
      .then((response) => {
        this.recipe = response.data
        this.error = false
      })
      .catch((error) => {
        this.error = true
        this.messageError = 'Erreur lors de la récupération de la recette.\n Erreur: ' + error
      })
      .finally(() => {
        this.loading = false
      })
    axios
      .get('/api/recette/produits/' + this.id)
      .then((response) => {
        this.produits = response.data
        this.error = false
      })
      .catch((error) => {
        this.error = true
        this.messageError = 'Erreur lors de la récupération des ingrédients de la recette.\n Erreur: ' + error
      })
    axios
      .get('/api/recette/ustensiles/' + this.id)
      .then((response) => {
        this.ustensiles = response.data
        this.error = false
      })
      .catch((error) => {
        this.error = true
        this.messageError = 'Erreur lors de la récupération des ustensiles de la recette.\n Erreur: ' + error
      })
    axios
      .get('/api/recette/etapes/' + this.id)
      .then((response) => {
        this.etapes = response.data
        this.error = false
      })
      .catch((error) => {
        this.error = true
        this.messageError = 'Erreur lors de la récupération des étapes de la recette.\n Erreur: ' + error
      })
    axios
      .get('/api/expertises')
      .then((response) => {
        this.expertises = response.data
      })
      .catch((error) => {
        this.error = true
        this.messageError = 'Erreur lors de la récupération des expertises.\n Erreur: ' + error
      })
  },
  methods: {
    timeConv (time) {
      // let time = this.recipe.temps
      let heures = ''
      let minutes = ''
      let secondes = ''
      if ((time / 3600) >= 1) {
        heures = Math.trunc(time / 3600) + 'h '
        time -= 3600 * Math.trunc(time / 3600)
      }
      if ((time / 60) >= 1) {
        minutes = Math.trunc(time / 60) + 'min '
        time -= 60 * Math.trunc(time / 60)
      }
      if (time > 0) {
        secondes = time + 'sec'
      }
      return heures + minutes + secondes
    },
    urlImg () {
      const url = `http://localhost:8000/uploads/img/${this.recipe.url_img}`
      return url.toString()
    },
    selectChange (type) {
      document.getElementById('btn-ingredient').classList.remove('btnSelected')
      document.getElementById('btn-ustensile').classList.remove('btnSelected')
      if (type === 'ingredient') {
        this.type = 'ingredient'
        document.getElementById('btn-ingredient').classList.add('btnSelected')
      } else {
        this.type = 'ustensile'
        document.getElementById('btn-ustensile').classList.add('btnSelected')
      }
    },
    displayStep () {
      this.timer = this.etapes[this.indexEtape].temps
      this.etapeActive = !this.etapeActive
    },
    chronometer () {
      this.timer--
      let audio = new Audio(tic)
      audio.play()
      if (this.timer === 0) {
        this.startAndStopTimer()
        audio = new Audio(finish)
        audio.play()
        document.getElementById('chrono').style = 'display: none'
        document.getElementById('chronoRestart').style = 'display: block; cursor:pointer;'
        return null
      }
    },
    startAndStopTimer () {
      this.play = !this.play
      if (this.play) {
        document.getElementById('chrono').style = 'color: red; cursor:pointer;'
        this.t = setInterval(this.chronometer, 1000)
      } else {
        document.getElementById('chrono').style = 'color: inherit; cursor:pointer;'
        clearInterval(this.t)
      }
    },
    restart () {
      this.timer = this.etapes[this.indexEtape].temps
      document.getElementById('chrono').style = 'display: block'
      document.getElementById('chronoRestart').style = 'display: none;'
    },
    openModal () {
      if (this.isAuthentificated) {
        this.$buefy.modal.open({
          parent: this,
          component: '<p>ok</p>',
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true``
        })
      } else {
        this.$router.push('/connexion')
      }
    }
  }
}
</script>

<style scoped>
.cross {
  float: right;
}
.btnSelect {
  width: 49.5%;
  border-radius: 8px;
  padding: 1%;
  border: none;
  cursor: pointer;
}
.btnSelected {
  background-color: #7957d5;
  color: antiquewhite;
}
.recipe {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}
.recipe-image {
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
}
.lorem {
  border: solid rgb(148, 148, 148) 1px;
  border-radius: 8px;
}
.likedislike {
  margin: 0 auto;
}
.avis {
  margin: 0 auto;
}
.imgEtape {
  padding: 2%;
  margin-right: 2%;
  max-width: 50%;
  max-height: 90%;
}
li {
  list-style-type: '- ';
}
@media (max-width: 768px) {
  h1 {
    text-align: center;
  }
  .contenu {
    text-align: center;
  }
  .imgEtape {
    margin: 0 auto;
  }
}
</style>