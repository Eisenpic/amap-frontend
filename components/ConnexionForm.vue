<template>
  <div class="columns is-multiline is-justify-content-center">
    <form class="box column is-6 mt-6" @submit.prevent="login">
      <h1 class="title is-4 has-text-centered">
        Se connecter
      </h1>
      <b-field label="Email">
        <b-input v-model="userInfo.email" type="email" maxlength="30" required />
      </b-field>

      <b-field label="Password">
        <b-input v-model="userInfo.password" type="password" required />
      </b-field>

      <div class="has-text-centered mt-5 mb-3">
        <button class="button">
          Se connecter
        </button>
      </div>

      <p class="has-text-centered">
        Mot de passe oublié ?
      </p>
      <p class="has-text-centered">
        Pas encore de compte ?
        <NuxtLink to="/inscription">
          Créez en un
        </NuxtLink>
      </p>
    </form>
    <div class="column is-7">
      <b-message
        v-if="erreurMessage"
        v-model="errorIsActive"
        auto-close
        type="is-danger"
        class="has-text-centered"
        :duration="errorDuration"
      >
        {{ erreurMessage }}
      </b-message>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnexionForm',
  data () {
    return {
      showPassword: false,
      userInfo: {
        email: '',
        password: ''
      },
      errorIsActive: false,
      errorDuration: 3500,
      erreurMessage: ''
    }
  },
  methods: {
    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    login () {
      if (this.validEmail(this.userInfo.email)) {
        this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.userInfo.email,
            password: this.userInfo.password
          }
        }).catch(() => {
          console.log('Probleme')
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
