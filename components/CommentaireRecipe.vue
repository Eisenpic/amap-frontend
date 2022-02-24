<template>
  <div>
      <h3 class='is-3 mt-3 p-3 box' v-for="(commentaire, index) in ListCom" :key="index">
        <strong> {{ commentaire.nom }} </strong> à dit : {{ commentaire.pivot.texte }} <br>
      </h3>
    <button class="button is-primary" @click="addCom()">Afficher plus +</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CommentaireRecipe',
  props: ['id'],
  data () {
    return {
      commentaires: [],
      nbCom: 5
    }
  },
  computed: {
    ListCom () {
      return this.commentaires.slice(0, this.nbCom)
    }
  },
  methods: {
    addCom () {
      this.nbCom = this.nbCom + 5
    }
  },
  mounted () {
    axios.get(`/api/commentaires/${this.id}`).then((response) => {
      this.commentaires = response.data[0].utilisateurs
    })
  }
}
</script>

<style scoped>

</style>
