// 客群中心接口
import request from '@/utils/request'

export default {
  // 客群中心静态数据接口
  getDataList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/customerGroup/data',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 客群中心时序数据接口
  getTimingList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/customerGroup/timing',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 客群中心一级标签接口
  getRootList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/customerGroup/root',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 客群中心一级标签接口
  getLeafList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/customerGroup/leaf',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 数据展示
  getAdShowList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/channel/adv',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  }
}
