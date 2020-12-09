import Vue from 'vue';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  el: '#app',

  render: h => h(App),
});