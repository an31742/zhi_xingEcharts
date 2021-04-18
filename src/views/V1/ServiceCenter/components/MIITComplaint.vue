<template>
  <div id="MIITPie" ref="MIITPie" style="width: 100%;height: 100%; margin-top:20px;"></div>
</template>

<script>
// import ServiceService from '@/service/service-service'
export default {
  props: {
    miit: {
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
    miit (newValue, oldValue) {
      this.tagList.push(newValue.beforeTag, newValue.tag)
      this.drawPie()
    }
  },
  mounted () {
    // this.getPieData()
  },
  methods: {
    drawPie () {
      var myChart = this.Echarts.init(document.getElementById('MIITPie'))
      myChart.setOption({
        color: ['#29C896', '#F85E28', '#FEAE4F'],
        legend: {
          data: this.tagList,
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '工信部申诉量',
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
              { value: this.miit.yearOnYear,
                name: '同比' + this.miit.yearOnYear + '%',
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
                value: 100 - this.miit.yearOnYear,
                name: '',
                itemStyle: { color: 'rgb(45, 67, 82)' },
                labelLine: { show: false }
              }
            ]
          },
          {
            name: '工信部申诉量',
            type: 'pie',
            radius: ['65%', '75%'],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            data: [
              { value: this.miit.beforeCount, name: this.tagList[0] },
              { value: this.miit.count, name: this.tagList[1] }
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
