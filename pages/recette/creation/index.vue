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
        <b-input v-model="listing[0].nom" class="mt-2 column is-one-third" placeholder="Nom de l'ingrédient" />
        <b-input v-model="listing[0].poid" class="mt-2 column is-one-third" placeholder="Poid de l'ingrédient" />
        <b-input v-model="listing[0].unite" class="mt-2 column is-one-third" placeholder="Unité volumétrique" />
      </div>
      <div v-for="n in parseInt(nbing-1)" :key="n" class="mt-2 columns">
        <b-input v-model="listing[n].nom" class="mt-2 column is-one-third" placeholder="Nom de l'ingrédient" />
        <b-input v-model="listing[n].poid" class="mt-2 column is-one-third" placeholder="Poid de l'ingrédient" />
        <b-input v-model="listing[n].unite" class="mt-2 column is-one-third" placeholder="Unité volumétrique" />
      </div>

      <!--Ustencile front-->
      <hr>
      <b-field label="Nombres d'ustensiles">
        <b-numberinput v-model="nbust" placeholder="5" min="1" max="5" />
      </b-field>
      <h5 class="subtitle is-5">
        Liste des ustensiles :
      </h5>
      <div class="columns is-multiline">
        <b-input v-model="listust[0]" class="mt-2 column is-one-quarter is-full-mobile is-full-tablet" placeholder="Nom ingrédient" />
        <div v-for="n in parseInt(nbust-1)" :key="n" class="mt-2 column is-one-quarter is-full-mobile is-full-tablet">
          <b-input v-model="listust[n]" />
        </div>
      </div>
      {{ listust }}

      <!-- Etape front -->
      <hr>
      <b-field label="Nombres d'étapes de la recette">
        <b-numberinput v-model="nbetapes" placeholder="5" min="1" max="15" />
      </b-field>
      <h5 class="title is-5">
        Etape : 1
      </h5>
      <h6 class="subtitle is-6">
        Titre de l'étape ( facultatif )
      </h6>
      <b-input v-model="descetape[0].titre" placeholder="Titre de votre étape"/>
      <h6 class="subtitle is-6">
        Description
      </h6>
      <b-field>
        <b-input v-model="descetape[0].desc" type="textarea" placeholder="Description de l'étape"/>
      </b-field>
      <h6 class="subtitle is-6">
        Temps de l'étape :
      </h6>
      <b-input v-model="descetape[0].temps" placeholder="Temps requis pour l'étape"/>

      <div v-for="n in parseInt(nbetapes-1)" :key="n" class="mt-3">
        <hr>
        <h5 class="title is-5">
          Etape : {{ n + 1 }}
        </h5>
        <h6 class="subtitle is-6">
          Titre de l'étape ( facultatif )
        </h6>
        <b-input v-model="descetape[n].titre" />
        <h6 class="subtitle is-6">
          Description
        </h6>
        <b-field>
          <b-input v-model="descetape[n].desc" type="textarea" />
        </b-field>
        <h6 class="subtitle is-6">
          Temps de l'étape :
        </h6>
        <b-input v-model="descetape[n].temps" />
      </div>
    </section>

    <!--Button envoie-->
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
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        },
        {
          desc: '',
          titre: '',
          temps: 0
        }
      ],
      listing: [
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        },
        {
          nom: '',
          poid: 0,
          unite: ''
        }
      ],
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
        const idrecette = response.data.id
        this.$axios.post('/api/auth/etape', {
          id_recette: idrecette,
          etapes: this.descetape
        })
        this.$axios.post('/api/auth/produitrecette', {
          id_recette: idrecette,
          produits: this.listing
        })
        this.$axios.post('/api/auth/ustensilerecette', {
          id_recette: idrecette,
          ustenciles: this.listust
        })
      }).finally(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>

</style>
