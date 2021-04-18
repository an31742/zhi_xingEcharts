import QueryApi from '@/api/V2/query/query-api.js'

export default {
// 产品检索中心接口
  async getSearchList (data) {
    let result
    await QueryApi.getSearchList(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    return result
  },
  // 检索条件下拉框数据查询接口
  async getSearchConditionList (data) {
    let result
    await QueryApi.getSearchConditionList(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    return result
  }
}
