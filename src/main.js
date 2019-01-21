import Vue from 'vue'
import App from './App.vue'
import router from './router'
import auth from './auth'
import VueYouTubeEmbed from 'vue-youtube-embed'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(auth)
Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
