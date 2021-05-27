<template>
    <div class="container">
<nav class="navbar navbar-expand-sm bg-light">

  <!-- Links -->
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" @click="mudarPag1" href="#">Dados Pessoais</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" @click="mudarPag2" href="#">Editar Perfil</a>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/criarprofessor">Registar como Professor</router-link>
    </li>
  </ul>

</nav>

        <div class="row" v-if="pagina==2">
    <div class="form-group">  
        <label for="email">
                Email
            </label>
            <input type="text" disabled required v-model="form.email"> 
            <label for="firstname">
                Primeiro Nome
            </label>
            <input type="text" disabled required v-model="form.firstname"> 
            <label for="lastname">
                Último nome
            </label>
            <input type="text"  disabled required v-model="form.lastname"> 
            <label for="NIF">
                NIF
            </label>
            <input type="text" required v-model="form.NIF">
            <label for="phone">
                Telemóvel
            </label>
            <input type="text" required v-model="form.phone">
            <label for="rua">
                Morada
            </label>
            <input type="text" required v-model="form.rua">
            <label for="cidade">
                Cidade
            </label>
            <input type="text" required v-model="form.cidade">
            <label for="estado">
                Distrito
            </label>
            <input type="text" required v-model="form.estado">
            <label for="zip">
                Código Postal
            </label>
            <input type="text" required v-model="form.zip">

            <div class="ml-auto" id="rowbtn">
                <button class="btn btn-success float-right" @click.prevent="atualizarPerfil">Atualizar</button>
            </div>
            <div class="ml-auto" id="rowbtn">
                <button class="btn btn-danger float-right" @click="voltar">Voltar</button>
            </div>    
    </div>
        </div>

            <div class="row" id="pag1" v-else>
        
            <div class="col-6">
                <p><b>Nome: </b> {{$store.state.user.Primeiro_nome + " " + $store.state.user.Ultimo_nome}}</p>
                <p><b>Email: </b> {{$store.state.user.email}}</p>
                <p><b>Telemóvel: </b> </p>
                <p><b>Morada: </b> </p>
                <p><b>Cidade: </b> </p>
                <p><b>Código-Postal: </b> </p>
                <p v-if="$store.state.user.tipo == 1"><b>É professor: </b> Não </p>
                <p v-else><b>É professor: </b> Sim </p>
                
            <div class="tbl-faturas">
        <table class="table table-hover table-striped">
            <thead>
                <th></th>
                <th></th>
                
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
            </div>
        </div>
    </div>
     
</template>
<script>
import axios from 'axios'
export default {
    pagina: 1,
    computed: {
        
        user:{
            get(){
                return this.$store.state.user;
            }
        }
    },
    dados(){
        return {
            cursosComprados: {}
        }
    },
    mounted(){
        
        console.log(this.$store.state.user)
        this.form.email = this.$store.state.user.email
        this.form.firstname= this.$store.state.user.Primeiro_nome 
        this.form.lastname=  this.$store.state.user.Ultimo_nome
    },
    data(){
        return{
            form: {
                email: '',
                firstname: '',
                lastname: '',
                NIF: '',
                phone: '',
                rua: '',
                cidade: '',
                estado: '',
                zip: ''
            }
        }
    },
    methods: {
        atualizarPerfil(){
            let that = this;
            let response = axios.post('http://localhost:8080/criarClient', this.form).
            then(function(res){
            if(res.status==200){
                window.swal('Atualizado');
                that.pagina=1;
            }
            else{
                this.$swal('Erro')
            }
            })
        },
        voltar(){
             this.$nextTick(() => {
                    this.pagina=1;
                    
      });
        },
        mudarPag1(){
            this.pagina = 1;
        },
        mudarPag2(){
            this.pagina = 2;
             console.log(this.pagina)
        },
        mudarPag3(){
            this.pagina = 3;
             console.log(this.pagina)
            
        },
        verificaProfessor(){
            if(this.$store.state.user.tipo== 1){
                return false
            }
            else if(this.$store.state.user.tipo == 2){
                return true
            }
        }
        
    }
}
</script>
<style>

p{
    font-size: 1.3rem;
}
p#titulo{
    font-weight: bold;
}
.row{
    margin-right: 25%;
    margin-left: 25%;
}
#pag1.row{
    margin-top: 2%;
    margin-left: 10%;
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