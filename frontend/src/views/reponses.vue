<template>
<div id="Reponse">
  <navbar></navbar>
  <reponse></reponse>
  
</div>
</template>

<script>
// @ is an alias to /src
import reponse from '../components/reponse.vue';

import navbar from '../components/navbar.vue';

export default {
  name: 'Reponse',
  components: {
    reponse,
    navbar,
  }
}
</script>

<style scoped>

</style>