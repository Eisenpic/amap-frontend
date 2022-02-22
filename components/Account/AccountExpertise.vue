<template>
  <div class="p-2">
    <h1 class="pb-4 is-size-5 is-center">
      Mes Expertises
    </h1>
    <div v-if="memberExpertisesNew.length === 0" class="has-text-centered mb-5 mt-2">
      Vous n'avez aucunes expertise
    </div>
    <div v-for="(expertise, index) in memberExpertisesNew" v-else :key="index" class="is-flex">
      <b-tooltip label="Supprimer" position="is-top">
        <b-button id="b-delete" class="mt-3" @click="deleteExpertise(expertise)">
          <b-icon icon="delete" />
        </b-button>
      </b-tooltip>
      <div id="d-expertise" class="box p-2 my-3 ml-2">
        {{ expertise.nom }}
      </div>
    </div>
    <div v-if="selectExpertise" class="has-text-centered mt-3">
      <b-dropdown v-model="selectedExpertise" aria-role="list" text="Dropdown" scrollable :max-height="200">
        <template #trigger>
          <b-button type="is-primary" icon-right="menu-down">
            Ajouter une expertise
          </b-button>
        </template>
        <div v-for="(showedExpertise, index) in showedExpertises" :key="index">
          <b-dropdown-item :value="showedExpertise" aria-role="listitem">
            <span>{{ showedExpertise.nom }}</span>
          </b-dropdown-item>
        </div>
      </b-dropdown>
      <div v-if="selectedExpertise">
        <i class="fas fa-star mt-3 mr-4" />{{ selectedExpertise.nom }}
      </div>
      <div class="has-text-centered">
        <b-button class="mt-3 b-add" @click="attachExpertise">
          Valider
        </b-button>
      </div>
    </div>
    <div v-else>
      <div v-if="showedExpertises.length === 0">
        <p>Vous êtes expert dans tous les domaines</p>
      </div>
      <div v-else class="has-text-centered">
        <b-button class="b-add" @click="addExpertise">
          Ajouter
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountSkills',
  props: ['expertises', 'memberExpertises', 'member'],
  data () {
    return {
      showedExpertises: [],
      selectExpertise: false,
      selectedExpertise: '',
      memberExpertisesNew: this.memberExpertises
    }
  },
  mounted () {
    this.filterExpertises()
  },
  methods: {
    deleteExpertise (expertise) {
      this.$axios.delete(`/api/users/${this.member.id}/expertises/${expertise.id}`).then(() => {
        this.$buefy.snackbar.open({
          message: 'Expertise supprimée!',
          type: 'is-success',
          position: 'is-bottom'
        })
      })
      this.memberExpertisesNew = this.memberExpertisesNew.filter(el => el.id !== expertise.id)
      this.showedExpertises.push(expertise)
    },
    addExpertise () {
      this.selectExpertise = true
    },
    attachExpertise () {
      if (this.selectedExpertise === '') {
        this.$buefy.snackbar.open({
          message: 'Veuillez séléctionner une expertise!',
          type: 'is-danger',
          position: 'is-bottom'
        })
      } else {
        this.$axios.post(`/api/users/${this.member.id}/expertises/${this.selectedExpertise.id}`).then(() => {
          this.$buefy.snackbar.open({
            message: 'Expertise ajoutée!',
            type: 'is-success',
            position: 'is-bottom'
          })
        })
        this.memberExpertisesNew.push(this.selectedExpertise)
        this.selectExpertise = false
        this.showedExpertises = this.showedExpertises.filter(el => el.id !== this.selectedExpertise.id)
        this.selectedExpertise = ''
      }
    },
    filterExpertises () {
      this.expertises.forEach((expertise) => {
        if (!this.memberExpertisesNew.some(memberExpertise => memberExpertise.id === expertise.id)) {
          this.showedExpertises.push(expertise)
        }
      })
      this.showedExpertises.sort(function (a, b) {
        if (a.nom < b.nom) { return -1 }
        if (a.nom > b.nom) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  text-decoration: underline;
}

#b-delete {
  background-color: #eab5b5;
}
.b-add {
  width: 60%;
  background-color: #b3c2ab;
}
#d-expertise {
  background-color: #e5c471;
}
.fa-star {
  color: goldenrod;
}
#test {
  overflow: auto;
  height: 50px;
}
</style>
