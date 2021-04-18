import ProductInfoApi from '@/api/V2/product-info/product-info-api.js'
import {
  color,
  linerColorTwo,
  commonBar,
  commonLine,
  commonPie
} from '@/utils/V2/unisk-options-v2.js'

export default {

  async getProjectDetail (data) {
    let result
    let openNumb = ''
    let payNumb = ''
    let activeNumb = ''
    let info = {}
    await ProductInfoApi.getProjectDetail(data).then(res => {
      if (res.code === '200') {
        result = res.data
        openNumb = parseInt(result.hadUserCount || 0)
        payNumb = parseInt(result.feeUserCount || 0)
        activeNumb = parseInt(result.activeUserCount || 0)
        info = result
      }
    })
    if (!info.hasOwnProperty('starPoints')) {
      info.starPoints = {
        point1: '',
        point2: '',
        point3: ''
      }
    }
    return {
      open: openNumb,
      pay: payNumb,
      active: activeNumb,
      info: info
    }
  },
  async getProductCase (data) {
    let result = {}
    await ProductInfoApi.getProductCase(data).then(res => {
      result = res.data
    })
    return {
      trades: this.getBarOption(result.trades, ['行业所占份额']), // 行业所占份额
      senses: this.getBarOption(result.senses, ['场景规模']), // 场景规模
      partnership: this.getPieOption(result.partnership, 'key', 'value'), // 合作关系
      cases: result.cases,
      tradesInfo: result.tradesInfo,
      sensesInfo: result.sensesInfo
    }
  },
  getBarOption (data, legendData) {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.color = color
    let [xAxisData, seriesData] = [
      [],
      []
    ]
    data.forEach(element => {
      xAxisData.push(element.x)
      seriesData.push({
        name: element.x,
        value: element.y
      })
    })

    option.grid.bottom = '20%'

    option.tooltip.formatter = function (params) {
      return '<p style="text-align:center;font-weight:600">' + params[0].data.name + '</p>' +
               '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params[0].color +
        ';">' +
             '<p style="text-align:center;">' + params[0].data.value + '</p>'
    }

    option.legend.data = legendData
    option.legend.top = '8%'

    option.xAxis.data = xAxisData
    option.xAxis.axisLabel.rotate = 0

    option.yAxis.axisLabel.rotate = 0

    if (legendData[0] !== '合作企业') {
      option.yAxis.name = '(万)'
    }
    let id = sessionStorage.getItem('productId')
    if (id === '225') {
      // echarts调用量横坐标数字过多
      option.xAxis.axisLabel.formatter = function (value) {
        value = value.substring(0, 2) + '-' + value.substring(2)

        return value
      }
    }

    option.series[0].data = seriesData
    option.series[0].name = legendData[0]
    return option
  },
  getPieOption (data, x, y) {
    let option = JSON.parse(JSON.stringify(commonPie))
    option.color = color
    let [legendData, seriesData] = [
      [],
      []
    ]

    data.forEach(element => {
      legendData.push(element[x])
      seriesData.push({
        name: element[x],
        value: element[y]
      })
    })
    option.tooltip.trigger = 'item'
    option.tooltip.formatter = function (params) {
      return '<p style="text-align:center;font-weight:600">' + params.data.name + '</p>' +
               '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params.color +
        ';">' +
             '<p style="text-align:center;">' + params.data.value + '</p>'
    }

    if (x === 'key') {
      option.legend.orient = 'vertical'
      option.legend.data = legendData
      option.legend.bottom = '35%'
      option.legend.height = '80%'
      option.legend.left = '10%'
      option.series[0].center = ['60%', '50%']
    } else {
      option.legend.data = legendData
      option.legend.top = '8%'
      option.series[0].center = ['50%', '55%']
    }

    option.series[0].data = seriesData
    option.series[0].radius = ['45%', '65%']
    option.series[0].label.show = false
    return option
  },
  async getProductChannel (data) {
    let result = {}
    await ProductInfoApi.getProductChannel(data).then(res => {
      result = res.data
    })
    let resultData = {}
    // 合作企业
    if (!result.cooperativations || result.cooperativations.length === 0) {
      resultData.cooperativations = {}
    } else {
      resultData.cooperativations = this.getBarOption(result.cooperativations, ['合作企业']) // 合作企业
    }
    // 收入
    if (!result.incomes || result.incomes.length === 0) {
      resultData.incomes = {}
    } else {
      resultData.incomes = this.getLineOption(result.incomes, ['收入']) // 收入（规模）
    }
    // 渠道
    if (!result.places || result.places.length === 0) {
      resultData.places = {}
    } else {
      resultData.places = this.getPieOption(result.places, 'x', 'y') // 渠道
    }
    // 调用量
    if (!result.usages || result.usages.length === 0) {
      resultData.usages = {}
    } else {
      resultData.usages = this.getLineOption(result.usages, ['调用量']) // 调用量
    }

    return resultData
  },
  getLineOption (data, legendData) {
    let option = JSON.parse(JSON.stringify(commonLine))
    if (legendData[0] === '调用量') {
      option.color = [color[1]]
      // echarts调用量横坐标数字过多
      option.xAxis.axisLabel.formatter = function (value) {
        value = value.substr(0, 4)
        let id = sessionStorage.getItem('productId')
        if (id === '225') {
          value = value.substring(0, 2) + '-' + value.substring(2)
        } else {
          value = value.substring(0, 2) + '\n' + value.substring(2)
        }

        return value
      }
      option.series[0].areaStyle.color = linerColorTwo
    } else {
      option.color = [color[0]]
      option.series[0].smooth = false
      option.series[0].areaStyle.opacity = 0
    }

    let [xAxisData, seriesData] = [
      [],
      []
    ]
    data.forEach(element => {
      xAxisData.push(element.x)
      seriesData.push({
        name: element.x,
        value: element.y
      })
    })

    option.grid.bottom = '20%'

    option.tooltip.formatter = function (params) {
      let ret = '<p style="text-align:center;font-weight:600">' + params[0].data.name + '</p>' +
                '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params[0].color +
                ';">'
      if (legendData[0] === '调用量') {
        ret += '<p style="text-align:center;">' + legendData[0] + ':' + params[0].data.value + '</p>'
      } else {
        ret += '<p style="text-align:center;">' + legendData[0] + '(万)' + ':' + params[0].data.value + '</p>'
      }
      return ret
    }

    option.legend.data = legendData
    option.legend.top = '8%'

    option.xAxis.data = xAxisData
    option.xAxis.axisLabel.rotate = 0

    // option.series[0].smooth = false

    option.yAxis.axisLabel.rotate = 0
    if (legendData[0] !== '调用量') {
      option.yAxis.name = '(万)'
    }
    option.series[0].data = seriesData
    option.series[0].name = legendData[0]
    return option
  }
}
