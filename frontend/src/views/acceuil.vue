<template>
<div id="acceuil">
  <offlinenavbar></offlinenavbar>
  <acceuil></acceuil>
</div>
</template>

<script>
// @ is an alias to /src
import acceuil from '../components/acceuil.vue';
import offlinenavbar from '../components/offlinenavbar.vue'

export default {
  name: 'Acceuil',
  components: {
    acceuil,
    offlinenavbar
  }
}
</script>

<style scoped>

</style>