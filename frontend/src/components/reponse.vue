<!--PAGE POUR REPONDRE A UN MESSAGE -->
<template>
    <div id="mur">
        <h1 class='jumbotron'>Répondre</h1>
        <div  id="mur" class="container">
            <div  class="getMessag">
                <div id="messdiv" class="msg"  v-for="mess in msg" :key="mess.idMESSAGES">
                <p class="nameus">{{mess.username}} - <span class="datt">{{moment(mess.created_at).fromNow()}}</span></p>
                <p class="text">{{mess.message}}</p>
                </div>
            </div>
            <form id="form" method="POST" class="from-group" @submit.prevent= "reponsemess" >
                <div class="form-group">
                    <label for="message">Votre message:</label>
                        <textarea  class="form-control textarea" name="message" id="message" cols="50" rows="5" v-model= "message"></textarea>
                </div>
                <button type="submit" id="envoi" class="btn btn-submit">Envoyer la réponse</button>
            </form> 
        </div> 
    </div>
</template>

<script>

import axios from 'axios'

const rawUrlParams = window.location.href.split('?')[1];
const urlParams = new URLSearchParams('?' + rawUrlParams);
const idme = urlParams.get('id');


let moment = require('moment')
moment.locale('fr');


export default {
       name:'reponse',
    data() {

      return {
        data:JSON.parse(this.$session.get('user')),
        message:"",
        msg:"",
        date:"",
        moment: moment,
        idme: idme
      }
    },
    mounted (){ 
        
        //Appel à l'Api pour afficher le message auquel l'utilisateur souhaite répondre
        axios.get(`http://localhost:3000/api/getonemessage/${idme}`)
        .then(response => {
          console.log(response.data)
          this.msg = response.data
          
        
         
        })
        .catch(error => console.log(error))
    },
    methods: {
      reponsemess: function () {//Fonction qui envoi la réponse de l'utilisateur au serveur 
        let token = this.data.token
        let idUSERS = this.data.userId
        let userName = this.data.username
        if (this.message === ""){
          alert('Vous n\'avez rien écris vous ne pouvez pas envoyé un message vide !')
        } else{
           axios.post('http://localhost:3000/api/responsemessage',
        {
          response: this.message,
          token: this.data.token,
          idUSERS : idUSERS,
          username: userName,
          idMESSAGES: idme
        },{
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
              }
        })
        .then (() => { 
                    console.log('réponse envoyé')
                    this.message ==="";
                    alert('votre reponse a bien été envoyé !')
                    window.location.href = `http://localhost:8080/#/viewresp?id=${idme}`

                    
       })
       .catch(() =>{
         console.log('la réponse n\'a pas été envoyé')
       }) 
        }
       
      }

      }
    }
</script>

<style scoped>
h1{
  text-transform: uppercase;
  color:#091F43;

}
h5{
  text-transform:uppercase;
  margin-top:50px;
  margin-bottom: 20px;
}
.textarea{
  resize: none;
}
.nameus{
  font-size:1.5em;
  border-bottom:#091F43 1px solid ;
}
.datt{
  font-size:0.7em
}
.text{
  width:60%;
  margin: 20px auto;
  background: #091F43;
  color:white;
  padding:30px 50px;
  border-radius:25px ;
  font-size: 13px;
}
.btn-submit{
  margin-bottom: 30px;
  border-radius: 20px;
  color:white;
  background: #091F43;
}
.btn-submit:hover{
  color:#091F43;
  background: white;
  border: #091F43 solid 1px;
  transform: scale(1.2);
  transition: all 400ms;
}
</style>
