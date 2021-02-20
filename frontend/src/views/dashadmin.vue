<template>
  <div>
    <navbar></navbar>
    <dashadmin></dashadmin>
  </div>
</template>

<script>
// @ is an alias to /src
import dashadmin from '../components/dashadmin.vue';
import navbar from '../components/navbar.vue';

export default {
  name: 'Dashadmin',
  components: {
    dashadmin,
    navbar,
  }
}
</script>

<style scoped>

</style>