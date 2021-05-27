<template>
<div class="container">

<div class="row" id="pagcurso">
 
    <div class="col-12">
    <h1>{{data.name}}</h1>
    <p>{{data.summary}}</p>
    <button class="btn btn-success" @click.prevent="comprarCurso">Inscrever</button>
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
  comprarCurso(){
    let str = this.data.reference;
    let email = this.$store.state.user.email;
      let idProf= str.split('+')[0];
      let date = new Date()
      let newDate = new Date(date.setDate(date.getDate()+30))
      let expdate = newDate.toISOString().slice(0, 10);
     axios.post('http://localhost:8080/comprarcurso', {'idCurso': this.id, 'email': email, 'idProf': idProf, expdate})
     .then(function(res){
            if(res.status==200){
                window.swal('Atualizado');
                this.$router.go('/cursos')       
            }
            else if(res.status==400){
                alert('erro')
                window.swal('Erro')
            }
            })
  }

},
mounted: function(){
  console.log(this.getData())
  return this.getData();
  
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container{
  height: 100%;
  
}
.row{
 height: 100%;
 
 padding-bottom: 10%;
 margin-left: 5%;
 
}
.col-12{
  margin-top: 5%;
}


</style>