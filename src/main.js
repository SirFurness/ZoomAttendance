import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import vmodal from 'vue-js-modal'

Vue.use(vmodal, {dialog: true})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')