<template>
  <div id="navigation-bar">
     <nav class="navbar navbar-expand-md navbar-light bg-light">
        
      <router-link to="login">        
        <img class="logo" src="../../assets/media/logo.png">
      </router-link>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
       <li class="nav-item active">
         <router-link to="cadastrar" id="cadastrar-link" class="nav-item">Cadastrar</router-link>
      </li>
       <li class="nav-item active left">
         <router-link to="login" class="nav-item">Entrar</router-link>
       </li>
    </ul>
  </div>
</nav>
     <router-view/>
    
  </div>
</template>

<script>
export default {
  name: "HeaderNavigation",

  data() {
    return {
       currentRoute: window.location.toString(),
    };
  },

mounted(){
  this.escondeLink();
 },

 methods:{
      escondeLink(){
     if(this.currentRoute.includes("cadastrar")){
       document.getElementById("cadastrar-link").style.display="none";
     }
  }
 }

};
</script>

<style>

a{
  color: black;
  transition: color .2s;
}

a:hover{
  color: #1ba296;
  text-decoration: none;
}

body{
  overflow-x: hidden;
}

.logo{
  margin-left: 15px;
   width: 130px !important;
}

.left{
  margin-right: 180px;
}

.nav-item{
  margin-right: 10%;
}

.navbar-brand {
  margin-left: 85%;
}
#menu{
  margin-left: 10%;
}

#aa img {
  width: 110px;
  margin-left: 2%;
  margin-top: 0.2%;
}


</style>
