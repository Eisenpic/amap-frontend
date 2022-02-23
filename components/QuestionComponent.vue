<template>
  <div class="border card" @click="$router.push('/QandA/' + id)">
    <div class="p-3">
      <p>{{ question }}</p>
    </div>
    <div class="is-flex p-3">
      <p class="is-flex has-text-justified" style="font-family: cursive; color:hsl(171, 100%, 41%); font-size: 1.1em;">
        <i class="fa-solid fa-check mt-1 mr-2" /> résolu
      </p>
      <p class="has-text-right" style="width:100%;">
        <i>posté le {{ dateFormat }} par <b>{{ user }}</b></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['id', 'recette', 'question', 'user', 'date', 'expertise'],
  computed: {
    dateFormat () {
      return new Date(this.date).toLocaleDateString('fr')
    }
  }
}

</script>
