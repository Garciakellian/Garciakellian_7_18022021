<template>
<div id="Updateuser">
  <navbar></navbar>
  <updateuser></updateuser>
</div>
</template>

<script>
// @ is an alias to /src
import updateuser from '../components/updateuser.vue';

import navbar from '../components/navbar.vue';

export default {
  name: 'Updateuser',
  components: {
    updateuser,
    navbar,
  }
}
</script>

<style scoped>

</style>