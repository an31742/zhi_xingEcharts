import ChannelApi from '@/api/V2/channel/channel-api.js'
import {
  color,
  commonPie
} from '@/utils/V2/unisk-options-v2.js'
export default {
  async getPartnerList (data) {
    let result = {}
    await ChannelApi.getPartnerList(data).then(res => {
      result = res.data
    })
    return result
  },
  // 渠道中心7个对外渠道数据接口
  async getChannelList (data) {
    let result = {}
    await ChannelApi.getChannelList(data).then(res => {
      result = res.data
    })

    let resultData = {}
    let [legendData, seriesData] = [[], []]
    result.dataItem.forEach(element => {
      let top10 = element.items.top10
      let v = top10[0]
      top10.forEach(item => {
        item.width = (item.value / v.value * 230) + 'px'
      })
      resultData[element.key] = top10

      if (element.key !== 'month') {
        let key = ''
        if (element.key === 'own')key = '自有渠道'
        if (element.key === 'unicom')key = '集团省分渠道'
        if (element.key === 'network')key = '互联网渠道'
        legendData.push(key)
        seriesData.push({
          name: key,
          value: element.items.income,
          ratio: element.items.ratio
        })
      }
    })
    let option = JSON.parse(JSON.stringify(commonPie))
    option.color = color

    option.tooltip.trigger = 'item'
    option.tooltip.formatter = function (params) {
      return '<p style="text-align:center;font-weight:600">' + params.data.name + '</p>' +
               '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params.color +
        ';">' +
             '<p style="text-align:center;">' + params.data.value + '</p>'
    }

    option.legend.data = legendData
    option.legend.orient = 'vertical'
    option.legend.left = '8%'
    option.legend.top = '50%'
    option.legend.itemWidth = 30
    option.legend.itemHeight = 20
    option.legend.itemGap = 15
    option.legend.textStyle.fontSize = '12px'

    option.series[0].data = seriesData
    option.series[0].center = ['55%', '50%']
    option.series[0].radius = ['50%', '70%']
    resultData.option = option

    return resultData
  }
}
