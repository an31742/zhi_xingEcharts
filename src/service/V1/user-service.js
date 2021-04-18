// 用户中心服务层
import UserApi from '@/api/V1/user.js'
import DrawUtils from '@/utils/draw-utils.js'
import {
  commonBar,
  commonPie
} from '@/utils/options'
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
    let userGroupsOption = this.createGroupAndProductOption(result.userGroups, '用户群体')
    let userProductsOption = this.createGroupAndProductOption(result.userProducts, '用户分布')
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
    option.xAxis = [DrawUtils.getCommonYAxis(), DrawUtils.getCommonYAxis()]
    option.xAxis[0].position = 'bottom'
    option.xAxis[0].splitLine.show = false
    option.xAxis[0].axisLabel.formatter = function (v, i) {
      return Math.floor(v / 10000) + '万'
    }
    option.xAxis[1].position = 'top'
    option.xAxis[1].splitLine.show = false
    option.xAxis[1].axisLabel.show = false

    option.yAxis = [DrawUtils.getCommonXAxis(), DrawUtils.getCommonXAxis()]
    option.yAxis[0].data = provinces
    option.yAxis[0].axisLine.show = true
    option.yAxis[0].axisLine.lineStyle = { color: '#29C896' }
    option.yAxis[0].axisLabel.color = '#FFFFFF'
    option.yAxis[0].axisLabel.interval = 0

    option.yAxis[1].data = provinces
    option.yAxis[1].axisLine.show = true
    option.yAxis[1].axisLine.lineStyle = { color: '#29C896' }
    option.yAxis[1].axisLabel.show = false

    let linerColor = DrawUtils.getLinearGradient('#29C896', 0.1, '#29C896', 1)
    linerColor.y = 0
    linerColor.x2 = 1

    let linerColor1 = DrawUtils.getLinearGradient('#696969', 0.1, '#696969', 1)
    linerColor1.y = 0
    linerColor1.x2 = 1

    option.legend.data = ['在线用户数', '在线ARPU', '大网用户数']
    option.legend.top = '2%'

    option.tooltip.formatter = function (params) {
      let result = params[0].name
      result += '<br/>' + params[0].marker + params[0].seriesName + '：' + params[0].data.value + '元'
      result += '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#29C896;"></span>' + params[1].seriesName + '：' + params[1].data.value
      result += '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#696969;"></span>' + params[2].seriesName + '：' + params[2].data.value
      result += '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FFB400;"></span>大网渗透率：' + params[2].data.permeability + '%'
      result += '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3F9688;"></span>渗透率TOP5产品清单：<ul>'
      params[0].data.top5.forEach(function (item, index) {
        if (index > 4) return
        result += '<li style="margin-left:20px;color:#F17B2F;">' + (index + 1) + '&nbsp;&nbsp;<b>' + item.productName + '</b>&nbsp;&nbsp;：&nbsp;<b>' + item.permeability + '%</b></li>'
      })
      result += '</ul>'
      return result
    }
    option.series = [{
      name: ['在线ARPU'],
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
      itemStyle: {
        color: linerColor
      },
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
      itemStyle: {
        color: linerColor1
      },
      data: alls,
      zlevel: 1
    }
    ]
    return option
  },
  createUserCountOption (data) {
    let option = JSON.parse(JSON.stringify(commonBar))
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
    option.tooltip.formatter = function (params) {
      let result = params[0].name + '月'
      result += '<br/>' + params[0].marker + params[0].seriesName + '：' + Math.floor(params[0].data.value / 10000) + '万'

      result += '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#29C896;"></span>' + params[1].seriesName + '：' + params[1].data.value + '%'

      return result
    }
    option.yAxis = [DrawUtils.getCommonYAxis(), DrawUtils.getCommonYAxis()]
    option.yAxis[0].name = '用户数'
    // option.yAxis[0].axisLabel.formatter = function (v, i) {
    //   return Math.floor(v / 10000) + '万'
    // }

    option.yAxis[1].name = '增长量'
    option.yAxis[1].splitLine.show = false
    option.grid = { top: '15%', bottom: '20%' }
    option.legend.data = ['用户数', '增长量']
    option.legend.top = '5%'
    option.xAxis.axisLine = { show: true, color: '#FFFFFF', lineStyle: { color: '#29C896' } }
    option.xAxis.axisTick = { show: true }
    option.xAxis.axisLabel = { show: true, textStyle: { color: '#FFFFFF' } }
    option.xAxis.data = xs
    option.xAxis.name = '月度'
    option.xAxis.nameLocation = 'middle'
    option.xAxis.nameGap = 30
    option.series = [
      {
        name: '用户数',
        type: 'bar',
        barWidth: 15,
        itemStyle: {
          color: DrawUtils.getLinearGradient('#29C896', 0.6, '#29C896', 1)
        },
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
  createGroupAndProductOption (data, seriesName) {
    let option = JSON.parse(JSON.stringify(commonBar))
    let [xs, counts] = [[], []]
    let flag = ''
    data.forEach(item => {
      let x = ''
      if (item.hasOwnProperty('upx')) {
        x = item.upx
        flag = '1'
      } else {
        flag = '2'
        x = item.ugx
      }
      counts.push({
        name: x,
        value: item.count,
        flag: flag
      })
      xs.push(x)
    })
    option.yAxis = [DrawUtils.getCommonYAxis()]
    option.yAxis[0].axisLabel.formatter = function (v, i) {
      let value = v
      if (value >= 10000) value = Math.floor(v / 10000) + '万'
      return value
    }
    option.tooltip.formatter = function (params) {
      let result = params[0].seriesName
      let unit = ''
      let value = params[0].data.value
      if (value >= 10000) value = Math.floor(params[0].data.value / 10000) + '万'
      if (params[0].data.flag === '1') { unit = '个' }
      result += '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#29C896;"></span>' + params[0].name + unit + '：' + value

      return result
    }

    option.legend.data = [seriesName]
    option.legend.top = '3%'
    option.xAxis.axisLine = { show: true, color: '#FFFFFF', lineStyle: { color: '#29C896' } }
    option.xAxis.axisTick = { show: true }
    option.xAxis.axisLabel = { show: true, textStyle: { color: '#FFFFFF' } }
    option.xAxis.data = xs
    option.series = [
      {
        name: seriesName,
        type: 'bar',
        barWidth: 15,
        itemStyle: {
          color: DrawUtils.getLinearGradient('#29C896', 0.6, '#29C896', 1)
        },
        data: counts
      }
    ]
    return option
  },
  createNetworksAndVoltesAndpPlateformsOption (data, seriesName) {
    let option = JSON.parse(JSON.stringify(commonPie))
    option.color = ['#F17B2F', '#3F9688', '#A7CF4A', '#29C896', '#FFB400', '#A7CF4A', '#3F9688']
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
      counts.push({
        name: x,
        value: item.count,
        label: {
          show: true,
          position: 'outside'
        },
        roundCap: 1
      })
      xs.push(x)
    })

    option.tooltip = {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    }
    option.legend.data = xs

    option.series[0].name = seriesName
    option.series[0].radius = ['50%', '60%']
    option.series[0].center = ['50%', '40%']
    option.series[0].data = counts
    return option
  },
  async getUserListService (data) {
    let result
    await UserApi.getUserList(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })

    let distData = {}
    // 省份柱状图数据解构
    let provinceData = {}
    let provX = []
    let provY = []
    result.provinces.forEach(element => {
      provX.push(element.count)
      provY.push(element.province)
    })
    provinceData.x = provX.reverse()
    provinceData.y = provY.reverse()
    distData.provinceData = provinceData

    // top柱状图数据解构
    let topData = {}
    let proX = []
    let proY = []
    result.tops.forEach(el => {
      proX.push(el.userCount)
      proY.push(el.productName)
    })
    topData.x = proX.reverse()
    topData.y = proY.reverse()
    distData.topData = topData

    // 折现图和柱状图活跃用户总数
    let activeUser = {}
    let prX = []
    let prY = []
    let ratio = []
    result.activeUserCounts.forEach(el => {
      prX.push(el.ax)
      prY.push(el.count)
      ratio.push(el.ratio)
    })
    activeUser.x = prX
    activeUser.y = prY
    activeUser.r = ratio
    distData.activeUser = activeUser

    // 折线图和柱状图付费用户
    let payUser = {}
    let pX = []
    let pY = []
    let rati = []
    result.feeUserCounts.forEach(el => {
      pX.push(el.fx)
      pY.push(el.count)
      rati.push(el.ratio)
    })
    payUser.x = pX
    payUser.y = pY
    payUser.r = rati
    distData.payUser = payUser

    // 用户数量

    distData.userCounts = result.userCounts
    return distData
  }

}
