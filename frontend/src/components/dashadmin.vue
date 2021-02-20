<!-- PAGE D'ADMIN -->
<template>
    <div id="moncompte">
        <h2>Tableau de bord</h2>
        <div class="users container">
           <h3>Utilisateurs inscrits</h3><!--Affichage de tous les utilisateurs inscrits-->
            <table class="table table-bordered  table-sm" id='table'>
                <thead id="thead">
                    <tr class="color">
                        <th scope="col">user</th>
                        <th scope="col">email</th>
                        <th scope="col" class="suppr-col">Supprimer</th>
                    </tr>
                </thead>
                <tbody id="tbody" v-for="users in usr" :key="users.id">
                    <tr class="color">
                        <td class="user">{{users.username}}</td>
                        <td class="mail">{{users.email}}</td>
                        <td class="sup"><button @click= "deleteusr(users.id)" class="btn btn-danger supr">Supprimer</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="messages container">
            <h3>Messages postés</h3><!--Affichage de tous les messages postés-->
            <table class="table table-bordered  table-sm" id='table2'>
                <thead id="thead">
                    <tr class="color">
                        <th scope="col">user</th>
                        <th scope="col">contenu</th>
                        <th scope="col" class="suppr-col">Supprimer</th>
                    </tr>
                </thead>
                <tbody id="tbody2" v-for="messages in msg" :key="messages.id">
                    <tr class="color">
                        <td class="name">{{messages.username}}</td>
                        <td class="mess">{{messages.message}}</td>
                        <td class="sup"><button @click= "deletemsg(messages.idMESSAGES)" class="btn btn-danger supr">Supprimer</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="messages container">
        <h3>Réponses postées</h3><!--Affichage de toutes les réponses postées-->
         <table class="table table-bordered  table-sm" id='table3'>
                <thead id="thead">
                    <tr class="color">
                        
                        <th scope="col">user</th>
                        <th scope="col">contenu</th>
                        <th scope="col" class="suppr-col">Supprimer</th>
                    </tr>
                </thead>
                <tbody id="tbody3" v-for="responses in res" :key="responses.id">
                    <tr class="color">
                      
                        <td class="name">{{responses.username}}</td>
                        <td class="mess">{{responses.response}}</td>
                        <td class="sup "><button @click= "deleteresp(responses.idRESPONSE)" class="btn btn-danger supr">Supprimer</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>  
</template>

<script>


import axios from 'axios'


export default {
    name: 'moncompte',
    data(){

    return {
        data:JSON.parse(this.$session.get('user')),//Information utilisateurs dans le $session
        userId:"",
        usr:"",
        msg:"",
        test:"",
        deletid:"",
        res:""
       
    }
},
  mounted (){ 
        //Appel à l'API pour l'affichage de tous les messages
        axios.get('http://localhost:3000/api/getmessages')
        .then(response => {
          console.log(response.data)
          this.msg = response.data
        
         
        })  
        .catch(error => console.log(error))

        //Appel à l'API pour l'affichage de tous les utilisateurs
        axios.get('http://localhost:3000/api/getusers')
        .then(res=> {
          console.log(res.data)
          this.usr = res.data
        
         
        })
        .catch(error => console.log(error))

        //Appel à l'API pour l'affichage de tous les réponses
        axios.get('http://localhost:3000/api/getallresponses')
        .then(response => {
          console.log(response.data)
          this.res = response.data
        
         
        })
        .catch(error => console.log(error))

    },
methods:{

    deleteusr: function(param) {//Fonction pour la suppression des comptes utilisateurs
        let token = this.data.token
        let test = param

        if(confirm('Voulez vous vraiment supprimer le compte ?'),confirm('Cette opération est irreversible !')){

             axios.post(`http://localhost:3000/api/deleteUser`, {

                userId:test
        },
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
              }
        })
       .then (() => { 
                    
                    alert('le compte a bien été supprimé !') 
                    location.reload(true)      
       })
       .catch(() =>{
         console.log('le compte n\'a pas pu être supprimé !')
       }) 
        }
    },
    deletemsg: function(del) {//Fonction de suppression des messages 
        let token = this.data.token
        let deletid = del

        if(confirm('Voulez vous vraiment supprimer le message ?'),confirm('Cette opération est irreversible !')){

             console.log(deletid)
             axios.post(`http://localhost:3000/api/deletemessage`, {

                id:deletid
        },
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
              }
        })
       .then (() => { 
                    
                    alert('le message a bien été supprimé !') 
                    location.reload(true)      
       })
       .catch(() =>{
         console.log('le message n\'a pas pu être supprimé !')
       }) 
        }
    },
      deleteresp: function(resp) {//Fonction de suppression des réponses
        let token = this.data.token
        let deletid = resp

        if(confirm('Voulez vous vraiment supprimer le message ?'),confirm('Cette opération est irreversible !')){

             console.log(deletid)
             axios.post(`http://localhost:3000/api/deleteresponse`, {

                id:deletid
        },
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
              }
        })
       .then (() => {
                    alert('le message a bien été supprimé !') 
                    location.reload(true)      
       })
       .catch(() =>{
         console.log('le message n\'a pas pu être supprimé !')
       }) 
        }
    }
}

}
</script>

<style scoped>

h2{
    margin-top:30px;
    margin-bottom: 30px;
    font-size: 1.6em;
    text-transform: uppercase;
    font-weight: bold;
}

h3{
    margin-bottom: 20px;
    text-transform: uppercase;
    font-style: italic;
    color: #091F43;
    border-bottom: #091F43 1px solid;
    font-size: 1.1em;
    text-align:left
}

span{
    text-transform: uppercase;
}


.users{
    margin-right: auto;
    margin-left: auto;
}

.messages{
    margin-left: auto;
    margin-right: auto;
}

.mess{
    word-wrap: break-word;
    width: 30%;
}

.id{
    width: 5%;
}



.name{
    width: 15%;
    margin-left: 10%;
}

table{
    margin-bottom: 100px;
}

th{
    color:white;
    background: #091F43;
    text-transform: uppercase;
}

.user{
width: 30%;
margin-left: 10%;
}

.mail{
 width:40%;
}

.num{
width: 5%;
}

.suppr-col{
    width:1%
}

.supr{
    font-size:0.8em;
    color:white;
}
</style>
