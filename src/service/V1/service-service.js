// 客服中心服务层
import ServiceApi from '@/api/V1/service.js'

export default {
  //  客服中心数据接口
  async getDataListService (data) {
    let result = {
      mapDatas: [], // 受理量分布
      accessChannels: '', // 受理渠道
      customService: '', // 客服投诉量
      phone: '', // 10015投诉量
      miit: ''// 工信部申诉量
    }
    await ServiceApi.getDataList(data).then(res => {
      res.data.mapDatas.forEach(e => {
        result.mapDatas.push({
          name: e.provinceCode,
          value: e.accessCount
        })
      })
      result.accessChannels = res.data.accessChannels
      result.customService = res.data.yearOnYearItems[0].item
      result.phone = res.data.yearOnYearItems[1].item
      result.miit = res.data.yearOnYearItems[2].item
    })
    return result
  },

  //  月度累计受理量接口
  async getMonthListService (year, provinceCode) {
    let result = {
      year: '',
      xData: [],
      yData: []
    }
    await ServiceApi.getMonthList(year, provinceCode).then(res => {
      result.year = res.data.year
      const item = []
      for (let i in res.data.dataItems) {
        result.xData.push(res.data.dataItems[i].y)
        item.push(res.data.dataItems[i].x)
      }
      item.forEach(e => {
        result.yData.push(e.replace(/\b(0+)/gi, '') + '月')
      })
    })
    return result
  }
}
