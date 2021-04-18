import request from '@/utils/request'

export default {

  // 产品数据接口 -- 产品详情，产品介绍，亮点展示 --2B 2C 2B2C
  getProjectDetail (data) {
    return request({
      url: '/lgScreen/api/product/detail',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },

  // 单产品月收入和用户总量趋势接口 -- 折线图 -- 2B2C 2C
  getMonthIncomeAndUserOne (data) {
    return request({
      url: '/lgScreen/api/product/monthIncomeAndUserOne',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },

  // 产品分省用户量接口 -- 地图 -- 2B2C 2C
  getProvinceDatas (data) {
    return request({
      url: '/lgScreen/api/product/province',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },

  // 开通/付费/活跃用户统计接口 -- 饼图  地图  -- 2C
  getUserTotal (data) {
    return request({
      url: '/lgScreen/api/product/userTotal',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },

  // 新增用户详情接口----数字滚动 -- 列表
  getNewUserList (data) {
    return request({
      url: '/lgScreen/api/product/newUserList',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },

  // 13、行业产经合作关系典型案例接口 -- 2B 2B2C -- 柱图， 饼图
  //      http://111.202.245.140:9180/lgScreen/api/product/case
  getProductCase (data) {
    return request({
      url: '/lgScreen/api/product/case',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },

  // 14、收入合作企业渠道调用量接口 -- 2B -- 柱图，折线图，饼图
  //    http://111.202.245.140:9180/lgScreen/api/product/channel
  getProductChannel (data) {
    return request({
      url: '/lgScreen/api/product/channel',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  }

}
