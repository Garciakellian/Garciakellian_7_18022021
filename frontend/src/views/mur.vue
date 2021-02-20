<template>
<div id="Mur">
  <navbar></navbar>
  <mur></mur>
  
</div>
</template>

<script>
// @ is an alias to /src
import mur from '../components/mur.vue';

import navbar from '../components/navbar.vue';

export default {
  name: 'Mur',
  components: {
    mur,
    navbar,
  }
}
</script>

<style scoped>

</style>