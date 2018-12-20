<template>
  <div class="app">
    <sidebar/>
    <v-content>
      <div v-show="vagaSelected.length == 0">
        <h2
          class="text-center page-welcome"
        >Olá, {{empresa.nome}} selecione uma vaga para começarmos</h2>
        <div class="select-vaga text-center">
          <div class="mx-auto">
            <h5>Filtre por vaga:</h5>

            <multiselect
              class="mx-auto"
              :options="vagas"
              v-model="vagaSelected"
              :multiple="false"
              :close-on-select="true"
              :clear-on-select="true"
              :preserve-search="false"
              placeholder="Pesquise e adicione"
              label="cargo"
              track-by="cargo"
              @input="fetchCandidatos(vagaSelected)"
            >
              <template slot="selection" slot-scope="{ values, search, isOpen }">
                <span
                  class="multiselect__single"
                  v-if="vagaSelected.length && !isOpen"
                >{{ vagaSelected.length }} selecionado</span>
              </template>
              {{vagaSelected.cargo}}
            </multiselect>
          </div>
        </div>
      </div>

      <div v-if="carregando == true">
        <h2 class="text-center">Carregando...</h2>
      </div>

      <div
        class="empty text-center"
        v-else-if="candidatos.length == 0  && vagaSelected.length != 0 && carregando == false"
      >
        <div class="text-block">
          <h1 class="sad-face">:/</h1>
          <h2>Oh, ainda não tem nenhum candidato</h2>
          <h3>calma, eles vão aparecer</h3>
        </div>
      </div>

      <div v-else-if="vagaSelected.length != 0">
        <h2 class="text-center page-welcome">Olá, {{empresa.nome}} veja o que encontramos</h2>

        <div class="select-vaga">
          <div class="mx-auto text-center">
            <h5>Filtre por vaga</h5>
            <multiselect
              :options="vagas"
              v-model="vagaSelected"
              :multiple="false"
              :close-on-select="true"
              :clear-on-select="true"
              :preserve-search="false"
              placeholder="Pesquise e adicione"
              label="cargo"
              track-by="cargo"
              @input="fetchCandidatos(vagaSelected)"
            >
              <template slot="selection" slot-scope="{ values, search, isOpen }">
                <span
                  class="multiselect__single"
                  v-if="vagaSelected.length && !isOpen"
                >{{ vagaSelected.length }} selecionado</span>
              </template>
              {{vagaSelected.cargo}}
            </multiselect>
          </div>
        </div>

        <v-container fill-height class="grey lighten-4">
          <v-layout row wrap justify-center>
            <div
              v-show="candidatos.length == 0  && vagaSelected.length != 0 && carregando == false"
            >tá zerado</div>

            <v-flex v-for="c in candidatos" :key="c.id">
              <div>
                <b-card-group deck class="mx-auto">
                  <b-card class="text-center shadow" tag="article">
                    <img v-if="c.imagem != null" class="card-img-top" v-bind:src="c.imagem">
                    <img v-else class="card-img-top" src="../assets/media/no-image.jpg">

                    <h1>{{c.nome}}</h1>
                    <p v-if="c.cargo != null" class="cargo sub">{{c.cargo}}</p>
                    <h5 class="porcentagem">{{c.porcentagem}} compatível</h5>
                    <p class="card-text mx-auto">{{c.descricao}}</p>
                    <!-- <b-link v-bind:to="`/candidatos/${c.id}`">Ver {{c.nome}}</b-link> -->
                    <b-link v-bind:to="`/candidatos/${c.id}/${vagaSelected.id}`">Ver {{c.nome}}</b-link>
                  </b-card>
                </b-card-group>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-content>
  </div>
</template>



<style scoped>

.porcentagem{
  color: #3acbc6; 
}

.select-vaga {
  display: flex;
  margin-bottom: 5%;
}

.multiselect {
  width: 35vw;
}

.v-content {
  padding-top: 19vh !important;
  margin-left: 5vw;
}

.sad-face {
  font-size: 100px;
  font-weight: 700 !important;
}

.text-block h2 {
  font-size: 40px;
  margin-bottom: auto !important;
}


h3 {
  font-family: "Roboto";
  font-weight: 200;
}

h2 {
  margin-bottom: 10vh;
}

.card {
  margin: 0px 10px 70px 10px;
  border-radius: 0% !important;
  min-width: 300px;
  max-width: 350px;
  height: 350px;
  box-shadow:none !important;
  border: none !important;
}

.card:hover{
   box-shadow: 0 8px 6px -6px #777 !important;
}

.card-text {
  width: 85%;
  margin: 5px;
}

p {
  margin-bottom: 2vh;
}

.cargo {
  color: grey;
}

.card-img-top {
  border-radius: 50%;
  margin: -25px auto;
  position: relative;
  width: 150px !important;
  height: 150px;
  bottom: 45px;
}

b-card-group {
  display: flex;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<script>
import "../assets/stylesheets/generic.css";
import axios from "axios";
import Multiselect from "vue-multiselect";
import Sidebar from "./sidebar/Sidebar.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Multiselect
  },
  data() {
    return {
      candidatos: [],
      empresa: [],
      vagaSelected: [],
      carregando: false
    };
  },

  computed: {
    vagas() {
      return this.$store.getters.fetchVagas;
    }
  },

  mounted() {
    this.fetchEmpresa();
    this.$store.dispatch("fetchVagas");
  },

  methods: {
    fetchCandidatos() {
      this.carregando = true;

      return axios({
        method: "get",
        url: "/empresas/vaga/" + this.vagaSelected.id + "/candidatos",

        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        }
      })
        .then(response => {
          console.log(response.data);
          this.candidatos = response.data;
          this.carregando = false;
        })
        .catch(error => {
          console.log(this.$store.getters.fetchToken);
          console.log(error.response.data);
        });
    },

    isEmpty() {
      if (this.candidatos.length < 1) {
        return true;
      }
    },

    async fetchEmpresa() {
      return axios({
        method: "get",
        url: "/empresas/" + this.$store.getters.fetchDecriptToken,
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        }
      })
        .then(response => {
          this.empresa = response.data;
        })
        .catch(() => {});
    }
  }
};
</script>

