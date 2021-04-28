import axios from 'axios'
export default{
    namespaced: true,
    state: {
        token: '',
        
        user:{
            name: '',
            email: "",
            
        },


    },
    getters: {
         autenticado(state){
             return state.token && state.user
         },
         utilizador(state){
             return state.user
         }
    },
    mutations: {
        SET_TOKEN(state, token){
            state.toke= token;
        },
        SET_USER(state, data){
            state.user.name = data.name,
            state.user.email = data.email
        }

    },
    actions:{
        async signIn(_, credentials){
            dispatch('attempt', credentials)
        },
        async attempt ({commit}, data){
            commit('SET_TOKEN', data.token)
            commit('SET_USER', data)

        }
    }
}