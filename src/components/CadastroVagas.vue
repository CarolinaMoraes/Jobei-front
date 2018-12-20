<template>
  <div class="app">
    <sidebar/>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout row wrap justify-center>
          <div class="wrapping-around">
            <div class="left-profile">
              <div class="CadastroVagas">
                <div>
                  <!-- Botão pra voltar -->
                  <router-link to="vagas">
                    <p id="linhaBaixa">Voltar</p>
                  </router-link>
                </div>

                <!-- Titulo de apresentação -->
                <div class="text-title margin-txt">
                  <h1>Cadastro de Vagas</h1>
                </div>

                <div class="container text-center">
                  <div class="alert alert-info w-50" v-show="errinhos == true">
                    <span id="erro"></span>
                  </div>

                  <b-row>
                       <b-col sm="10">
                      <b-form-group
                        id="profissao"
                        horizontal
                        label="Cargo:"
                        :label-cols="2"
                        label-for="profissaoId"
                      >
                        <b-form-select v-model="cargo" class="mb-3">
                          <option hidden :value="null">Selecione um cargo</option>
                          <option v-for="item in listaCargos" :key="item.id">{{item.nome}}</option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>


             		<!-- <b-col sm="10">
                      <b-form-group
                        id="cargo"
                        horizontal
                        label-text-align="center"
                        :label-cols="2"
                        label="Cargo:"
                      >
                        <multiselect
                          :max="1"
                          id="select-box"
                          v-model="cargo"
                          :options="listaCargos"
                          :multiple="false"
                          :close-on-select="true"
                          :clear-on-select="true"
                          :preserve-search="true"
                          placeholder="Pesquise e adicione"
                          label="nome"
                          track-by="nome"
                        >
                          <template slot="selection" slot-scope="{ values, search, isOpen }">
                            <span
                              class="multiselect__single"
                              v-if="cargo.length && !isOpen"
                            >{{ cargo.length }} selecionados - Pesquise as habilidades</span>
                          </template>
                        </multiselect>
                      </b-form-group>
                    </b-col>

                    {{cargo}} -->


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
                          v-model="descricao"
                          placeholder="Descrição da vaga..."
                          :rows="3"
                          :max-rows="6"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>

                    <!-- HABILIDADES -->
                    <b-col sm="10">
                      <b-form-group
                        id="habilidades"
                        horizontal
                        label-text-align="center"
                        :label-cols="2"
                        label="Habilidades (máximo 5):"
                        label-for="skillsId"
                      >
                        <div>
                          <multiselect
                            :max="5"
                            id="select-box"
                            v-model="value"
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
                                v-if="values.length && !isOpen"
                              >{{ values.length }} selecionados - Pesquise as habilidades</span>
                            </template>
                          </multiselect>

                          <div
                            class="mt-3 mr-3 ml-3 btn btn-jobei"
                            v-for="item in value"
                            :key="item.nome"
                             >
                            {{ item.nome }}
                            <button
                              @click="removeItem(item, value)"
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
                          v-model="remuneracao"
                          placeholder="Remuneração da Vaga"
                          :rows="3"
                          :max-rows="100"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>

                    <b-col sm="6">
                      <b-form-group horizontal label-text-align="center" :label-cols="9">
                        <b-button
                          class="mt-2 btn btn-jobei-outline container"
                          type="submit"
                          @click="validate()"
                        >Cadastrar Vaga</b-button>
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
import "../assets/stylesheets/generic.css";
import Sidebar from "./sidebar/Sidebar.vue";
import Multiselect from "vue-multiselect";
import VueSweetalert2 from "vue-sweetalert2";
export default {
  name: "CadastroVagas",
  components: {
    Sidebar,
    Multiselect
  },
  data() {
    return {
      errinhos: false,
      cargo: null,
      descricao: "",
      remuneracao: "",
      selected: null,
      listaCargos: [],
      value: [],
      listaHabilidades: []
    };
  },

  mounted() {
    this.getHabilidades();
    this.getCargos();
    console.log(this.listaCargos);
  },

  methods: {
    showAlert() {
      this.$swal({
        type: "success",
        title: "OK!",
        text: "Cadastrado com sucesso!"
      });
    },
    submit() {
      return axios({
        method: "post",
        url: "/empresas/" + this.$store.getters.fetchDecriptToken + "/vagas",
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
        data: {
          descricao: this.descricao,
          habilidades: this.value,
          cargo: this.cargo,
          remuneracao: this.remuneracao
        }
      })
        .then(res => {
          this.showAlert();
          this.$router.push("/vagas");
        })
        .catch(err => {
          console.log(this.value);
          console.log("você errou aqui: " + err + " ó :");
          console.log(err.response.data);
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

    getCargos() {
      return axios({
        method: "get",
        url: "/cargos",
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        }
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
        this.descricao.length > 0 &&
        this.cargo != null &&
        this.value.length == 5
      ) {
        this.submit();
      } else if (this.descricao.length < 0) {
        this.errinhos = true;
        document.getElementById("erro").innerHTML = "Está faltando descrição";
      } else if (this.cargo == null) {
        this.errinhos = true;
        document.getElementById("erro").innerHTML = "Está faltando cargo";
      } else if (this.value.length != 5) {
        this.errinhos = true;
        document.getElementById("erro").innerHTML = "Selecione 5 Habilidades";
      }
    }
  }
};
</script>


<style scoped>
.espaco-botao {
  margin: auto 10px auto 5px;
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>