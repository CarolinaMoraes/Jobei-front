    <template>
  <div class="app">
    <sidebar/>
    <v-content>
      
       <div v-if="carregando == true">
        <h2 class="text-center">Carregando...</h2>
      </div>


      <div class="empty text-center" v-else-if="matches.length == 0 && carregando == false">
        <div class="text-block">
          <h1 class="sad-face">:(</h1>
          <h2>Ainda não aconteceu nenhum match</h2>
          <h3>mas seja paciente, vai rolar</h3>
        </div>
      </div>

      <div v-else>
        <div lass="row">
          <!-- <div class="cabecalho row"> -->
          <h2 class="ml-3 vagas">Deu Match!</h2>
        </div>

        <v-container grid-list-xl fluid fill-height class="grey lighten-4">
          <v-layout row wrap>
            <v-flex xs11 v-for="(m, index) in matches" :key="index">
              <div class="card-group">
                <div class="card shadow">
                  <div class="card-body">
                    <img
                      v-if="m.candidato.imagem != null"
                      class="avatar"
                      v-bind:src="m.candidato.imagem"
                    >
                    <img v-else class="avatar" src="../assets/media/no-image.jpg">

                    <div class="card-info">
                      <h5 class="card-title">Você deu match com {{m.candidato.nome}}</h5>
                      <p class="text">A vaga oferecida foi "{{m.vaga.cargo}}"</p>
                    </div>

                    <div class="contato text-center">
                      <p>Entre em contato</p>

                      <div class="icons">
                        <a :href="`mailto:${m.candidato.email}`">
                          <img class="icon-contato" src="../assets/media/icon-email.svg">
                        </a>
                        
                        <a
                          v-show="m.candidato.celular != null"
                          @click="goToWhats(m.candidato.celular)"
                        >
                          <img class="icon-contato" src="../assets/media/icon-zap.svg">
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-content>
  </div>
</template>

<style scoped>
.text-block {
  margin-bottom: 5%;
}

.sad-face {
  font-size: 100px;
  font-weight: 700 !important;
}

.text-block h2 {
  font-size: 40px;
}

h3 {
  font-family: "Roboto";
  font-weight: 200;
}

.three-dots {
  float: right;
  /* margin-bottom: 10vh; */
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

  .text{
    display: none;
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
      matches: [],
      emprpesa: [],
      urlPrimeira: "https://web.whatsapp.com/send?phone=",
      urlSegunda: "&text=Ol%C3%A1,%20meu%20amigo!%20Demos%20Match!",
      urlFinal: "",
       carregando: true
    };
  },

  mounted() {
    this.getMatches();
    this.fetchEmpresa();
  },

  methods: {
    getMatches() {
      return axios({
        method: "get",
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
        url:
          "/curtidas/empresa/" +
          this.$store.getters.fetchDecriptToken +
          "/matches"
      })
        .then(response => {
          // todos os matches
          this.carregando = false;
          this.matches = response.data;
        })
        .catch(() => {});
    },

    fetchEmpresa() {
      return axios({
        method: "get",
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
        url: `/empresas/` + this.$store.getters.fetchDecriptToken
      })
        .then(response => {
          this.empresa = response.data;
        })
        .catch(() => {});
    },

    goToWhats(numero) {
      this.urlFinal = this.urlPrimeira + "55" + numero + this.urlSegunda;
      var win = window.open(this.urlFinal, "_blank");
      win.focus();
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 130px !important;
  height: 130px;
  border-radius: 50%;
  vertical-align: middle;
}

.card-body {
  display: flex;
  align-items: center;
}

.card-info {
  margin-left: 2vw;
  width: auto;
}

.icon-contato {
  width: 40px;
}

.card-text {
  word-wrap: break-word !important;
}

.card {
  max-width: 100%;
}

.icons {
  display: flex;
}

.contato {
  margin-left: auto;
}

a {
  flex: 1;
}

@media screen and (max-width: 850px) {
 .avatar{
   width: 100px !important;
   height: 100px !important;
 }
}
</style>
