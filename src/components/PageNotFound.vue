<template>
  <div class="wrapper h-100">
    <div class="text-center col-sm-12 my-auto">
      <h1 class="eyes">..</h1>
      <h1>404</h1>
    </div>

    <div class="text-center">
      <h5>Ops, não econtramos essa página</h5>
      <router-link to="/">
        <p class="btn-link">Voltar para a página inicial</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import "../assets/stylesheets/generic.css";
export default {
  name: "PageNotFound"
};
</script>



<style scoped>
h1 {
  font-family: "Roboto";
  font-size: 150px;
  font-weight: bold !important;
}

.eyes {
  margin-bottom: -55px;
  margin-top: auto;
}

h5 {
  font-size: 40px;
}

p {
  font-size: 20px;
}
</style>

