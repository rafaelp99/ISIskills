<template>
    <div class="container">
        <h1>Bem, vindo</h1>
    <div class="row">
    <div class="form-group">  
        <label for="email">
                Email
            </label>
            <input type="text" disabled required v-model="form.email"> 
            <label for="firstname">
                Primeiro Nome
            </label>
            <input type="text" required v-model="form.firstname"> 
            <label for="lastname">
                Último nome
            </label>
            <input type="text" required v-model="form.lastname"> 
        
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

    </div>
    </div>
    </div>  
</template>
<script>
import axios from 'axios'
export default {
    computed: {
        user:{
            get(){
                return this.$store.state.user;
            }
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
            let response = axios.post('http://localhost:8080/criarClient', this.form)
            if(response== 'sucesso'){
                this.$swal('Dados atualizados');
            }
            else{
                    this.$swal('Erro')
            }
        }
    }
}
</script>
<style scoped>
.row{
    margin-right: 25%;
    margin-left: 25%;
}
#rowbtn.row{
    width: 100%;
    margin: 0%;
}
.form-group{
    
    margin-top: 3%;
     
}

.form-group label{
    font-size: 15px;
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
    font-size: 1.4rem;
    font-family: "Quicksand", sans-serif
}
</style>