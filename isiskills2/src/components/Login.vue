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
        </div>
      </div>
    </div>
  </div>
    </div>
   
 
</template>

<script>

export default {
  mounted() {
    window.gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
  methods: {
    onSignIn (user) {
      // eslint-disable-next-line no-unused-vars

      const profile = user.getBasicProfile()
       var id_token = user.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      console.log(profile)

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
@media only screen and (max-width: 1200px) {
  .col-7 {
    display: none;
  }
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
