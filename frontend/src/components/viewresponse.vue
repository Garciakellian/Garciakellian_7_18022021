<!-- PAGE POUR VOIR LES REPONSES -->
<template>
    <div id="viewresp">
        <h1 class="jumbotron">fil de discussion</h1>
        <div  id="resp">
            <div  class="getMessag">
                <div id="messdiv" class="msg"  v-for="mess in msg" :key="mess.idMESSAGES">
                    <p class="nameus">{{mess.username}} - 
                    <span class="datt">{{moment(mess.created_at).fromNow()}}</span></p>  
                    <p class="text">{{mess.message}}</p>
                </div>
            </div>
            <h3>Les réponses</h3>
            <div  class="getrespon">
                <div id="resdiv" class="rsp"  v-for="views in view" :key="views.idRESPONSE">
                    <p class="nameus">{{views.username}} - 
                    <span class="datt">{{moment(views.created_at).fromNow()}}</span></p>  
                    <p class="text">{{views.response}}</p>
                </div>
            </div>
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
       name:'viewresponse',
    data() {

      return {
        data:JSON.parse(this.$session.get('user')),
        message:"",
        msg:"",
        date:"",
        moment: moment,
        view:""

      }
    },
    mounted (){ 
        
        //Appel à l'API du message selectionné 
        axios.get(`http://localhost:3000/api/getonemessage/${idme}`)
        .then(response => {
          console.log(response.data)
          this.msg = response.data
          
        
         
        })
        .catch(error => console.log(error))

        //Appel à l'Api des réponses en rapport au premier message 
        axios.get(`http://localhost:3000/api/getresponse/${idme}`)
        .then(response => {
          console.log(response.data)
          this.view = response.data
          
        
         
        })
        .catch(error => console.log(error))

    },
    methods: {
       
      

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
  border-bottom: #091F43 1px solid ;
}
.datt{
  font-size:0.7em
}
.text{
  width:60%;
  margin: 20px auto;
  background:  #091F43;
  color:white;
  padding:30px 50px;
  border-radius:25px ;
  font-size: 13px;
}
</style>
