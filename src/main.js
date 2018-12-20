// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify';

import { store } from './store/store';
import axios from 'axios'

Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VueSweetalert2);

// axios.defaults.baseURL='http://172.16.3.36:5000/api';

axios.defaults.baseURL='http://172.16.10.6:5000/api';

axios.defaults.headers.common['api-version'] = '1.0';
axios.defaults.headers.common['Access-Control-Allow-Origin']= '*';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
