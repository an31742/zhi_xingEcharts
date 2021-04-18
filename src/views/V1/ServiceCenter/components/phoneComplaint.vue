<template>
  <div id="phonePie" ref="phonePie" style="width: 100%;height: 100%;margin-top:20px;"></div>
</template>

<script>
// import ServiceService from '@/service/service-service'
export default {
  props: {
    phone: {
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
    phone (newValue, oldValue) {
      this.tagList.push(newValue.beforeTag, newValue.tag)
      this.drawPie()
    }
  },
  mounted () {
  },
  methods: {
    drawPie () {
      var myChart = this.Echarts.init(document.getElementById('phonePie'))
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
            name: '10015投诉量',
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
              { value: this.phone.yearOnYear,
                name: '同比' + this.phone.yearOnYear + '%',
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
                value: 100 - this.phone.yearOnYear,
                name: '',
                itemStyle: { color: 'rgb(45, 67, 82)' },
                labelLine: { show: false }
              }
            ]
          },
          {
            name: '10015投诉量',
            type: 'pie',
            radius: ['65%', '75%'],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            data: [
              { value: this.phone.beforeCount, name: this.tagList[0] },
              { value: this.phone.count, name: this.tagList[1] }
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
