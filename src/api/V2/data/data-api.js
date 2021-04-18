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
  // 周边数据接口
  getSurroundList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: 'lgScreen/api/customerGroup/surround',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 中部数据接口
  getCenterList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: 'lgScreen/api/customerGroup/center',
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
