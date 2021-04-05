<template>
  <div id="nav">
   <div class="container">
    <nav class="nav" id="nav1">
        <div class="container">
            <div class="logo">
                <router-link to="/cursos">ISISkills</router-link>
            </div>
            <div id="mainListDiv" class="main_list">
                <ul class="navlinks" style="display:flex">
                    <li><router-link to="/about">About</router-link></li>
                    <li><router-link to="/"><i class="fas fa-sign-in-alt"></i></router-link></li>
                    
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

export default{

}
</script>
<style scoped>
@import './assets/main.css';



#nav a.router-link-exact-active {
  color: #00E676;
}
</style>
