<!-- PAGE DE CONNEXION -->
<template>
    <div>
        <h1 class="jumbotron">Connectez-vous</h1>
        <form method="POST" id="formulaire" @submit.prevent="envoi">
          <label for="pseudo">Pseudo:</label><br>
          <input type="text" id="pseudo" v-model="username"
           pattern="[a-zâäàéèùêëîïôöçñA-Z-0-9\s]{3,25}"><br>
          <label class='label-2' for="password">Mot de passe:</label><br>
          <input type="password" id="password" v-model="password"
          pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})"><br>
          <button type="submit" class="buton-connexion">Connexion</button>
        </form>
        <div>
        <p class="login-p">Pas encore inscrit ? </p>
        <router-link to="/inscription" class="redirect">Inscrivez-vous</router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'connexion',
  data() {
    return{
      username: "",
      password: ""
    };
  },
    methods: {
    envoi: function() {
      //envoie des informations de connexion à l'API pour authentification
      let token = "";
      if (this.username == "" || this.password == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter"
        );
      } else {
        axios
          .post(
            "http://localhost:3000/api/login",
            {
              username: this.username,
              password: this.password
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer${token}` //Renvoi du token par l'api en cas d'authentification
              }
            }
          )
          .then(response => {
            //Si authentification réussie autorisation d'accès au mur pour les utilisateur
            // ou au tableau de bord admin pour l'administrateur de l'applcation
            let reponse = response.data;
            let connected = 0;
            this.$session.set('user', JSON.stringify(reponse));
            let user = JSON.parse(this.$session.get("user"));
            token = user.token;
            if (user.status == "admin") {
              connected++
              connected++
              this.$session.set('connected', JSON.stringify(connected))
              console.log(connected);
              window.location.href = "http://localhost:8080/#/dashadmin";
              location.reload(true);
            } else {
              connected++
              this.$session.set('connected', JSON.stringify(connected))
              console.log(connected);
              window.location.href = "http://localhost:8080/#/mur";
              location.reload(true);
            }
          })
          .catch(() => {
            console.log("la connexion a échouée"); //En cas d'echec envoie de l'information à l'utilisateur
            document.querySelector("#smallpass").innerHTML =
              "pseudo ou mot de  passe incorrect";
          });
      }
    }
  }
}

</script>

<style scopped>
.label-2{
  margin-top:20px;
}
.login-p{
  margin-top:20px;
  margin-bottom:0;
}
.buton-connexion{
  color: white;
  background-color: #091F43;
  border-radius:20px;
  margin-top:15px;
  padding: 0px 20px;
  font-size:1.6em;
  border: none;
}
.buton-connexion:hover{
  text-decoration: none;
  color:#091F43;
  background:white;
  transform: scale(1.2);

 transition: transform 400ms, background 400ms;
}
.redirect{
  color:#004DFF;
}
</style>