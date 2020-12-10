import Vue from 'vue'
import App from './App'

import Filters from './util/filters'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueMoment from 'vue-moment'

Vue.use(Filters)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMoment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
