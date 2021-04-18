<template>
  <div id="monthBar" ref="monthBar" style="width: 100%;height: 100%;padding-top:34px;"></div>
</template>

<script>
import ServiceService from '@/service/V1/service-service'
import DrawUtils from '@/utils/draw-utils.js'
export default {
  data () {
    return {
      year: '2020',
      provinceCode: '',
      xData: [],
      yData: [],
      secondColor: '#29C896'
    }
  },
  mounted () {
    this.getPieData(this.year, this.provinceCode)
  },
  methods: {
    getPieData (year, provinceCode) {
      ServiceService.getMonthListService(year, provinceCode).then(res => {
        this.year = res.year
        this.xData = res.xData
        this.yData = res.yData
        this.drawPie()
      })
    },
    drawPie () {
      var myChart = this.Echarts.init(document.getElementById('monthBar'))
      let yAxis = DrawUtils.getCommonXAxis()
      yAxis.data = this.yData
      yAxis.axisLine.show = true
      yAxis.axisLine.lineStyle = { color: this.secondColor }
      yAxis.axisLabel.color = '#FFFFFF'

      let linerColor = DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1)
      linerColor.y = 0
      linerColor.x2 = 1

      let tooltip = DrawUtils.getCommonTooptip()
      tooltip.formatter = function (params) {
        return params[0].seriesName + '<br/>' + params[0].marker + '<i>' + params[0].name + '->' + params[0].data + '</i>'
      }
      myChart.setOption({
        tooltip: tooltip,
        // 图标标记相关
        legend: DrawUtils.getCommonLegend([this.year + '年月受理工单']),
        grid: {
          left: '3%', // grid 组件离容器左侧的距离。
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          // 横坐标字体样式
          axisTick: {// 横坐标标记点小竖线
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          // 坐标轴轴线相关设置
          axisLine: {
            lineStyle: {
              color: 'transparent'
            }
          }
        },
        yAxis: yAxis,
        series: [
          {
            name: '月受理量',
            type: 'bar',
            barWidth: 23,
            itemStyle: { color: linerColor },
            data: this.xData
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
