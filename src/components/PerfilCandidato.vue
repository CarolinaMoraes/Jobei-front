<template>
  <div class="app">
    <sidebar/>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout row wrap>
          <div class="wrapping-around">
            <!--Cabecalho -->
            <div class="cabecalho">
              <div class="img-text">
                <img
                  v-if="candidato.imagem != null"
                  class="card-img-top avatar"
                  v-bind:src="candidato.imagem"
                >
                <img v-else class="card-img-top avatar" src="../assets/media/no-image.jpg">
                <div class="cabe-child">
                  <h1>{{candidato.nome}}</h1>
                  <p>{{candidato.cargo}}</p>
                </div>
              </div>

              <radial-progress-bar
                stopColor="#3acbc6"
                startColor="#4dd6d0"
                :diameter="150"
                :completed-steps="porcentagem"
                innerStrokeColor
                :total-steps="100"
              >
                <h3>{{candidato.porcentagem}}</h3>
                <p>compatível</p>
              </radial-progress-bar>
            </div>
            <hr>

            <!--texto: Sobre e Localização-->
            <div class="text-block">
              <h2>Sobre o Candidato</h2>
              <h4>{{candidato.descricao}}</h4>
            </div>

            <div class="text-center" v-if="vagas == ''">
              <h4>Opa, você ainda não cadastrou nenhuma vaga, aproveite para cadastrar agora</h4>
              <b-btn class="btn-info" v-bind:to="{name: 'CadastroVagas'}">Adicionar Vaga</b-btn>
            </div>

            <div v-else>
              <div class="table-group row">
                <div class="table-group box">
                  <div class="valores">
                    <div class="text-block">
                      <h2>Valores</h2>
                    </div>
                    <div
                      v-for="v in candidato.valores"
                      :key="v.value"
                      class="btn btn-jobei mt-1 mb-2"
                    >{{ v.nome }}</div>
                  </div>
                  <div class="habilidades">
                    <div class="text-block">
                      <h2>Habilidades</h2>
                    </div>
                    <div
                      v-for="h in candidato.habilidades"
                      :key="h.value"
                      class="btn btn-jobei mr-9 mb-2"
                    >{{ h.nome }}</div>
                  </div>
                </div>
              </div>
              <div v-show="listaOn === false" class="oferecer-job text-center">
                <br>
                <b-btn
                  class="mt-2 btn btn-jobei-outline w-25"
                  @click="listaOn = true; erroCurtidaRepetida = false"
                >Ofertar Job</b-btn>
              </div>

              <div v-show="listaOn === true" class="text-center mt-3">
                <select class="form-control col-sm-5 mx-auto my-2" v-model="selected">
                  <option disabled value selected hidden>Selecione uma Vaga</option>

                  <option v-for="vaga in vagas" :key="vaga.id" :value="vaga.id">{{vaga.cargo}}</option>
                </select>

                <div class="oferecer-job text-center">
                  <div class="btn btn-jobei-outline w-25" @click="submit()">Confirmar</div>
                </div>
              </div>
            </div>

            <div
              class="alert alert-info text-center mt-3 col-lg-6"
              v-show="erroCurtidaRepetida === true"
            >
              <p>Parece que você já ofereceu essa vaga para esse candidato :/</p>
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
import RadialProgressBar from "vue-radial-progress";

export default {
  name: "PerfilCandidato",
  components: {
    Sidebar,
    RadialProgressBar
  },

  data() {
    return {
      candidato: [],
      listaOn: false,
      totalSteps: 100,
      erroCurtidaRepetida: false,
      selected: "",
      porcentagem: ""
    };
  },

  computed: {
    vagas() {
      return this.$store.getters.fetchVagas;
    }
  },

  mounted() {
    this.$store.dispatch("fetchVagas");
    this.getProfile();
  },

  methods: {
    async getProfile() {

      return axios({
        method: "get",
        // url: `/empresas/candidato/${this.$route.params.idCandidato}`,
        url: `/empresas/vaga/${this.$route.params.idVaga}/candidatos/${this.$route.params.idCandidato}`,
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        }
      })
        .then(response => {
          this.candidato = response.data;
          this.porcentagem = this.candidato.porcentagem.replace("%", "");
        })
        .catch(error => {
          console.log("erro: " + error.response);
        });
    },

    submit() {
      return axios({
        method: "post",
        url: "/curtidas/empresa",
        data: {
          idCandidato: this.$route.params.id,
          idVaga: this.selected,
          vagaCurtiu: true
        }
      })
        .then(res => {
          this.showAlert();
          this.$router.push("/dash");
        })
        .catch(err => {
          if (err.response.status == 422) {
            this.erroCurtidaRepetida = true;
            this.listaOn = false;
          } else if (err.response.status == 400) {
            this.showAlertError();
            this.$router.push("/dash");
          }

          console.log(err.response.status);
          console.log("você errou aqui: " + err + " ó " + err.response.data);
        });
    },

    showAlert() {
      this.$swal({
        type: "success",
        title: "OK!",
        text: "Job ofertado!"
      });
    },

    showAlertError() {
      this.$swal({
        type: "error",
        title: "Ops!",
        text: "Esse candidato não existe mais :/"
      });
    }
  }
};
</script>




<style scoped>
.img-text{
  display: block;
  margin-left: 10%;
}

.v-content {
  padding-top: 19vh !important;
  margin-left: 5vw;
}
.wrapping-around{
    margin: 0px auto;
    width: 100%;
    
}

hr{
  width: 85%;
  margin: 2vw auto;  
}

h2{
  font-weight: 300;
}

/*topo*/
.cabecalho {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.radial-progress-container{
  margin-top: 10px;
  margin-bottom: auto;
}



.avatar {
  margin-bottom: 25px;
  border-radius: 50%;
  width: 150px;
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




.btn {  
    width: 65%;
    margin: auto;  
    display: block;
    text-align: center;
    border: none;
}

.habilidades{
 margin-left: 4%;
  width: 40%;
 
}

.valores{   
  margin-left: 8%;
  width: 40%;
}

.table-group {
  display: flex;
  width: 100%;
  text-align:center;
}
@media screen and (max-width: 850px) {

  .img-text{
    margin-left: auto;
    margin-right: auto;
  }

  .radial-progress-container{
  margin-left: auto;
  margin-right: auto;
  }

  .cabecalho {
    display: block;
    text-align: center;
    margin-bottom: 5vw;
  }
  h4 {
    font-size: 20px;
  }

  .right-profile{
    text-align: center;
    margin: 50px auto;
  }

  .wrapping-around{
    display: block;
  }

}

@media screen and (max-width: 550px) {
.table-group {
  display: block;
  width: 100vw;
  text-align:center;
  margin-left: 10%;
}

.btn{
  text-align: center;
  width: 100%;
}



}
</style>


