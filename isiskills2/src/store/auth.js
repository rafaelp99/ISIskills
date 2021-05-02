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
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http:127.0.0.1/login');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                console.log('Signed in as: ' + xhr.responseText);
                if(xhr.responseText == 'success'){
                    console.log('sucesso')
                }
            };
            xhr.send(JSON.stringify({token : credentials}));
          },
        async attempt ({commit}, data){
            commit('SET_TOKEN', data.token)
            commit('SET_USER', data)

        }
    }
}