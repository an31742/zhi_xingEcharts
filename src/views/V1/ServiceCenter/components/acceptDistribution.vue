<template>
  <div id="chinaMap" ref="chinaMap" style="width: 95%;height:95%;"></div>
</template>

<script>
// import ServiceService from '@/service/service-service'
import 'echarts/map/js/china.js'
export default {
  props: {
    dataList: Array
  },
  data () {
    return {
      year: '2020',
      dataArray: []
    }
  },
  watch: {
    dataList (newValue, oldValue) {
      this.dataList = newValue
      this.dataArray = []
      this.dataList.forEach(res => {
        this.dataArray.push(res.value)
      })
      this.drawPie()
    }
  },
  mounted () {
  },
  methods: {
    getMonthData () {
      console.log('this.$parent', this.$parent.$parent)
    },
    drawPie () {
      let that = this
      var myChart = this.Echarts.init(document.getElementById('chinaMap'))
      // 点击省分时触发月分布量接口
      myChart.on('click', function (params) {
        that.$parent.$parent.$refs.acceptMonth.getPieData(that.year, params.name)
      })
      let dataArraySort = this.dataArray.sort((a, b) => a - b)
      myChart.setOption({
        tooltip: {
          formatter: function (params, ticket, callback) {
            return params.seriesName + '<br />' + params.name + '：' + params.value
          },
          backgroundColor: 'rgba(50,50,50,0.7)',
          textStyle: {
            color: '#0af1ff'
          }
        },
        visualMap: {
          min: dataArraySort[0],
          max: dataArraySort[dataArraySort.length - 1],
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          inRange: {
            color: ['#a0ddc3', '#29C896']// 地图色系变化
          },
          textStyle: {
            color: '#fff'
          },
          show: true
        },
        geo: {
          map: 'china',
          roam: false,
          zoom: 1.23,
          label: {
            normal: {
              show: true,
              fontSize: '10',
              color: '#fff'// 省会城市颜色
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'// 省分边框颜色
            },
            emphasis: {
              areaColor: '#0af1ff', // 选中省分时颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        series: [
          {
            name: '受理量分布',
            type: 'map',
            geoIndex: 0,
            data: this.dataList
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
