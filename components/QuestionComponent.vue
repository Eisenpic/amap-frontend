<template>
  <div class="border card" style="cursor:pointer;" @click="$router.push('/QandA/' + id)">
    <div class="p-3">
      <p>{{ question }}</p>
    </div>
    <div class="level p-1">
      <p v-if="resolu" class="ml-2 p-2" style="font-family: cursive; color:hsl(171, 100%, 41%); font-size: 1.1em;">
        <i class="fa-solid fa-check mr-2" /> résolu
      </p>
      <p v-else class="ml-2 p-2" style="font-family: cursive; color:hsl(0, 0%, 71%); font-size: 1em;">
        <i>Pas résolu</i>
      </p>
      <p>
        <i>posté le {{ dateFormat }} par <b>{{ user }}</b></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['id', 'recette', 'question', 'user', 'date', 'expertise', 'resolu'],
  computed: {
    dateFormat () {
      return new Date(this.date).toLocaleDateString('fr')
    }
  }
}

</script>
