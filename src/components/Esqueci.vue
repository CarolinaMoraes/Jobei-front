<template>
  <div>
    <header-navigation/>
    <div class="text-title">
      <h1>Esqueci minha senha</h1>
      <p>Esqueceu sua senha? Não tem problema, digite seu email para redefinir sua senha.</p>
      <hr>
    </div>
    <div class="text-center">
      <div class="form-group row">
        <label for="senha" class="col-sm-2 col-form-label">Email:</label>
        <div class="col-sm-8">
          <input
            type="password"
            class="form-control"
            id="senha"
            placeholder="Email"
            v-model="senha"
          >
        </div>
      </div>

      <button
        name="step-btn"
        class="btn btn-outline-info mt-auto"
        @click="e1 = 2"
        color="primary"
      >Salvar</button>
    </div>
  </div>
</template>



<script>
import "../assets/stylesheets/generic.css";
import axios from "axios";
import HeaderNavigation from "./navbar/HeaderNavigation.vue";
export default {
  name: "Esqueci",
  components: {
    HeaderNavigation
  },
  data() {
    return {
      senha: ""
    };
  },

  submit() {
    return axios({
      method: "post",
      url: "http://192.168.4.89:5000/api/empresas",
      headers: {
          Authorization: "Bearer " + this.$store.getters.fetchToken
        },
      data: {
        senha: this.senha
      },

      headers: {
        "api-version": "2.0",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => {
        alert("foi");
      })
      .catch(err => {
        alert("você errou aqui: " + error + " ó " + error.response.data);
      });
  }
};
</script>

<style scoped>
label {
  padding-left: 10%;
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 100;
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

  h2 {
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