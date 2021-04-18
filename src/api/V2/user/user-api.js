import request from '@/utils/request'

export default {
  // 用户中心用户量接口
  getUserListV2 (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/user/userNew',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  }
}
