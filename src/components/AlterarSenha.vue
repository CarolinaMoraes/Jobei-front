<template>
   <div>
      <sidebar/>
       <v-content>
      <div class="text-title">
         <h1>Alterar senha</h1>
         <p>Para alterar a senha precisamos que você digite a senha atual e a nova</p>
          <hr>
      </div>

      <div class = "text-center">        
        <b-row>
          <b-col sm="10" class="margin-select">
            
        <div v-for="(erro, index) in erros.SenhaAtual" :key="index" class="alert alert-info w-50" v-show="erros.SenhaAtual.length > 0">
              <span id="erro">{{erro}}</span>
          </div>

            <b-form-group 
            horizontal
            label="Senha Atual"
            :label-cols="5"
            >
              <b-form-input @click="erros.SenhaAtual.length = 0" v-model="senhaAtual" :type="passwordFieldType" class="form-control "/>
            </b-form-group>
          </b-col>  

           <b-col sm="10" class="margin-select">

          <div v-for="(erro, index) in erros.SenhaNova" :key="index" class="mx-auto alert alert-info w-50" v-show="erros.SenhaNova != ''">
              <span id="erro">{{erro}}</span>
          </div>

            <b-form-group 
            horizontal=""
            label="Senha Nova"
            :label-cols="5"
            >
        
        <b-form-input v-model="senhaNova" :type="passwordFieldType" class="form-control"/>

          <button class="col-md-2" type="password" @click="switchVisibility"><b-badge variant="dark">Mostrar</b-badge></button>
            </b-form-group>
          </b-col>
        </b-row>
             
            <b-btn class=" btn-jobei-outline mt-auto" @click="submit()">Trocar</b-btn>
      </div>
       </v-content>
   </div>
</template>



<script>
import "../assets/stylesheets/generic.css";
import axios from "axios";
import Sidebar from "./sidebar/Sidebar.vue";
export default {
  name: "Alterar",
  components: {
    Sidebar
  },
  data() {
    return {
      senhaAtual: '',
      senhaNova:'',
      erros:[],
      passwordFieldType:'password'
    };
  },

  methods:{

    submit() {
      return axios({
        method: 'put',
        headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
        url:  
        "/empresas/"+this.$store.getters.fetchDecriptToken+"/alterarSenha",
          data: {
          senhaAtual: this.senhaAtual,
          senhaNova: this.senhaNova
        }
      })
        .then(res => {
          this.showAlert();
          window.setTimeout(this.$router.push("/perfil"), 3000);
        })
        .catch(error => {
          console.log(error.response.data);
          this.erros = error.response.data;
        });
    },

    showAlert(){
      this.$swal({
      type: 'success',
      title: 'OK!',
      text: 'Alterada com sucesso!',
         })
       },

    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    
    }

  
};
</script>

<style scoped>


label {
    padding-left: 10%;
    font-size: 20px;
    font-family: 'Roboto';
    font-weight: 100;
}

h2 {
  font-weight: 300;
}
.v-content {
  padding-top: 10vh !important;
  margin-left: 5vw;
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


input {
  height: 45px;
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


  h2{
    font-size: medium;
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

 

}
</style>