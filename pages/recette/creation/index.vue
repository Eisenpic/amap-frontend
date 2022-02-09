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

      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between">
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

      <b-field label="Nombres d'étapes de la recette">
        <b-numberinput v-model="nbetapes" placeholder="5" min="1" max="15" />
      </b-field>
      <h5 class="title is-5">
        Etape : {{ 0 }}
      </h5>
      <b-field>
        <b-input v-model="descetape[0]" type="textarea" />
      </b-field>
      <div v-for="n in parseInt(nbetapes)" :key="n" class="mt-3">
        <h5 class="title is-5">
          Etape : {{ n }}
        </h5>
        <b-field>
          <b-input v-model="descetape[n]" type="textarea" />
        </b-field>
      </div>
      {{ descetape }}
    </section>
    <b-button expanded class="button is-primary">
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
      nomrecette: '',
      difficulte: 1,
      saison: 'Été',
      regime: 'Normal',
      nbpers: 1,
      nbing: 1,
      nbetapes: 1,
      nbust: 1,
      descetape: [],
      listing: [],
      listust: []
    }
  }
}
</script>

<style scoped>

</style>
