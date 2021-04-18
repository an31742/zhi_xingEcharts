<!-- 体验页 -->
<template>
  <div class="page-wrap">
    <HeadPart :titleName="$route.meta.title" />
    <div class="main">
      <div class="top">
        <div class="top-left">
          <div class="part-title">受理量分布</div>
          <div
            id="map"
            style="width: 1200px; height: 618px; position: relative"
          ></div>
        </div>
        <div class="top-right">
          <div class="top-right-top">
            <div class="part-title">在线客服投诉量</div>
            <div id="custom" style="width: 100%; height: 100%"></div>
          </div>
          <div class="top-right-bottom">
            <div class="part-title">10015投诉量</div>
            <div id="phone" style="width: 100%; height: 100%"></div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <div class="part-title">2020年收入投诉同比增长率曲线</div>
          <div id="month" style="width: 100%; height: 100%"></div>
        </div>
        <div class="bottom-right bottom-commom">
          <div class="part-title">工信部申诉量</div>
          <div id="miit" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExperienceService from '@/service/V2/experience/experience-service.js'
import 'echarts/map/js/china.js'
export default {
  data () {
    return {
      params: {
        year: 2020,
        provinceCode: '北京'
      },
      accessChannels: {}
    }
  },
  mounted () {
    this.mapChart = this.Echarts.init(document.getElementById('map'))
    // this.mapChart.showLoading()
    this.monthChart = this.Echarts.init(document.getElementById('month'))
    this.customChart = this.Echarts.init(document.getElementById('custom'))
    this.phoneChart = this.Echarts.init(document.getElementById('phone'))
    this.miitChart = this.Echarts.init(document.getElementById('miit'))

    this.getDataListService(this.params)
    this.getMonthListService(this.params)
    this.initEvent()
  },
  methods: {
    initEvent () {
      var _that = this
      // this.mapChart.on('click', function (params) {
      //   _that.params.provinceCode = params.data.provinceCode
      //   _that.getMonthListService(_that.params)
      // })
      // this.mapcharts已经作为一个函数 就需要使用_that     因为函数里面和函数外this的指向不同

      this.mapChart.on('mouseover', function (event) {
        // 找到想要高亮的样式，这个是北京样式
        if (event.componentType === 'series' && event.seriesIndex === 1) {
          // 设置地图样式
          let option = _that.mapChart.getOption()
          // 将获得数据赋值给样式的数据
          option.series[0].data = ExperienceService.convertData([event.data])

          _that.mapChart.setOption(option, true)
          // 由于绑定了mouseover事件，地图默认的高亮事件不触发了
          // 所以手动高亮一下
          // 设置默认高亮
          _that.mapChart.dispatchAction({
            type: 'highlight',
            seriesIndex: event.seriesIndex,
            dataIndex: event.dataIndex
          })
        }
      })
    },
    getDataListService (data) {
      ExperienceService.getDataListService(data, this.mapChart).then(res => {
        this.mapChart.setOption(res.mapOption)
        // this.mapChart.hideLoading()
        this.customChart.setOption(res.customOption)
        this.phoneChart.setOption(res.phoneOption)
        this.miitChart.setOption(res.miitOption)
        this.accessChannels = res.accessChannels
      })
    },
    getMonthListService (data) {
      ExperienceService.getMonthListService(data).then(res => {
        this.monthChart.setOption(res.monthOption)
      })
    }

  },
  beforeDestroy () {
    this.mapChart.clear()
    // this.mapChart.showLoading()
    this.monthChart.clear()
    this.customChart.clear()
    this.phoneChart.clear()
    this.miitChart.clear()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '@/assets/V2/styles/common.scss';
@import '@/assets/V2/styles/experience.scss';
</style>
