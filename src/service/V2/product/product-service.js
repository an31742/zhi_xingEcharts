import ProductApi from '@/api/V2/product/product-api.js'
import {
  color,
  linerColorTwo,
  commonBar,
  common3DBar,
  commonLine,
  commonFunnel,
  commonPie
} from '@/utils/V2/unisk-options-v2.js'
import { thousands } from '@/utils/index.js'

export default {
  // 产品数量
  async getBusinessCount (data) {
    let result
    await ProductApi.getBusinessCount(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItems
      }
      console.log('res.data.dataItems', res)
    })
    // 需要的
    let subjectData = []
    let totalData = []
    let childrenData = []
    // 中间值
    let medianData = []
    let childData = []
    // 中间数据
    result.forEach(res => {
      medianData.push({
        classifyId: res.classifyId,
        classifyName: res.classifyName,
        productCount: res.productCount
      })
      childData.push(res.children)
    })
    // 拿到标题数据
    medianData.forEach((item, index) => {
      if (index === 0) {
        totalData.push({
          classifyId: item.classifyId,
          classifyName: item.classifyName,
          productCount: item.productCount
        })
      }
      if (index > 0) {
        subjectData.push({
          classifyId: item.classifyId,
          classifyName: item.classifyName,
          productCount: item.productCount
        })
      }
    })
    // 拿到子数据
    childData.forEach((item) => {
      // if (item === undefined) {
      //   console.log(111)
      // } else {
      //   item.forEach(val => {
      //     childrenData.push({
      //       classifyId: val.classifyId,
      //       classifyName: val.classifyName,
      //       productCount: val.productCount
      //     })
      //   })
      // }
      if (item) {
        item.forEach(val => {
          childrenData.push({
            classifyId: val.classifyId,
            classifyName: val.classifyName,
            productCount: val.productCount
          })
          subjectData.push({
            classifyId: val.classifyId,
            classifyName: val.classifyName,
            productCount: val.productCount
          })
        })
      }
    })

    console.log(11111, subjectData)

    return { totalData, subjectData }
    // return result
  },
  async getGradeViewTotal (data) {
    let result
    await ProductApi.getGradeViewTotal(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItems
      }
    })
    return result
  },
  setFunnelOpiton (data) {
    let option = JSON.parse(JSON.stringify(commonFunnel))
    option.color = ['#00fffd', '#1975ff', '#213ee0']

    const falseData = [20, 40, 60]
    let seriesData = []
    // let imgSrc = [
    //   document.getElementById('unicomImg'),
    //   document.getElementById('compImg'),
    //   document.getElementById('deptImg')
    // ]
    data.forEach((element, key) => {
      seriesData.push({
        name: element.gradeName,
        value: falseData[key],
        gradeId: element.gradeId,
        toShow: element.projectCount,
        label: {
          fontSize: 30,
          position: 'inside',
          padding: [40, 0, 0, 0],
          formatter: function (params) {
            let html = params.data.toShow
            return html
          },
          fontWeight: 'bolder',
          color: '#fff'
        },
        emphasis: {
          itemStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10,
            opacity: 0.4
          },
          label: {
            fontSize: 40,
            fontWeight: 600
          }
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
  async getMonthIncomeAndUserTotal (data) {
    let result
    await ProductApi.getMonthIncomeAndUserTotal(data).then(res => {
      if (res.code === '200') {
        result = res.data
      }
    })
    let options = {
      incomesOption: this.setLineOption(result.incomes, 'i', '(万)', '总收入', '收入总视图', result.totalIncomes),
      usersOption: this.setLineOption(result.users, 'u', '(万)', '总用户量', '用户总视图', result.totalUsers)

    }
    return options
  },
  setLineOption (data, name, yName, sName, title, total) {
    let option = JSON.parse(JSON.stringify(commonLine))

    let [xAxis, seriesData] = [[], []]

    data.forEach(element => {
      xAxis.push(element[name + 'x'])
      seriesData.push({
        name: element[name + 'x'],
        value: element[name + 'y']
      })
      // total += element[name + 'y']
    })
    let tooltipName = ''
    if (name === 'i') {
      option.color = '#2f66ff'
      let lineColor = JSON.parse(JSON.stringify(linerColorTwo))
      lineColor.colorStops = [{
        offset: 0, color: 'rgb(47,102,255, 0.8)'// 0% 处的颜色
      }, {
        offset: 1, color: 'rgb(47,102,255, 0)' // 100% 处的颜色
      }]
      option.series[0].areaStyle.color = lineColor

      option.yAxis.axisLabel.interval = 0

      title += '（2020年总收入：' + thousands(total) + '万）'
      tooltipName = '收入'
    } else {
      option.color = [color[1]]
      option.yAxis.axisLabel.interval = 10
      option.color = '#ffa967'
      let lineColor = JSON.parse(JSON.stringify(linerColorTwo))
      lineColor.colorStops = [{
        offset: 0, color: 'rgb(255,169,103, 0.8)'// 0% 处的颜色
      }, {
        offset: 1, color: 'rgb(255,169,103, 0)' // 100% 处的颜色
      }]
      option.series[0].areaStyle.color = lineColor
      title += '（总用户量：' + thousands(total) + '万）'
      tooltipName = '用户量'
    }

    option.tooltip.formatter = function (params) {
      let result = '<p style="text-align:center;font-size:16px;font-weight:600;">' +
        params[0].name + '</p>' +
        '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params[0].color +
        ';"><p style="text-align:center;"><b>' + tooltipName + '<b> : ' +
        params[0].value + '万</p>'
      return result
    }

    option.title = {
      text: title,
      textAlign: 'left',
      left: '20px',
      top: '10px',
      textStyle: {
        color: '#FFFFFF'
      }
    }

    option.grid.bottom = '14%'

    option.xAxis.data = xAxis
    option.xAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.rotate = 0

    option.series[0].name = sName
    option.series[0].data = seriesData
    return option
  },
  lifeIndex: 0,
  lifecycleDatas: null,
  async getLifecycleDatas (data, showNum = 30) {
    if (this.lifeIndex === 0 && !this.lifecycleDatas) {
      await ProductApi.getLifecycleDatas(data).then(res => {
        if (res.code === '200') {
          this.lifecycleDatas = res.data
          console.log('res.data1111', res.data)
        }
      })
      // this.lifeIndex = 23
      if (!data.gradeId &&
        !data.classifyId &&
        !data.marketId &&
        !data.groupId &&
        !data.knowledgeId
      ) {
        this.lifeIndex = 55
      } else if (data.gradeId === '部门') {
        this.lifeIndex = 30
      }
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
  },
  toShowOfIndex (type, count, showNum) {
    if (!this.lifecycleDatas || !this.lifecycleDatas.dataItems) return
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
    let [xAxis3D, seriesData] = [[], []]
    let colorLst = {
      '孵化期': '#02caf2',
      '成长期': '#29c896',
      '成熟期': '#425ced',
      '衰退期': '#b0dbff'
    }
    const len = data.length
    let count = 0
    let str = ''
    data.forEach((element, key) => {
      if (str !== '' && str !== element.lifecycle) {
        stageLst.push({
          name: str,
          percent: (count / len) * 100 + '%',
          color: '#fff',
          substyle: 'width: ' + (count / len) * 100 + '%' + ';border-top: 2px solid ' + colorLst[str]
        })
        count = 0
      }
      count++
      str = element.lifecycle
      if (key === len - 1) {
        stageLst.push({
          name: str,
          percent: (count / len) * 100 + '%',
          color: '#fff',
          substyle: 'width: ' + (count / len) * 100 + '%' + ';border-top: 2px solid ' + colorLst[str]
        })
      }
      xAxis3D.push(element.lifecycle)
      // if(element.id === "271") element.income = 1579  //沃畅游
      // if(element.id === "217") element.income = 8610  //视频彩铃
      // if(element.id === "323") element.income = 3688  //沃助理
      let labelColor = '#FFFFFF'
      let labelData = ['271', '217', '323', '219', '291', '308', '321', '318', '264', '230', '220', '252', '226', '227', '234']
      if (labelData.join(',').indexOf(element.id) !== -1) {
        labelColor = '#F9C002'
      }
      seriesData.push({
        name: element.projectName,
        productId: element.id,
        income: element.income,
        value: [(element.x - this.lifeIndex > 0 ? element.x - this.lifeIndex : element.x + (this.lifecycleDatas.dataItems.length - this.lifeIndex)) - 1, 1, element.income + Math.random(10000)],
        infos: element.infos,
        market: element.market,
        label: {
          show: true,
          distance: 10,
          formatter: function (params) {
            if (params.data.name && params.data.name !== '') {
              return params.data.name.split('').join('\n')
            } else {
              return ''
            }
          },
          textStyle: {
            color: labelColor,
            backgroundColor: 'transparent',
            fontSize: 18
          }
        },
        itemStyle: {
          color: colorLst[element.lifecycle] || '#FFF'
        },
        emphasis: {
          label: {
            textStyle: {
              fontSize: 20,
              backgroundColor: 'transparent',
              color: labelColor
            }
          }
        }
      })
    })
    option.tooltip.trigger = 'item'
    option.tooltip.formatter = function (params) {
      let result = ''
      result += '<h2>' + params.name + '</h2>'
      result += '<hr><div style="margin-top:15px;font-size:16px;font-weight:600;">'
      // <br><p style="line-height:3px;margin-top:1px;">' + params.marker + '<b style="color:red;">收入：</b>' + params.data.income + '万</p><br>'
      params.data.infos.forEach(res => {
        // result += '<p style="line-height:3px;">' + params.marker + '<b style="color:red;">' + res.key + '：</b>'
        if (res.value.length > 20) {
          let n = Math.floor(res.value.length / 20) + 1
          for (let i = 0; i < n; i++) {
            if (i === 0) {
              result += '<p style="margin-top:5px;line-height:3px;">' + res.value.substring(i * 20, 20) + '</p><br>'
            } else {
              result += '<p style="line-height:3px;">' + res.value.substr(i * 20, 20) + '</p><br>'
            }
          }
        } else {
          result += res.value + '</p><br>'
        }
      })
      result += '</div>'
      return result
    }

    option.xAxis3D.data = xAxis3D
    option.series.data = seriesData
    option.series.animationDurationUpdate = 1000
    option.series.animationDuranimationEasingUpdateationUpdate = 'quinticInOut'
    return {
      option,
      stageLst
    }
  },

  async getAllClassifyDatas (data) {
    let result
    await ProductApi.getAllClassifyDatas(data).then(res => {
      if (res.code === '200') {
        result = res.data.dataItems
      }
    })
    let options = {}
    result.forEach(item => {
      if (item.key === 'market') options.marketOption = this.getPieOption(item.value, item.key)
      if (item.key === 'department') options.departmentOption = this.getDepartmentOption(item.value)
      if (item.key === 'knowleage') options.knowleageOption = this.getPieOption(item.value, item.key)
    })
    return options
  },
  getDepartmentOption (data) {
    let option = JSON.parse(JSON.stringify(commonBar))

    option.color = [color[3], color[0], color[1], color[2]]

    let [legendData, xData] = [[], []]
    data.forEach(element => {
      xData.push(element.x)
      element.yItems.forEach(item => {
        if (legendData.indexOf(item.lifecycle) === -1) {
          legendData.push(item.lifecycle)
        }
      })
    })
    legendData.forEach(leg => {
      let seriesData = []
      data.forEach(element => {
        element.yItems.forEach(item => {
          if (leg === item.lifecycle) {
            seriesData.push({
              name: element.x,
              xid: element.xId,
              value: item.count
            })
          }
        })
      })
      let seriesItem = JSON.parse(JSON.stringify(option.series[0]))
      seriesItem.data = seriesData
      seriesItem.stack = '总量'
      seriesItem.name = leg
      option.series.push(seriesItem)
    })

    option.legend.data = legendData
    option.legend.top = '8%'

    option.grid.bottom = '18%'
    option.xAxis.data = xData
    option.xAxis.axisLabel.rotate = 0
    option.xAxis.axisLabel.formatter = function (v, i) {
      if (v.indexOf('事业群') !== -1) {
        v = v.substring(0, v.indexOf('事业群'))
        v = v.substring(0, 2) + '\n' + v.substring(2)
      }
      if (v.indexOf('新文创') !== -1) {
        v = v.substring(0, 3) + '\n' + v.substring(3)
      }
      return v
    }

    option.yAxis.axisLabel.rotate = 0

    return option
  },
  getPieOption (data, key) {
    let option = JSON.parse(JSON.stringify(commonPie))
    option.color = color
    let [legendData, seriesData] = [[], [], []]
    data.forEach(element => {
      let count = 0
      if (element.x === '没有') element.x = '引入'
      if (element.x === '2b' || element.x === '2c' || element.x === '2b2c' || element.x === '2h') element.x = element.x.toUpperCase()
      element.yItems.forEach(item => {
        count += parseInt(item.count)
      })
      let vCount = count
      if (vCount < 10) {
        vCount += 10
      }
      legendData.push(element.x)
      seriesData.push({
        name: element.x,
        xid: element.xId,
        value: vCount,
        count: count
      })
    })

    option.tooltip.trigger = 'item'
    option.tooltip.formatter = function (params) {
      return '<p style="text-align:center;font-size:16px;font-weight:600;">' + params.data.name + '</p>' +
        '<hr style="width:100%;height:3px;border:none;border-top:3px double ' + params.color +
        ';">' +
        '<p style="text-align:center;">' + params.data.count + '</p>'
    }

    option.legend.data = legendData
    option.legend.bottom = '15%'

    option.series[0].data = seriesData
    option.series[0].center = ['50%', '40%']
    option.series[0].radius = ['40%', '65%']
    option.series[0].label.show = false
    option.series[0].roseType = false
    return option
  }

}
