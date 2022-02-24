<template>
  <div class="une_recette column is-4" style="position: relative">
    <span v-if="$auth.loggedIn" id="span_heart" class="icon">
      <i v-if="isLiked" id="liked" class="fas fa-heart" @click="dislikeRecipe" />
      <i v-else id="notLiked" class="fas fa-heart" @click="likeRecipe" />
    </span>
    <div class="card" @click="$router.push('/recette/' + id)">
      <div class="card-image">
        <div class="headercard is-flex is-justify-content-space-between p-3">
          <p>{{ timeConv }}</p>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardRecipe',
  // eslint-disable-next-line vue/require-prop-types
  props: ['recipename', 'difficulty', 'personnes', 'photo', 'time', 'id'],
  data () {
    return {
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

#span_heart{
  transform: scale(1.3);
  color: white;
  position: absolute;
  z-index: 2;
  right: 20px;
  top: 25px;
}

#span_heart i {
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

</style>
