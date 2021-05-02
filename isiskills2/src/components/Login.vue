<template>
<div class="container">

<div class="row">
  <div class="col-7">
    
    </div>
    <div class="col-5">
      <h1>Entre no IsiSkills e comece já a aprender </h1>
      
      <div class="row">
        <div class="col-6">
      <div id="google-signin-button"></div>
        </div>
        <div class="col-6">
          <a @click="signOut()">Logout</a>
        </div>
      </div>
    </div>
  </div>
    </div>
   
 
</template>

<script>
import {mapActions} from 'vuex'
import VueCookies from 'vue-cookies'

export default {
  mounted() {
    window.gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
  data() {
    return{ 
      data :{}
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    onSignIn (user) {
      
      let id_token = user.getAuthResponse().id_token;
      this.enviarToken(id_token)
      
  },
  async enviarToken(token){
    let rota = this;
    let data = {}
    try{
      const req = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({"token": token}),
            credentials: 'same-origin'
      })
      .then(function(response){
        if(response.status == 200){
          //document.cookie= 'session-token='+ token +";path=/"
          VueCookies.set('session-token', token, '1h')
          //rota.$router.replace('/cursos') 
          rota.$store.state.cookie = VueCookies.get('session-token')
          rota.$store.state.logado = true;
          rota.$router.replace('/cursos') 
        }
      } )
      }
    catch{
      console.log('erro')
    }
  },
  signOut() {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        });
    }
    
 
  
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  height: 100%;
  display: flex;
}
.row{
 height: 100%;
 flex: 1;
}
.col-7{
  background: url('../assets/loginisi.jpg') no-repeat center;
  background-size: cover;
}

.col-5 h1{
  margin-top: 15%;
  text-align: center;
  font-family: "Quicksand", sans-serif;
}
div#google-signin-button{
  margin-left: 45%;
  margin-top: 40%;

}
.col-6{
  border-left: solid 1px lightgrey;
  margin-top: 5%;
  margin-bottom: 20%;
}
</style>