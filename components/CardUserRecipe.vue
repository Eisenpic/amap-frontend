<template>
  <div class="une_recette column is-4" style="position: relative">
    <div class="headercard is-flex p-3">
      <p>22<i class="fas fa-heart mx-2" id="span_heart"/></p>
    </div>
    <div class="card" >
      <div class="card-image" @click="$router.push('/recette/' + id)">
        <figure class="image is-4by3">
          <img :src="photo" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="columns is-mobile">
          <div class="column is-3 content has-text-centered">
            <b-tooltip label="Supprimer" position="is-bottom">
              <b-button @click="deleteRecipe(id)" id="b-delete"><b-icon icon="delete"></b-icon></b-button>
            </b-tooltip>
          </div>
          <div class="column is-6 content">
            <p class="has-text-centered" @click="$router.push('/recette/' + id)">
              {{ recipename }}
            </p>
          </div>
          <div class="column is-3 content has-text-centered">
            <b-tooltip label="Modifier" position="is-bottom">
              <b-button @click="updateRecipe(id)" id="b-update"><b-icon icon="pencil"></b-icon></b-button>
            </b-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardRecipe',
  // eslint-disable-next-line vue/require-prop-types
  props: ['recipename', 'difficulty', 'personnes', 'photo', 'time', 'id'],

  computed: {
    level () {
      switch (this.difficulty) {
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

    timeConv () {
      let time = this.time
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
    }
  },
  methods: {
    deleteRecipe (idRecipe) {
      this.$buefy.dialog.confirm({
        message: "La <b>suppression</b> de la recette n'est pas réversible. Êtes vous sûre de vouloir continuer?",
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open('Suppression confirmée')
          console.log(idRecipe)
          this.$axios.delete(`/api/recettes/${idRecipe}`)
        }
      })
    },
    updateRecipe (idRecipe) {
      console.log('En attente de la fonctionnalité modifRecette' + idRecipe)
    }
  }
}
</script>

<style scoped>
.headercard {
  position: absolute;
  z-index: 2;
  font-weight: bold;
  width: 100%;
}

.headercard p {
  background-color: rgba(255, 255, 255);
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 5px;
}

div.column p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#span_heart{
  transform: scale(1.3);
  color: white;
  z-index: 2;
}

#span_heart i {
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  text-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px;
}

#span_heart:hover {
  transform: scale(1.5);
  color: red;
}

#b-delete {
  background-color: #ef9797;
}

#b-update {
  background-color: #a7c498;
}

</style>
