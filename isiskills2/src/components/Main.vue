<template>
<div class="container">
  <div class="row" id="mainrow">
  <div class="col-3 clearfix" id="filtro">
   
    <div class="input-group clearfix" >
    <div class="form-outline">
    <input type="search" id="form1" class="form-control" />
    <label class="form-label" for="form1">Search</label>
  </div>
  <button type="button" class="btn btn-primary">
    <i class="fas fa-search"></i>
  </button>
</div>

<form action="#" class="clearfix">
  <label for="cars">Choose a car:</label>

  <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
</form>


  </div>

<div class="col-9" id="filacursos" >
  
    <div class="row">
      <div class="col-3"  v-for='curso in data' :key="curso.id" v-bind:id="curso.product_id"><router-link :to="'/cursos/'+curso.product_id"><h1>{{curso.name}}</h1></router-link>
      </div>
      
    </div>
  
</div>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  props : ['id'],
  data: function(){
    return{
      data : {}
    }
    
  },
  beforeMount(){
    this.getData();
  },

  
  methods: {
   async getData(){
      let that = this
         const res = await fetch('http://localhost:8080/getcursos')
         const data = await res.json();
         this.data= data;
         console.log(data)

  }


  
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cursos.row{
  max-width: 100%;
  width: 100%;
  display: flex;
  height: 40%;
  position: relative;
}
.container{
  position: relative;
  width: 100%;
  overflow-y:auto;
  display: flex;
  height: 100%;
  overflow-x: hidden;
  height: 100%;
   flex-grow: 1;
}
#mainrow.row{
  
  max-width: 100%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
  margin-bottom:2% ;
  min-width: 100%;
}
#filtro.col-3{
  
  background-color: lightgrey;
  min-height: 100%;
    display: flex;
  
  padding-left: 5%;
  border: solid 1px gray;
}
.col-9{
  padding: 0;
  
}
div#divcursos{
  
  width: 100%;
}
nav{
  width: 100%;
}
a.page-link{
  color: white;
  background-color: black;
}
.pagination > li > a:focus,
.pagination > li > a:hover,
.pagination > li > span:focus,
.pagination > li > span:hover
{
    color: #00E676;
    background-color: black;
    border-color: #ddd;
}
div#navi{
  position: relative;
  bottom: 0;
}
.col-9 .row{
  height: 100%;
}
div#navi .row{
  height: 10%;
}
#navi .row ul{
  margin-top: 5%;
}
#filacursos .row{
  margin-left: 3%;
  margin-right: -7%;
}
#filacursos .col-3{
  border: solid 1px gray;
  margin: 5px;
}
.input-group{
  height: 10%;
  margin-top: 5%;
}
.btn-primary{
  height: 24.5px;
}
input#form1{
  width: 100%;
}
#filtro.col-3{
  padding: 1%;
  display: table;
}
.form-outline{
  width: 90%;
}
h1{
  color: black;
}
#filtro.col-3{
  overflow: hidden;
}
.col-3 a:hover{
  text-decoration: none !important;
  color: #00E676;
}
.col-3 h1:hover{
  color: #00E676;
}
.btn-primary{
  background-color: #00E676;
  color: black;
  border-color: lightgrey;
  }
  #filtro .row{
    max-height: 50%;
    min-width: 100%;
    margin: 0;
  }
  form{
    height: 20%;
    margin-top: 2%;
      }

</style>
