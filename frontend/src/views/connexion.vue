<template>
  <div >
    <offlinenavbar></offlinenavbar>
    <connexion></connexion>
  </div>
</template>

<script>
// @ is an alias to /src
import connexion from '../components/connexion.vue';
import offlinenavbar from '../components/offlinenavbar.vue';

export default {
  name: 'Connexion',
  components: {
    connexion,
    offlinenavbar,
  }
}
</script>

<style scoped>

</style>