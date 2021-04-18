// 产品中心服务层
import BoardApi from '@/api/V1/board.js'
import DrawUtils from '@/utils/draw-utils.js'
import {
  commonBar,
  commonLine,
  common3DBar,
  commonFunnel,
  commonMap,
  commonPie,
  commonTree
} from '@/utils/options'
import Echarts from 'echarts'

export default {
  // 产品数量
  async getBusinessCount (data) {
    let result
    await BoardApi.getBusinessCount(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItems
      }
    })
    result = result.reverse()
    let total = result.slice(0, 1)
    let before = result.slice(1, 4)
    let after = result.slice(4, 7)
    result = before.concat(total, after)
    // 在这里处理业务数据，并返回处理后的格式
    result.forEach((element, key) => {
      element.productCount = parseInt(element.productCount)
      element.icon = require('@/assets/V1/images/product_center/account/icon_' + (key + 1) + '.png')
    })
    return result
  },
  async getMonthIncomeAndUserTotal (data) {
    let result
    await BoardApi.getMonthIncomeAndUserTotal(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    let options = []
    options.push(
      this.setLineOption(result.incomes, 'i', '#b156f1', ['#b156f1', 'rgba(41,199,150,0)'], '(万元)', '收入数据'),
      this.setLineOption(result.users, 'u', '#29C896', ['#29C896', 'rgba(178,86,242,0)'], '(万)', '总用户量')
    )
    return options
  },
  setLineOption (data, name, itemColor, toColor, yName, sName) {
    let option = JSON.parse(JSON.stringify(commonLine))
    let [xAxis, seriesData] = [
      [],
      []
    ]
    data.forEach(element => {
      xAxis.push(element[name + 'x'])
      seriesData.push(element[name + 'y'])
    })
    option.xAxis.data = xAxis
    option.yAxis.name = yName || ''
    option.series = {
      name: sName,
      type: 'line',
      symbol: 'none',
      smooth: true,
      sampling: 'average',
      itemStyle: {
        color: itemColor
      },
      areaStyle: {
        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: toColor[0]
        }, {
          offset: 1,
          color: toColor[1]
        }])
      },
      data: seriesData
    }
    return option
  },
  lifeIndex: 0,
  lifecycleDatas: null,
  async getLifecycleDatas (data, showNum = 30) {
    if (this.lifeIndex === 0 && !this.lifecycleDatas) {
      await BoardApi.getLifecycleDatas(data).then(res => {
        if (res.code === '200') {
          this.lifecycleDatas = res.data
        }
      })
    }
    return this.toPlay(showNum)
  },
  toPlay (showNum) {
    if (this.lifecycleDatas.dataItems.length < showNum) {
      showNum = this.lifecycleDatas.dataItems.length
    }
    let res = this.lifecycleDatas.dataItems.slice(this.lifeIndex, this.lifeIndex + showNum)
    let len = res.length
    if (len < showNum) {
      res = res.concat(this.lifecycleDatas.dataItems.slice(0, showNum - len))
    }
    return this.setBar3DOption(res)
  },
  autoAdd () {
    this.lifeIndex = (this.lifeIndex < this.lifecycleDatas.dataItems.length) ? (this.lifeIndex + 1) : 0
    // return this.toPlay()
  },
  toShowOfIndex (type, count, showNum) {
    if (!this.lifecycleDatas || !this.lifecycleDatas.dataItems) return
    // this.lifeIndex = (type === 'prev') ? (((this.lifeIndex - count) > 0) ? (this.lifeIndex - count) : (this.lifeIndex - count) + this.lifecycleDatas.dataItems.length) : (((this.lifeIndex + count) < this.lifecycleDatas.dataItems.length) ? (this.lifeIndex + count) : ((this.lifeIndex + count) - this.lifecycleDatas.dataItems.length))
    if (type === 'next') {
      this.lifeIndex = this.lifeIndex + count
      this.lifeIndex = (this.lifeIndex < this.lifecycleDatas.dataItems.length) ? this.lifeIndex : 0
    }
    if (type === 'prev') {
      this.lifeIndex = this.lifeIndex - count
      this.lifeIndex = (this.lifeIndex < 0) ? this.lifecycleDatas.dataItems.length + this.lifeIndex : this.lifeIndex
    }
    return this.toPlay(showNum)
  },
  setBar3DOption (data) {
    let option = JSON.parse(JSON.stringify(common3DBar))
    let stageLst = []
    let [xAxis3D, seriesData] = [
      [],
      []
    ]
    let colorLst = {
      '孵化期': '#b156f1',
      '成长期': '#29C896',
      '成熟期': '#f8c002',
      '衰退期': '#4072ee'
    }
    const len = data.length
    let count = 0
    let str = ''
    data.forEach((element, key) => {
      if (str !== '' && str !== element.lifecycle) {
        stageLst.push({
          name: str,
          percent: (count / len) * 100 + '%'
        })
        count = 0
      }
      count++
      str = element.lifecycle
      if (key === len - 1) {
        stageLst.push({
          name: str,
          percent: (count / len) * 100 + '%'
        })
      }

      xAxis3D.push(element.lifecycle)
      seriesData.push({
        name: element.projectName,
        productId: element.id,
        income: element.income,
        value: [(element.x - this.lifeIndex > 0 ? element.x - this.lifeIndex : element.x + (this.lifecycleDatas.dataItems.length - this.lifeIndex)) - 1, 1, element.y],
        infos: element.infos,
        label: {
          distance: 4,
          formatter: function (params) {
            return params.data.name.split('').join('\n')
          },
          textStyle: {
            color: '#fff',
            fontSize: 14,
            backgroundColor: 'transparent'
          }
        },
        itemStyle: {
          color: colorLst[element.lifecycle] || '#FFF'
        },
        emphasis: {
          itemStyle: {
            color: '#09bbfe'
          },
          label: {
            distance: 4,
            textStyle: {
              color: '#09bbfe',
              fontSize: 14,
              backgroundColor: 'transparent'
            }
          }
        },
        tooltip: {
          formatter: function (params) {
            return params.data.name + '：<br><ul><li>收入：' + element.income + '</li></ul>'
          }
        }
      })
    })
    option.xAxis3D.data = xAxis3D
    option.series.data = seriesData
    option.series.animationDurationUpdate = 1000
    option.series.animationDuranimationEasingUpdateationUpdate = 'quinticInOut'
    return {
      option,
      stageLst
    }
  },
  async getGradeViewTotal (data) {
    let result
    await BoardApi.getGradeViewTotal(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItems
      }
    })
    return this.setFunnelOpiton(result)
  },
  setFunnelOpiton (data) {
    let option = JSON.parse(JSON.stringify(commonFunnel))
    const falseData = [20, 40, 60]
    let seriesData = []
    data.forEach((element, key) => {
      seriesData.push({
        name: element.gradeName,
        value: falseData[key],
        gradeId: element.gradeId,
        toShow: element.projectCount,
        label: {
          fontSize: 20,
          padding: [40, 0, 0, 0],
          formatter: function (params) {
            let html = `${params.data.toShow}`
            return html
          },
          fontWeight: 'bold',
          color: '#fdcc26'
        }
      })
    })
    option.tooltip.formatter = function (params) {
      let html = `<p>${params.marker} ${params.name}：${params.data.toShow}</p>`
      return html
    }
    option.series[0].data = seriesData
    return option
  },
  async getAllClassifyDatas (data) {
    let result
    await BoardApi.getAllClassifyDatas(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItems
      }
    })
    let options = []
    result.forEach(element => {
      options.push(this.setBarOption(element))
    })
    return options
  },
  setBarOption (data) {
    let option = JSON.parse(JSON.stringify(commonBar))
    let [legend, xAxis, series] = [
      [],
      [],
      []
    ]
    data.value.forEach(element => {
      xAxis.push(element.x)
      element.yItems.forEach(item => {
        if (legend.indexOf(item.lifecycle) === -1) {
          legend.push(item.lifecycle)
        }
      })
    })
    legend.forEach(leg => {
      let seriesData = []
      let names = []
      data.value.forEach(element => {
        element.yItems.forEach(item => {
          if (leg === item.lifecycle) {
            seriesData.push({
              name: element.x,
              xid: element.xId,
              value: item.count
            })
            names.push(element.x)
          }
        })
      })
      xAxis.forEach(item => {
        if (names.indexOf(item) === -1) {
          seriesData.push({
            name: item,
            value: 0
          })
        }
      })
      series.push({
        name: leg,
        type: 'bar',
        stack: '总量',
        barMaxWidth: 15,
        roundCap: true,
        itemStyle: {
          emphasis: {
            barBorderRadius: 2
          },
          normal: {
            barBorderRadius: 2
          }
        },
        data: seriesData
      })
    })
    option.legend.data = legend
    option.xAxis.data = xAxis
    option.xAxis.axisLabel = {
      interval: 0,
      fontWeight: 'bolder',
      formatter: function (v, i) {
        if (v.indexOf('事业群') !== -1) {
          v = v.substring(0, v.indexOf('事业群'))
          v = v.substring(0, 2) + '\n' + v.substring(2)
        }
        if (v.indexOf('新文创') !== -1) {
          v = v.substring(0, 3) + '\n' + v.substring(3)
        }
        if (v.length >= 4 && v.indexOf('2c') === -1) {
          v = v.substring(0, 2) + '\n' + v.substring(2)
        }
        return v
      }
    }
    option.series = series
    return option
  },
  // 以下是详情
  async getProjectDetail (data) {
    let result
    let openNumb = ''
    let payNumb = ''
    let activeNumb = ''
    let info
    await BoardApi.getProjectDetail(data).then(res => {
      if (res.code === '200') {
        result = res.data
        openNumb = result.hadUserCount || 0
        payNumb = result.feeUserCount || 0
        activeNumb = result.activeUserCount || 0
        info = result
      }
    })
    return {
      openNumb,
      payNumb,
      activeNumb,
      info
    }
  },
  async getMonthIncomeAndUserOne (data) {
    let result
    await BoardApi.getMonthIncomeAndUserOne(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    let options = []
    options.push(
      this.setLineOption(result.incomes, 'i', '#b156f1', ['#b156f1', 'rgba(41,199,150,0)'], '(万元)'),
      this.setLineOption(result.users, 'u', '#29C896', ['#29C896', 'rgba(178,86,242,0)'], '(万)')
    )
    return options
  },
  async getProvinceDatas (data) {
    let result
    await BoardApi.getProvinceDatas(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    return this.setMapOption(result)
  },
  setMapOption (data) {
    const geoCoordMap = {
      '台湾': [121.5135, 25.0308],
      '黑龙江': [127.9688, 45.368],
      '内蒙古': [110.3467, 41.4899],
      '吉林': [125.8154, 44.2584],
      '北京市': [116.4551, 40.2539],
      '辽宁': [123.1238, 42.1216],
      '河北': [114.4995, 38.1006],
      '天津': [117.4219, 39.4189],
      '山西': [112.3352, 37.9413],
      '陕西': [109.1162, 34.2004],
      '甘肃': [103.5901, 36.3043],
      '宁夏': [106.3586, 38.1775],
      '青海': [101.4038, 36.8207],
      '新疆': [87.9236, 43.5883],
      '西藏': [91.11, 29.97],
      '四川': [103.9526, 30.7617],
      '重庆': [108.384366, 30.439702],
      '山东': [117.1582, 36.8701],
      '河南': [113.4668, 34.6234],
      '江苏': [118.8062, 31.9208],
      '安徽': [117.29, 32.0581],
      '湖北': [114.3896, 30.6628],
      '浙江': [119.5313, 29.8773],
      '福建': [119.4543, 25.9222],
      '江西': [116.0046, 28.6633],
      '湖南': [113.0823, 28.2568],
      '贵州': [106.6992, 26.7682],
      '云南': [102.9199, 25.4663],
      '广东': [113.12244, 23.009505],
      '广西': [108.479, 23.1152],
      '海南': [110.3893, 19.8516],
      '上海': [121.4648, 31.2891]
    }
    let option = JSON.parse(JSON.stringify(commonMap))
    let seriesMapData = []
    let seriesScatterData = []
    data.dataItems.forEach(element => {
      let geoCoord = geoCoordMap[element.province]
      if (geoCoord) {
        seriesMapData.push({
          name: element.province,
          value: geoCoord.concat(element.userCount),
          provinceCode: element.provinceCode
        })
        seriesScatterData.push({
          name: element.province,
          value: geoCoord.concat(element.userCount),
          provinceCode: element.provinceCode,
          label: {
            show: true,
            textStyle: {
              color: '#0a53e9',
              fontSize: 9
            },
            formatter (value) {
              return Math.floor(value.data.value[2] / 1000) / 10 + '万'
            }
          }
        })
      }
    })

    option.visualMap.type = 'piecewise'
    option.visualMap.pieces = [
      { gt: 1000001, label: '>100万' },
      { gt: 500001, lte: 1000000, label: '(50万，100万]' },
      { gt: 100001, lte: 500000, label: '(10万，50万]' },
      { gt: 50001, lte: 100000, label: '(5万，10万]' },
      { gt: 10001, lte: 50000, label: '(1万，5万]' },
      { lte: 10000, label: '<=1万' }
    ]
    option.visualMap.top = '65%'

    option.series[0].data = seriesMapData
    option.series[1].data = seriesMapData
    option.series[2].data = seriesScatterData
    option.series[2].itemStyle.color = DrawUtils.getRadialGradient(0.5, 0.2, 0.8, 0, '#FFFFFF', 1, '#FFFF00')
    return option
  },
  async getUserTotal (data) {
    let result
    await BoardApi.getUserTotal(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    return {
      open: this.setPieOption(result.hadUsers),
      pay: this.setPayOption(result.feeUsers),
      active: this.setActiveOption(result.activeUsers)
    }
  },
  setPieOption (data) {
    let option = JSON.parse(JSON.stringify(commonPie))
    let [legendData, seriesData] = [
      [],
      []
    ]
    data.forEach(element => {
      legendData.push(element.network)
      seriesData.push({
        name: element.network,
        value: element.count
      })
    })
    option.legend.data = legendData
    option.series = [{
      name: '',
      type: 'pie',
      radius: ['40%', '58%'],
      center: ['70%', '50%'],
      hoverAnimation: false,
      startAngle: 120,
      itemStyle: {
        normal: {
          borderColor: '#02142e',
          borderWidth: 4,
          label: {
            show: true,
            position: 'outer',
            formatter: function (params) {
              if (params.name !== '') {
                return params.name + '\n' + '\n' + params.percent + '%'
              } else {
                return ''
              }
            }
          },
          labelLine: {
            show: true,
            color: '#00ffff'
          }
        }
      },
      data: seriesData
    }]
    return option
  },
  setPayOption (data) {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.yAxis.axisLabel = {
      formatter: function (v, i) {
        return Math.floor(v / 10000) + '万'
      }
    }
    let [legendData, series] = [
      [],
      [],
      []
    ]

    data.forEach(element => {
      legendData.push(element.channel)
      let seriesData = [{
        name: '年度',
        value: element.count
      }]
      series.push({
        name: element.channel,
        type: 'bar',
        data: seriesData
      })
    })
    option.grid.left = '40%'
    option.grid.right = '15%'
    option.xAxis.data = ['年度']
    option.legend = {
      type: 'scroll',
      orient: 'vertical',
      top: 45,
      left: 30,
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        color: '#FFFFFF'
      },
      pageTextStyle: {
        color: ['#FFFFFF']
      },
      data: legendData
    }
    option.series = series
    return option
  },
  setActiveOption (data) {
    let color = ['#b156f1', '#29C896']
    let dataStyle = {
      normal: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        shadowBlur: 40,
        shadowColor: 'rgba(0, 0, 0, 0)' // 边框阴影
      }
    }
    let placeHolderStyle = {
      normal: {
        borderWidth: 8,
        borderColor: '#322560',
        color: '#322560',
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: '#eee'
      }
    }
    let placeHolderStyle1 = {
      normal: {
        borderWidth: 8,
        borderColor: '#143560',
        color: '#143560',
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: '#eee'
      }
    }
    let option = JSON.parse(JSON.stringify(commonPie))
    option.tooltip = {
      trigger: 'item',
      show: true,
      formatter: function (params) {
        return `<p>${params.marker} ${params.name}：${params.value}(${params.percent}%)</p>`
      },
      backgroundColor: 'rgba(0,0,0,0.1)', // 背景
      padding: [8, 10], // 内边距
      extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.1);' // 添加阴影
    }
    option.legend.data = ['月活跃', '日活跃']
    option.series = [{
      name: 'Line 1',
      type: 'pie',
      clockWise: false,
      radius: ['70%', '75%'],
      center: ['70%', '50%'],
      roundCap: true,
      itemStyle: dataStyle,
      hoverAnimation: false,
      startAngle: 90,
      label: {
        borderRadius: '10'
      },
      data: [{
        value: data.monthCount / (data.monthRatio / 100) * (100 - data.monthRatio) / 100,
        name: '',
        tooltip: {
          show: false
        },
        itemStyle: placeHolderStyle
      }, {
        value: data.monthCount,
        name: '月活跃',
        itemStyle: {
          normal: {
            borderWidth: 8,
            borderColor: color[0],
            color: color[0]
          }
        }
      }]
    }, {
      name: 'Line 2',
      type: 'pie',
      clockWise: false,
      radius: ['40%', '45%'],
      center: ['70%', '50%'],
      roundCap: true,
      itemStyle: dataStyle,
      hoverAnimation: false,
      startAngle: 90,
      data: [{
        value: data.dayCount / (data.dayRatio / 100) * (100 - data.dayRatio) / 100,
        name: '',
        tooltip: {
          show: false
        },
        itemStyle: placeHolderStyle1
      }, {
        value: data.dayCount,
        name: '日活跃',
        itemStyle: {
          normal: {
            borderWidth: 8,
            borderColor: color[1],
            color: color[1]
          }
        }
      }]
    }]
    return option
  },
  async getNewUserList (data) {
    let result
    await BoardApi.getNewUserList(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItems
      }
    })
    return result
  },
  async getUserFace (data) {
    let result
    await BoardApi.getUserFace(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItems
      }
    })
    return this.setUserFaceOption(result)
  },
  setUserFaceOption (data) {
    let option = JSON.parse(JSON.stringify(commonTree))
    let seriesData = []
    let itemStyle = {
      color: DrawUtils.getRadialGradient(0.5, 0.2, 0.8, 0, '#FFFFFF', 1, '#28abfe'),
      borderWidth: 2,
      borderColor: '#3deff5',
      opacity: 0.6
    }
    data.forEach((element, key) => {
      let children = []
      element.values.forEach((cElt, value) => {
        children.push({
          name: cElt.type,
          value: cElt.value,
          itemStyle: itemStyle,
          symbolSize: '15'
        })
      })
      seriesData.push({
        name: element.model,
        value: element.key,
        symbolSize: '20',
        itemStyle: itemStyle,
        children
      })
    })
    option.series[0].data = [{
      name: '用户画像',
      value: '123',
      symbolSize: '30',
      itemStyle: itemStyle,
      children: seriesData
    }]
    return option
  },
  async getTendency (data) {
    let result
    await BoardApi.getTendency(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItem
      }
    })
    if (result.length === 0) { result = [] }
    return this.setTendencyOption(result)
  },
  setTendencyOption (data) {
    let option = JSON.parse(JSON.stringify(commonLine))
    let legendName = [{
      name: '开通',
      key: 'hadCount',
      color: '#29c695',
      toColor: 'rgba(41,198,149,0)'
    }, {
      name: '付费',
      key: 'feeCount',
      color: '#4072ee',
      toColor: 'rgba(64,114,238,0)'
    }, {
      name: '活跃',
      key: 'activeCount',
      color: '#00DEFF',
      toColor: 'rgba(29,38,236,0)'
    }, {
      name: '同比开通',
      key: 'beforeHadCount',
      color: '#b156f2',
      toColor: 'rgba(177,86,242,0)'
    }, {
      name: '同比付费',
      key: 'beforeFeeCount',
      color: '#f8c002',
      toColor: 'rgba(248,192,2,0)'
    }, {
      name: '同比活跃',
      key: 'beforeActiveCount',
      color: '#f06715',
      toColor: 'rgba(240,103,21,0)'
    }]
    let [legend, xAxis, yAxis, series] = [
      [],
      [],
      [],
      []
    ]
    data.forEach(element => {
      xAxis.push(element.x)
    })
    let index = 0
    legendName.forEach(leg => {
      let seriesData = []
      let names = []
      legend.push(leg.name)

      let yAxisItem = DrawUtils.getCommonYAxis()
      if (leg.name === '付费') {
        yAxisItem.position = 'left'
        yAxisItem.axisLabel.formatter = function (v, i) {
          return Math.floor(v / 10000) + '万'
        }
      } else {
        yAxisItem.position = 'right'
        yAxisItem.splitLine.show = false
        yAxisItem.axisLabel.show = false
      }
      yAxis.push(yAxisItem)

      data.forEach(element => {
        for (const key in element.yItems) {
          if (element.yItems.hasOwnProperty(key) && leg.key === key) {
            seriesData.push({
              name: element.x,
              value: Number(element.yItems[key]) || 0
            })
            names.push(element.x)
          }
        }
      })
      series.push({
        name: leg.name,
        type: 'line',
        smooth: true,
        symbol: 'none',
        yAxisIndex: index++,
        itemStyle: {
          color: leg.color
        },
        areaStyle: {
          color: DrawUtils.getLinearGradient(leg.toColor, 0, leg.toColor, 1)
        },
        data: seriesData
      })
    })
    option.legend = {
      icon: 'roundRect',
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        color: '#fff'
      },
      data: legend
    }
    option.xAxis.data = xAxis
    option.yAxis = yAxis
    option.series = series
    return option
  }
}
