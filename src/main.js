import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // 用于处理 CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Echarts from 'echarts' // 全局过滤器
import 'echarts-gl'
// import '@/permission' // permission control
import Card from '@/components/V1/ServiceCenter/Card/index.js'

import HeadPart from '@/components/V2/HeadPart'

import '@/assets/V1/styles/index.scss' // 全局样式
import '@/assets/V1/styles/element_change.scss' // 全局样式

import '@/assets/V2/styles/index.scss' // 全局样式
// import '@/assets/styles/border.css' // 解决1像素边框问题
import VueAwesomeSwiper from 'vue-awesome-swiper'

// If you use Swiper 6.0.0 or higher
import 'swiper/swiper-bundle.css'

import * as filters from './filters'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.component('AppCard', Card)
Vue.component('HeadPart', HeadPart)
Vue.prototype.Echarts = Echarts

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
// fastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
