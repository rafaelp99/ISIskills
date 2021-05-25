<template>
<div class="container">
        <div class="row">
            <div class="form-group">  
        
        
            <label for="nome">
                Nome
            </label>
            <input type="text" required v-model="form.nome">
             <label for="resumo">
                Resumo
            </label>
            <input type="text" required v-model="form.resumo">
            
            <div class="ml-auto" id="rowbtn">
                <button class="btn btn-success float-right" @click.prevent="criarCurso">Atualizar</button>
            </div>
            <div class="ml-auto" id="rowbtn">
                <button class="btn btn-danger float-right" @click="voltar">Voltar</button>
            </div>    
    </div>
        </div>
</div>
    
</template>
<script>
import axios from 'axios'
export default {
    
    mounted(){
        this.form.email = this.$store.state.user.email
    },
    data(){
        return{
            form: {
                nome: '',
                resumo: '',
                email: ''
            },
        }
    },
    methods:{
        criarCurso(){
            let that = this
            console.log(1);
            let response = axios.post('http://localhost:8080/criarcurso', this.form).
            then(function(res){
            if(res.status==200){
                window.swal('Atualizado');
                that.pagina=1;
            }
            else{
                this.$swal('Erro')
            }
            })
        }
    }
}
</script>
<style scoped>

.container{
    height: 100%;
    
    }
.row{
    margin-right: 25%;
    margin-left: 25%;
    height: 100%;
    flex-direction: column;
}


#rowbtn.row{
    width: 100%;
    margin: 0%;
}
.form-group{
    
    margin-top: 2%;
     
}

.form-group label{
    font-size: 1.3rem;
    font-weight: bolder;
    padding: 1%;
    margin-bottom: 0%;
    margin-top: 1%;

}
.form-group input{
    width: 100%;
    padding: 1%;   
    font-size: 1.1rem;
    color:black;
    font-weight: bold;
}
button{
    position: relative;
    margin-top: 3%;
    margin-left: 2%;
    font-size: 1.4rem;
    font-family: "Quicksand", sans-serif
}
a.nav-link{
    font-size: 1.4rem;
    color: black;

}
a.nav-link :hover{
    color: lightslategray;
}

li.nav-item{
    padding-left: 1%;
    padding-right: 1%;
}
ul.navbar-nav{
    width: 100%;
    margin-left: 5%;
}

</style>