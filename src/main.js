import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入Element插件
import './plugins/element.js'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
