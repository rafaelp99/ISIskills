<template>
<div class="container-fluid d-flex h-100 flex-column">
    <div class="row">
  <div class="col-7">
      <h1>IsiSkills</h1>
  </div>
  <div class="col-5">
      <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
     </div>
    </div>
    </div>
</template>

<script>
 export default{

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-7{
    background: url(../assets/imagemfundo.jpg);
    background-color: greenyellow;
    background-blend-mode: multiply;
    background-size: cover;
    background-repeat: no-repeat;
    
    

    
    }
    .row{
      width: 100%;  
      height: 100%;
      margin: 0;
      padding: 0;
    }
  div.container-fluid.d-flex.h-100.flex-column{
      padding: 0;
      height: 100%;
  }
  h1{
        font-size: 6rem;
        font-weight: bold;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          margin-top: 25%;
  }
  .g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>

