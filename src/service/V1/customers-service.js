// 用户中心服务层
import customers from '@/api/V1/customers.js'
import DrawUtils from '@/utils/draw-utils.js'

export default {
  async getDataListService (data) {
    let result = {
      tagCounts: {},
      topList: [],
      plateforms: []
    }
    await customers.getDataList(data).then(res => {
      if (res.code === '200') {
        result.tagCounts = res.data.tagCounts
        result.topList = res.data.topList.slice(0, 5)

        for (let i in res.data.plateforms) {
          result.plateforms.push({
            name: res.data.plateforms[i].plateform,
            symbolSize: Math.floor((Math.random() * 100) + 10),
            itemStyle: {
              color: DrawUtils.getRadialGradient(0.5, 0.2, 0.8, 0, '#FFFFFF', 1, '#28abfe'),
              borderWidth: 2,
              borderColor: '#3deff5',
              opacity: 0.6
            },
            label: {
              show: true,
              color: DrawUtils.getCommonColor()[Math.floor(Math.random() * 10)],
              fontWeight: 'bold',
              fontSize: 14
            }
          })
        }
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
    let dataItem = {}
    await customers.getTimingList(data).then(res => {
      if (res.code === '200') {
        dataItem = res.data

        for (let w in res.data.divTagTimingList) {
          result.divTagTimingList.x.push(res.data.divTagTimingList[w].dx)
          result.divTagTimingList.y.push(res.data.divTagTimingList[w].dy)
        }
        result.divTagTimingList.l.push('自定义标签类别')
        for (let n in res.data.modelTimingList) {
          result.modelTimingList.x.push(res.data.modelTimingList[n].mx)
          result.modelTimingList.y.push(res.data.modelTimingList[n].my)
        }
        result.modelTimingList.l.push('自研模型类别')
      }
    })

    // [{key:'标签名称'，value:[{x:'季度'，y:'标签数量'}]}]
    dataItem.tagTimingList.forEach(tags => {
      result.tagTimingList.l.push(tags.key)
      let yItem = []
      tags.value.forEach(entity => {
        if (result.tagTimingList.x.indexOf(entity.x) === -1) {
          result.tagTimingList.x.push(entity.x)
        }
        yItem.push(entity.y)
      })
      result.tagTimingList.y.push({
        name: tags.key,
        type: 'bar',
        stack: '总量',
        barWidth: '10',
        label: {
          show: false,
          position: 'insideRight'
        },
        data: yItem
      })
    })

    return result
  },
  async getRootListService (data) {
    let result = {
      x: [],
      y: [],
      l: [],
      t: ''
    }
    await customers.getRootList(data).then(res => {
      for (let i in res.data.dataItems) {
        result.x.push(res.data.dataItems[i].tagName)
        let color = '#29C896'
        if (res.data.dataItems[i].tagType === '基础标签') {
          color = '#058cff'
        }
        result.t = res.data.dataItems[0].tagId
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
    })
    return result
  },
  async getLeafListService (data) {
    let result = {
      usedList: { x: [], y: [], l: [] },
      userCountList: { x: [], y: [], r: [], l: [] },
      productList: { x: [], y: [], l: [] }
    }
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
    return result
  }
}
