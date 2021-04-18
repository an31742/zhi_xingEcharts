import ProductInfoApi from '@/api/V2/product-info/product-info-api.js'
import {
  color,
  linerColorTwo,
  legend,
  yAxis,
  geoCoordMap,
  commonLine,
  commonMap,
  commonPie,
  commonGauge
} from '@/utils/V2/unisk-options-v2.js'
import { thousands } from '@/utils/index.js'
export default {
  async getMonthIncomeAndUserOne (data) {
    let result = {}

    await ProductInfoApi.getMonthIncomeAndUserOne(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    let options = {}
    // 判断收入数据
    if (!result.incomes || result.incomes.length === 0) {
      options.incomes = {}
    } else {
      let totalIncomes = 0
      for (var i in result.incomes) {
        totalIncomes += Number(result.incomes[i].iy)
      }
      options.incomes = this.createUserAndIncomeLine(result.incomes, 'ix', 'iy', 'iyTrend', ['实收（万）', '预估收入（万）'], '总收入', totalIncomes)
    }
    // 判断用户数据
    if (!result.users || result.users.length === 0) {
      options.users = {}
    } else {
      options.users = this.createUserAndIncomeLine(result.users, 'ux', 'uy', 'uyTrend', ['实际用户数（万）', '预估用户数（万）'], '总用户量', (Number(result.users[result.users.length - 1].uy) / 10000).toFixed(2))
    }
    return options
  },

  createUserAndIncomeLine (data, x, y, yt, seriesName, title, total, yName) {
    let option = JSON.parse(JSON.stringify(commonLine))
    option.color = color
    let [xs, counts, trends] = [[], [], []]

    data.forEach(item => {
      item.uy = item.uy / 10000
      item.uyTrend = item.uyTrend / 10000
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

    option.grid.bottom = '20%'
    if (title === '总收入') {
      title += '：' + thousands(total) + '万'
      option.title = {
        text: title,
        textAlign: 'left',
        left: '20px',
        textStyle: {
          color: '#FFFFFF'
        }
      }
    }

    option.tooltip.formatter = function (params) {
      return '<p style="text-align:center;font-weight:600">' + params[0].data.name + '</p>' +
               '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params[0].color +
        ';">' +
             '<p style="text-align:left;">' + params[0].seriesName + ':' + params[0].data.value + '</p>' +
            '<p style="text-align:left;">预估（万）' + params[1].data.value + '</p>'
    }

    option.legend.data = seriesName
    option.legend.top = '8%'

    option.xAxis.data = xs
    option.xAxis.axisLabel.rotate = 0

    option.yAxis = [JSON.parse(JSON.stringify(yAxis)), JSON.parse(JSON.stringify(yAxis))]
    // option.yAxis[0].name = '(万)'
    // option.yAxis[1].name = '(万)'
    option.yAxis[0].axisLabel.rotate = 0
    // option.xAxis.axisLabel.formatter = function (value) {
    //   value = value.substring(0, 6)

    //   if (value.substring(4, 5) === '0') {
    //     value = value.substring(5, 6) + '月'
    //   } else {
    //     value = value.substring(4, 6) + '月'
    //   }

    //   return value
    // }
    let seriesItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem))]

    option.series[0].data = counts
    option.series[0].name = seriesName[0]

    option.series[1].data = trends
    option.series[1].name = seriesName[1]
    option.series[1].areaStyle.color = linerColorTwo
    option.series[1].smooth = false
    option.series[1].areaStyle.opacity = 0
    option.series[0].smooth = false
    option.series[0].areaStyle.opacity = 0
    return option
  },
  async getProvinceDatas (data) {
    let result = {}
    await ProductInfoApi.getProvinceDatas(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    return this.setMapOption(result)
  },
  setMapOption (data) {
    let option = JSON.parse(JSON.stringify(commonMap))
    option.color = color
    let seriesMapData = []
    let defaultMapData = []
    data.dataItems.forEach(element => {
      let geoCoord = geoCoordMap[element.province]
      if (geoCoord) {
        seriesMapData.push({
          name: element.province,
          value: element.userCount,
          provinceCode: element.provinceCode,
          realValue: element.userCount
        })
        // 添加地图默认颜色
        if (element.province === '北京') {
          defaultMapData.push({
            name: element.province,
            value: element.userCount,
            realValue: element.userCount
          })
        }
      }
    })
    seriesMapData.push({
      name: '台湾',
      value: 0,
      provinceCode: '台湾',
      realValue: 0

    })
    seriesMapData.push({
      name: '南海诸岛',
      value: 0,
      provinceCode: '南海诸岛',
      realValue: 0
    })
    option.series[0].data = this.convertData(defaultMapData)
    option.series[0].label = {
      normal: {
        show: true,
        formatter (params) {
          return ['{t|' + params.data.name + '}', '{h|}', '{c|' + params.data.realValue + '}'].join('\n')
        },
        position: 'top',
        backgroundColor: 'rgba(255,255,255,1)',
        padding: [0, 0],
        borderRadius: 3,
        // lineHeight: 32,
        // color: '#f7fafb',
        rich: {
          t: {
            color: '#000000',
            align: 'center',
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 22
          },
          h: {
            borderColor: color[0],
            width: '100%',
            borderWidth: 2,
            align: 'left',
            height: 0
          },
          c: {
            color: '#000000',
            align: 'center',
            fontSize: 20,
            lineHeight: 24
          }
        }
      },
      emphasis: {
        show: true
      }
    }
    // 给第一个添加地图
    option.series[1].data = seriesMapData
    seriesMapData = seriesMapData.sort(function (a, b) {
      return a.value - b.value
    })

    option.visualMap.left = '1%'
    option.visualMap.bottom = '10%'
    if (seriesMapData.length > 2) {
      option.visualMap.min = seriesMapData[2].value
      option.visualMap.max = seriesMapData[seriesMapData.length - 1].value
    } else {
      option.visualMap.min = 0
      option.visualMap.max = 100
    }

    // option.series[1].selectedMode = true
    return option
  },
  convertData (data) {
    var res = []
    data.forEach(element => {
      var geoCoord = geoCoordMap[element.name]
      if (geoCoord) {
        let item = JSON.parse(JSON.stringify(element))
        item.value = geoCoord.concat(item.value)
        res.push(item)
      }
    })
    return res
  },
  async getUserTotal (data) {
    let result = {}
    await ProductInfoApi.getUserTotal(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
      // 开通用户数
    })
    let options = {}
    if (!result.hadUsers || result.hadUsers.length === 0) {
      options.hadUsers = {}
      options.open = JSON.parse(JSON.stringify(options.hadUsers))
    } else {
      options.open = this.setOpenOption(result.hadUsers, result.year)
    }
    // 用户群体
    if (!result.userGroups || result.userGroups.length === 0) {
      options.userGroups = {}
    } else {
      options.userGroups = this.createGroupOption(result.userGroups)
    }

    options.active = this.setActiveOption(result.activeUsers, result.year)
    return options
  },
  setOpenOption (data, year) {
    let option = JSON.parse(JSON.stringify(commonPie))
    option.color = color
    let [legendData, seriesData] = [ [], [] ]
    data.forEach(element => {
      legendData.push(element.network)
      seriesData.push({
        name: element.network,
        value: element.count
      })
    })
    option.tooltip.trigger = 'item'
    option.tooltip.formatter = function (params) {
      return '<p style="text-align:center;font-weight:600">' + params.data.name + '</p>' +
               '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params.color +
        ';">' +
             '<p style="text-align:center;">' + params.data.value + '</p>'
    }

    option.legend.data = legendData
    option.legend.bottom = '15%'

    option.series[0].data = seriesData
    option.series[0].center = ['50%', '40%']
    option.series[0].radius = ['35%', '55%']
    option.series[0].label.show = false
    return option
  },
  setActiveOption (data, year) {
    let option = JSON.parse(JSON.stringify(commonGauge))
    option.color = color

    option.title = { show: false }

    let seriesItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem))]
    option.series[0].data = [{ name: '日活跃', value: data.dayRatio, count: data.dayCount }]
    option.series[0].center = ['25%', '60%']
    option.series[0].detail.formatter = function (value) {
      return value === 0 || value ? value + '%' : ''
    }

    option.series[1].data = [{ name: '月活跃', value: data.monthRatio, count: data.monthCount }]
    option.series[1].center = ['75%', '60%']
    option.series[1].detail.formatter = function (value) {
      return value === 0 || value ? value + '%' : ''
    }
    return option
  },
  createGroupOption (data) {
    if (!data) return {}
    let option = JSON.parse(JSON.stringify(commonPie))
    // option.color = color
    // 饼状图男女颜色
    option.color = [color[2], color[1], color[0]].concat(color.slice(3))
    let [legendDataSex, legendData, seriesDataSex, seriesData] = [[], [], [], []]
    data.forEach(item => {
      let x = item.key
      if (x === '男' || x === '女') {
        legendDataSex.push(x)
        seriesDataSex.push({
          name: x,
          value: item.value
        })
      } else {
        legendData.push(x)
        seriesData.push({
          name: x,
          value: item.value
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

    if (legendDataSex.length === 0 || legendData.length === 0) {
      option.legend = [JSON.parse(JSON.stringify(legend))]
      option.legend[0].data = legendDataSex || legendData
      option.legend[0].bottom = '15%'
      option.legend[0].width = '50%'
      option.legend[0].left = '40%'

      let seriesItem = option.series[0]
      option.series = [JSON.parse(JSON.stringify(seriesItem))]
      option.series[0].data = seriesDataSex || seriesData
      option.series[0].center = ['50%', '40%']
      option.series[0].radius = ['35%', '55%']
      option.series[0].label.show = false
      return option
    }

    option.legend = [JSON.parse(JSON.stringify(legend)), JSON.parse(JSON.stringify(legend))]

    option.legend[0].data = legendDataSex
    option.legend[0].bottom = '15%'
    option.legend[0].width = '50%'
    option.legend[0].left = '15%'
    // option.legend[0].textStyle.fontSize = 16

    option.legend[1] = {
      type: 'scroll',
      bottom: '15%',
      left: '50%',
      width: '40%',
      itemWidth: 14,
      itemHeight: 14,
      textStyle: { color: '#FFFFFF', fontSize: 16, fontWeight: 600 },
      pageIconColor: '#FFFFFF',
      pageTextStyle: { color: ['#FFFFFF'], fontSize: 16, fontWeight: 600 },
      data: legendData
    }

    let seriesItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem))]
    option.series[0].name = '性别'
    option.series[0].data = seriesDataSex
    option.series[0].center = ['25%', '40%']
    option.series[0].radius = ['35%', '55%']
    option.series[0].label.show = false

    option.series[1].name = '年龄'
    option.series[1].data = seriesData
    option.series[1].center = ['75%', '40%']
    option.series[1].radius = ['35%', '55%']
    option.series[1].label.show = false
    return option
  },
  async getNewUserList (data) {
    let result
    await ProductInfoApi.getNewUserList(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItems
      }
    })
    return result
  }

}
