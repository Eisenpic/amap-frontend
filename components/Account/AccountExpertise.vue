<template>
  <div class="p-2">
    <h1 class="pb-4 is-size-5 is-center">
      Mes Expertises
    </h1>
    <div v-if="memberExpertises.length === 0" class="has-text-centered mb-5 mt-2">
      Vous n'avez aucunes expertise
    </div>
    <div v-for="(expertise, index) in memberExpertises" v-else :key="index" class="is-flex">
      <b-tooltip label="Supprimer" position="is-top">
        <b-button class="mt-3" id="b-delete" @click="deleteExpertise(expertise.id)"><b-icon icon="delete"></b-icon></b-button>
      </b-tooltip>
      <div class="box p-2 my-3 ml-2" id="d-expertise">
        {{ expertise.nom }}
      </div>
    </div>
    <div v-if="selectExpertise" class="has-text-centered mt-3">
      <b-dropdown v-model="selectedExpertise" aria-role="list" text="Dropdown" scrollable :max-height="200">
        <template #trigger>
          <b-button type="is-primary" icon-right="menu-down">Ajouter une expertise</b-button>
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
        <b-button class="mt-3 b-add" @click="attachExpertise">Valider</b-button>
      </div>
    </div>
    <div v-else>
      <div class="has-text-centered">
        <b-button class="b-add" @click="addExpertise">Ajouter</b-button>
      </div>
    </div>
    <div v-if="message" class="has-text-centered mt-3">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountSkills',
  props: ['expertises', 'memberExpertises', 'member'],
  data () {
    return {
      message: '',
      showedExpertises: [],
      selectExpertise: false,
      selectedExpertise: ''
    }
  },
  mounted () {
    this.filterExpertises()
  },
  methods: {
    deleteExpertise (idExpertise) {
      /* Delete method doesn't work in api */this.$axios.get(`/api/users/${this.member.id}/expertises/${idExpertise}`).then(() => {
        this.message = 'Expertise supprimée'
        this.$router.go()
      })
    },
    addExpertise () {
      this.selectExpertise = true
    },
    attachExpertise () {
      this.$axios.post(`/api/users/${this.member.id}/expertises/${this.selectedExpertise.id}`).then(() => {
        this.message = 'Expertise ajoutée'
        this.$router.go()
      })
    },
    filterExpertises () {
      this.expertises.forEach((expertise) => {
        if (!this.memberExpertises.some(memberExpertise => memberExpertise.id === expertise.id)) {
          this.showedExpertises.push(expertise)
        }
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
