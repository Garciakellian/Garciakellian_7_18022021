<!-- PAGE DE INSCRIPTION -->
<template>
    <div class="containeur">
        <h1 class="jumbotron">Inscrivez-vous</h1>
         <form method="POST" @submit.prevent = "envoi">
            <label class="label-inscription" for="email">Email:</label><br>
            <input type="email" id="email" v-model="email"
            pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}"><br>
            <label class="label-inscription" for="username">Pseudo:</label><br>
            <input type="text" id="username" v-model="username"
            pattern="[a-zâäàéèùêëîïôöçñA-Z-0-9\s]{3,25}"><br>
            <label class="label-inscription" for="password">Mot de passe:</label><br>
            <input type="password" v-on:focus="showdiv" v-on:blur="maskdiv" id="password" v-model="password"
            pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})"><br>
            <div id="showfocus">
              <h4>Votre mot de passe doit contenir:</h4>
              <ul>
                <li>de 8 à 15 caractères</li>
                <li>au moins une lettre minuscule</li>
                <li>au moins une lettre majuscule</li>
                <li>au moins un chiffre</li>
                <li>au moins un de ces caractères spéciaux: $ @ % * + - _ !</li>
                <li>aucun autre caractère possible: pas de & ni de { par exemple)</li>
              </ul>
            </div>
            <label class="label-inscription" for="passwordconfirm">Confirmation du mot de passe:</label><br>
            <input type="password" id="passwordconfirm" v-model="passwordconfirm"
             pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})"><br>
            <button type="submit" class="button-connexion">Inscription</button>
        </form>

        <div>
          <p class="login-p">Deja inscrit ?</p>
          <router-link to="/connexion" class="redirect">Connectez-vous</router-link>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'inscription',
  data(){
    return{
      email:"",
      username:"",
      password:"",
      passwordconfirm:""
    }
  },
  methods:{
      envoi : function () {//Fonction qui envoi le formulaire d'inscription à l'API
        let token = ""
        if (this.email == "" || this.username == "" || this.password == ""  ){
          alert('Veuillez remplir tous les champs avant d\'envoyer le formulaire !')
        }else if (this.password != this.passwordconfirm){//Forfitification par la complétion du password 2 fois
          alert('Les deux mots de passe ne sont pas identiques !')
        }else {
        axios.post('http://localhost:3000/api/signup', {
          email: this.email,
          username: this.username,
          password: this.password,
        },
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer${token}`
              }
        })
       .then ((response) => {
         console.log('Inscription réussi !')
         let reponse = response.data;
         console.log(reponse);
         let userObject = JSON.stringify(reponse);
         console.log('user', userObject);
         this.$session.set('user', userObject)
         console.log('Inscription réussi !')
         let user = JSON.parse(this.$session.get('user'));
         console.log('Inscription réussi !')
         token = user.token;//Token d'authentification
         alert('Félicitation vous êtes désormais inscrit, connectez-vous dès maintenant')
         window.location.href = "http://localhost:8080/#/connexion"
         })
       .catch(() => console.log('Echec de l\'inscription')) 
        }
      },
      showdiv: function() {//Affichage d'un encadré pour aider à choisir le mot de passe 
        document.getElementById('showfocus').style.display = 'block';
      },

      maskdiv: function() {//Masquage de l'encadré précédents
        document.getElementById('showfocus').style.display = 'none';
      },
    }
  }
 

</script>

<style scopped>

#showfocus{display: none; font-size:12px}

.label-inscription{
  margin-top:20px;
  margin-bottom: 0;
}
.login-p{
  margin-top:20px;
  margin-bottom:0;
}
.button-connexion{
  color: white;
  background-color: #091F43;
  border-radius:20px;
  margin-top:15px;
  padding: 0px 20px;
  font-size:1.6em;
  border:none;
}
.button-connexion:hover{
  text-decoration: none;
  color:#091F43;
  background:white;
  transform: scale(1.2);

 transition: transform 400ms, background 400ms;
}
</style>