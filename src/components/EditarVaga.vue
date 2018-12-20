<template>
  <div class="app">
    <sidebar/>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout row wrap justify-center>
          <div class="wrapping-around">
            <div class="left-profile">
              <div class="EditarVaga">
                <div>
                  <!-- Botão pra voltar -->
                  <router-link to="/vagas">
                    <p id="linhaBaixa">Voltar</p>
                  </router-link>
                </div>
                <!-- Titulo de apresentação -->
                <div class="text-title margin-txt">
                  <h1>Editar Vaga</h1>
                </div>
                <div class="container text-center">
                  <div
                    v-for="(erro, index) in errinhos"
                    :key="index"
                    class="alert alert-info w-50"
                    v-show="errinhos != null"
                  >
                    <span id="erro">{{erro}}</span>
                  </div>

                  <!-- {{vaga.cargo}} -->
                  <b-row>
                    <b-col sm="10">
                      <b-form-group
                        id="cargo"
                        horizontal
                        label="Cargo:"
                        :label-cols="2"
                        label-for="cargoId"
                      >
                        <b-form-select v-model="vaga.cargo" class="mb-3">
                          <!-- <option hidden :value="null">Selecione um cargo</option> -->
                          <option v-for="item in listaCargos" :key="item.id">{{item.nome}}</option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>

                    <b-col sm="10">
                      <b-form-group
                        id="descricao"
                        horizontal
                        label-text-align="center"
                        :label-cols="2"
                        label="Descrição:"
                        label-for="descricaoId"
                      >
                        <b-form-textarea
                          id="descricao"
                          v-model="vaga.descricao"
                          placeholder="Descrição da vaga..."
                          :rows="3"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>
                    <b-col sm="10">
                      <b-form-group
                        id="skills"
                        horizontal
                        label-text-align="center"
                        :label-cols="2"
                        label="Skills (máximo 5):"
                        label-for="skillsId"
                      >
                        <div>
                          <multiselect
                            :max="5"
                            id="select-box"
                            v-model="vaga.habilidades"
                            :options="listaHabilidades"
                            :multiple="true"
                            :close-on-select="false"
                            :clear-on-select="false"
                            :preserve-search="true"
                            placeholder="Pesquise e adicione"
                            label="nome"
                            track-by="nome"
                          >
                            <span
                              slot="maxElements"
                            >Você já selecionou 5, para selecionar novamente remova um elemento</span>
                            <template slot="selection" slot-scope="{ values, search, isOpen }">
                              <span
                                class="multiselect__single"
                                v-if="vaga.habilidades.length && !isOpen"
                              >{{ vaga.habilidades.length }} selecionados - Pesquise as habilidades</span>
                            </template>
                          </multiselect>

                          <div
                            class="mt-3 mr-3 ml-3 btn btn-info"
                            v-for="item in vaga.habilidades"
                            :key="item.nome"
                          >
                            {{ item.nome }}
                            <button
                              @click="removeItem(item, vaga.habilidades)"
                              type="button"
                              class="close ml-3"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col sm="10">
                      <b-form-group
                        id="remuneracao"
                        horizontal
                        label-text-align="center"
                        :label-cols="2"
                        label="Remuneração:"
                        label-for="remuneracaoId"
                      >
                        <b-form-textarea
                          id="remuneracao"
                          v-model="vaga.remuneracao"
                          placeholder="Remuneração da Vaga"
                          :rows="3"
                          :max-rows="100"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group horizontal label-text-align="center" :label-cols="9">
                        <b-button
                          class="mt-2 btn btn-outline-info container"
                          type="submit"
                          @click="validate"
                        >Editar Vaga</b-button>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </div>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>








<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import "../assets/stylesheets/generic.css";
import Sidebar from "./sidebar/Sidebar.vue";
export default {
  name: "EditarVaga",
  components: {
    Sidebar,
    Multiselect
  },
  data() {
    return {
      vaga: {
        cargo: null,
        remuneracao: "",
        descricao: "",
        habilidades: []
      },

      errinhos: [],
      selected: null,
      listaCargos: [],
      listaHabilidades: [],
      value: []
    };
  },

  mounted() {
    this.getVaga();
    this.getCargos();
    this.getHabilidades();
    console.log(this.vaga);
  },

  methods: {
    getVaga() {
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
        .catch(error => {
          alert("deu erado");
        });
    },

    getHabilidades() {
      return axios({
        method: "get",
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
        url: "/habilidades"
      })
        .then(response => {
          this.listaHabilidades = response.data;
        })
        .catch(error => {
          console.log(error.response);
        });
    },

    edit() {
      return axios({
        method: "put",
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
        url:
          `/empresas/` +
          this.$store.getters.fetchDecriptToken +
          `/vagas/${this.$route.params.id}`,
        data: {
          remuneracao: this.vaga.remuneracao,
          cargo: this.vaga.cargo,
          descricao: this.vaga.descricao,
          habilidades: this.vaga.habilidades
        }
      })
        .then(res => {
          this.showAlert();
          this.$router.push("/vagas");
        })
        .catch(err => {
          console.log("você errou aqui: " + err + " ó " + err.response.data);
        });
    },

    showAlert() {
      this.$swal({
        type: "success",
        title: "OK!",
        text: "Editado com sucesso!"
      });
    },

    removeItem(item, array) {
      var index = array.indexOf(item);

      if (array[index].nome === item.nome) {
        array.splice(index, 1);
      } else {
        alert("oops");
      }
    },

    getCargos() {
      return axios({
        method: "get",
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
        url: "/cargos"
      })
        .then(response => {
          this.listaCargos = response.data;
          console.log(this.listaCargos);
        })
        .catch(error => {
          console.log(error.response);
        });
    },

    validate() {
      if (
        this.vaga.descricao.length >= 5 &&
        this.vaga.cargo != null &&
        this.vaga.habilidades.length == 5
      ) {
        this.edit();
      } else if (this.vaga.descricao.length < 5) {
        this.errinhos.push("A descrição é muito curta ou inexistente");
        // document.getElementById("erro").innerHTML="A descrição é muito curta ou inexistente";
      } else if (this.vaga.cargo == null) {
        this.errinhos.push("Está faltando cargo");
        // document.getElementById("erro").innerHTML="Está faltando cargo";
      } else if (this.vaga.habilidades.length != 5) {
        this.errinhos.push("Selecione 5 Habilidades");
        // document.getElementById("erro").innerHTML="Selecione 5 Habilidades";
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
textarea {
  height: auto !important;
}

#linhaBaixa {
  color: #1ba298 !important;
  font-size: 15px !important;
  margin-left: 10px;
}

.form-control {
  height: 45px;
}

.left-profile {
  width: 100%;
}

.btn {
  width: auto;
}

.v-content {
  padding-top: 10vh !important;
  margin-left: 5vw;
}
.margin-select {
  margin-top: 25px;
}
.margin-desc {
  margin-left: 200px;
}
.margin-btn {
  margin-top: 10px;
  margin-bottom: 15px;
}
.margin-center {
  margin: inherit;
}
.text-title h1 {
  text-align: center;
  font-size: 60px;
}

.text-title p {
  text-align: center;
  font-size: 30px;
}

.linha {
  white-space: nowrap;
}

hr {
  width: 100vw;
}

@media screen and (max-width: 850px) {
  .container {
    display: block;
  }

  .text-title h1 {
    text-align: center;
    font-size: 40px;
    margin-top: 15px;
  }

  .text-title p {
    text-align: center;
    font-size: 20px;
  }

  .form-control {
    margin-left: 5vw;
  }
}

@media screen and (max-width: 575px) {
  .text-title h1 {
    text-align: center;
    font-size: 40px;
    margin-top: 15px;
  }

  .text-title p {
    text-align: center;
    font-size: 20px;
  }
}
</style>