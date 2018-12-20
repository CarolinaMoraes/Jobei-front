<template>
   <div class="app">
      <sidebar/>
      <v-content>
                        
        <div class="empty text-center" v-if="vagas.length == 0">
          <div class="text-block">
            <h1 class="sad-face">:(</h1>
            <h2>Ops, você ainda não tem nenhuma vaga</h2>
            <h3>aproveite e adicione agora</h3>
          </div>
          
          <b-btn to="cadastro-vagas" class="ml-5 btn btn-jobei">
               Adicionar Vaga
            </b-btn>
        </div>

       <div v-else class="row">
            <h2 class="ml-3 vagas">Essas são suas vagas :)</h2>

            <b-btn  v-bind:to="{name: 'CadastroVagas'}" class="ml-5 btn btn-jobei-outline">
               Adicionar Vaga
            </b-btn>

       </div>

         <v-container grid-list-xl fluid fill-height class="grey lighten-4">
            <v-layout row wrap>
               <v-flex xs11 v-for="v in vagas" :key="v.titulo">
                  <div class="card-group">
                     <div class="card shadow" >

                        <div class="card-body">
                           <h5 class="card-title">{{v.cargo}}</h5>
                           <p class="card-text">{{v.descricao}}</p>

                        <div class="dropdown three-dots">
                           <button id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <img src="../assets/media/dots.png">
                           </button>

                           <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <router-link class="dropdown-item" :to="`/editar-vaga/${v.id}`">Editar Vaga</router-link>
                              <a class="dropdown-item" @click="deleteVaga(v.id)">Deletar Vaga</a>
                            </div>
                        </div>  

                           <div>



                              <b-link class="btn-link card-link" v-bind:to="`/vagas/${v.id}`">Ver Vaga</b-link>
                           </div>
                        </div>
                     </div>
                  </div>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </div>
</template>





<style scoped>


.text-block{
  margin-bottom: 5%;
}

.sad-face{
  font-size: 100px;
  font-weight: 700 !important;
}

.text-block h2{
  font-size: 40px; 
}

h3{
  font-family: 'Roboto';
  font-weight: 200;
}

.three-dots {
  float: right;
  margin-top: -40px;
}

.three-dots img {
  height: 20px !important;
  width: 20px !important;
}

.app {
  overflow: hidden;
}

.v-content {
  padding-top: 19vh !important;
  margin-left: 5vw;
}

.card-deck {
  padding-right: 15px;
}

h2 {
  font-size: 2rem;
}

.layout {
  margin-bottom: 10px;
}

.btn {
  height: 40px;
}

.card {
  border: none;
  height: 180px;
  box-shadow:none;
}

.card-group {
  margin-bottom: 5px;
}

.card-text {
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cargo {
  color: grey;
}

.ver_vaga a {
  color: #1ba296;
  font-size: 25px;
}

@media screen and (max-width: 850px) {
  .btn {
    margin: 0px auto;
  }

  h2 {
    margin-bottom: 2vh;
  }

}
</style>


<script>
import "../assets/stylesheets/generic.css";
import axios from "axios";
import Sidebar from "./sidebar/Sidebar.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar
  },
  data() {
    return {
      empresas: [],
    };
  },

  computed: {
    vagas() {
      return this.$store.getters.fetchVagas;
    }
  },

  mounted() {
    this.$store.dispatch("fetchVagas");
  },

  methods:{
    deleteVaga(idVaga){
      return axios({
        method: 'delete',
        
        url: `/empresas/`+this.$store.getters.fetchDecriptToken+`/vagas/`+idVaga,
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        }
      
      })
        .then(response => {
          window.location.reload(true);
        })
        .catch(error => {
          console.log("você errou aqui: " + error + " ó " + error.response.data);
        });
    },

    }

  };
</script>