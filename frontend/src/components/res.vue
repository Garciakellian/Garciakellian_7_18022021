<!-- PAGE POUR MODIFER UN MSG -->
<template>
    <div  id="mur">
      <div  class="getMessag">
        <h1 id="mess" class="jumbotron">message à modifier</h1>
        <div id="messdiv" class="msg"  v-for="mess in msg" :key="mess.idMESSAGES">
          <p class="nameus">{{mess.username}} - <span class="datt">{{moment(mess.created_at).fromNow()}}</span></p>  
          <p class="text">{{mess.message}}</p>
        </div>
      </div>
      <form id="form" method="POST" class="from-group" @submit.prevent= "updatemessage" >
        <div class="form-group">
          <label for="message">Modifier votre message</label>
            <textarea  class="form-control textarea" name="message" id="message" cols="50" rows="5" v-model= "message"></textarea>
        </div>
        <!-- <input type="file" name="image" id="image" @change="onFileChange"> -->
        <button  type="submit" id="envoi" class="btn btn-submit">Envoyer</button>
      </form> 
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
    name:'mur',
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
        
        //Appel à l'Api pour l'affichage du message à modifier 
        axios.get(`http://localhost:3000/api/getonemessage/${idme}`)
        .then(response => {
          console.log(response.data)
          this.msg = response.data
          
        
         
        })
        .catch(error => console.log(error))
    },
    methods: {
      
      updatemessage : function(){//Fonction qui envoi la modification du message au serveur
        let token = this.data.token
        let imess = idme
        if (this.message === ""){
          alert('Vous n\'avez rien écris vous ne pouvez pas envoyé un message vide !')
        } else{
           axios.post('http://localhost:3000/api/updatemessage',
        {
          message: this.message,
          token: this.data.token,
          id: imess

        },{
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
              }
        })
        .then (() => { 
                    console.log('message modifié')
                    this.message === "";
                    alert('votre message a bien été modifié !')
                    window.location.href = "http://localhost:8080/#/mur"

                    
       })
       .catch(() =>{
         console.log('le message n\'a pas été modifié')
       }) 
        }
       
      },
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
  padding:10px 20px;
  margin-bottom: 30px;
  border-radius: 20px;
  color:white;
  background: #091F43;
}
.btn-submit:hover{
  color:#091F43;
  background: white;
  transform: scale(1.2);
  transition: all 400ms;
}

</style>