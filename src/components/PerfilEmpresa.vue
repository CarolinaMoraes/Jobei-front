<template>
  <div class="app">
    <sidebar/>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout row wrap>
          <div class="wrapping-around">
            <div class="profile">
              <!--Cabecalho -->
              <div class="cabecalho">
                <img class="avatar" v-if="empresa.imagem != null" :src="empresa.imagem">
                <img class="avatar" v-else src="../assets/media/no-image.jpg">

                <div class="cabe-child">
                  <h1>{{empresa.nome}}</h1>
                  <p class="sub"></p>
                </div>

                <div class="dropdown three-dots">
                  <a data-toggle="dropdown" href="#">
                    <img src="../assets/media/dots.png">
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <router-link
                      class="dropdown-item"
                      v-bind:to="{name: 'PerfilEmpresaEdit'}"
                    >Editar Perfil</router-link>
                    <router-link
                      class="dropdown-item"
                      v-bind:to="{name: 'AlterarSenha'}"
                    >Alterar Senha</router-link>
                  </div>
                </div>

                <hr>
              </div>
              <!--texto: Sobre e Localização-->
              <div class="text-block">
                <h2>Sobre a Empresa</h2>
                <h4>{{empresa.descricao}}</h4>
              </div>
              <div class="text-block">
                <h2>Localizado em</h2>
                <h4>{{empresa.endereco}}</h4>
              </div>
              <hr>
            </div>
            <!--Valores: Botões-->
            <div class="valores text-center">
              <h2>Valores</h2>
              <div
                v-for="v in empresa.valores"
                :key="v.value"
                class="btn btn-jobei"
              >{{ v.nome }}</div>
            </div>
          </div>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>




<script>
import axios from "axios";
import "../assets/stylesheets/generic.css";
import Sidebar from "./sidebar/Sidebar.vue";

export default {
  name: "PerfilEmpresa",
  components: {
    Sidebar
  },

  data() {
    return {
      empresa: []
    };
  },

  mounted() {
    this.getProfile();
  },

  methods: {
    async getProfile() {
      return axios({
        method: "get",
        url: "/empresas/" + this.$store.getters.fetchDecriptToken,
          headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        }
      })
        .then(response => {
          this.empresa = response.data;

          console.log(this.empresa.valores.value);
        })
        .catch(() => {});
    }
  }
};
</script>




<style scoped>
.v-content {
  padding-top: 19vh !important;
  margin-left: 5vw;
}
.wrapping-around {
  margin: 0px auto;
  width: 100%;
}

hr {
  width: 85%;
  margin: 2vw auto;
}

h2 {
  font-weight: 300;
}

/*topo*/
.cabecalho {
  display: block;
  text-align: center;
}

.avatar {
  margin-bottom: 25px;
  border-radius: 50%;
}

.three-dots {
  position: absolute;
  left: 85%;
  top: 5%;
}

.three-dots img {
  height: 20px !important;
  width: 20px !important;
}

/*meio*/
.text-block {
  margin: 0px auto 50px;
  width: 80%;
  text-align: center;
}
.profile {
  display: block;
}

/*meio-fim*/
.valores {
  display: block;
}

.btn {
  margin: 20px;
  /* height: 45px; */
}

.btn-group {
  margin: auto;
}

@media screen and (max-width: 850px) {
  video {
    width: 300px;
  }

  .cabecalho {
    display: block;
    text-align: center;
    margin-bottom: 5vw;
  }
  h4 {
    font-size: 20px;
  }

  .right-profile {
    text-align: center;
    margin: 50px auto;
  }

  .wrapping-around {
    display: block;
  }
}
</style>


