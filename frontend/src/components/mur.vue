<!-- PAGE DE MUR -->
<template>
  <div id="mur">
    <div class="bienvenu" v-for="usr in user" :key="usr.userId">
      <h1 class="jumbotron">
        Bienvenue
        <span>{{ usr.username }}</span
        >!
      </h1>
    </div>
    <div class="getMessag container">
      <h3 id="mess">Les messages</h3>
      <div id="messdiv" class="msg container" v-for="mess in msg" :key="mess.idMESSAGES">
        <p class="nameus">{{ mess.username }} - 
        <span class="datt">{{ moment(mess.created_at).fromNow() }}</span>
        </p>
        <div class="row align-div">
          <p class="text col-3">{{ mess.message }}</p>
          <img :src="'http://localhost:3000/tmp/' + mess.image" alt="image" class="image">
        </div>
        <div class="buttoon">
          <button @click= "updatemess(mess.idMESSAGES)" 
          v-if="data.username == mess.username || data.status =='admin'" 
          type="button"
          class="bouton"
          >Modifier</button>
          <button
            @click="deletemess(mess.idMESSAGES)"
            v-if="data.username == mess.username || data.status == 'admin'"
            type="button"
            id="icon"
            class="bouton"
          >Supprimer
          </button>
          <button
            @click="response(mess.idMESSAGES)"
            class="bouton"
          >
            Repondre
          </button>
          <button
            @click="view(mess.idMESSAGES)"
            id="voir"
            data-toggle="collapse"
            href="#/viewresponse"
            class="bouton"
          >Voir les reponses</button>
        </div>
      </div>
    </div>
    <form
      id="formtog"
      method="POST"
      class="from-group personal-display"
      @submit.prevent="sendMessage"
      enctype="multipart/form-data"
    >
      <div class="form-group">
        <label class="messa" for="message">Votre message:
        </label><br>
        <textarea
          class="text-input"
          name="message"
          id="message"
          cols="30"
          rows="5"
          v-model="message"
        >
        </textarea>
      </div> 
      <div class="container input-containeur">
        <label for="image">Votre GIF:</label>
        <input class="select-file" type="file" @change="onFileChange" id="image" name="image" accept="image/png, image/jpeg, image/gif"/>
        <button type="submit" id="envoi" class="btn-validate">
          Envoyer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

let moment = require("moment");
moment.locale("fr"); //Appel du module moment.js pour affichage à quel moment le message a été écris

export default {
  name: "mur",
  data() {
    return {
      data: JSON.parse(this.$session.get("user")),
      message: "",
      msg: "",
      date: "",
      moment: moment,
      imess: "",
      update: "",
      user: "",
      gifFile: "",
    };
  },
  mounted() {
    //Appel à l'api pour l'affichage de tous les messages
    axios
      .get("http://localhost:3000/api/getmessages")
      .then(response => {
        this.msg = response.data;
      })
      .catch(error => console.log(error));

    let data = JSON.parse(this.$session.get("user"));
    //Appel à l'Api pour l'affichage des informations utilisateurs
    axios
      .get(`http://localhost:3000/api/getoneuser/${data.userId}`)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    sendMessage: function() {
      //Fonction qui permet d'envoyer un message
      let token = this.data.token;
      let idUSERS = this.data.userId;
      let userName = this.data.username;
      if (this.message.length === 0) {
        alert(
          "Vous n'avez rien écris vous ne pouvez pas envoyé un message vide !"
        );
      } else {
        
        axios
          .post(
            "http://localhost:3000/api/postmessage",
            {
              message: this.message,
              token,
              idUSERS,
              username: userName,
              image: this.gifFile,
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
          )
          
          .then(() => {
            this.message === "";
            alert("votre message a bien été envoyé !");
            location.reload(true);
          })
          .catch(() => {
            console.log("le message n'a pas été envoyé");
          });
      }
    },
  onFileChange: function(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length === 0) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.gifFile = reader.result
      }
    },

    deletemess: function(delid) {
      //Fonction qui permet à l'utilisateur de supprimer un message
      let token = this.data.token;
      let idmess = delid;

      if (
        confirm("êtes vous sûr de vouloir supprimer ce message ?") &&
        confirm("cela effacera définitivement le message")
      ) {
        axios
          .post(
            "http://localhost:3000/api/deletemessage",
            {
              id: idmess
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(() => {
            alert("votre message a bien été supprimé");
            location.reload(true);
          })
          .catch(() => {
            console.log("le message n'a pas été supprimé !");
          });
      }
    },
    updatemess: function (idmess) {//Fonction qui permet à l'utilisateur de modifié un message
         
         let imess = idmess
         window.location.href = `http://localhost:8080/#/res?id=${imess}`
         location.reload(true);
       },

    response: function(idmess) {
      //Fonction qui permet à l'utilisateur de répondre à un message posté

      let irep = idmess;

      window.location.href = `http://localhost:8080/#/reponses?id=${irep}`;
      location.reload(true);
    },

    view: function(idmess) {
      let iview = idmess;

      window.location.href = `http://localhost:8080/#/viewresp?id=${iview}`;
      location.reload(true);
    }
  }
};
</script>

<style scoped>
h1{
  text-transform: uppercase;
  color:#091F43;
}

span {
  font-style: italic;
}


.msg {
  border-bottom: 1px solid gray;
}

.flex{
  display: flex;
}

.nameus {
  text-align:left;
  margin-left: 20px;
  padding-top:20px;
  font-weight:bold;
  text-transform: uppercase;
}

.messa{margin-top:20px;}

.bouton{
  border-radius:10px;
  border:none;
  border-right: 1px solid gray;
  border-left: 1px solid gray;
  font-style: italic;
  font-size: 1.1em;
}
.bouton:hover{
  margin-left:10px;
  margin-right:10px;
  transform: scale(1.2);
  color: #091F43;
  border-color: #091F43;
  transition: all 400ms;
  background: white;
}
.btn-validate{
  color:white;
  background: #091F43;
  border:none
}
.image{
  margin: 0 auto;
}
.text-input{
  margin-top:20px;
  resize:none
}
.align-div{
  margin: 20px 0 50px 0 ;
}
@media (max-width:768px){
  .align-div{display: inline;}
  .text{max-width:80% !important; box-sizing: unset !important;}
  .image{width: 60%;}
  .input-containeur{width: 80% !important;}
}
.input-containeur{
  margin-bottom:100px;
  display: flex;
  flex-direction: column;
  width: 350px;
}

.select-file{
  border: gray 1px solid
}
.text {
  text-align: left;
  color:white;
  background: #091F43;
  margin-left: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 20px;
}

</style>