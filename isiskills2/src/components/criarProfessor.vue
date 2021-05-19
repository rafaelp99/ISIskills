<template>
<div class="container">
        <div class="row">
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
            <label for="rua">
                Morada
            </label>
            <input type="text" required v-model="form.rua">
            <label for="cidade">
                Cidade
            </label>
            <input type="text" required v-model="form.cidade">
            <label for="zip">
                Código Postal
            </label>
            <input type="text" required v-model="form.zip">

            <div class="ml-auto" id="rowbtn">
                <button class="btn btn-success float-right" @click.prevent="criarProfessor">Atualizar</button>
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
                phone: '',
                rua: '',
                cidade: '',
                estado: '',
                zip: ''
            },
        }
    },
        methods: {
        criarProfessor(){
            let that = this;
            let response = axios.post('http://localhost:8080/registarProfessor', this.form).
            then(function(res){
            if(res.status==200){
                window.swal('Atualizado');
                that.$router.go('/perfil')
            }
            else{
                this.$swal('Erro')
            }
            })
        },
        voltar(){
             this.$router.go('/perfil')
      }
    }
}
</script>
<style scoped>
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
