import Vue from 'vue'
import VueRouter from 'vue-router'

// import V2Home from '@/views/V2/home/index.vue'
// import V2Product from '@/views/V2/product/index.vue'
// import V2ProductInfo2c from '@/views/V2/product-info/2c.vue'
// import V2ProductInfo2b from '@/views/V2/product-info/2b.vue'
// import V2ProductInfo2b2c from '@/views/V2/product-info/2b2c.vue'
// import V2Channel from '@/views/V2/channel/index.vue'
// import V2Data from '@/views/V2/data/index.vue'
// import V2Experience from '@/views/V2/experience/index.vue'
// import V2User from '@/views/V2/user/index.vue'
// import V2Query from '@/views/V2/query/index.vue'
// import V2Company from '@/views/V2/company/index.vue'
// import V2CompanyDetail from '@/views/V2/company/detail.vue'
// import V2TIC from '@/views/V2/tic/index.vue'

import routesV1 from '@/router/index-V1.js'

Vue.use(VueRouter)

const routesV2 = [
  // 首页
  {
    path: '/',
    name: 'V2Home',
    component: resolve => require(['@/views/V2/home/index.vue'], resolve),
    meta: { title: '知行·数据·中台', keepAlive: true }
  },
  // 产品中心页面
  {
    path: '/V2/product',
    name: 'V2Product',
    component: resolve => require(['@/views/V2/product/index.vue'], resolve),
    meta: { title: '产品', keepAlive: false }
  },
  // 单产品页面
  {
    path: '/V2/2b',
    name: 'V2ProductInfo2b',
    component: resolve => require(['@/views/V2/product-info/2b.vue'], resolve),
    meta: { title: '产品详情', market: '2B', keepAlive: false }
  },
  // 单产品页面
  {
    path: '/V2/2c',
    name: 'V2ProductInfo2c',
    component: resolve => require(['@/views/V2/product-info/2c.vue'], resolve),
    meta: { title: '产品详情', market: '2C', keepAlive: false }
  },
  // 单产品页面
  {
    path: '/V2/2b2c',
    name: 'V2ProductInfo2b2c',
    component: resolve => require(['@/views/V2/product-info/2b2c.vue'], resolve),
    meta: { title: '产品详情', market: '2B2C', keepAlive: false }
  },
  // 公司介绍
  {
    path: '/V2/company',
    name: 'V2Company',
    component: resolve => require(['@/views/V2/company/index.vue'], resolve),
    meta: { title: '公司介绍', keepAlive: false }
  },
  {
    path: '/V2/companyDetail',
    name: 'V2CompanyDetail',
    component: resolve => require(['@/views/V2/company/detail.vue'], resolve),
    meta: { title: '公司介绍详情', keepAlive: false }
  },
  // 渠道中心页面
  {
    path: '/V2/channel',
    name: 'V2Channel',
    component: resolve => require(['@/views/V2/channel/index.vue'], resolve),
    meta: { title: '渠道', keepAlive: true }
  },
  // 数据中心页面
  {
    path: '/V2/data',
    name: 'V2Data',
    component: resolve => require(['@/views/V2/data/index.vue'], resolve),
    meta: { title: '数据', keepAlive: true }
  },
  // 体验中心页面
  {
    path: '/V2/experience',
    name: 'V2Experience',
    component: resolve => require(['@/views/V2/experience/index.vue'], resolve),
    meta: { title: '体验', keepAlive: true }
  },
  // 用户中心页面
  {
    path: '/V2/user',
    name: 'V2User',
    component: resolve => require(['@/views/V2/user/index.vue'], resolve),
    meta: { title: '用户', keepAlive: true }
  },
  // 检索页面中心页面
  {
    path: '/V2/query',
    name: 'V2Query',
    component: resolve => require(['@/views/V2/query/index.vue'], resolve),
    meta: { title: '检索', keepAlive: true }
  },
  // 检索页面中心页面
  {
    path: '/V2/tic',
    name: 'V2TIC',
    component: resolve => require(['@/views/V2/tic/index.vue'], resolve),
    meta: { title: '联通在线科技创新能力指数(TIC)', keepAlive: true }
  }
]

const routes = routesV2.concat(routesV1)
const router = new VueRouter({
  routes
})
export default router
