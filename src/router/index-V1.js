import Home from '@/views/V1/Home.vue'

const routesV1 = [
  // 首页
  {
    path: '/V1/',
    name: 'home',
    component: Home,
    meta: { title: '知行·数据·中台' }
  },
  // 产品中心页面
  {
    path: '/V1/productCenter',
    name: 'productCenter',
    component: () => import('../views/V1/Product/ProductCenterNew.vue'),
    meta: { title: '产品中心' }
  },
  // 单产品页面
  {
    path: '/V1/product',
    name: 'product',
    component: () => import('../views/V1/Product/ProductNew.vue')
  },
  // 公司介绍
  {
    path: '/V1/company',
    name: 'company',
    component: () => import('../views/V1/Company.vue')
  },
  // 渠道中心页面
  {
    path: '/V1/channelCenter',
    name: 'channelCenter',
    component: () => import('../views/V1/ChannelCenter')
  },
  // 客群中心页面
  {
    path: '/V1/customersCenter',
    name: 'customersCenter',
    component: () => import('../views/V1/Customers/CustomersCenterNew.vue')
  },
  // 客服中心页面
  {
    path: '/V1/serviceCenter',
    name: 'serviceCenter',
    component: () => import('../views/V1/ServiceCenter')
  },
  // 用户中心页面
  {
    path: '/V1/userCenter',
    name: 'userCenter',
    component: () => import('../views/V1/UserCenterNew.vue')
  },
  // 检索页面中心页面
  {
    path: '/V1/query',
    name: 'query',
    component: () => import('../views/V1/Query.vue')
  },
  {
    path: '/V1/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/V1/About.vue')
  },
  {
    path: '/V1/cardshow',
    name: 'cardshow',
    component: () => import('../views/V1/Cardshow.vue')
  }
]

export default routesV1
