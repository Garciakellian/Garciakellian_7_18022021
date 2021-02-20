<!-- NAVEBAR PRESENT SUR TOUT LES PAGE QAUND L'USER EST CONNECTER -->
<template>
  <b-navbar toggleable class="mynavbar">
    <router-link to="/mur"><img src="../assets/Groupomania.svg" class="icon" alt="Logo Groupomania"></router-link>

    <b-navbar-toggle target="navbar-toggle-collapse" class="toggle" id="toggle">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"  class="toggle"></b-icon>
        <b-icon v-else icon="chevron-bar-down"  class="toggle"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" class="toggle"  is-nav>
      <b-navbar-nav class="ml-auto">
        <div class='personal-display'>
          <router-link to="/mur" class="btn toggle ">Acceuil</router-link>
          <router-link to="/compte" class="compte btn toggle">Mon profil</router-link>
          <router-link to="/dashadmin" class="btn toggle" id="admin">Admin</router-link>
          <button @click="deco" id="deco" class="btn toggle">Deconnexion</button>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar',
   data(){

    return {
        userId:""
    }
},
created (){// verifie si l'user est connecté, sinon le renvoi a l'acceuil
  let connected = this.$session.get('connected');
  if (connected >= 1 ){
    console.log(connected)
  }else {
    window.location.href = " http://localhost:8080/#/";
    location.reload(true);
  }
},
mounted () {//verifie si l'user est un admin afin de lui donné acces au pannel admin
  let connected = this.$session.get('connected');
  if(connected == 2){
    console.log('Vous etes connecter a un compte admin')
    document.getElementById('admin').style.display = 'block';
    console.log('vous pouver acceder au panneau admin')
  }
},
  methods:{
            deco: function(){//Fonction pour deconnecter la session de l'application
              this.$session.remove('connected');
              this.$session.remove('user');
              window.location.href = "http://localhost:8080/#/acceuil";
              location.reload(true);
      },
}}

//let user = JSON.parse(session.getItem("user"));
//let status = user.status;
//console.log(status);


</script>

<style>
router-link{
  color:#D1515A;
}
.mynavbar{
  background: #091f43;
  color:#D1515A;
}
.toggle{
  color:#D1515A ;
}
.btn{
  color:white;
}
.btn:hover{
  color:#D1515A;
}
.personal-display{
  display: flex;
  flex-direction: column;
}
.button{
  border:none;
  background: none;
  }
.icon{
  width:170px;
  margin-right: 20px;
}
#admin{
  display: none;
}
</style>