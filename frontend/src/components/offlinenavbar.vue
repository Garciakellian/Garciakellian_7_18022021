<!-- NAVBAR PRESENT SUR CHAQUE PAGE QUAND IL Y A PAS D'USER CONNECTER -->
<template>
  <b-navbar toggleable class="offlineNavbar">
    <router-link to="/mur"><img src="../assets/Groupomania.svg" class="icon" alt="Logo Groupomania"></router-link>
  </b-navbar>
</template>

<script>
export default {
  name: 'offlinenavbar',
   data(){

    return {
        userId:""
    }
},
created (){
  let connected = this.$session.get('connected');
  if (connected == null ){
    console.log('Bienvenue sur le reseau interne de Groupomania')
  }else {
    window.location.href = " http://localhost:8080/#/";
    location.reload(true);
  }
},
}


</script>

<style>
.offlineNavbar{
  color:white;
  background:#091F43
}
</style>