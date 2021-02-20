<!-- PAGE DE COMPTE -->
<template>
    <div id="moncompte" class=" container" >
        <h1 class="jumbotron">Mon espace</h1>
        <div class="layout">
            <h3>Vos Informations personnelles</h3>
            <h4 id="pseudo">Votre pseudo</h4>
            <div classe=info  v-for="usr in user" :key="usr.userId">
                <p id="myname" class="allp"><span>{{usr.username}}</span></p>
                <h4>Votre identifiant</h4>
                <p class="allp">{{data.userId}}</p>
                <h4>Votre email</h4>
                <p class="allp">{{usr.email}}</p>
                <h4> Votre status</h4>
                <p class="allp" id="last">{{data.status}}</p>
                <button @click= "updateuser" class="btn suc">Modifer vos information</button>
                <button @click= "deleteUser" class="btn sup">Supprimer votre compte</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'


export default {
    name: 'moncompte',
    data(){

    return {
        data:JSON.parse(this.$session.get('user')),
        userId:"",
        user:""
    }
},
mounted(){
    //Appel de l'api pour l'affichafe des informations de l'utilisateur
    let data = JSON.parse(this.$session.get('user'))
     axios.get(`http://localhost:3000/api/getoneuser/${data.userId}`)
        .then(response => {
          console.log(response.data)
          this.user = response.data
        })
        .catch(error => console.log(error)) 

},
methods:{

    deleteUser : function () {//Fonction qui permet à l'utilisateur de supprimer son compte
        let token = this.data.token
        if(confirm('Voulez vous vraiment supprimer le compte ?'),confirm('Cette opération est irreversible !')){
             axios.post(`http://localhost:3000/api/deleteUser`, {
                 userId: this.data.userId
        },
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
              }
        })
       .then (() => {
                    this.$session.remove('user')
                    this.$session.remove('connected');
                    document.getElementById('moncompte').style.display = 'none'
                    alert('votre compte a bien été supprimé !')
                    window.location.href = " http://localhost:8080"
       })
       .catch(() =>{
         console.log('Votre compte n\'a pas pu être supprimé !')
       })
        }
    },

      updateuser : function() {//Fonction qui permet à l'utilisateur de modifier ses informations

          let iduser = this.data.userId

         window.location.href = `http://localhost:8080/#/updateuser?id=${iduser}`
         location.reload(true);


      }
}


}

</script>

<style scoped>
h1{
  text-transform: uppercase;
  color:#091F43;

}
h3{
    background: #091F43;
    color: white;
    padding: 5px 0;
}
h4{
    color:#091F43;
    text-transform: uppercase;
}
.allp{
    color:white;
    background-color:#091F43;
    width: 50%;
    margin: 10px auto;
    font-weight: bold;
    font-style: italic;
}
.layout{
    border:1px solid #091F43;
    width:50%;
    padding-bottom: 15px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    margin: 0 auto;
}
#last{
    margin-bottom: 30px;
}
.suc{
    border:1px white solid;
    background:#091D43;
}
.sup{
    border:1px white solid;
    background:#091D43;
}
.suc:hover , .sup:hover{
    color:#D1515F;
}


</style>
