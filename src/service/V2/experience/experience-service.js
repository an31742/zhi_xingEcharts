import ExperienceApi from '@/api/V2/experience/experience-api.js'
import {
  color,
  geoCoordMap,
  commonMap,
  commonPie,
  commonLine,
  seriesBar
} from '@/utils/V2/unisk-options-v2.js'

export default {
//  客服中心数据接口
  async getDataListService (data, mapChart) {
    let result = {
      mapOption: {},
      accessChannels: '', // 受理渠道
      customService: '', // 客服投诉量
      phone: '', // 10015投诉量
      miit: ''// 工信部申诉量
    }

    await ExperienceApi.getDataList(data).then(res => {
      result.accessChannels = res.data.accessChannels
      result.customOption = this.createPieOption(res.data.yearOnYearItems[0].item)
      result.phoneOption = this.createPieOption(res.data.yearOnYearItems[1].item)
      result.miitOption = this.createPieOption(res.data.yearOnYearItems[2].item)
      result.mapOption = this.createMapOption(res.data.mapDatas, mapChart)
    })
    return result
  },
  createPieOption (data) {
    if (data.beforeTag === '201901-201911') {
      data.beforeTag = '2019'
    }
    if (data.tag === '202001-202011') {
      data.tag = '2020'
    }
    let option = JSON.parse(JSON.stringify(commonPie))

    option.color = color
    let legendData = [data.beforeTag, data.tag]
    let seriesData = [{
      name: data.beforeTag,
      value: data.beforeCount
    }, {
      name: data.tag,
      value: data.count
    }]

    let innerSeriesData = [{
      name: '1月-12月同比',
      value: data.yearOnYear + '%'

    }]

    option.tooltip.trigger = 'item'
    option.tooltip.formatter = function (params) {
      return '<p style="text-align:center;font-size:16px;font-weight:600">' + params.data.name + '</p>' +
               '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params.color +
        ';">' +
             '<p style="text-align:center;">' + params.data.value + '</p>'
    }

    option.legend.data = legendData
    option.legend.top = '20'

    let seriesItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem))]
    option.series[0].data = seriesData
    option.series[1].data = innerSeriesData
    option.series[1].radius = ['30%', '45%']
    option.series[1].label.position = 'center'
    return option
  },
  createMapOption (data, mapChart) {
    let option = JSON.parse(JSON.stringify(commonMap))
    option.color = color
    let mapData = []
    let defaultMapData = [] // 设置北京
    data.forEach(element => {
      let geoCoord = geoCoordMap[element.province]
      if (geoCoord) {
        mapData.push({
          name: element.province,
          value: element.accessCount,
          provinceCode: element.provinceCode,
          realValue: element.accessCount
        })
        // 如果这个省份是北京就添加到默认颜色
        if (element.province === '北京') {
          defaultMapData.push({
            name: element.province,
            value: element.accessCount,
            provinceCode: element.provinceCode,
            realValue: element.accessCount
          })
        }
      }
    })
    mapData.push({
      name: '台湾',
      value: 0,
      provinceCode: '台湾',
      realValue: 0
    })
    mapData.push({
      name: '南海诸岛',
      value: 0,
      provinceCode: '南海诸岛',
      realValue: 0
    })
    // 将北京添加到第一个
    option.series[0].data = this.convertData(defaultMapData)
    // 设置第一个的label
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
    option.series[1].data = mapData

    mapData = mapData.sort(function (a, b) {
      return a.value - b.value
    })
    option.visualMap.left = '5%'
    option.visualMap.bottom = '10%'
    option.visualMap.min = mapData[2].value
    option.visualMap.max = mapData[mapData.length - 1].value

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
  //  月度累计受理量接口
  async getMonthListService (data) {
    let result = {
      year: '',
      monthOption: {}
    }
    let monthData = []
    // let monthDataOld = []
    await ExperienceApi.getMonthList(data).then(res => {
      result.year = res.data.year
      monthData = res.data.dataItemsNew
      // monthDataOld = res.data.dataItems
    })
    let option = JSON.parse(JSON.stringify(commonLine))
    option.color = ['#78FCFF', '#FEF888', '#4285f4']
    let [legendData, xAxisData, upSeriesData, askSeriesData, ratioData] = [[], [], [], [], []]
    legendData = ['投诉同比增长率', '收入同比增长率', '万投比']
    monthData.forEach((element, index) => {
      xAxisData.push(element.x)
      if (element.uy < 1000) {
        upSeriesData.push({
          name: element.x,
          value: element.uy,
          realValue: element.u
        })
      }
      askSeriesData.push({
        name: element.x,
        value: element.ay,
        realValue: element.ay
      })
      if (element.wy > 5) {
        ratioData.push({
          name: element.x,
          value: element.wy,
          realValue: element.wy,
          // markPoint: {
          // },
          itemStyle: {
            color: '#fc8e0f'
          }
          // data: [{
          //   value: parseFloat(element.value),
          //   coord: [2, 100]
          // }]

        })
      } else {
        ratioData.push({
          name: element.x,
          value: element.wy,
          realValue: element.wy

        })
      }
    })
    upSeriesData.push({
      name: 'wo门户',
      value: 250,
      realValue: 250
    })
    upSeriesData.push({
      name: '沃无忧',
      value: 260,
      realValue: 260
    })
    upSeriesData.push({
      name: '萌娃小Q',
      value: 300,
      realValue: 300
    })
    option.grid.bottom = '-12%'
    option.grid.left = '3%'
    option.grid.top = '3%'

    option.tooltip.formatter = function (params) {
      if (params[0].data.value === 250) {
        params[0].data.value = '1400.00'
      } else if (params[0].data.value === 260) {
        params[0].data.value = '1725.80'
      } else if (params[0].data.value === 300) {
        params[0].data.value = '5100.00'
      }
      return '<p style="text-align:center;font-size:16px;font-weight:600;">' + params[0].data.name + '</p>' +
               '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params[0].color +
        ';">' +
             '<p style="text-align:left;">投诉同比增长率：' + params[0].data.value + '%</p>' +
             '<p style="text-align:left;">收入同比增长率：' + params[1].data.value + '%</p>' +
             '<p style="text-align:left;">万投比：' + params[2].data.value + '%</p>'
    }

    option.legend.data = legendData
    option.legend.top = '8%'

    option.xAxis.data = xAxisData
    // option.xAxis.offset = -25
    option.xAxis.axisLabel.rotate = 0
    option.xAxis.axisLabel.formatter = function (value) {
      value = value.substring(0, 10)

      if (value.length > 4) {
        value = value.substring(0, 2) + '\n' + value.substring(2, 4) + '\n' + value.substring(4, 6) + '\n' + value.substring(6, 8) + '\n' + value.substring(8, 9)
      } else {
        value = value.substring(0, 1) + '\n' + value.substring(1, 2) + '\n' + value.substring(2, 3) + '\n' + value.substring(3, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 6) + '\n' + value.substring(6, 7) + '\n' + value.substring(7, 8) + '\n' + value.substring(8, 9)
      }

      return value
    }
    option.xAxis.axisLabel.margin = 10

    const yAxisItem = option.yAxis
    option.yAxis = [JSON.parse(JSON.stringify(yAxisItem)), JSON.parse(JSON.stringify(yAxisItem)), JSON.parse(JSON.stringify(yAxisItem))]
    option.yAxis[0].axisLabel.rotate = 0
    option.yAxis[2].position = 'right'
    option.yAxis[0].position = 'left'
    option.yAxis[0].minInterval = 50
    option.yAxis[2].axisLabel.rotate = 0
    option.yAxis[2].minInterval = 5
    // option.yAxis[1].name = '千'

    const serieaItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(serieaItem)), JSON.parse(JSON.stringify(serieaItem))]
    option.series[0].data = upSeriesData
    option.series[0].name = legendData[0]
    // option.series[0].yAxisIndex = 1
    option.series[1].data = askSeriesData
    option.series[1].name = legendData[1]
    option.series[0].areaStyle.color = 'transparent'
    option.series[1].areaStyle.color = 'transparent'
    let seriesBars = JSON.parse(JSON.stringify(seriesBar))
    option.series[2] = seriesBars
    option.series[2].data = ratioData
    option.series[2].name = legendData[2]
    // let markPointData = []

    // ratioData.forEach(item => {

    // })
    // option.series[2].markPoint.data = markPointData
    option.series[2].yAxisIndex = 2

    result.monthOption = option
    return result
  },
  createDecimalAfterDot (num, dot) {
    var re = /^\d+(?:\.\d{0,2})?/
    switch (dot) {
      case 2: re = /^\d+(?:\.\d{0,2})?/
        break
      case 4: re = /^\d+(?:\.\d{0,4})?/
        break
      case 6: re = /^\d+(?:\.\d{0,6})?/
        break
      case 8: re = /^\d+(?:\.\d{0,8})?/
        break
      default:
    }

    return Number(num.toString().match(re))
  }
}
