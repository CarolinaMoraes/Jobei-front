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
                <div class="containers">
                  <img
                    class="avatar"
                    id="preview"
                    v-if="empresa.imagem != ''"
                    :src="empresa.imagem"
                  >
                  <img id="preview" v-else src="../assets/media/add-foto.png">
                  <img id="arquivo">

                  <div>
                    <label for="file">
                      <input
                        type="file"
                        accept="image/*"
                        name="file"
                        id="file"
                        ref="file"
                        @change="handleFileUpload(); onFileChange()"
                      >
                    </label>

                  </div>
                </div>
                <div class="cabe-child">
                  <h1>{{empresa.nome}}</h1>
                  <p class="sub"></p>
                </div>
              </div>
              <hr>
              <!--form edit-->
              <b-row>
                <b-col sm="10">
                  <b-form-group label="CNPJ:" :label-cols="2" horizontal label-text-align="center">
                    <masked-input
                      maxlength="18"
                      mask="11 . 111 . 111 / 1111 - 11"
                      v-model="empresa.cnpj"
                      type="text"
                      class="form-control"
                      id="cnpj"
                      name="cnpj"
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="10">
                  <b-form-group
                    label="Endereço:"
                    :label-cols="2"
                    horizontal
                    label-text-align="center"
                  >
                    <b-form-input
                      type="text"
                      class="form-control"
                      id="endereco"
                      v-model="empresa.endereco"
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="10">
                  <b-form-group
                    label="Sobre a empresa:"
                    :label-cols="2"
                    horizontal
                    label-text-align="center"
                  >
                    <b-form-textarea
                      type="text"
                      :rows="6"
                      :max-rows="6"
                      id="sobre"
                      placeholder="Descreva o que fazem..."
                      v-model="empresa.descricao"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-col sm="10">
                <b-form-group
                  id="valores"
                  horizontal
                  label-text-align="center"
                  :label-cols="2"
                  label="Valores (máximo 5):"
                  label-for="skillsId"
                >
                  <div>
                    <multiselect
                      id="select-box"
                      v-model="valores"
                      :options="listaValores"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Pesquise e adicione"
                      :max="5"
                      label="nome"
                      track-by="nome"
                      :allow-empty="false"
                    >
                      <span
                        slot="maxElements"
                      >Você já selecionou 5, para selecionar novamente remova um elemento</span>
                      <template slot="selection" slot-scope="{ values, search, isOpen }">
                        <span
                          class="multiselect__single"
                          v-if="valores.length && !isOpen"
                        >{{ valores.length }} selecionados - Pesquise as habilidades</span>
                      </template>
                    </multiselect>

                    <div class="mt-3 mr-3 ml-3 btn btn-jobei" v-for="v in valores" :key="v.nome">
                      {{ v.nome }}
                      <button
                        @click="removeItem(v, valores)"
                        type="button"
                        class="close ml-1"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </b-form-group>
              </b-col>

              <hr>
              <div class="txt-center">
                <button
                  class="conclusion-button btn btn-jobei-outline mt-auto"
                  name="conclusion-button"
                  @click="editar()"
                >Está Pronto</button>
              </div>
            </div>
          </div>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>





<script>
import MaskedInput from "vue-masked-input";
import axios from "axios";
import Multiselect from "vue-multiselect";
import Sidebar from "./sidebar/Sidebar.vue";
import imagem from "../assets/media/editp.png";

export default {
  name: "PerfilEmpresaEdit",
  components: {
    Sidebar,
    MaskedInput,
    Multiselect
  },

  data() {
    return {
      imagem: imagem,
      empresa: [],
      listaValores: [],
      valores: [],
      file: "",
      imageEdit: "",
      url: null
    };
  },

  mounted() {
    this.getProfile();
    this.getListaValores();
  },

  methods: {
    async getProfile() {
      return axios({
        method: "get",
        url: "/empresas/" + this.$store.getters.fetchDecriptToken,
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
      })
        .then(response => {
          this.empresa = response.data;
          this.valores = response.data.valores;
        })
        .catch(error => {
          console.log("você errou aqui: " + error + " ó " + error.response.data);
        });
    },

    editar() {
      this.imageEdit = localStorage.getItem("avatarStored");

      if (localStorage.getItem("avatarStored") != null) {
        return axios({
          method: "put",
          url: "/empresas/" + this.$store.getters.fetchDecriptToken,
          headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
          },
          data: {
            cnpj: this.empresa.cnpj,
            nome: this.empresa.nome,
            descricao: this.empresa.descricao,
            endereco: this.empresa.endereco,
            imagem: this.imageEdit,
            valores: this.valores
          }
        })
          .then(response => {
            // this.showAlert();

            window.setTimeout(this.$router.push("/perfil"), 3000);
            window.setTimeout(window.location.reload(true), 5000);

            // window.location.reload(true);
          })
          .catch(() => {
            alert("você errou aqui: " + error + " ó " + error.response.data);
          });
      } else {
        return axios({
          method: "put",
          url: "/empresas/" + this.$store.getters.fetchDecriptToken,
          headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
         },
          data: {
            cnpj: this.empresa.cnpj,
            nome: this.empresa.nome,
            descricao: this.empresa.descricao,
            endereco: this.empresa.endereco,
            valores: this.valores
            // imagem: this.empresa.imagem
          }
        })
          .then(response => {
            this.$router.push("/perfil")
            window.location.reload(true);
          })
          .catch(() => {
            alert("você errou aqui: " + error + " ó " + error.response.data);
          });
      }
    },

    handleFileUpload() {
      var handle = document.getElementById("file");
      console.log(handle);

      if (this.$refs.file.files != null) {
        let reader = new FileReader();

        reader.onload = function(e) {
          var imageBase64 = "";
          imageBase64 = e.target.result;
          var preview = document.getElementById("arquivo");
          preview.src = imageBase64;
          document.getElementById("preview").style.display = "none";

          console.log(imageBase64);

          if (localStorage.getItem("avatarStored") != "") {
            localStorage.removeItem("avatarStored");
          }

          localStorage.setItem("avatarStored", imageBase64);
        };
        let file = this.$refs.file.files[0];
        reader.readAsDataURL(file);
      }
    },

    getListaValores() {
      return axios({
        method: "get",
        url: "/valores",
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        }
      })
        .then(response => {
          this.listaValores = response.data;
        })
        .catch(error => {
          console.log(
            "você errou aqui: " + error + " ó " + error.response.data
          );
        });
    },

    removeItem(item, array) {
      var index = array.indexOf(item);

      if (array[index].nome === item.nome) {
        array.splice(index, 1);
      } else {
        alert("oops");
      }
    }
  }
};
</script>




<style scoped>

#arquivo {
  width: 180px;
  height: 180px;
}
.v-content {
  padding-top: 10vh !important;
  margin-left: 5vw;
}
.wrapping-around {
  margin: auto;
  width: 70vw;
}

.cabe-child {
  padding-top: 2%;
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
  border-radius: 50%;
  width: 150px;
  transition: 0.4s ease;
  backface-visibility: hidden;
}

.containers {
  position: relative;
  width: 50%;
  margin: auto;
}

.imagep {
  width: 44%;
  height: 90px;
  margin-top: 74%;
}

.middle {
  transition: 0.1s ease;
  opacity: 0;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.containers:hover .avatar {
  opacity: 0.3;
  width: 29%;
  transition: 0.4s ease;
}

.containers:hover .middle {
  opacity: 1;
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

.profile {
  display: block;
}

.form-control {
  height: 45px;
}
.btn {
  margin: auto 39px;
  height: 40px;
  width: 160px;
}

@media screen and (max-width: 850px) {

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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>