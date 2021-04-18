import request from '@/utils/request'

export default {
  // 客服中心数据接口
  getDataList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/customerService/data',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 月度累计受理量接口
  getMonthList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/customerService/month',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  }
}
