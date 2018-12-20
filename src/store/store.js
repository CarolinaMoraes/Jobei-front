import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'vuex',
    storage: window.localStorage,
})

export const store = new Vuex.Store({
    plugins: [vuexLocalStorage.plugin],
    state: {
        token: ''
        ,usuarioLogado:''
        , vagas: []
        , decript: ''
    }
    , getters: {
        fetchToken: state => state.token,
        fetchVagas: state => state.vagas,
        fetchDecriptToken: state => state.decript,
        estaLogado:state => state.usuarioLogado

    }
    , mutations: {
        LOGIN_TOKEN: (state, payload) => { state.token = payload;state.usuarioLogado = "adm" },
        LISTA_VAGAS: (state, payload) => { state.vagas = payload; },
        DESCRIPT_TOKEN: (state, payload) => { state.decript = payload; },
        LOGOUT_USUARIO: (state) => { state.token = ''; state.decript = ''; state.vagas = []; state.usuarioLogado = ''},
    },
    actions: {
        fetchToken: (context, payload) => {
            return axios({
                method: 'post'
                , data: payload
                , url: '/auth/empresa'
                , headers: {
                    'Content-Type': 'application/json',
                    'api-version': '1.0',
                }
            })
                .then((response) => {
                    context.commit('LOGIN_TOKEN', response.data.accessToken);
                    let token = store.state.token;
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace('-', '+').replace('_', '/');
                    console.log(JSON.parse(window.atob(base64)));
                    var tokendescript = JSON.parse(window.atob(base64));
                    console.log("token descriptografado: "+tokendescript.sub);
                    context.commit("DESCRIPT_TOKEN", tokendescript.sub);
                    console.log("response: "+response.status);
                    return response.status;
                })
                .catch(error => {
                    console.log("error.response: ");
                    console.log(error.response);
                    return error;
                });
        },
        fetchVagas: (context, payload) => {
            let config = {
                headers: {
                    'Authorization': "Bearer "+ store.state.token,
                    'Content-Type': 'application/json',
                }
            };
            axios
                .get("/empresas/" + store.state.decript + "/vagas", config)
                .then(response => {
                    context.commit("LISTA_VAGAS", response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        fetchDecriptToken: (context) => {
            let token = store.state.token;
            console.log(token);
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            console.log(JSON.parse(window.atob(base64)));
            var tokendescript = JSON.parse(window.atob(base64));
            console.log(tokendescript.sub);
            context.commit("DESCRIPT_TOKEN", tokendescript.sub);
        },
        
        logoutUsuario: (context) => {
            context.commit('LOGOUT_USUARIO')
        }

    },
})