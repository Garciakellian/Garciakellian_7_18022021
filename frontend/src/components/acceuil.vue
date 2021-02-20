<!-- PAGE ACCEUIL POUR IDENTIFICATION-->
<template>
  <div class="containeur">
    <h1 class='title-page jumbotron'>Bienvenue sur le reseau interne de Groupomania !</h1>
    <img alt="logo Groupomania"
      class="logo-home"
      src="../assets/icon.svg"/>
    <div class="div-button">
      <router-link to="/connexion" class="button" type="button">Se connecter</router-link><br>
      <router-link to="/inscription" class="button" type="button">S'inscrire</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'acceuil',
  components: {
  }
}
</script>

<style scopped>
.title-page{
  font-family: 'Open Sans', sans-serif;
}
.logo-home{
  width:170px;
  margin: 50px 0;
}
 .button{
   border: 2px solid #091f34;
   border-radius: 20px;
   font-size: 1.5em;
   margin-top: 30px;
   width: 200px;
   color:#091f34;
 }
 .button:hover{
   text-decoration: none;
   background: #091f34;
   color: white;
   transform: scale(1.2);
   transition: all 400ms ease-in-out;
 }
</style>
