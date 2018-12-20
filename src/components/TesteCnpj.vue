<template>
  <div class="app">
    <div class="col-xs-0 col-sm-0 col-md-0 col-lg-2">AAAAAAAAAAAAAAAAAAAAA</div>
    <!-- <div>
          <h1>{{info.nome}}</h1>
            <div id="loading" class="lds-dual-ring" style="display: none;"></div>

          <div v-if="info != ''">
            <input type="text" id="cnpj" ref="cnpj" placeholder="cnpj" disabled/>
            <input type="text" id="nome" placeholder="nome" class="form-control" :value="info.nome"  />
            <input type="text" id="endereco" placeholder="endereco" class="form-control" :value="info.logradouro"  />
            <input type="text" id="estado" placeholder="estado" class="form-control" :value="info.uf" /> 

          </div>  
          

          <div v-else-if="info ==''">
            <input type="text" id="cnpj" @mouseout="validate" ref="cnpj" placeholder="cnpj"/>
            <input type="text" id="nome" placeholder="nome" class="form-control" disabled />
            <input type="text" id="endereco" placeholder="endereco" class="form-control" disabled/>
            <input type="text" id="estado" placeholder="estado" class="form-control" disabled/> 
              
    </div>-->
    <!-- </div> -->
    <!-- <div >
        <h1>teste de cep</h1>

        <div class="form-row">
            <div class="form-group col-md-5">
               <label for="cep">cep</label>
                <input type="text" id="cep" placeholder="cep" class="form-control" v-model="buscar"/>
            </div>

            <div class="form-group col-md-1">
               <label for="inputEmail4">número</label>
              <input type="text" id="numero" placeholder="numero" class="form-control" v-model="numero"/>
            </div>

          <div class="form-group col-auto my-5">
            <button  class="btn btn-outline-info" @click="fetchCep">buscar</button>
          </div>
        </div>
          

        <div class="form-group col-md-5">
            <label for="cep">endereço</label>
            <input type="text" id="endereco" placeholder="cep" :value="cep.logradouro + ', '+ numero" class="form-control" disabled/>
        </div>       
      </div>

        <div class="form-group col-md-5">
          <select name="estados" id="city" class="form-control" tabindex="12">
              <option v-for="(estado, key) in estados" 
            :value="key"
            :key="key">
            {{estado.nome}}
             </option>
          </select>
    </div>-->
    <!-- <div class="form-group col-md-5">
          
          <input class="form-control" placeholder="pesquise" v-model="trampo"/> <button class="btn btn-outline-info" @click="fetchTrampos">pesquisar</button>

          <select name="estados" id="city" class="form-control" tabindex="12">
              <option v-for="(trampo, key) in trampos" 
            :value="trampo.nome"
            :key="key">
            {{trampo.nome}}
             </option>
          </select>
    </div>-->
    <!-- <b-form-group label="Using sub-components:">
     <b-form-checkbox-group id="checkboxes2" name="flavour2" v-model="selected" :options="vaga.habilidades" >
      <b-form-checkbox v-for="h in vaga.habilidades" :key="h">{{h.nome}}</b-form-checkbox>
        </b-form-checkbox-group>
    </b-form-group>-->
    {{habilidades}}
    <b-form-group label="Using array:">
      <div v-for="habilidade in habilidades" :key="habilidade.nome">
        <b-form-checkbox :value="habilidade.nome">{{habilidade.nome}}</b-form-checkbox>
      </div>
    </b-form-group>

    <!-- <label for="file">
      <input type="file" name="file" ref="file" id="file" style="display:none;"/>
      <img src="../assets/media/add-foto.png"/>
    </label>-->
    <div>
      <label class="typo__label">Tagging</label>
      <multiselect
        v-model="value"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="code"
        :options="options"
        :multiple="true"
        :taggable="true"
        @tag="addTag"
      ></multiselect>
      <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>

    <b-button @click="showAlert4">CLICA EM MIM BARAIO</b-button>

    <input type="file" @change="onFileChange">

    <div id="preview">
      <img v-if="url" :src="url">
    </div>

    <a v-bind:href="urlFinal">teste</a>

    <b-button class="btn btn-link mt-auto">Enviar whatsapp</b-button>
    <!-- <a href="{{empresa.numero}}">
     
    </a>-->
    {{empresa.numero}}
    <radial-progress-bar
      stopColor="#3acbc6"
      startColor="#4dd6d0"
      :diameter="200"
      :completed-steps="70"
      innerStrokeColor
      :total-steps="100"
    >
      <p>{{empresa.nome}}%</p>
    </radial-progress-bar>

    <multiselect
      :max="5"
      id="select-box"
      v-model="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Pesquise e adicione"
      label="nome"
      track-by="nome"
    >
      <span slot="maxElements">Você já selecionou 5, para selecionar novamente remova um elemento</span>
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        <span
          class="multiselect__single"
          v-if="value.length && !isOpen"
        >{{ value.length }} selecionados - Pesquise as habilidades</span>
      </template>
    </multiselect>
  </div>
</template>

<style scoped>
input {
  display: block;
  margin-bottom: 5px;
  background-color: white;
  /* width: 70vw; */
  height: 50px;
}
</style>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import VueSweetalert2 from "vue-sweetalert2";
import RadialProgressBar from "vue-radial-progress";

export default {
  data() {
    return {
      completedSteps: 0,
      totalSteps: 10
    };
  },

  components: {
    Multiselect,
    RadialProgressBar
  },
  name: "TesteCnpj",
  data() {
    return {
      url: null,
      info: "",
      buscar: "",
      cep: "",
      numero: "",
      token: "",
      profissao: "",
      trampo: "",
      estados: [],
      trampos: [],
      empresa: [],
      urlPrimeira: "https://api.whatsapp.com/send?phone=",
      urlSegunda: "&text=Ol%C3%A1,%20meu%20amigo!#",
      urlFinal: "",

      selected: [],
      habilidades: [],

      value: [{ name: "Javascript", code: "js" }],
      options: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "React", code: "React" }
      ]
    };
  },

  mounted() {
    this.fetchEstados();
    this.fetchVaga();
    this.fetchEmpresa();
    this.chama();
    console.log(this.$store.getters.fetchDecriptToken);
  },

  methods: {
    chama() {
      alert(this.$route.path);
    },
    showAlert4() {
      // Use sweetalret2
      this.$swal({
        imageUrl: "https://i.imgur.com/PgsSxK6.png",
        imageWidth: 100,
        imageHeigth: 100,
        footer: "<a href>tela de apresentção</a>"
      });
    },

    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },

    fetchTrampos() {
      return axios({
        method: "get",
        url:
          "https://cors-anywhere.herokuapp.com/https://www.wportal.pt/api/profissoes/?key=" +
          this.trampo,

        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then(response => {
          this.trampos = response.data;
          console.log(this.trampos);
          console.log(response.data);
        })
        .catch(error => {
          console.log(
            "você errou aqui: " + error + " ó " + error.response.data
          );
          // jogar para um span - um warning de erro
        });
    },

    callCnpj() {
      var cnpjDigitado = this.$refs.cnpj.value;
      console.log("ele digitou issae:" + cnpjDigitado);
      document.getElementById("loading").style.display = "block";
      return cnpjDigitado;
    },

    validate() {
      var value = document.getElementById("cnpj").value.length;

      if (value == 14) {
        this.fetchInfo();
      }
      return null;
    },

    async fetchInfo() {
      return axios({
        method: "get",
        // url: "https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/06990590000123"
        url:
          "https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/" +
          this.callCnpj()
      })
        .then(response => {
          this.info = response.data;
          console.log("cheguei com a resposta rapazeada");
          document.getElementById("loading").style.display = "none";
        })
        .catch(error => {
          console.log(
            "você errou aqui: " + error + " ó " + error.response.data
          );
          // jogar para um span - um warning de erro
        });
    },

    async fetchCep(evt) {
      evt.preventDefault();
      return axios({
        method: "get",
        url:
          "https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/" +
          this.buscar +
          "/json/"
      })
        .then(response => {
          this.cep = response.data;
          console.log(this.cep);
          console.log(response.data);
          document.getElementById("loading").style.display = "none";
        })
        .catch(error => {
          console.log(
            "você errou aqui: " + error + " ó " + error.response.data
          );
          // jogar para um span - um warning de erro
        });
    },

    fetchEstados() {
      return axios({
        method: "get",
        url:
          "https://cors-anywhere.herokuapp.com/http://servicodados.ibge.gov.br/api/v1/localidades/estados",

        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then(response => {
          this.estados = response.data;
          // console.log(this.estados);
          // console.log(response.data);
        })
        .catch(error => {
          console.log(
            "você errou aqui: " + error + " ó " + error.response.data
          );
          // jogar para um span - um warning de erro
        });
    },

    async fetchVaga() {
      return axios({
        method: "get",

        url:
          `/empresas/` +
          this.$store.getters.fetchDecriptToken +
          `/vagas/bee958dc-053c-4efa-b023-da3c5688cdaf`
      })
        .then(response => {
          this.habilidades = response.data.habilidades;
        })
        .catch(() => {});
    },

    async fetchEmpresa() {
      return axios({
        method: "get",

        url: `/empresas/` + this.$store.getters.fetchDecriptToken
      })
        .then(response => {
          this.empresa = response.data;
          this.urlFinal =
            this.urlPrimeira + "55" + this.empresa.numero + this.urlSegunda;
          console.log(this.urlFinal);
        })
        .catch(() => {});
    },

    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.options.push(tag);
      this.value.push(tag);
    }
  }
};
</script>

<style scoped>
.progress {
}

.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #1ba296;
  border-color: #1ba296 transparent #1ba296 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>





