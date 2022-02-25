<template>
  <div class="une_recette column is-4" style="position: relative">
    <div class="headercard is-flex p-3">
    </div>
    <div class="card-image" @click="$router.push('/recette/' + id)">
      <figure class="image is-4by3">
        <img :src="getImgLink(photo)" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="columns is-mobile">
        <div class="column is-3 content has-text-centered">
          <p class="has-text-centered">
            {{ level }}
          </p>
        </div>
        <div class="column is-6 content">
          <p class="has-text-centered">
            {{ recipename }}
          </p>
        </div>
        <div class="column is-3 content has-text-centered">
          <span class="icon-text">
            <span>{{ personnes }}</span>
            <span class="icon">
              <i class="fas fa-utensil-spoon" />
            </span>
          </span>
        </div>
      </div>
      <div class="columns has-text-centered">
        <div class="column">
          <i v-if="isLiked" id="liked" class="fas fa-heart" @click="dislikeRecipe" />
          <i v-else id="notLiked" class="fas fa-heart" @click="likeRecipe" />
        </div>
        <div class="column">
          <i v-if="isFav" id="fav" class="fas fa-bookmark" @click="unfavRecipe" />
          <i v-else id="unfav" class="fas fa-bookmark" @click="favRecipe" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardFavRecipe',
  // eslint-disable-next-line vue/require-prop-types
  props: ['recipename', 'difficulty', 'personnes', 'photo', 'time', 'id'],
  data () {
    return {
      isFav: '',
      isLiked: ''
    }
  },
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
  mounted () {
    if (this.$auth.loggedIn) {
      this.$axios.get(`/api/users/${this.$auth.$state.user.id}/fav`)
        .then((response) => {
          response.data.forEach((el) => {
            if (el.id === this.id) {
              this.isFav = true
            }
          })
        })
      this.$axios.get(`/api/users/${this.$auth.$state.user.id}/liked`)
        .then((response) => {
          response.data.forEach((el) => {
            if (el.id === this.id) {
              this.isLiked = true
            }
          })
        })
    }
  },
  methods: {
    getImgLink (data) {
      return 'http://localhost:8000/uploads/img/' + data
    },
    likeRecipe () {
      this.$axios.post(`/api/users/${this.$auth.$state.user.id}/like/${this.id}`)
        .then(() => {
          this.isLiked = true
          this.$buefy.toast.open('Vous avez aimé cette recette')
        })
    },
    dislikeRecipe () {
      this.$axios.delete(`/api/users/${this.$auth.$state.user.id}/dislike/${this.id}`)
        .then(() => {
          this.isLiked = false
          this.$buefy.toast.open("Vous n'aimez plus recette")
        })
    },
    favRecipe () {
      this.$axios.post(`/api/users/${this.$auth.$state.user.id}/fav/${this.id}`)
        .then(() => {
          this.isFav = true
          this.$buefy.toast.open('Vous avez mis cette recette en favoris')
        })
    },
    unfavRecipe () {
      this.$axios.delete(`/api/users/${this.$auth.$state.user.id}/unfav/${this.id}`)
        .then(() => {
          this.isFav = false
          this.$buefy.toast.open('Vous avez enlevé cette recette de vos favoris')
        })
    }
  }
}
</script>

<style scoped>
.headercard {
  position: absolute;
  z-index: 1;
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

.span_heart i {
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  text-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px;
  filter: drop-shadow(0 0 0 black);
}

#notLiked:hover {
  color: red;
}

#liked {
  color: red;
}

#liked:hover {
  color: rgba(124, 4, 4, 0.93);
}

#unfav:hover {
  color: green;
}

#fav {
  color: green;
}

#fav:hover {
  color: darkgreen;
}

.span_star i {
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  text-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px;
  filter: drop-shadow(0 0 0 black);
}
</style>
