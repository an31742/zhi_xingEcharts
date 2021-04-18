import request from '@/utils/request'

export default {
  // 合作渠道数据接口
  getPartnerList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/channel/partner',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 渠道中心7个对外渠道数据接口
  getChannelList (data) {
    return request({
      url: 'lgScreen/api/channel/newList',
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
