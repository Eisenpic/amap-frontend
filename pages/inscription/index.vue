<template>
  <section class="section">
    <div class="columns is-multiline is-justify-content-center">
      <inscription-component />
    </div>
  </section>
</template>

<script>
import InscriptionComponent from '../../components/InscriptionComponent'
export default {
  name: 'IndexPage',
  components: {
    InscriptionComponent
  }
}
</script>
