
import {
  ticContributionSortData,
  ticDevelopmentIncomeData,
  ticDevelopmentProjectData,
  ticTableData,
  ticScaleContributionData,
  ticInnovateResultData,
  ticAbilityData,
  ticKnowledgeData,
  ticSubCompanyData,
  ticSubCompanyContributionData } from './data/data.js'

import { commonBar, commonPie, colorBlue } from '@/utils/V2/unisk-options-v2.js'
export default {
  // TIC指数-在线公司贡献度季度排名
  getContributionSortOption () {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.series[1] = {
      type: 'line',
      name: '',
      symbol: 'circle',
      symbolSize: 4,
      data: []
    }
    let xAxisData = []
    let barData = []
    let lineData = []
    option.color = ['#3879F9', '#78FCFF']
    ticContributionSortData.sort.forEach(item => {
      xAxisData.push(item.name)
      barData.push(item.value)
    })
    ticContributionSortData.contribution.forEach(item => {
      lineData.push(item.value)
    })

    option.legend.data = ['贡献度', '排名']
    option.legend.top = '8%'
    option.xAxis.data = xAxisData
    option.xAxis.axisLabel.rotate = 0

    const yAxisItem = option.yAxis
    option.yAxis = [JSON.parse(JSON.stringify(yAxisItem)), JSON.parse(JSON.stringify(yAxisItem))]
    option.yAxis[0].axisLabel.rotate = 0
    option.yAxis[0].position = 'left'
    option.yAxis[1].inverse = true
    option.yAxis[1].axisLabel.rotate = 0
    option.yAxis[0].position = 'right'

    option.series[0].name = option.legend.data[0]
    option.series[0].data = lineData
    option.series[1].name = option.legend.data[1]
    option.series[1].data = barData
    option.series[1].yAxisIndex = 1

    option.grid.top = '20%'
    option.grid.bottom = '15%'
    return option
  },
  // TIC指数-研发投入金额(累计值)
  getDevelopmentProjectOption () {
    let option = JSON.parse(JSON.stringify(commonBar))
    let ticDevelopmentIncomeDataName = []
    let ticDevelopmentIncomeDataValue = []
    ticDevelopmentIncomeData.forEach(item => {
      ticDevelopmentIncomeDataName.push(item.name)
      ticDevelopmentIncomeDataValue.push(item.value)
    })
    option.legend.data = ['研发投入金额(累计值)']
    option.legend.top = '9%'
    option.xAxis.data = ticDevelopmentIncomeDataName
    option.xAxis.axisLabel.rotate = 45
    option.xAxis.axisLabel.margin = 25
    option.yAxis.axisLabel.rotate = 0
    option.yAxis.name = '万元'
    option.yAxis.axisLabel.fontSize = 12
    option.grid.bottom = '20%'
    option.color = colorBlue
    option.series[0].data = ticDevelopmentIncomeData
    option.series[0].name = option.legend.data[0]

    return option
  },
  // TIC指数-研发项目数量（每月新增）
  getdevelopmentIncomeOption () {
    let option = JSON.parse(JSON.stringify(commonBar))

    let ticDevelopmentProjectDataName = []
    let ticDevelopmentProjectDataValue = []
    ticDevelopmentProjectData.forEach(item => {
      ticDevelopmentProjectDataName.push(item.name)
      ticDevelopmentProjectDataValue.push(item.value)
    })
    option.legend.data = ['研发项目数量（每月新增）']
    option.legend.top = '9%'
    option.xAxis.data = ticDevelopmentProjectDataName
    option.xAxis.axisLabel.rotate = 45
    option.xAxis.axisLabel.margin = 25
    option.yAxis.axisLabel.rotate = 0
    option.yAxis.name = '个'
    option.yAxis.axisLabel.fontSize = 12
    option.grid.bottom = '20%'
    option.color = colorBlue
    option.series[0].data = ticDevelopmentProjectData
    option.series[0].name = option.legend.data[0]

    return option
  },
  // TIC指数-本部业务部门贡献度排名
  getTableData () {
    return ticTableData
  },
  // TIC指数-科研项目规模贡献度排名
  getScaleContributionOption () {
    let option = JSON.parse(JSON.stringify(commonBar))
    let ticScaleContributionDataName = []
    let ticScaleContributionDataValue = []
    ticScaleContributionData.forEach(item => {
      ticScaleContributionDataName.push(item.name)
      ticScaleContributionDataValue.push(item.value)
    })

    option.legend.data = ['科研项目规模贡献度']
    option.legend.top = '9%'

    option.xAxis.data = ticScaleContributionDataName
    option.xAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.fontSize = 12
    option.grid.bottom = '20%'
    option.color = colorBlue
    option.series[0].data = ticScaleContributionData
    option.series[0].name = option.legend.data[0]
    return option
  },
  // TIC指数-科技创新成果贡献度
  getInnovateResultOption () {
    let option = JSON.parse(JSON.stringify(commonBar))
    let ticInnovateResultDataName = []
    let ticInnovateResultDataValue = []
    ticInnovateResultData.forEach(item => {
      ticInnovateResultDataName.push(item.name)
      ticInnovateResultDataValue.push(item.value)
    })

    option.legend.data = ['科技创新成果贡献度']
    option.legend.top = '9%'

    option.xAxis.data = ticInnovateResultDataName
    option.xAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.fontSize = 12
    option.grid.bottom = '20%'
    option.color = colorBlue
    option.series[0].data = ticInnovateResultData
    option.series[0].name = option.legend.data[0]
    return option
  },
  // TIC能力指数构成
  getAbilityOption () {
    let option = JSON.parse(JSON.stringify(commonPie))
    option.color = ['#B584F6', '#0655FB', '#84FCFD', '#F8F386', '#2B82F5', '#F3AA72']
    option.series[0].data = ticAbilityData
    option.series[0].center = ['50%', '48%']
    option.series[0].radius = [0, '65%']
    return option
  },
  // 公司年度知识产权受理情况
  getKnowledgeOption () {
    let option = JSON.parse(JSON.stringify(commonBar))

    option.color = ['#3879F9', '#78FCFF']

    option.legend.data = ['专利受理', '软著']
    option.legend.top = '9%'

    option.xAxis.data = ticKnowledgeData.x
    option.xAxis.axisLabel.rotate = 0

    const yAxisItem = option.yAxis
    option.yAxis = [JSON.parse(JSON.stringify(yAxisItem)), JSON.parse(JSON.stringify(yAxisItem))]
    option.yAxis[0].axisLabel.rotate = 0
    option.yAxis[0].scale = false
    option.yAxis[1].axisLabel.rotate = 0
    option.yAxis[1].position = 'right'

    let seriesItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem))]
    option.series[0].data = ticKnowledgeData.knowledge
    option.series[0].name = option.legend.data[0]
    option.series[1].data = ticKnowledgeData.soft
    option.series[1].name = option.legend.data[1]
    option.series[1].yAxisIndex = 1

    option.grid.top = '20%'
    option.grid.bottom = '15%'
    return option
  },
  // 子公司TIC指数
  getSubCompanyOption () {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.color = colorBlue

    let ticSubCompanyDataName = []
    let ticSubCompanyDataValue = []
    ticSubCompanyData.forEach(item => {
      ticSubCompanyDataName.push(item.name)
      ticSubCompanyDataValue.push(item)
    })

    option.legend.data = ['子公司TIC指数']
    option.legend.top = '5%'

    option.xAxis.data = ticSubCompanyDataName
    option.xAxis.axisLabel.rotate = 0

    option.yAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.fontSize = 12

    option.grid.bottom = '20%'

    option.series[0].data = ticSubCompanyData
    option.series[0].name = option.legend.data[0]

    return option
  },
  // 子公司贡献度
  getSubCompanyContributionOption () {
    let option = JSON.parse(JSON.stringify(commonBar))

    option.color = ['#78FCFF', '#F5F185', '#F3AA72', '#2D82F3']

    option.legend.data = ['科研项目规模', '科技创新成果', '技术人才', '科研实际投入金额']
    option.legend.top = '5%'

    option.xAxis.data = ticSubCompanyContributionData.x
    option.xAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.rotate = 0

    let seriesItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem))]
    option.series[0].data = ticSubCompanyContributionData.scale
    option.series[0].name = option.legend.data[0]
    option.series[0].stack = '总量'

    option.series[1].data = ticSubCompanyContributionData.result
    option.series[1].name = option.legend.data[1]
    option.series[1].stack = '总量'

    option.series[2].data = ticSubCompanyContributionData.person
    option.series[2].name = option.legend.data[2]
    option.series[2].stack = '总量'

    option.series[3].data = ticSubCompanyContributionData.income
    option.series[3].name = option.legend.data[3]
    option.series[3].stack = '总量'

    option.grid.top = '35%'
    option.grid.bottom = '20%'
    return option
  }
}
