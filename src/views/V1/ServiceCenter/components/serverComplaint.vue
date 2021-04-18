<template>
  <div id="myPie" ref="myPie" style="width: 100%;height: 100%;margin-top:20px;"></div>
</template>

<script>
// import ServiceService from '@/service/service-service'
export default {
  props: {
    customService: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      tagList: []
    }
  },
  watch: {
    customService (newValue, oldValue) {
      this.tagList.push(newValue.beforeTag, newValue.tag)
      this.drawPie()
    }
  },
  mounted () {
  },
  methods: {
    drawPie () {
      var myChart = this.Echarts.init(document.getElementById('myPie'))
      myChart.setOption({
        color: ['#29C896', '#F85E28', '#FEAE4F'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          data: this.tagList,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '客服投诉量',
            type: 'pie',
            // selectedMode: 'single',
            radius: ['45%', '55%'],

            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            avoidLabelOverlap: false,
            hoverAnimation: false,
            data: [
              { value: this.customService.yearOnYear,
                name: '同比' + this.customService.yearOnYear + '%',
                // tooltip: {
                //   trigger: 'item',
                //   formatter: '{a} <br/>{b}: {c}%'
                // },
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      fontSize: 16
                    }
                  }
                }
              },
              {
                value: 100 - this.customService.yearOnYear,
                name: '',
                itemStyle: { color: 'rgb(45, 67, 82)' },
                labelLine: { show: false }
              }
            ]
          },
          {
            name: '客服投诉量',
            type: 'pie',
            radius: ['65%', '75%'],

            data: [
              { value: this.customService.beforeCount,
                name: this.tagList[0] },
              { value: this.customService.count, name: this.tagList[1] }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
