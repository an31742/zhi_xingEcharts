import ProductInfoApi from '@/api/V2/product-info/product-info-api.js'
import {

  yAxis,
  geoCoordMap,

  commonLine,

  commonMap

} from '@/utils/V2/unisk-options-v2.js'

export default {
  async getProjectDetail (data) {
    let result
    let openNumb = ''
    let payNumb = ''
    let activeNumb = ''
    let info
    await ProductInfoApi.getProjectDetail(data).then(res => {
      if (res.code === '200') {
        result = res.data
        openNumb = result.hadUserCount || 0
        payNumb = result.feeUserCount || 0
        activeNumb = result.activeUserCount || 0
        info = result
      }
    })
    return { open: openNumb, pay: payNumb, active: activeNumb, info: info }
  },

  async getMonthIncomeAndUserOne (data) {
    let result = {}
    await ProductInfoApi.getMonthIncomeAndUserOne(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    let options = [
      this.createUserAndIncomeLine(result.incomes, 'ix', 'iy', 'iyTrend', ['收入（万）', '趋势（万）']),
      this.createUserAndIncomeLine(result.users, 'ux', 'uy', 'uyTrend', ['用户数（万）', '趋势（万）'])
    ]

    return options
  },

  createUserAndIncomeLine (data, x, y, yt, seriesName) {
    let option = JSON.parse(JSON.stringify(commonLine))
    let [xs, counts, trends] = [[], [], []]
    data.forEach(item => {
      xs.push(item[x])
      counts.push({
        name: item[x],
        value: item[y]
      })
      trends.push({
        name: item[x],
        value: item[yt]
      })
    })
    option.legend.data = seriesName
    option.xAxis.data = xs
    option.yAxis = [JSON.parse(JSON.stringify(yAxis)), JSON.parse(JSON.stringify(yAxis))]
    let seriesItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem))]
    option.series[0].data = counts
    option.series[1].data = trends
    return option
  },
  async getProvinceDatas (data) {
    let result
    await ProductInfoApi.getProvinceDatas(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    return this.setMapOption(result)
  },
  setMapOption (data) {
    let option = JSON.parse(JSON.stringify(commonMap))
    let seriesMapData = []
    data.dataItems.forEach(element => {
      let geoCoord = geoCoordMap[element.province]
      if (geoCoord) {
        seriesMapData.push({
          name: element.province,
          value: element.userCount,
          provinceCode: element.provinceCode
        })
      }
    })
    seriesMapData.push({
      name: '台湾',
      value: 0,
      provinceCode: '台湾'
    })
    seriesMapData.push({
      name: '南海诸岛',
      value: 0,
      provinceCode: '南海诸岛'
    })
    option.visualMap.top = '65%'
    option.series[0].data = seriesMapData
    option.series[1].data = seriesMapData
    option.series[1].selectedMode = true
    return option
  }
}
