import request from '@/utils/request'

export default {

  // 分级视图接口-----金字塔
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

  // 分类视图接口-----柱状
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
  }

}
