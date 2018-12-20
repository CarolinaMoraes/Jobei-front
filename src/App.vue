
<template>
  <router-view/>
</template>


<style>
body {
  background-color: #f5f5f5;
}
</style>


<script>
import "./assets/stylesheets/main.css";
export default {
  data: () => ({}),

  mounted() {
    this.noConnection();
  },

  methods: {
    noConnection() {
      if (!navigator.onLine) {
        this.showAlertInternet();
      } else {
        console.log("online");
      }
    },

    showAlertInternet() {
      this.$swal({
        type: "warning",
        title: "Verifique sua conexão",
        backdrop: "#1ba296",
        text: "Sua internet parece estar desconectada ou instável"
      });
    }
  }
};
</script>




