// 产品中心接口
import request from '@/utils/request'

export default {

  // 产品数据接口
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
  // 单产品月收入和用户总量趋势接口
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
  // 产品分省用户量接口
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
  // 开通/付费/活跃用户统计接口
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
  // 新增用户详情接口
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
  // 用户画像接口
  getUserFace (data) {
    return request({
      url: '/lgScreen/api/product/userFace',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 单产品趋势预测接口
  getTendency (data) {
    return request({
      url: '/lgScreen/api/product/tendency',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },

  // 以下是产品中心数据接口

  // 各细项分类项目数量接口
  getAllClassifyDatas (data) {
    return request({
      url: '/lgScreen/api/product/itemProject',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 分级视图接口
  getGradeViewTotal (data) {
    return request({
      url: '/lgScreen/api/product/gradeViewTotal',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 分类视图接口
  getBusinessCount (data) {
    return request({
      url: '/lgScreen/api/product/businessCount',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 月收入和用户总量趋势接口
  getMonthIncomeAndUserTotal (data) {
    return request({
      url: '/lgScreen/api/product/monthIncomeAndUserTotal',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 生命周期
  getLifecycleDatas (data) {
    return request({
      url: '/lgScreen/api/product/lifeCycle',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },

  // 以下接口废弃

  // 市场分析，已废弃
  getProductMarketDatas (data) {
    return request({
      url: '/lgScreen/api/marketAnalysis',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 事业群项目数量，已废弃
  getDepartmentInfos (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/businessCount',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 波士顿，已废弃
  getPostonDatas (data) {
    return request({
      url: '/lgScreen/api/bostonMatrix',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  }

}
