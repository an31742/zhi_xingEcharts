// 检索页面接口
import request from '@/utils/request'

export default {

  // 产品检索中心接口
  getSearchList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/product/searchList',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  },
  // 检索条件下拉框数据查询接口
  getSearchConditionList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/lgScreen/api/product/searchConditionList',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  }

}
