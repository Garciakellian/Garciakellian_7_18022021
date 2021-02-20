<template>
<div id="Inscription">
  <offlinenavbar></offlinenavbar>
  <inscription></inscription>
  
</div>
</template>

<script>
// @ is an alias to /src
import inscription from '../components/inscription.vue';
import Offlinenavbar from '../components/offlinenavbar.vue';


export default {
  name: 'Inscription',
  components: {
    inscription,
    Offlinenavbar,
  }
}
</script>

<style scoped>

</style>