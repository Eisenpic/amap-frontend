<template>
  <div>
    <div>
      <figure class="image is-128x128 mr-3">
        <b-tooltip v-if="memberExpertises.length !== 0" label="Expert" position="is-top" id="tooltip-star">
          <i class="fas fa-star" />
        </b-tooltip>
        <img src="http://images5.fanpop.com/image/photos/31700000/Bulma-braid-hair-icon-dragon-ball-females-31777843-150-150.jpg" alt="avatar">
      </figure>
      <h1 class="mb-5 has-text-weight-semibold">
        {{ member.prenom }} {{ member.nom }}
      </h1>
      <p>Avis : {{ nbAvis }}</p>
      <p>Questions : {{ nbTopics }}</p>
      <p>Membre depuis : {{ member.created_at.slice(0,10) }}</p>
    </div>
    <div style="clear:both;" />
  </div>
</template>

<script>
export default {
  name: 'AccountProfil',
  props: ['nbAvis', 'nbTopics', 'member', 'memberExpertises']
}
</script>

<style scoped>
  figure {
    border: solid black;
    float: left;
    position: relative;
  }
  img {
    display: block;
  }
  #tooltip-star {
    position: absolute;
    top:0;
    left:2px;
  }
  .fa-star {
    color: #e5c471;
  }
  h1 {
    font-size: 20px;
  }
  p{
    font-size: 15px;
  }
</style>
