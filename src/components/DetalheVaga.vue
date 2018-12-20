<template>
  <div class="app">
    <sidebar/>
    <v-content>
      <div class="head">
        <h1 class="text-left">{{vaga.cargo.nome}}</h1>
      </div>
      <div class="text-justify mb-5">
        <p>{{vaga.descricao}}</p>
        <h2>Remuneração</h2>
        <p>{{vaga.remuneracao}}</p>
      </div>

     

      <div class="habilidades mx-auto">
        <h2>Habilidades Requeridas</h2>
        <div
          v-for="h in vaga.habilidades"
          :key="h.nome"
          class="habilidades-group mt-3 mr-3 ml-3 btn btn-jobei"
        >{{h.nome}}</div>
      </div>
    </v-content>
  </div>
</template>



<style scoped>
.text-left {
  font-size: 48px;
}

.text-justify {
  font-size: 23px;
  width: 700px;
}

.v-content {
  padding-top: 15vh !important;
  margin-left: 5vw;
}

.habilidades {
  font-size: 3rem;
}

@media screen and (max-width: 850px) {
  .text-justify {
  font-size: 23px;
  text-align: center;
  width: auto;
  /* width: 700px; */
}

.v-content  {
  padding-top: 15vh !important;
  margin: auto;
}

}


</style>


<script>
import "../assets/stylesheets/generic.css";
import axios from "axios";
import Sidebar from "./sidebar/Sidebar.vue";

export default {
  name: "DetalheVaga",
  components: {
    Sidebar
  },
  data() {
    return {
      vaga: []
    };
  },

  mounted() {
    this.fetchVaga();
  },

  methods: {
    async fetchVaga() {
      return axios({
        method: "get",
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
        url:
          `/empresas/` +
          this.$store.getters.fetchDecriptToken +
          `/vagas/${this.$route.params.id}`
      })
        .then(response => {
          this.vaga = response.data;
        })
        .catch(() => {});
    }
  }
};
</script>