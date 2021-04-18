<!--渠道中心页面-->
<template>
  <div class="home">
    <div class="head">
      <div></div>
      <div></div>
      <div></div>
      <div class="home" @click="toHome"></div>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="main-left-top common">
          <div class="title">头部互联网渠道</div>
          <div class="info">
            <div class="list">
              <div class="item style">头部互联网渠道TOP5</div>
              <div class="item" v-for="e in servenList.head.seriesData" :key="e.value">{{e.name}}</div>
            </div>
            <img src="../../../assets/V1/channel/column_line.png" alt />
            <div id="head" style="width:220px;height:240px"></div>
          </div>
        </div>
        <div class="main-left-bottom common">
          <div class="title">一般合作方渠道</div>
          <div class="info">
            <div class="list">
              <div class="item style">一般合作方渠道TOP5</div>
              <div class="item" v-for="e in servenList.common.seriesData" :key="e.value">{{e.name}}</div>
            </div>
            <img src="../../../assets/V1/channel/column_line.png" alt />
            <div id="common" style="width:220px;height:240px"></div>
          </div>
        </div>
      </div>
      <div class="main-center">
        <div class="main-center-header">
          <div class="main-center-header-left">
            <div id='all' style="width:100%;height:100%;"></div>
          </div>
          <div class="main-center-header-right">
            <div class="main-center-header-right-up">
              <div id='centerCharts1' style="width:95%;height:203px;"></div>
            </div>
            <div class="main-center-header-right-down">
               <div id='centerCharts2' style="width:95%;height:203px;"></div>
            </div>
          </div>
        </div>
        <div class="main-center-bottom common1">
          <div class="title" style="line-height:25px"></div>
          <div class="box">
            <div class="item" v-for="item in lineData.top" :key="item.income">
              <div class="item-top">
                <img :src="item.icon" alt />
                <h3>{{item.key}}</h3>
              </div>
              <img class="under-image" src="../../../assets/V1/channel/underline.png" alt />
              <div class="item-bottom">{{item.income}}万</div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="main-right-top common">
          <div class="title">自有渠道</div>
          <div class="info">
            <div id="self" style="width:220px;height:240px"></div>
            <img src="../../../assets/V1/channel/column_line.png" alt />
            <div class="list">
              <div class="item style">自有渠道TOP5</div>
              <div class="item" v-for="e in servenList.self.seriesData" :key="e.value">{{e.name}}</div>
            </div>
          </div>
        </div>
        <div class="main-right-bottom common">
          <div class="title">直销渠道</div>
          <div class="info">
            <div id="sell" style="width:220px;height:240px"></div>
            <img src="../../../assets/V1/channel/column_line.png" alt />
            <div class="list">
              <div class="item style">直销渠道TOP5</div>
              <div class="item" v-for="e in servenList.sell.seriesData" :key="e.value">{{e.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left common2">
        <div class="title">集团渠道</div>
        <div class="info">
          <div class="list">
            <div class="item style">集团渠道TOP5</div>
            <div class="item" v-for="e in servenList.policy.seriesData" :key="e.value">{{e.name}}</div>
          </div>
          <img src="../../../assets/V1/channel/column_line.png" alt />
          <div id="policy" style="width:320px;height:240px"></div>
        </div>
      </div>
      <div class="footer-center common2">
        <div class="title">实体渠道</div>
        <div class="info" style="margin-top:20px">
          <div id="entity" style="width:600px;height:240px"></div>
        </div>
      </div>
      <div class="footer-right common2">
        <div class="title">省分渠道</div>
        <div class="info">
          <div id="unicom" style="width:320px;height:240px"></div>
          <img src="../../../assets/V1/channel/column_line.png" alt />
          <div class="list">
            <div class="item style">省分渠道TOP5</div>
            <div class="item" v-for="e in servenList.unicom.seriesData" :key="e.value">{{e.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelServiceApi from '@/service/V1/channel-service.js'
import DrawUtils from '@/utils/draw-utils.js'
import {
  commonBar,
  commonPie
} from '@/utils/options'
export default {
  name: 'ChannelCenter',
  data () {
    return {
      servenList: {
        head: {},
        unicom: {},
        sell: {},
        self: {},
        common: {},
        policy: {},
        entity: {}
      },
      showList: {
        brandAds: {},
        autoSense: {}
      },
      lineData: {},
      ratioList: []
    }
  },
  mounted () {
    this.centerCharts1 = this.Echarts.init(document.getElementById('centerCharts1'))
    this.centerCharts2 = this.Echarts.init(document.getElementById('centerCharts2'))
    this.initData()
  },
  methods: {
    initData () {
      this.getData()
    },
    toHome () {
      this.$router.push({ path: '/V1' })
    },
    // 接口获取数据
    getData () {
      // 七个渠道
      let color = [ '#F17B2F', '#9FFFD8', '#A7CF4A', '#FFB400', '#29C8FF', '#3FFF88', '#AFFF4A' ]
      ChannelServiceApi.getServenList({ year: '2020' }).then((res) => {
        this.servenList = res
        let i = 0
        for (var key in this.servenList) {
          if (key === 'all') {
            this.getPie(key, res[key].legend, res[key].seriesData, color)
          } else {
            this.getBar(key, res[key].legend, res[key].seriesData, res[key].xs, [color[i]])
          }
          i++
        }
      })
      // 中间折线
      ChannelServiceApi.getPartnerList({ year: '2020' }).then((res) => {
        this.lineData = res
        this.getLine()
      })
      ChannelServiceApi.getAdShowList({ year: '2020' }).then((res) => {
        this.showList = res
      })
    },
    getOption1 (color, name = 'ix', value = 'income') {
      let tooltip = DrawUtils.getCommonTooptip()
      tooltip.formatter = function (params) {
        if (params[0].seriesName === 'income') {
          return '合作拉收<br/><i>' + params[0].data.ix + '月 -> ' + params[0].data.income + '万</i>'
        } else {
          return '对外赋能<br/><i>' + params[0].data.ix + '月 -> ' + params[0].data.pay + '万</i>'
        }
      }
      return {
        color: [color],
        dataset: {
          dimensions: [name, value],
          source: this.lineData.lineList
        },
        grid: { top: '30%', left: 60, right: 10, bottom: 20 },
        tooltip: tooltip,
        xAxis: {
          type: 'category',
          min: 0,
          axisTick: { show: true },
          axisLine: { show: true, color: '#FFFFFF', lineStyle: { color: '#29C896' } },
          axisLabel: { show: true, interval: 0, textStyle: { color: '#FFFFFF' } },
          boundaryGap: true,
          shadowOffsetY: 10
        },
        yAxis: {
          name: '(万)',
          nameTextStyle: { color: '#FFFFFF', fontSize: 8 },
          type: 'value',
          axisLine: { show: false },
          axisLabel: { color: '#ffffff' },
          splitLine: { lineStyle: { color: ['#212D46'] } }
        },
        series: [
          {
            type: 'line',
            symbol: 'circle',
            symbolSize: 0,
            smooth: true,
            itemStyle: { normal: { label: { show: false } } },
            lineStyle: {
              normal: { width: 3, color, shadowBlur: 0, shadowColor: 'rgba(0,0,0,0.8)', shadowOffsetY: 5 }
            }
          }
        ]
      }
    },
    // pie
    getPie (key, legend, seriesData, color) {
      let option = JSON.parse(JSON.stringify(commonPie))
      option.color = color
      option.tooltip = {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      }
      option.legend = { show: false }
      option.series[0].data = seriesData
      if (key === 'all') {
        option.series[0].name = '渠道总视图'
        option.series[0].radius = ['50%', '65%']
        option.series[0].center = ['50%', '50%']
      } else {
        option.series[0].name = '渠道视图'
        option.series[0].radius = ['60%', '75%']
        option.series[0].center = ['55%', '50%']
      }

      this.Echarts.init(document.getElementById(key)).setOption(option)
    },
    getBar (key, legend, seriesData, xs, color) {
      let option = JSON.parse(JSON.stringify(commonBar))
      option.color = color
      let formatter = function (v, r) {
        if (v.length === 4 || v.indexOf('DES') > -1 || v.indexOf('WO+') > -1) {
          return v.substring(0, 2) + '\n' + v.substring(2)
        } else if (v.length > 4) {
          return v.substring(0, 3) + '\n' + v.substring(3)
        } else {
          return v
        }
      }
      option.legend = { show: false }
      if (key === 'entity') {
        option.grid = { top: '5%', left: '8%', bottom: '18%', right: '10%' }
        option.yAxis = DrawUtils.getCommonYAxis()
        option.xAxis = DrawUtils.getCommonXAxis()
        option.xAxis.data = xs
      } else if (key === 'common' || key === 'head' || key === 'policy') {
        option.grid = { top: '5%', left: '20%', bottom: '10%', right: '10%' }
        option.xAxis = DrawUtils.getCommonYAxis()
        option.xAxis.axisLabel.show = false
        option.yAxis = DrawUtils.getCommonXAxis()
        option.yAxis.axisLabel.formatter = formatter
        option.yAxis.data = xs.reverse()
        seriesData = seriesData.reverse()
      } else {
        option.grid = { top: '5%', left: '8%', bottom: '10%', right: '20%' }
        option.xAxis = DrawUtils.getCommonYAxis()
        option.xAxis.inverse = true
        option.xAxis.axisLabel.show = false
        option.yAxis = DrawUtils.getCommonXAxis()
        option.yAxis.data = xs.reverse()
        option.yAxis.position = 'right'
        option.yAxis.inverse = false
        option.yAxis.axisLabel.formatter = formatter
        seriesData = seriesData.reverse()
      }

      if (key === 'policy') {
        option.grid = { top: '5%', left: '20%', bottom: '10%', right: '10%' }
      }
      if (key === 'unicom') {
        option.grid = { top: '5%', left: '8%', bottom: '10%', right: '10%' }
      }

      option.series = {
        type: 'bar',
        barWidth: '20',
        data: seriesData
      }
      this.Echarts.init(document.getElementById(key)).setOption(option)
    },
    // line
    getLine () {
      this.centerCharts1.setOption(this.getOption1('rgba(52, 93, 195, 1)', 'ix', 'income'))
      this.centerCharts2.setOption(this.getOption1('rgba(178, 87, 242, 1)', 'ix', 'pay'))
    }
  }
}
</script>

<style scoped lang='scss'>
.home {
  color: #ffffff;
  width: 1920px;
  height: 1080px;
  padding: 0 20px;
  background-image: url("~@/assets/V1/channel/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  overflow: hidden;
  // 容器样式
  .common {
    width: 487px;
    height: 315px;
    background: url("~@/assets/V1/channel/container1.png") no-repeat;
    background-size: 100% 100%;
  }
  .common1 {
    width: 839px;
    height: 210px;
    background: url("~@/assets/V1/channel/windowtop5.png") no-repeat;
    background-size: 100% 100%;
  }
  .common2 {
    width: 602px;
    height: 287px;
    background: url("~@/assets/V1/channel/container3.png") no-repeat;
    background-size: 100% 100%;
  }
  // title
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    line-height: 40px;
    color: rgba(255, 255, 255, 1);
  }
  // 数据展示公用样式
  .dataStyle {
    width: 414px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      margin-top: 30px;
      width: 115px;
      height: 60px;
      text-align: center;
      h3 {
        margin-bottom: 10px;
        font-size: 18px;
      }
      span {
        font-size: 22px;
        color: #f8c002;
      }
    }
  }
  // top列公共列表
  .info {
    margin-top: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .list {
      width: 180px;
      height: 260px;
      .item {
        width: 180px;
        height: 36px;
        border: 1px solid rgba(117, 162, 163, 0.4);
        text-align: center;
        line-height: 36px;
        color: #a8e6f3;
        font-size: 17px;
        margin-top: 3px;
      }
      .style {
        color: #ffffff;
        background: url("~@/assets/V1/channel/border1.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .head {
    height: 88px;
    position: relative;
    .home {
      background-image: url("~@/assets/V1/images/service/home_page.png");
      background-repeat: no-repeat;
      position: absolute;
      left: 35px;
      top: 30px;
      width: 60px;
      height: 32px;
    }
    div {
      &:nth-child(1) {
        width: 615px;
        height: 100%;
        background: url("~@/assets/V1/channel/right.png");
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: left top;
        position: absolute;
        top: 25px;
        left: -80px;
      }

      &:nth-child(2) {
        width: 630px;
        height: 100%;
        margin: 0 auto;
        background: url("~@/assets/V1/channel/title.png");
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center top;
      }

      &:nth-child(3) {
        float: right;
        width: 615px;
        height: 100%;
        background: url("~@/assets/V1/channel/left.png");
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: right top;
        position: absolute;
        top: 25px;
        right: -85px;
      }
    }
  }
  .main {
    margin-top: 15px;
    height: 650px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &-left {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-center {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // &-head {
      //   width: 839px;
      //   height: 100px;
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      // &-left{
      //   width:414px;
      //   height:100px;
      //   background:url('~@/assets/V1/channel/jingzhun.png') no-repeat;
      //   background-size: 100% 100%;
      // }
      // &-right{
      //   width:414px;
      //   height:100px;
      //   background:url('~@/assets/V1/channel/pinpai.png') no-repeat;
      //   background-size: 100% 100%;
      // }
      // }
      // &-top {
      //   height: 174px;
      //   width: 839px;
      // }
      // &-center {
      //   height: 430px;
      //   width: 839px;
      // }
      &-header {
        &-left {
          width: 414px;
          height: 430px;
          float: left;
          margin-right: 11px;
          background: url("~@/assets/V1/channel/totallook.png") no-repeat;
          background-size: 100% 100%;
        }
        &-right {
          float: left;
             width: 414px;
          height: 430px;
          &-up {
            width: 413px;
            height: 210px;
        margin-bottom: 10px;
            background: url("~@/assets/V1/channel/pullincome.png") no-repeat;
            background-size: 100% 100%;
          }
          &-down {
            width: 413px;
            height: 210px;

            background: url("~@/assets/V1/channel/outenergize.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      &-bottom {
        width: 839px;
        height: 210px;
        .title {
          height: 25px;
        }
        .box {
          width: 100%;
          height: 160px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .item {
            width: 130px;
            height:85px;
            &-top {
              width: 120px;
              display: flex;
              margin-bottom: -13px;
              justify-content: space-around;
              align-items: center;
              img {
                width: 30px;
                height: 30px;
              }
              h3 {
                text-align: center;
              }
            }
            .under-image {
              margin-bottom: -5px;
            }
            &-bottom {
              width: 128px;
              height: 68px;
              line-height: 68px;
              text-align: center;
              background: url("~@/assets/V1/channel/border2.png") no-repeat;
              background-size: 100% 100%;
              font-size: 25px;
              font-weight: bold;
              color: rgba(43, 200, 151, 1);
            }
          }
        }
      }
    }
    &-right {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .footer {
    margin-top: 20px;
    height: 287px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
