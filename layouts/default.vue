<template>
  <div>
    <NavbarComponent />
    <section class="main-content columns is-justify-content-center">
      <div class="column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent'

export default {
  name: 'DefaultLayout',
  components: { NavbarComponent }
}
</script>

<style scoped>

</style>
