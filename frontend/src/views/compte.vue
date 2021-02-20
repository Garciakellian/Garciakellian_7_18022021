<template>
<div id="Compte">
  <navbar></navbar>
  <compte></compte>
</div>
</template>

<script>
// @ is an alias to /src
import compte from '../components/compte.vue';

import navbar from '../components/navbar.vue';

export default {
  name: 'Compte',
  components: {
    compte,
    navbar,
  }
}
</script>

<style scoped>

</style>