// 用户中心服务层
import customers from '@/api/V1/customers.js'
import DrawUtils from '@/utils/draw-utils.js'
import {
  commonBar
} from '@/utils/options'

export default {
  async getDataListService (data) {
    let result = {
      tagCounts: {}
    }
    await customers.getDataList(data).then(res => {
      if (res.code === '200') {
        result.tagCounts = res.data.tagCounts
        result.modelTopList = res.data.modelTopList
        result.operateModelTopList = res.data.operateModelTopList
      }
    })
    return result
  },
  async getTimingListService (data) {
    let result = {
      tagTimingList: { x: [], y: [], l: [] },
      divTagTimingList: { x: [], y: [], l: [] },
      modelTimingList: { x: [], y: [], l: [] }
    }
    await customers.getTimingList(data).then(res => {
      if (res.code === '200') {
        for (let w in res.data.divTagTimingList) {
          result.divTagTimingList.x.push(res.data.divTagTimingList[w].dx)
          result.divTagTimingList.y.push({
            name: res.data.divTagTimingList[w].dx,
            value: res.data.divTagTimingList[w].dy
          })
        }
        result.divTagTimingList.l.push('自定义标签数')
        for (let n in res.data.modelTimingList) {
          result.modelTimingList.x.push(res.data.modelTimingList[n].mx)
          result.modelTimingList.y.push({
            name: res.data.modelTimingList[n].mx,
            value: res.data.modelTimingList[n].my
          })
        }
        result.modelTimingList.l.push('自研模型数')
      }
    })

    let divTagTimingOption = JSON.parse(JSON.stringify(commonBar))
    divTagTimingOption.legend = DrawUtils.getCommonLegend(result.divTagTimingList.l)
    divTagTimingOption.grid.left = '5%'
    divTagTimingOption.grid.right = '12%'

    divTagTimingOption.xAxis.name = '季度'
    divTagTimingOption.xAxis.data = result.divTagTimingList.x
    divTagTimingOption.xAxis.axisLine = { show: true, lineStyle: { color: '#29C896' } }
    divTagTimingOption.xAxis.axisTick = { show: true }
    divTagTimingOption.xAxis.axisLabel = { show: true, textStyle: { color: '#FFFFFF', fontWeight: 'bolder' } }

    divTagTimingOption.yAxis = DrawUtils.getCommonYAxis()

    divTagTimingOption.series[0] = {
      name: '自定义标签数',
      type: 'bar',
      barWidth: '20',
      itemStyle: { color: DrawUtils.getLinearGradient('#29C896', 0.6, '#29C896', 1) },
      data: result.divTagTimingList.y
    }

    let modelTimingOption = JSON.parse(JSON.stringify(commonBar))
    modelTimingOption.color = DrawUtils.getCommonColor()
    modelTimingOption.legend = DrawUtils.getCommonLegend(result.modelTimingList.l)
    modelTimingOption.grid.left = '5%'
    modelTimingOption.grid.right = '12%'
    modelTimingOption.xAxis.name = '季度'
    modelTimingOption.xAxis.data = result.modelTimingList.x
    modelTimingOption.xAxis.axisLine = { show: true, lineStyle: { color: '#29C896' } }
    modelTimingOption.xAxis.axisTick = { show: true }
    modelTimingOption.xAxis.axisLabel = { show: true, textStyle: { color: '#FFFFFF', fontWeight: 'bolder' } }
    modelTimingOption.yAxis = [DrawUtils.getCommonYAxis()]
    modelTimingOption.series[0] = {
      name: '自研模型数',
      type: 'bar',
      barWidth: '20',
      itemStyle: { color: DrawUtils.getLinearGradient('#29C896', 0.6, '#29C896', 1) },
      data: result.modelTimingList.y
    }

    return {
      'divTagTimingOption': divTagTimingOption,
      'modelTimingOption': modelTimingOption
    }
  },
  async getRootListService (data) {
    let result = { x: [], y: [], l: [] }
    let defaultTagId = ''
    let rootOption = JSON.parse(JSON.stringify(commonBar))
    await customers.getRootList(data).then(res => {
      for (let i in res.data.dataItems) {
        result.x.push(res.data.dataItems[i].tagName)
        let color = '#29C896'
        if (res.data.dataItems[i].tagType === '基础标签') {
          color = '#058cff'
        }
        defaultTagId = res.data.dataItems[0].tagId
        result.y.push({
          name: res.data.dataItems[i].tagName,
          value: res.data.dataItems[i].coverUserCount,
          tagId: res.data.dataItems[i].tagId,
          tagType: res.data.dataItems[i].tagType,
          color: color,
          itemStyle: {
            color: color,
            normal: {
              color: DrawUtils.getLinearGradient(color, 0.6, color, 1)
            }
          }
        })
      }
      rootOption.legend = { show: false }
      rootOption.xAxis.name = '标签'
      rootOption.grid = { right: '7%', top: '8%' }
      rootOption.xAxis.data = result.x
      rootOption.xAxis.axisLine = { show: true, lineStyle: { color: '#29C896' } }
      rootOption.xAxis.axisTick = { show: true }
      rootOption.xAxis.axisLabel = { show: true, textStyle: { color: '#FFFFFF', fontWeight: 'bolder' } }

      rootOption.yAxis = DrawUtils.getCommonYAxis()
      rootOption.yAxis.axisLabel.formatter = function (v, i) {
        return Math.floor(v / 10000) + '万'
      }
      rootOption.series = {
        name: '覆盖用户数',
        type: 'bar',
        barWidth: '20',
        data: result.y
      }
    })
    return [rootOption, defaultTagId]
  },
  async getLeafListService (data, secondColor) {
    let result = {
      usedList: { x: [], y: [], l: [] },
      userCountList: { x: [], y: [], r: [], l: [] },
      productList: { x: [], y: [], l: [] }
    }
    let usedOption = JSON.parse(JSON.stringify(commonBar))
    let userCountOption = JSON.parse(JSON.stringify(commonBar))
    let productOption = JSON.parse(JSON.stringify(commonBar))

    await customers.getLeafList(data).then(res => {
      if (res.code === '200') {
        for (let i in res.data.usedList) {
          result.usedList.x.push(res.data.usedList[i].ux)
          result.usedList.y.push(res.data.usedList[i].uy)
        }

        for (let i in res.data.userCountList) {
          result.userCountList.x.push(res.data.userCountList[i].cx)
          result.userCountList.y.push(res.data.userCountList[i].cy)
          result.userCountList.r.push(res.data.userCountList[i].tario)
        }
        for (let i in res.data.productList) {
          result.productList.x.push(res.data.productList[i].px)
          result.productList.y.push(res.data.productList[i].py)
        }
      }
    })
    // 二级标签调用量
    usedOption.grid = { top: '22%', right: '10%', bottom: '18%', left: '18%' }
    usedOption.legend = DrawUtils.getCommonLegend(['调用量'])
    usedOption.xAxis.data = result.usedList.x
    usedOption.xAxis.axisLine = { show: true, lineStyle: { color: '#29C896' } }
    usedOption.xAxis.axisTick = { show: true }
    usedOption.xAxis.axisLabel = {
      show: true,
      textStyle: { color: '#FFFFFF' },
      fontWeight: 'bolder',
      formatter: function (v, i) {
        v = v.substring(0, 1) + '\n' + v.substring(1)
        return v
      }
    }
    usedOption.yAxis = DrawUtils.getCommonYAxis()
    usedOption.series = {
      name: '调用量',
      type: 'bar',
      itemStyle: { color: DrawUtils.getLinearGradient(secondColor, 0.6, secondColor, 1) },
      data: result.usedList.y
    }

    // 二级标签用户量
    userCountOption.grid = { top: '22%', right: '10%', bottom: '18%', left: '18%' }
    userCountOption.legend = DrawUtils.getCommonLegend(['用户量（万）'])
    userCountOption.xAxis.data = result.userCountList.x
    userCountOption.xAxis.axisLine = { show: true, lineStyle: { color: '#29C896' } }
    userCountOption.xAxis.axisTick = { show: true }
    userCountOption.xAxis.axisLabel = {
      show: true,
      textStyle: { color: '#FFFFFF' },
      fontWeight: 'bolder',
      formatter: function (v, i) {
        v = v.substring(0, 1) + '\n' + v.substring(1)
        return v
      }
    }
    userCountOption.yAxis = DrawUtils.getCommonYAxis()
    userCountOption.yAxis.axisLabel.formatter = function (v, i) {
      return Math.floor(v / 10000)
    }
    userCountOption.series = {
      name: '用户量（万）',
      type: 'bar',
      itemStyle: { color: DrawUtils.getLinearGradient(secondColor, 0.6, secondColor, 1) },
      data: result.userCountList.y
    }

    // 二级标签产品数量
    productOption.grid = { top: '22%', right: '10%', bottom: '18%', left: '18%' }
    productOption.legend = DrawUtils.getCommonLegend(['产品数量'])
    productOption.xAxis.data = result.productList.x
    productOption.xAxis.axisLine = { show: true, lineStyle: { color: '#29C896' } }
    productOption.xAxis.axisTick = { show: true }
    productOption.xAxis.axisLabel = {
      show: true,
      textStyle: { color: '#FFFFFF' },
      fontWeight: 'bolder',
      formatter: function (v, i) {
        if (v.indexOf('人群') !== -1) {
          v = v.substring(0, v.indexOf('人群'))
          v = v.substring(0, 2) + '\n' + v.substring(2)
        }
        return v
      }
    }
    productOption.yAxis = DrawUtils.getCommonYAxis()
    productOption.series = {
      name: '产品数量',
      type: 'bar',
      barWidth: '20',
      itemStyle: { color: DrawUtils.getLinearGradient(secondColor, 0.6, secondColor, 1) },
      data: result.productList.y
    }
    return { 'usedOption': usedOption, 'userCountOption': userCountOption, 'productOption': productOption }
  },
  async getAdShowList (data) {
    let result
    await customers.getAdShowList(data).then(res => {
      result = res.data
    })
    return result
  }
}
