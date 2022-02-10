<template>
  <div>
    <section>
      <h1 class="title is-4">
        Création de recette :
      </h1>
      <h5 class="subtitle is-5 mt-1">
        Sur cette pages vous pourrez créer votre recette afin de la publié étape par
        étape.
      </h5>
      <b-field label="Nom de la recette">
        <b-input v-model="nomrecette" name="nomrecette" expanded />
      </b-field>
      <b-field label="Description de la recette">
        <b-input v-model="descrecette" name="nomrecette" expanded />
      </b-field>

      <hr>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
        <b-field label="Temps de la recette en minutes">
          <b-input v-model="tempsrea" name="nomrecette" />
        </b-field>
        <b-field label="Saison">
          <b-select v-model="saison" placeholder="Choisir une saison">
            <option value="Été">
              Été
            </option>
            <option value="Automne">
              Automne
            </option>
            <option value="Printemps">
              Printemps
            </option>
            <option value="Hiver">
              Hiver
            </option>
          </b-select>
        </b-field>
        <b-field label="Difficultée">
          <b-select v-model="difficulte" placeholder="Choisir une difficultée">
            <option value="1">
              Facile
            </option>
            <option value="2">
              Moyenne
            </option>
            <option value="3">
              Dur
            </option>
          </b-select>
        </b-field>
        <b-field label="Régime">
          <b-select v-model="regime" placeholder="Choisir un régime">
            <option value="Normal">
              Normal
            </option>
            <option value="Végétarien">
              Végétarien
            </option>
            <option value="Végan">
              Végan
            </option>
          </b-select>
        </b-field>
        <b-field label="Nombre de personnes">
          <b-select v-model="nbpers" placeholder="Choisir le nombre de personne">
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="3">
              3
            </option>
            <option value="4">
              4
            </option>
            <option value="5">
              5
            </option>
            <option value="6">
              6
            </option>
            <option value="7">
              + de 6
            </option>
          </b-select>
        </b-field>
      </div>

      <hr>
      <b-field label="Nombre d'ingrédients">
        <b-numberinput v-model="nbing" placeholder="5" min="1" max="15" />
      </b-field>
      <h5 class="subtitle is-5">
        Liste des ingrédients :
      </h5>
      <div class="columns is-multiline">
        <b-input v-model="listing[0]" class="mt-2 column is-one-quarter is-full-mobile is-full-tablet" />
        <div v-for="n in parseInt(nbing-1)" :key="n" class="mt-2 column is-one-quarter is-full-mobile is-full-tablet">
          <b-input v-model="listing[n]" />
        </div>
      </div>

      <hr>
      <b-field label="Nombres d'ustensiles">
        <b-numberinput v-model="nbust" placeholder="5" min="1" max="5" />
      </b-field>
      <h5 class="subtitle is-5">
        Liste des ustensiles :
      </h5>
      <div class="columns is-multiline">
        <b-input v-model="listust[0]" class="mt-2 column is-one-quarter is-full-mobile is-full-tablet" />
        <div v-for="n in parseInt(nbust-1)" :key="n" class="mt-2 column is-one-quarter is-full-mobile is-full-tablet">
          <b-input v-model="listust[n]" />
        </div>
      </div>

      <hr>
      <b-field label="Nombres d'étapes de la recette">
        <b-numberinput v-model="nbetapes" placeholder="5" min="1" max="15" />
      </b-field>
      <h5 class="title is-5">
        Etape : 1
      </h5>
      <b-field>
        <b-input v-model="descetape[0].desc" type="textarea" />
      </b-field>
      <h6 class="subtitle is-6">
        Temps de l'étape :
      </h6>
      <b-input v-model="descetape[0].temps" />

      <div v-for="n in parseInt(nbetapes-1)" :key="n" class="mt-3">
        <hr>
        <h5 class="title is-5">
          Etape : {{ n + 1 }}
        </h5>
        <b-field>
          <b-input v-model="descetape[n].desc" type="textarea" />
        </b-field>
        <h6 class="subtitle is-6">
          Temps de l'étape :
        </h6>
        <b-input v-model="descetape[n].temps" />
      </div>
      {{ descetape }}
    </section>
    <b-button expanded class="button is-primary" @click="sendRecette">
      Envoyer la recette
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'CreationPage',
  middleware: 'auth',
  data () {
    return {
      nomrecette: null,
      descrecette: null,
      difficulte: 1,
      tempsrea: null,
      saison: 'Été',
      regime: 'Normal',
      nbpers: 1,
      nbing: 1,
      nbetapes: 1,
      nbust: 1,
      descetape: [
        {
          num: 1,
          desc: '',
          temps: 0
        },
        {
          num: 2,
          desc: '',
          temps: 0
        },
        {
          num: 3,
          desc: '',
          temps: 0
        },
        {
          num: 4,
          desc: '',
          temps: 0
        },
        {
          num: 5,
          desc: '',
          temps: 0
        },
        {
          num: 6,
          desc: '',
          temps: 0
        },
        {
          num: 7,
          desc: '',
          temps: 0
        },
        {
          num: 8,
          desc: '',
          temps: 0
        },
        {
          num: 9,
          desc: '',
          temps: 0
        },
        {
          num: 10,
          desc: '',
          temps: 0
        },
        {
          num: 11,
          desc: '',
          temps: 0
        },
        {
          num: 12,
          desc: '',
          temps: 0
        },
        {
          num: 13,
          desc: '',
          temps: 0
        },
        {
          num: 14,
          desc: '',
          temps: 0
        },
        {
          num: 15,
          desc: '',
          temps: 0
        }
      ],
      listing: [],
      listust: []
    }
  },
  methods: {
    sendRecette () {
      this.$axios.post('/api/auth/recette', {
        id_createur: this.$auth.user.id,
        titre: this.nomrecette,
        description: this.descrecette,
        saison: this.saison,
        difficulte: this.difficulte,
        temps: this.tempsrea,
        nb_pers: this.nbpers,
        regime: this.regime
      }).then((response) => {
        console.log(response)
        const idrecette = response.data.id
        this.$axios.post('/api/auth/etape', {
          id_recette: idrecette,
          etapes: this.descetape
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
