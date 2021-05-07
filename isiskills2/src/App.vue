<template>
  <div id="nav" >
   <div class="container">
    <nav class="nav" id="nav1">
        <div class="container">
            <div class="logo">
                <li><a href="#">ISISkills</a></li>
            </div>
            <div id="mainListDiv" class="main_list" v-if="$store.state.logado">
                <ul class="navlinks" style="display:flex">
                    <li><router-link to="/cursos">Cursos</router-link></li>
                    <li><router-link to="/perfil">Perfil</router-link></li>
                    <li @click="signOut()"><a @click="signOut()"><i class="fas fa-sign-in-alt"></i></a></li>
                    
                </ul>
            </div>
            <span class="navTrigger">
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </nav>
</div>
  </div>
  
  <router-view/>
</template>
<script>

import VueCookies from 'vue-cookies'
import store from './store'

export default {
 
methods: {
    signOut(){
  
        VueCookies.remove('session-token')
        this.$store.state.token = {}
        this.$store.state.logado = false;
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        });
        this.$router.go('/')
        console.log(this.$store.state.logado)
       
    }

}

}
</script>
<style scoped>
@import './assets/main.css';



#nav a.router-link-exact-active {
  color: #00E676;
}
</style>
