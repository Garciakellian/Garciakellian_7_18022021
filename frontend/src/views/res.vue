<template>
<div id="Res">
  <navbar></navbar>
  <res></res>
  
</div>
</template>

<script>
// @ is an alias to /src
import res from '../components/res.vue';

import navbar from '../components/navbar.vue';

export default {
  name: 'Res',
  components: {
    res,
    navbar,
  }
}
</script>

<style scoped>

</style>