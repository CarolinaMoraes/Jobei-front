<template>
  <div class="initial">
    <header-navigation/>
    <div class="background">
      <div class="titulos txt-center">
        <h1>Sem perda de tempo</h1>
        <h2>Economize tempo e simplifique processos,
          <br>obtenha dinamismo e agilidade nas contratações.
        </h2>
        <router-link :to="{name: 'Login'}" class="side_bar_link">
          <a>Entrar</a>
        </router-link>
      </div>
    </div>
    <div class="block-wrap">
      <div class="text-block block-left txt-center">
        <img src="../assets/media/cronometro.png">
        <h1>Conexão direta</h1>
        <p class="paragraph">
          Automatize e simplifique a integração entre a empresa e o candidato,
          abra uma conversa direta e conecte-se rapidamente. Nossa solução diminui
          a distância e a espera enquanto potencializa a eficácia na comunicação.
        </p>
      </div>
      <div class="text-block block-right txt-center">
        <img src="../assets/media/medalha.png">
        <h1>Seus valores</h1>
        <p class="paragraph">
          Procure os melhores candidatos !
          Com os valores que sua empresa procura e valoriza,
          sendo assim os mais indicados, proporcionando o melhor para a vaga
        </p>
      </div>
    </div>
    <div class="center-div">
      <h1 class="titulos">Encontre os candidatos perfeitos.</h1>
    </div>
    <div class="end">
      <div class="text-end">
        <h1>Multiplataforma</h1>
        <p class="paragraph">
          Nosso serviço é Multiplataforma.
          Através de um celular ou desktop,
          você tem total acesso à nossa aplicação. Procure os melhores candidatos para as
          suas vagas e marque uma entrevista.
        </p>
      </div>
      <img src="../assets/media/mockup.png">
    </div>
    <br>
  </div>
</template>



<script>
import "../assets/stylesheets/generic.css";
import HeaderNavigation from "./navbar/HeaderNavigation.vue";

export default {
  name: "TelaInicial",
  components: {
    HeaderNavigation
  }
};
</script>

<style scoped>
.background {
  background: url("../assets/media/clocks.jpg");
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-attachment: fixed;
}

.paragraph {
  padding-top: 10px;
  width: 100%;
  white-space: normal;
  font-size: 25px;
}

.titulos {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 70px;
}

.titulos h1 {
  font-size: 70px;
}

.titulos a {
  text-decoration: underline;
  color: white;
  font-size: 30px;
}

.background a:hover {
  color: #deffff;
  text-decoration-color: #479e9e;
}

.block-wrap {
  padding: 50px 0px;
  display: flex;
  height: 100%;
  justify-content: center;
}

.text-block {
  flex: 1;
  margin: 15px 5%;
  max-width: 700px;
  display: block;
}

.text-block h1 {
  font-size: 50px;
  color: #3acbc6;
}

.center-div {
  background: url("../assets/media/faixaCentro.jpg");
  background-attachment: fixed;
  background-size: cover;
  color: white;
  text-align: center;
  height: 80vh;
}

.end {
  display: -webkit-inline-box;
  width: 100%;
  height: 100%;
  margin-top: 5%;
}

.end h1 {
  color: #3acbc6;
  font-size: 60px;
}

.text-end {
  max-width: 700px;
  font-size: 25px;
  margin: 60px;
}

.end img {
  width: 50vw;
  margin-bottom: -10px;
}

@media screen and (max-width: 850px) {
  .titulos {
    font-size: 40px;
  }

  .titulos h1 {
    font-size: 60px;
  }

  .titulos h2 {
    font-size: 20px;
  }

  .block-wrap {
    display: block;
  }

  .text-block {
    min-width: none;
  }

  .text-block h1 {
    font-size: 35px;
  }

  .text-block p {
    min-width: none;
    white-space: normal;
    text-align: center;
    font-size: 20px;
    margin: 0;
  }

  .end {
    display: block;
  }

  .end img {
    width: 100%;
  }

  .end h1 {
    text-align: center;
    font-size: 35px;
  }

  .text-end {
    margin: 0px;
    min-width: none;
    white-space: normal;
    text-align: center;
    font-size: 20px;
  }
}
</style>
