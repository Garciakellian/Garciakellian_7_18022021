<template>
    <div class="resp">
      <navbar></navbar>
     <viewresponse></viewresponse>
    </div>
</template>

<script>



import navbar from '../components/navbar.vue';
import viewresponse from '../components/viewresponse.vue'

export default {

  name: 'viewresp',

  components:{
      navbar,
      viewresponse
  }
}


</script>

<style scoped>


</style>
