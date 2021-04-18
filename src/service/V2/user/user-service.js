import UserApi from '@/api/V2/user/user-api.js'
import {
  color,
  legend,
  xAxis,
  yAxis,
  commonBar,
  commonPie
} from '@/utils/V2/unisk-options-v2.js'
import { thousands } from '@/utils/index.js'
export default {
  async getUserListServiceV2 (data) {
    let result
    await UserApi.getUserListV2(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    let provinceOption = this.createProvinceOption(result.provinces.reverse())
    let feeUserOption = this.createUserCountOption(result.feeUserCounts)
    let activeUserOption = this.createUserCountOption(result.activeUserCounts)
    let userGroupsOption = this.createGroupOption(result.userGroups, '用户群体')
    let userProductsOption = this.createProductOption(result.userProducts, '用户分布')
    let networksOption = this.createNetworksAndVoltesAndpPlateformsOption(result.networks, '套餐')
    let voltesOption = this.createNetworksAndVoltesAndpPlateformsOption(result.voltes, 'VoLTE')
    let plateformsOption = this.createNetworksAndVoltesAndpPlateformsOption(result.plateforms, '终端')

    return {
      'provinceOption': provinceOption,
      'userCounts': result.userCounts,
      'feeUserOption': feeUserOption,
      'activeUserOption': activeUserOption,
      'userGroupsOption': userGroupsOption,
      'userProductsOption': userProductsOption,
      'networksOption': networksOption,
      'voltesOption': voltesOption,
      'plateformsOption': plateformsOption
    }
  },
  createProvinceOption (data) {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.color = [color[1], color[3], color[0]]
    option.color[1] = '#0aadff'
    let [arpus, counts, provinces, alls] = [[], [], [], []]
    data.forEach(item => {
      arpus.push({
        name: item.province,
        value: item.arpu,
        pCount: item.count,
        top5: item.top5
      })
      counts.push({
        name: item.province,
        value: item.count,
        pCount: item.arpu,
        permeability: item.permeability,
        top5: item.top5
      })
      alls.push({
        name: item.province,
        value: item.unicom,
        pCount: item.arpu,
        permeability: item.permeability,
        top5: item.top5
      })
      provinces.push(item.province)
    })
    option.grid.bottom = '5%'
    option.grid.left = '3%'
    option.xAxis = [JSON.parse(JSON.stringify(yAxis)), JSON.parse(JSON.stringify(yAxis))]
    option.xAxis[0].position = 'bottom'
    option.xAxis[0].axisLabel.rotate = 0
    option.xAxis[0].axisLabel.formatter = function (v, i) {
      return Math.floor(v / 10000) + '万'
    }
    option.xAxis[1].position = 'top'
    option.xAxis[1].axisLabel.show = false

    option.yAxis = [JSON.parse(JSON.stringify(xAxis)), JSON.parse(JSON.stringify(xAxis))]
    option.yAxis[0].data = provinces
    option.yAxis[0].axisLabel.interval = 0
    option.yAxis[0].axisLabel.margin = 28
    option.yAxis[0].axisLabel.rotate = 0

    option.yAxis[1].data = provinces
    option.yAxis[1].axisLabel.show = false
    option.yAxis[1].axisLine.show = false
    option.yAxis[1].axisLabel.rotate = 0

    option.legend.data = ['月度用户贡献均值', '在线用户数', '大网用户数']
    option.legend.top = '3%'

    option.padding = [5, 10]
    option.tooltip.backgroundColor = '#FFFFFF'
    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#000000;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + params[0].seriesName + '：' + params[0].data.value + '元</li>'
      result += '<li>' + params[1].seriesName + '：' + params[1].data.value + '</li>'
      result += '<li>' + params[2].seriesName + '：' + params[2].data.value + '</li>'
      result += '<li>' + '大网渗透率：' + params[2].data.permeability + '%' + '</li>'
      result += '<ul/>'
      result += '<p  style="font-size:18;font-weight:bold; margin:10px auto">渗透率TOP5产品清单：<p>'
      result += '<table style="border:2px solid #000000;"><tr style="border-bottom:1px solid #000;"><th>排名</th><th>产品名称</th><th>渗透率</th></tr>'
      params[0].data.top5.forEach(function (item, index) {
        if (index > 4) return
        result += '<tr><td>' + (index + 1) + '</td><td>' + item.productName + '</td><td>' + item.permeability + '%</td></tr>'
      })
      result += '</table></div>'
      return result
    }
    option.series = [{
      name: ['月度用户贡献均值'],
      type: 'line',
      symbol: 'circle',
      symbolSize: 10,
      smooth: true,
      xAxisIndex: 1,
      data: arpus
    },
    {
      name: ['在线用户数'],
      type: 'bar',
      barWidth: '10',
      stack: 'b',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: counts,
      zlevel: 2
    },
    {
      name: ['大网用户数'],
      type: 'bar',
      barWidth: '10',
      xAxisIndex: 0,
      yAxisIndex: 1,
      barGap: '-100%',
      data: alls,
      zlevel: 1
    }
    ]
    return option
  },
  createUserCountOption (data) {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.color = color
    let [xs, counts, ratios] = [[], [], []]
    data.forEach(item => {
      let x = ''
      if (item.hasOwnProperty('fx')) {
        x = item.fx
      } else {
        x = item.ax
      }

      ratios.push({
        name: x,
        value: item.ratio,
        pCount: item.count
      })
      counts.push({
        name: x,
        value: item.count,
        pCount: item.ratio
      })
      xs.push(x)
    })

    option.grid = { top: '15%', bottom: '30%', left: '13%', right: '3%' }

    option.legend.data = ['用户数', '增长量']
    option.legend.top = '8%'

    option.tooltip.formatter = function (params) {
      let result = '<p style="text-align:center;font-weight:600">' + params[0].name + '月</p>'
      result += '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params[0].color + ';">'
      result += '<p style="text-align:left;">' + params[0].seriesName + '：' + params[0].data.value + '</p>'
      result += '<p style="text-align:left;">' + params[1].seriesName + '：' + (params[1].data.value ? params[1].data.value : 0.0) + '%</p>'
      return result
    }
    option.yAxis = [JSON.parse(JSON.stringify(yAxis)), JSON.parse(JSON.stringify(yAxis))]
    // option.yAxis[0].name = '用户数'
    option.yAxis[0].axisLabel.rotate = 0
    option.yAxis[0].axisLabel.formatter = function (value) {
      return Math.floor(value / 10000) + '万'
    }

    // option.yAxis[1].name = '增长量'
    option.yAxis[1].splitLine.show = false
    option.yAxis[1].axisLabel.show = false

    option.xAxis.data = xs
    option.xAxis.axisLabel.margin = 28
    // option.xAxis.axisLabel.rotate = 0
    option.series = [
      {
        name: '用户数',
        type: 'bar',
        barWidth: 15,
        data: counts
      },
      {
        name: '增长量',
        type: 'line',
        yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        smooth: true, // 平滑曲线显示
        sampling: 'average',
        showAllSymbol: true, // 显示所有图形。
        symbol: 'circle', // 标记的图形为实心圆
        symbolSize: 10, // 标记的大小
        data: ratios
      }
    ]

    return option
  },
  createGroupOption (data) {
    let option = JSON.parse(JSON.stringify(commonPie))
    option.color = [color[2], color[1], color[0]].concat(color.slice(3))
    let [legendDataSex, legendData, seriesDataSex, seriesData] = [[], [], [], []]
    data.forEach(item => {
      let x = item.ugx
      if (x === '男' || x === '女') {
        legendDataSex.push(x)
        seriesDataSex.push({
          name: x,
          value: item.count
        })
      } else {
        legendData.push(x)
        seriesData.push({
          name: x,
          value: item.count
        })
      }
    })

    option.tooltip.trigger = 'item'
    option.tooltip.formatter = function (params) {
      return '<p style="text-align:center;font-weight:600">' + params.data.name + '</p>' +
               '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params.color +
        ';">' +
             '<p style="text-align:center;">' + params.data.value + '</p>'
    }

    option.legend = [JSON.parse(JSON.stringify(legend)), JSON.parse(JSON.stringify(legend))]
    option.legend[0].orient = 'vertical'
    option.legend[0].data = legendDataSex
    option.legend[0].bottom = '50%'
    option.legend[0].height = '80%'
    option.legend[0].left = '5%'

    option.legend[1].type = 'scroll'
    option.legend[1].orient = 'vertical'
    option.legend[1].data = legendData
    option.legend[1].bottom = '20%'
    option.legend[1].left = '45%'
    option.legend[1].height = '60%'
    option.legend[1].pageTextStyle = { color: ['#FFFFFF'], fontSize: 16, fontWeight: 600 }

    let seriesItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem))]
    option.series[0].data = seriesDataSex
    option.series[0].center = ['30%', '50%']
    option.series[0].radius = ['35%', '55%']
    option.series[0].label.show = false
    option.series[0].roseType = false

    option.series[1].data = seriesData
    option.series[1].center = ['80%', '50%']
    option.series[1].radius = ['35%', '55%']
    option.series[1].label.show = false
    option.series[1].roseType = false
    return option
  },

  createProductOption (data, seriesName) {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.color = [color[1]]

    let [xs, counts] = [[], []]
    data.slice(0, 10).forEach((item, index) => {
      let x = item.upx
      counts.push({
        name: x,
        value: item.count,
        top5: item.top5
      })
      xs.push(x)
    })

    option.tooltip.position = function (point, params, dom, rect, size) {
      // 固定在顶部
      return [point[0], '-10%']
    }
    // option.tooltip.position = 'top'
    // option.tooltip.enterable = true
    // style="height:200px;overflow:auto;z-index:9999;"
    option.tooltip.formatter = function (params) {
      let result = '<div ><p style="text-align:center;font-weight:600;height:12px;">' + params[0].name + '个产品</p>' +
               '<hr style="width:100%;height:1px;border:none;border-top:1px double ' + params[0].color +
        ';">' +
             '<p style="text-align:center;height:14px;">' + thousands(params[0].value) + '</p>'
      result += '<p  style="font-size:18;font-weight:bold; margin:5px auto">产品TOP5清单：<p>'
      result += '<table style="border:2px solid #000000;"><tr style="border-bottom:1px solid #000;"><th>排名</th><th>产品名称</th><th>用户数</th></tr>'
      params[0].data.top5.forEach(function (item, index) {
        if (index > 4) return
        let count = item.count
        if (count > 0) {
          result += '<tr><td>' + (index + 1) + '</td><td>' + item.productName + '</td><td>' + thousands(count) + '</td></tr>'
        }
      })
      result += '</table></div>'

      return result
    }

    option.series[0].label.show = true
    option.series[0].label.position = 'top'
    option.series[0].label.formatter = function (v, i) {
      let value = v.data.value
      if (value >= 10000) value = Math.floor(v.data.value / 10000) + '万'
      return value
    }

    option.grid.bottom = '20%'
    option.grid.left = '3%'

    option.legend.data = [seriesName]
    option.legend.top = '8%'

    option.yAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.formatter = function (v, i) {
      let value = v
      if (value >= 10000) value = Math.floor(v / 10000) + '万'
      return value
    }

    option.xAxis.data = xs
    option.xAxis.axisLabel.rotate = 0
    option.xAxis.axisLabel.onZero = true

    option.series[0].data = counts
    option.series[0].name = seriesName
    return option
  },
  createNetworksAndVoltesAndpPlateformsOption (data, seriesName) {
    let option = JSON.parse(JSON.stringify(commonPie))
    option.color = [color[2], color[1], color[0]].concat(color.slice(3))
    let [xs, counts] = [[], []]
    data.forEach(item => {
      let x = ''
      if (item.hasOwnProperty('nx')) {
        x = item.nx
      } else if (item.hasOwnProperty('vx')) {
        x = item.vx
      } else {
        x = item.px
      }
      let vCount = item.count
      if (vCount < 20000000)vCount += 20000000
      counts.push({
        name: x,
        value: vCount,
        vCount: item.count,
        roundCap: 1
      })
      xs.push(x)
    })

    option.tooltip.trigger = 'item'
    option.tooltip.formatter = function (params) {
      return '<p style="text-align:center;font-weight:600">' + params.data.name + '</p>' +
               '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params.color +
        ';">' +
             '<p style="text-align:center;">' + params.data.vCount + '</p>'
    }

    option.legend.orient = 'vertical'
    option.legend.left = '10%'
    option.legend.top = '5%'
    option.legend.data = xs

    option.series[0].name = seriesName
    option.series[0].roseType = false
    option.series[0].radius = ['35%', '65%']
    option.series[0].center = ['60%', '50%']
    option.series[0].data = counts
    option.series[0].label.show = false
    return option
  }
}
