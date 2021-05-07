import {createStore} from 'vuex'

const state = {
    cookie: "",
    logado: "",
    user: {
        Primeiro_nome: "",
        Ultimo_nome: "",
        email: "",
        tipo: ""
    }
}
const getters = {
    user(state){
        return state.user;
    }
}
const mutations = {

}


export default createStore({
    state: {

    },
    mutations: {

    },

})
 