<template>
  <div id="Login">
    <v-app id="inspire">
      <v-content class="media">
        <v-container fluid fill-height id="login">
          <v-layout justify-center>
            <v-flex>
              <v-card class="elevation-12">
                <img class="logoLogin" id="logoTamanhoLogin" src="../assets/media/logo.png">

                <v-card-text>
                  <v-form id="input">
                    <v-text-field
                      @click="errosEmail = ''; userInvalido = ''"
                      v-model="email"
                      prepend-icon="person"
                      name="login"
                      label="Email"
                      type="text"
                      id="email"
                    ></v-text-field>

                    <div v-show="errosEmail != ''" class="alert alert-info">
                      <p id="erro" v-for="erro in errosEmail" :key="erro">{{erro}}</p>
                    </div>

                    <v-text-field
                      @click="errosSenha = ''"
                      v-model="senha"
                      prepend-icon="lock"
                      name="password"
                      label="Senha"
                      id="password"
                      type="password"
                    ></v-text-field>

                    <div v-show="errosSenha != '' " class="alert alert-info">
                      <p id="erro" v-for="erro in errosSenha" :key="erro">{{erro}}!</p>
                    </div>

                    <div v-show="userInvalido != ''" class="alert alert-info">
                      <p id="erro">{{userInvalido}}</p>
                    </div>
                  </v-form>
                </v-card-text>
                <v-card-actions class="text-center">
                  <div class="container">
                    <div>
                      <div>
                        <div class="text-center">
                          <button
                            @click="doLogin()"
                            href="http://localhost:8081/#/dash"
                            class="btn btn-jobei-outline"
                          >Entrar</button>
                        </div>

                        <div class="bottom">
                          <router-link id="linhaBaixa2" to="cadastrar">Registre-se</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>




<script>
import axios from "axios";
import "../assets/stylesheets/login.css";
import "../assets/stylesheets/generic.css";
export default {
  data() {
    return {
      drawer: null,
      errosEmail: "",
      errosSenha: "",
      userInvalido: "",
      email: "",
      senha: ""
    };
  },

  methods: {
    doLogin() {
      this.$store
        .dispatch("fetchToken", { email: this.email, senha: this.senha })
        .then(
          retorno => {
            if (retorno === 200) {
              this.$router.push("/dash");
            } else if (retorno.response.status === 400) {
              console.log(retorno.response.data);
              this.errosEmail = retorno.response.data.Email;
              this.errosSenha = retorno.response.data.Senha;
            } else if (retorno.response.status === 404) {
              this.userInvalido = retorno.response.data;
            } else if (retorno.response.status === 401) {
              this.userInvalido = retorno.response.data;
              this.showAlertError();
            }
            
          },
          error => {
            console.error("Ops, erro no server");
          }
        );
    
    },
    showAlertError() {
      this.$swal({
        type: "error",
        title: "Login de Usuario na Web",
        text: "Esse Login não pode ser inserido na Web pois não e uma empresa, área dedicada ao usuario ",
         footer: '<a href>Link da Google Play</a>'
      });
   }
    
  },
   
};
</script>

<style scoped>
#erro {
  text-align: center;
}
</style>
