import Vue from 'vue';
import Router from 'vue-router';
// import 'vuetify/dist/vuetify.min.css';
import Dashboard from '@/components/Dashboard';
import Vagas from '@/components/Vagas';
import Cadastrar from '@/components/Cadastrar';
import PerfilEmpresa from '@/components/PerfilEmpresa';
import TesteCnpj from '@/components/TesteCnpj';
import TelaInicial from '@/components/TelaInicial';
import Login from '@/components/Login';
import PerfilCandidato from '@/components/PerfilCandidato';
import CadastroVagas from '@/components/CadastroVagas';
import DetalheVaga from '@/components/DetalheVaga'
import PageNotFound from '@/components/PageNotFound'
import Esqueci from '@/components/Esqueci'
import PerfilEmpresaEdit from '@/components/PerfilEmpresaEdit'
import EditarVaga from '@/components/EditarVaga';
import AlterarSenha from '@/components/AlterarSenha';
import Matches from '@/components/Matches';


import {store} from '../store/store'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'TelaInicial',
      component: TelaInicial
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/matches',
      name: 'Matches',
      component: Matches,
      meta:{
        requiresAuth:true
      }
    },
    
    
    {
      path: '/alterar-senha',
      name: 'AlterarSenha',
      component: AlterarSenha,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/cadastrar',
      name: 'Cadastrar',
      component: Cadastrar,
    },
    {
      path: '/perfil',
      name: 'PerfilEmpresa',
      component: PerfilEmpresa,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/vagas',
      name: 'Vagas',
      component: Vagas,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/testecnpj',
      name: 'TesteCnpj',
      component: TesteCnpj,
      meta:{
        requiresAuth:false
      }
    },
      {
      path: '/dash',
      name: 'Dashboard',
      component: Dashboard,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/cadastro-vagas',
      name: 'CadastroVagas',
      component: CadastroVagas,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/candidatos/:idCandidato/:idVaga',
      name: 'PerfilCandidato',
      component: PerfilCandidato,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/vagas/:id',
      name: 'DetalheVaga',
      component: DetalheVaga,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/editar-perfil',
      name: 'PerfilEmpresaEdit',
      component: PerfilEmpresaEdit,
      meta:{
        requiresAuth:true
      }
      
    },

    {
      path: '/editar-vaga/:id',
      name: 'EditarVaga',
      component: EditarVaga,
      meta:{
        requiresAuth:true
      }
      
    },

    { path: "*", component: PageNotFound }
    
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.estaLogado) {
          next()
          return
      }
      next('/login')
  } else {
      next()
  }
});

export default router
