import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './util/visitCount'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/normalize.css'
import animated from 'animate.css'
Vue.use(ElementUI)
Vue.use(animated)

Vue.config.productionTip = false

/* 截取指定字数，用于多行打点 */
Vue.filter('strShear', (val, num = 20) => {
  if (!val || typeof (num) !== 'number') return ''
  if (val.length <= num) return val
  return val.slice(0, num - 1) + '...'
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
