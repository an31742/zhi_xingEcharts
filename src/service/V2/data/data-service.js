import DataApi from '@/api/V2/data/data-api.js'

import {
  linerColorThree,
  color,
  geoCoordMap,
  commonBar,
  commonMap
} from '@/utils/V2/unisk-options-v2.js'

export default {
  // 客群中心静态数据接口
  async getDataList (data) {
    let result = {}
    await DataApi.getDataList(data).then(res => {
      result = res.data
    })
    return { tagCounts: result.tagCounts }
  },
  async getAdShowList (data) {
    let result
    await DataApi.getAdShowList(data).then(res => {
      result = res.data
    })
    return result
  },
  // 周边数据接口
  async getSurroundList (data) {
    let result = {}
    await DataApi.getSurroundList(data).then(res => {
      result = res.data
    })
    let resultData = {}
    result.dataItem.rankingList.forEach(element => {
      if (element.key === 'advertisement') resultData.advertisement = element.top5
      if (element.key === 'management') resultData.management = element.top5
    })
    resultData.networkOption = this.getBarOption(result.dataItem.rankingList[0].top5, 'key', 'value', ['大网数据'])

    resultData.customOption = this.getBarOption(result.dataItem.customList, 'x', 'y', ['自定义标签类别'])
    resultData.modelOption = this.getBarOption(result.dataItem.modelList, 'x', 'y', ['自定义模型数'])
    resultData.productList = result.productList
    resultData.businessList = result.businessList
    return resultData
  },
  getBarOption (data, x, y, legendData) {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.color = color
    let [xAxisData, seriesData] = [[], []]
    data.forEach(element => {
      xAxisData.push(element[x])
      seriesData.push({
        name: element[x],
        value: element[y]

      })
    })

    option.legend.data = legendData
    option.legend.top = '8%'

    option.grid.bottom = '10%'
    option.grid.left = '5%'

    option.xAxis.data = xAxisData

    // option.xAxis.axisLabel.rotate = 0

    option.yAxis.axisLabel.rotate = 0

    option.series[0].data = seriesData
    option.series[0].name = legendData[0]

    if (option.series[0].name === '自定义标签类别') {
      option.xAxis.axisLabel.rotate = 45
      option.xAxis.axisLabel.margin = 20
      option.series[0].barWidth = '20'
      option.xAxis.axisLabel.align = 'right'
      let colorThree = JSON.parse(JSON.stringify(linerColorThree))
      option.color = colorThree
    } else if (option.series[0].name === '自定义模型数') {
      option.xAxis.axisLabel.rotate = 45
      option.xAxis.axisLabel.margin = 20
      option.series[0].barWidth = '20'
      option.xAxis.axisLabel.align = 'right'
      let colorThree = JSON.parse(JSON.stringify(linerColorThree))
      option.color = colorThree
    } else if (option.series[0].name === '大网数据') {
      option.xAxis.axisLabel.rotate = 0
      option.xAxis.axisLabel.margin = 20
      option.series[0].barMaxWidth = '37'
      option.series[0].barWidth = '37'
      option.grid.bottom = '15%'
      option.series[0].label = {
        color: '#fff',
        show: true,
        position: 'top'
      }
      option.color = '#296FF3'
    } else {
      option.xAxis.axisLabel.rotate = 0
    }

    if (option.series[0].name === '行为标签') {
      option.xAxis.axisLabel.rotate = 0
      option.xAxis.axisLabel.margin = 20
      option.series[0].barWidth = 'auto'
      option.xAxis.axisLabel.align = 'top'
      // option.xAxis.axisLabel.fontSize = 14

      option.xAxis.axisLabel.formatter = function (value) {
        return value.split('').join('\n')
      }
    }

    return option
  },
  // 中部数据接口
  async getCenterList (data, tag) {
    let result = {}
    await DataApi.getCenterList(data).then(res => {
      result = res.data
    })
    let resultData = { tagList: [] }
    result.dataItem.tagList.forEach(element => {
      resultData.tagList.push(element.tag)
      if (element.tag === '地域标签') {
        resultData[element.tag] = this.getMapOption(element.items)
      } else if (element.tag === '年龄标签') {
        let itemData = [element.items[1]].concat([element.items[0]], element.items.slice(2))
        resultData[element.tag] = this.getBarOption(itemData, 'key', 'value', [element.tag])
      } else if (element.tag === '月话费') {
        let itemData = [element.items[2]].concat([element.items[1]], [element.items[3], element.items[4]], [element.items[0]])
        resultData[element.tag] = this.getBarOption(itemData, 'key', 'value', [element.tag])
      } else {
        resultData[element.tag] = this.getBarOption(element.items, 'key', 'value', [element.tag])
      }
    })
    return resultData
  },
  getMapOption (data) {
    let option = JSON.parse(JSON.stringify(commonMap))

    option.color = color

    let seriesMapData = []
    let defaultMapData = []
    data.forEach(element => {
      let geoCoord = geoCoordMap[element.key]
      if (geoCoord) {
        seriesMapData.push({
          name: element.key,
          value: element.value,
          realValue: element.value
        })
        // 添加地图默认颜色
        if (element.key === '北京') {
          defaultMapData.push({
            name: element.key,
            value: element.value,
            realValue: element.value
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
    option.grid = { bottom: '10%' }

    seriesMapData = seriesMapData.sort(function (a, b) {
      return a.value - b.value
    })

    option.visualMap.left = '1%'
    option.visualMap.bottom = '10%'
    option.visualMap.min = seriesMapData[2].value
    option.visualMap.max = seriesMapData[seriesMapData.length - 1].value
    // 从左到右02caf2    29c896    425ced   b0dbff
    // option.visualMap.inRange.color = []
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
  }
}
