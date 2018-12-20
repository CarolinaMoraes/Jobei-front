<template>
<div class="sidebar">
 
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4"
      app
    >

 <div class="upper-menu">  
   
  <v-list-tile avatar>
        <img class="avatar" v-if="empresa.imagem != null" :src="empresa.imagem">
        <img class="avatar" v-else src="../../assets/media/no-image.jpg">
  </v-list-tile>  
    <h4>  {{empresa.nome}}  </h4>
 </div>
<v-divider light></v-divider>
    <v-list dense>
      <router-link v-bind:to="{name: 'Dashboard'}" class="side_bar_link">
        <v-list-tile>
            <v-list-tile-content>Home</v-list-tile-content>
        </v-list-tile>
      </router-link>

    <router-link v-bind:to="{name: 'Vagas'}" class="side_bar_link">
        <v-list-tile>
           <v-list-tile-content>Vagas</v-list-tile-content>
        </v-list-tile>
      </router-link>

       <router-link v-bind:to="{name: 'Matches'}" class="side_bar_link">
        <v-list-tile>
           <v-list-tile-content>Matches</v-list-tile-content>
        </v-list-tile>
      </router-link>

         <router-link v-bind:to="{name: 'PerfilEmpresa'}" class="side_bar_link">
        <v-list-tile>
           <v-list-tile-content>Perfil</v-list-tile-content>
        </v-list-tile>
      </router-link>

       <a @click="handleLogout()" class="side_bar_link">
        <v-list-tile>
           <v-list-tile-content>Sair</v-list-tile-content>
        </v-list-tile>
       </a>
    </v-list>
    
    </v-navigation-drawer>

    <v-toolbar app scroll-off-screen :scroll-threshold="100" flat clipped-left class="grey lighten-4">
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
       <img class="mx-3 logo" src="../../assets/media/logo.png"> 
       
    </v-toolbar>     
</div>

</template>
<script>

import "../../assets/stylesheets/main.css";
import axios from "axios";


export default {
  name: 'Sidebar',


    data(){
    return{
      drawer: null,
      empresa: []
      } 
    },

  mounted() {
    this.fetchEmpresas();
  },

  methods: {
    async fetchEmpresas() {
      return axios({
        method: 'get',
        url:'/empresas/'+this.$store.getters.fetchDecriptToken,
      })
        .then(response => {
          this.empresa = response.data;

        })
        .catch(error => {
          console.log("você errou aqui: " + error + " ó " + error.response.data);
        });
    },

    handleLogout(){
      this.$store.dispatch("logoutUsuario");
      this.$router.push("/login");
          }
  }
};



</script>


<style scoped>

.sidebar{
  font-family: 'Roboto';
  font-weight: 300;
}

.v-list__tile__content{
  font-family: 'Roboto';
  font-weight: 200;
}

.v-navigation-drawer__border {
  display: none;
}

.v-list {
  margin-left: 15%;
}

a{
  text-decoration: none;
  color: black;
}

a:hover{
  text-decoration: none;
  color: #3acbc6;
}

h4 {
  text-align: center;
}

main {
  margin-top: 50px;
  background-color: #f5f5f5 !important;
}

html {
  background-color: #f5f5f5 !important;
}

.logo{
  width: 130px;
}

.avatar{
  width: 150px;
  height: 150px;
}

</style>