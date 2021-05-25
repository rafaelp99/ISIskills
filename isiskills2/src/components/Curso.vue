<template>
<div class="container">

<div class="row" id="pagcurso">
 
    <div class="col-12">
    <h1>{{data.name}}</h1>
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
  
  methods: {
   async getData(){
      let that = this
         const res = await fetch(`http://localhost:8080/getcurso/${this.id}`)
         const data = await res.json();
         this.data= data;
         console.log(data)

  },

},
mounted: function(){
  console.log(this.getData())
  return this.getData();
  
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  height: 100%;
  display: flex;
}
div#pagcurso.row{
 height: 100%;
 margin-top: 5%;
 padding-bottom: 10%;
 padding-top: 10%;
 flex: 1;
}
.col-12{
  margin-top: 5%;
}


</style>