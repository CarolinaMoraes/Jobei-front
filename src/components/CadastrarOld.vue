<template>
   <div>
      <header-navigation/>
      <div class="text-title">
         <h1>Vamos começar!</h1>
         <p>Queremos conhecer você melhor! Mas não se preocupe, você pode alterar os dados depois</p>
      </div>
      <v-stepper v-model="e1">
         <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Primeira Fase</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Segunda Fase</v-stepper-step>
            <v-divider></v-divider>
         </v-stepper-header>
         <v-stepper-items>
            <!--Primeira Fase-->
            <v-stepper-content class="step1" step="1">
               <!-- <form  class="form-group row"> -->
               <div class="form-group row">
                  <label for="email" class="col-sm-2 col-form-label">Email:</label>
                  <div class="col-sm-8">
                     <input type="email" class="form-control" maxlength="120" id="email" placeholder="Email"  v-model="email">
                  </div>
               </div>
               <hr>
               <div class="form-group row">
                  <label for="senha" class="col-sm-2 col-form-label">Senha:</label>
                  <div class="col-sm-8">
                     <input type="password" minlength="6" maxlength="18" class="form-control" id="senha" placeholder="Senha" v-model="senha">
                  </div>
               </div>
               <hr>


                <button v-if="email.length>0 && senha.length>0"
                  name="step-btn"
                  class="btn btn-outline-info mt-auto"
                  @click="nextStep(1)"
                  color="primary"
                  >
               Continuar
               </button>

               <button v-else
                  name="step-btn"
                  class="btn btn-info disabled mt-auto"
                  >
               Continuar
               </button>
            </v-stepper-content>




            <!--Segunda Fase-->
            <v-stepper-content step="2">
               <div class="upper-register">
                   <div class="add-arq">
                   <label for="file">
                        <input type="file" accept="image/*"  name="file" id="file" ref="file" style="display:none;" @change="handleFileUpload()"/>
                         <img v-show="isImagem == false" id="avatar-display" src="../assets/media/add-foto.png"/>

                         <img id="arquivo"/>
                         <p>Adicione uma foto</p>
                  </label>
                   </div>         

                  <div class="form-group row">
                     <label class="col-sm-1 col-form-label">CNPJ:</label>
                     <div class="col-sm-4">
                        <masked-input maxlength="18" mask="11 . 111 . 111 / 1111 - 11"  placeholder="CNPJ" type="text" class="form-control " id="cnpj"  name="cnpj" v-model="cnpj"/>
                     </div>
                     <hr>
                     <label class="col-sm-1 col-form-label">Nome:</label>
                     <div class="col-sm-4">
                        <input  type="text" placeholder="Nome Comercial ou Fantasia" class="form-control" id="nome" name="nome" v-model="nome">
                     </div>
                     <hr>  

                      <label class="col-sm-1 col-form-label">Celular: </label>
                     <div class="col-sm-4 my-auto">
                        <masked-input maxlength="14" mask="(11) 11111 - 1111"  placeholder="Número de celular" v-model="telefone" type="text" class="form-control" id="telefone" name="telefone"/>
                     </div> 
                     <hr>

                    <label class= "confirmsenha col-sm-1 col-form-label my-auto">CEP:</label>
                    
                     <div class="col-sm-3 my-auto">
                        <masked-input maxlength="9" mask="11111 - 111"  placeholder="CEP" type="text" class="form-control" id="cep" name="cep" v-model="buscar"/>
                     </div>                     

                      <label class= "confirmsenha col-form-label my-auto">Nº:</label>
                     <div class="col-sm-1 my-auto">
                        <input type="text" maxlength="4" class="form-control" id="cpwd" name="numero" v-model="numero">
                     </div>

                    <div class="col-md-1">
                      <button class="btn btn-outline-info my-auto" @click="fetchCep">buscar</button>
                    </div> 

                    <hr>

                          <label v-show="cep != ''" class="col-sm-1 col-form-label" for="endereco">Endereço:</label>
                           <div v-show="cep != ''" class="col-md-4">
                          
                          <input  type="text" id="endereco" placeholder="cep" 
                          :value="cep.logradouro 
                          +', ' 
                          + numero 
                          + ' - '
                          + cep.localidade
                          +', ' 
                          + cep.uf"
                           
                          class="form-control" disabled/>
                          </div>       

                     





                  </div>
               </div>
               <hr>
               <!--Descrição empresa-->
               <div class="descreva-empresa txt-center">
                  <div class="form-group">
                     <h2> Descreva brevemente a sua empresa</h2>
                     <textarea placeholder="Nos diga o que vocês fazem ;)" class="form-control area" rows="5" maxlength="300" v-model="descricao"></textarea>
                  </div>
               </div>
               <hr>
               <!--Valores-->
               <div class="valores text-center">
                  <h2>Valores da empresa</h2>
                  <p>Escolha 5 valores</p>

                   <b-col sm="10">   
                        <b-form-group 
                          id="valores" 
                          horizontal
                          label-text-align="center" 
                          :label-cols="2"
                          label="Valores (máximo 5):" 
                          label-for="valoresId">

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
                           <span slot="maxElements">Você já selecionou 5, para selecionar novamente remova um elemento</span>
                        <template slot="selection" 
                        slot-scope="{ values, search, isOpen }"
                        >
                        <span class="multiselect__single" 
                        v-if="valores.length && !isOpen">
                        {{ valores.length }} selecionados - Pesquise as habilidades</span>
                        </template>
                        </multiselect>
                          
                                 <div class="mt-3 mr-3 ml-3 btn btn-info" v-for="v in valores" :key="v.nome">
                                {{ v.nome }}
                                <button @click="removeItem(v, valores)" type="button" class="close ml-3" aria-label="Close"><span aria-hidden="true">&times;</span>
                                </button>
                                 </div>
                       
                      </div>
                          </b-form-group>
                        </b-col>  

               </div>
               <hr>
               <!--Botões-->
               <div class="btns">
                  <button 
                     class="btn btn-link mt-auto" 
                     type="submit"
                     @click="e1 = 1">Voltar
                  </button>

                  <button 
                     class="conclusion-button btn btn-outline-info mt-auto"
                     name="conclusion-button"
                     @click="validate()"
                     type="submit"
                     >
                     Está Pronto
                  </button>
               </div>
            </v-stepper-content>
         </v-stepper-items>
      </v-stepper>
   </div>
</template>






<script>
import axios from "axios";
import MaskedInput from "vue-masked-input";
import Multiselect from "vue-multiselect";
import HeaderNavigation from "./navbar/HeaderNavigation.vue";
import "../assets/stylesheets/generic.css";

export default {
  name: "Cadastrar",
  components: {
    MaskedInput,
    HeaderNavigation,
    Multiselect
  },
  data() {
    return {
      isImagem: false,
      imagemUser: '',
      counter: 0,
      e1: 1,
      steps: 2,
      email: "",
      senha: "",
      nome: "",
      descricao: "",
      cnpj: "",
      buscar: "",
      cep: "",
      numero: "",
      file: "",
      telefone:'',
      telefoneFormatado: null,
      cnpjFormatado:null,
      valores: [],
      listaValores:[]
    };
  },

  isValid1: function() {
    return this.email !== "" && this.senha !== "";
  },
  isValid2: function() {
    return (
      this.nome !== "" &&
      this.cnpj !== "" &&
      this.cep !== "" &&
      this.numero !== "" &&
      this.descricao !== "" &&
      this.exampleFormControlSelect1 !== ""
    );
  },

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },

  mounted(){
    this.getListaValores();
  },

  methods: {
    
    //passador de página
    nextStep(n) {
      console.log('ei')
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },

    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    },

      getListaValores(){
      return axios({
        method: 'get',
        url:'/valores',
      })
        .then(response => {
          this.listaValores = response.data;

        })
        .catch(error => {
          console.log("você errou aqui: " + error + " ó " + error.response.data);
        });
    },

      showAlert(){
      this.$swal({
      type: 'success',
      title: 'OK!',
      text: 'Cadastrado com sucesso!',
         })
       },

    handleFileUpload() {
      if (this.$refs.file.files != null) {
        let reader = new FileReader();
        
        reader.onload = function(e) {
          
          var imageBase64 = "";
          imageBase64 = e.target.result;
          var preview = document.getElementById("arquivo");
          preview.src = imageBase64;
          document.getElementById("avatar-display").style.display="none";

          this.isImagem = true;
          
           if(localStorage.getItem('imagemArmazenada') != ''){
            localStorage.removeItem('imagemArmazenada');
          }

          localStorage.setItem('imagemArmazenada', imageBase64);
          this.imagemUser = imageBase64;
          console.log(this.imagemUser);
        };

        reader.readAsDataURL(this.$refs.file.files[0]);
      }
    },

    //cadastrando a empresa
    submit() {
      
      console.log(this.telefoneFormatado);
      
      this.imagemUser = localStorage.getItem('imagemArmazenada');
      localStorage.removeItem('imagemArmazenada');
      localStorage.removeItem('avatarStored');
      console.log(this.imagemUser);

      return axios({
        method: 'post',
        url:
        '/empresas',
          data: {
          email: this.email,
          senha: this.senha,
          nome: this.nome,
          cnpj: this.cnpjFormatado,
          endereco: document.getElementById('endereco').value,
          descricao: this.descricao,
          valores: this.valores,
          imagem: this.imagemUser,
          numero: this.telefoneFormatado
        },

      })
        .then(res => {
          this.showAlert();
          
          this.$router.push("/login");
        })
        .catch(err => {
          console.log("você errou aqui: " + err + " ó "+ err.response.data);
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

    validate(){
      alert("nois quebrada");
      this.telefoneFormatado = this.telefone.replace(/[^a-zA-Z0-9]/g, "");
      this.cnpjFormatado = this.cnpj.replace(/\D+/g, "");
      this.submit();
    },


    async fetchCep(evt) {
      evt.preventDefault();

      var buscaCep = this.buscar.replace(/\D+/g, "");

      //busca o endereço pelo CEP
      return axios({
        method: "get",
        url:
          "https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/" +
          buscaCep +
          "/json/"
      })
        .then(response => {
          if(response.data.logradouro == ""){
            alert("bitch that's innacurate");
          }
          this.cep = response.data;
        })
        .catch(error => {
          console.log(
            "você errou aqui: " + error + " ó " + error.response.data
          );
          console.log(this.buscar);

          this.erroCep = true;
        });
    }
  }
};

</script>

<style scoped>
.v-stepper,
.v-stepper__header {
  box-shadow: none !important;
}
.upper-register {
  display: flex;
  text-align: center;
}

.add-arq {
  border: solid;
  border-style: dashed;
  padding: 30px 50px;
  margin: auto 10vw;
}

.add-arq img {
  width: 130px;
}

.valores select {
  width: 25vw;
  margin: auto;
}

.area {
  width: 75vw;
  margin: auto;
}

h2 {
  font-weight: 300;
}

.text-title h1 {
  text-align: center;
  font-size: 60px;
  margin-top: 15px;
}

.text-title p {
  text-align: center;
  font-size: 30px;
}

.v-stepper {
  font-family: "Roboto";
  font-weight: 100;
}

.step1 {
  padding: 5vh 10vw;
  height: 59vh;
}
.v-stepper__step__step {
  color: black;
}

.v-stepper__header {
  box-shadow: none !important;
}

input {
  height: 45px;
}

.form-group {
  margin: 3vh 10px 0px;
}

.next {
  text-align: left;
  margin-left: 5vw;
  font-size: 20px;
}

.next img {
  width: 7px !important;
  margin-left: 2px;
}

hr {
  width: 100vw;
}

.theme--light.v-stepper {
  background-color: #f5f5f5;
}

.conclusion-button {
  float: right;
}

@media screen and (max-width: 850px) {
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
    height: 45px;
    /* margin: 3vh 40px 0px; */
  }

  .upper-register {
    display: block;
  }

  h2 {
    font-size: medium;
  }

  .btn {
    width: 150px;
  }
}

@media screen and (max-width: 300px) {
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
    height: 45px;
    margin: 0px;
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>