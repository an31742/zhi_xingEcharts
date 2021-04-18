// 渠道中心服务层
import ChannelApi from '@/api/V1/channel.js'
// import DrawUtils from '@/utils/draw-utils.js'

export default {
  async getServenList (data) {
    let result = {}

    await ChannelApi.getServenList(data).then(res => {
      // let option = JSON.parse(JSON.stringify(commonPie))
      let [allLegend, allSeriesData] = [[], []]
      res.data.dataItems.forEach(item => {
        let lKey = ''
        if (item.key === 'common') { lKey = '一般合作方' }
        if (item.key === 'head') { lKey = '头部互联网' }
        if (item.key === 'unicom') { lKey = '省分渠道' }
        if (item.key === 'sell') { lKey = '直销渠道' }
        if (item.key === 'self') { lKey = '自有渠道' }
        if (item.key === 'policy') { lKey = '集团渠道' }
        if (item.key === 'entity') { lKey = '实体渠道' }
        // 总渠道的饼图数据
        allLegend.push(lKey)
        allSeriesData.push({
          name: lKey,
          value: item.items.income,
          ratio: item.items.ratio,
          label: {
            show: true,
            position: 'outside',
            formatter: function (params) {
              let result = ''
              if (params.name.length > 2) {
                result = params.name.substring(0, 2) + '\n' + params.name.substring(2)
              }
              return result
            }
          }
        })
        // 各个渠道的饼图数据
        let [legend, seriesData, xs] = [[], [], []]
        item.items.top5.forEach(e => {
          legend.push(e.key)
          xs.push(e.key)
          seriesData.push({
            name: e.key,
            value: e.value,
            label: {
              show: false,
              position: 'center'
            },
            roundCap: 1
          })
        })
        result[item.key] = { legend: legend, seriesData: seriesData, xs: xs }
      })
      result['all'] = { legend: allLegend, seriesData: allSeriesData }
    })
    return result
  },
  async getPartnerList (data) {
    let result
    await ChannelApi.getPartnerList(data).then(res => {
      result = res.data
    })
    return result
  },
  async getAdShowList (data) {
    let result
    await ChannelApi.getAdShowList(data).then(res => {
      result = res.data
    })
    return result
  }
}
