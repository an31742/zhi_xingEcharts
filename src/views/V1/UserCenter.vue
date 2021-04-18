<!--用户中心页面-->
<!--用户中心页面-->
<template>
  <div class="user">
    <router-link to="/" class="to-home">
      <img src="../../assets/V1/images/user/home.png" alt />
    </router-link>
    <img
      src="../../assets/V1/images/user/border.png"
      style="margin-left: 14px"
      alt
    />
    <div class="leftHeader">
      <img src="../../assets/V1/images/user/leftHeader.png" alt />
    </div>
    <div class="rightHeader">
      <img src="../../assets/V1/images/user/rightHeader.png" alt />
    </div>
    <div class="userHeader">
      <div class="userHeaderO">
        <img src="../../assets/V1/images/user/conentHeader01.png" alt />
      </div>
    </div>
    <div class="userLeft">
      <h4>分省用户人次</h4>
      <div
        class="userProvinceTu"
        id="userProvince"
        style="width: 500px; height: 900px"
      ></div>
    </div>
    <div class="userContent">
      <div class="userCon">
        <div class="userCount">
          <h4 class="title">用户人次</h4>
          <ul>
            <li class="userCountOne">
              <h4>累计用户人次</h4>
              <p>
                <img src="../../assets/V1/images/user/line.png" alt />
              </p>
              <div class="userCountOneTu" ref="userCountOne">
                <span style="color: #29c896">{{
                  this.userCounts.userCount
                }}</span>
              </div>
            </li>
            <li class="userCountTwo">
              <p>较去年增长量</p>
              <div
                id="userCountTwoTu"
                ref="userCountTwo"
                style="width: 110px; height: 110px"
              ></div>
            </li>
            <li class="userCountThree">
              <p>较前年增长量</p>
              <div
                id="userCountThreeTu"
                ref="userCountThree"
                style="width: 110px; height: 110px"
              ></div>
            </li>
            <li class="userCountFour">
              <p>三年平均增长量</p>
              <div
                id="userCountFourTu"
                ref="userCountFour"
                style="width: 110px; height: 110px"
              ></div>
            </li>
          </ul>
        </div>
        <div class="userPay">
          <h4>付费用户人次</h4>
          <div
            class="userPayTu"
            ref="userPay"
            style="width: 820px; height: 300px"
          ></div>
        </div>
        <div class="usreActive">
          <h4>活跃用户人次</h4>
          <div class="usreActiveLeft">
            <div
              class="usreActiveTu"
              ref="usreActive"
              style="width: 820px; height: 350px"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="userRight">
      <h4>产品用户人次TOP20</h4>
      <div
        class="userAcceptance"
        id="userAcceptance"
        style="width: 500px; height: 900px"
      ></div>
    </div>
  </div>
</template>

<script>
import Api from '@/service/user-service'
import DrawUtils from '@/utils/draw-utils.js'
export default {
  data () {
    return {
      activeUserCounts: {},
      feeUserCounts: {},
      provinces: {},
      tops: {},
      userCounts: {
        userCount: '',
        twoRatio: '',
        oneRatio: '',
        threeAvgRatio: ''
      },
      queryParams: {
        year: '2020'
      },
      secondColor: '#29C896'
    }
  },
  created () { },
  mounted () {
    this.getUserListService()
  },
  methods: {
    getUserListService () {
      Api.getUserListService(this.queryParams).then(res => {
        this.provinces = res.provinceData
        this.tops = res.topData
        this.activeUserCounts = res.activeUser
        this.feeUserCounts = res.payUser
        this.userCounts = res.userCounts
        this.drawProvinceBar()
        this.drawHadUserGraph()
        this.drawActiveUserBar()
        this.drawPayUserBar()
        this.drawContentThree()
        this.drawCoontentFour()
        this.drawCoontentTwo()
      })
    },
    drawProvinceBar () {
      var provChart = this.Echarts.init(document.getElementById('userProvince'))

      let xAxis = DrawUtils.getCommonYAxis()
      xAxis.splitLine.show = false
      xAxis.axisLabel.formatter = function (v, i) {
        return Math.floor(v / 10000) + '万'
      }

      let yAxis = DrawUtils.getCommonXAxis()
      yAxis.data = this.provinces.y
      yAxis.axisLine.show = true
      yAxis.axisLine.lineStyle = { color: this.secondColor }
      yAxis.axisLabel.color = '#FFFFFF'

      let linerColor = DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1)
      linerColor.y = 0
      linerColor.x2 = 1

      let legend = DrawUtils.getCommonLegend(['用户人次'])
      legend.top = '2%'

      let tooltip = DrawUtils.getCommonTooptip()
      tooltip.formatter = function (params) {
        return params[0].seriesName + '<br/><i>' + params[0].name + '->' + Math.floor(params[0].data / 10000) + '万</i>'
      }
      provChart.setOption({
        tooltip: tooltip,
        legend: legend,
        grid: { top: '6%', left: '10%', right: '10%', bottom: '5%' },
        xAxis: xAxis,
        yAxis: yAxis,
        series: [
          {
            name: ['用户人次'],
            type: 'bar',
            barWidth: '18',
            itemStyle: {
              color: linerColor
            },
            data: this.provinces.x
          }
        ]
      })
    },

    drawCoontentTwo () {
      const myChart = this.Echarts.init(this.$refs.userCountTwo)

      var datas = {
        value: this.userCounts.oneRatio,
        company: '%',
        ringColor: [
          {
            offset: 0,
            color: '#F8C002' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#F8C002' // 100% 处的颜色
          }
        ]
      }

      var option = {
        title: {
          text: datas.value + datas.company,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '15'
          }
        },
        color: ['#282c40'],
        legend: {
          show: false,
          data: []
        },

        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['90%', '100%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: datas.value,
                name: '',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: datas.ringColor
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: '',
                value: 100 - datas.value
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    drawContentThree () {
      const myChart = this.Echarts.init(this.$refs.userCountThree)
      // var fontColor = '#fff'
      // let noramlSize = 30
      var datas = {
        value: this.userCounts.twoRatio,
        company: '%',
        ringColor: [
          {
            offset: 0,
            color: '#B357F3' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#B357F3' // 100% 处的颜色
          }
        ]
      }
      var option = {
        // backgroundColor: '#000',
        title: {
          text: datas.value + datas.company,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '15'
          }
        },
        color: ['#282c40'],
        legend: {
          show: false,
          data: []
        },

        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['90%', '100%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: datas.value,
                name: '',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: datas.ringColor
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: '',
                value: 100 - datas.value
              }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    drawCoontentFour () {
      const myChart = this.Echarts.init(this.$refs.userCountFour)
      // var fontColor = '#fff'
      // let noramlSize = 30
      var datas = {
        value: this.userCounts.threeAvgRatio,
        company: '%',
        ringColor: [
          {
            offset: 0,
            color: '#29C796' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#29C796' // 100% 处的颜色
          }
        ]
      }
      var option = {
        // backgroundColor: '#000',
        title: {
          text: datas.value + datas.company,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '15'
          }
        },
        color: ['#282c40'],
        legend: {
          show: false,
          data: []
        },

        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['90%', '100%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: datas.value,
                name: '',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: datas.ringColor
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: '',
                value: 100 - datas.value
              }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    drawPayUserBar () {
      const myChart = this.Echarts.init(this.$refs.userPay)

      let yAxisAction = DrawUtils.getCommonYAxis()
      yAxisAction.name = '付费用户人次'
      yAxisAction.axisLabel.formatter = function (v, i) {
        return Math.floor(v / 10000) + '万'
      }

      let yAxisRise = DrawUtils.getCommonYAxis()
      yAxisRise.name = '增长量'
      yAxisRise.splitLine.show = false

      myChart.setOption({
        grid: { top: '20%', bottom: '20%' },
        tooltip: DrawUtils.getCommonTooptip(),
        legend: DrawUtils.getCommonLegend(['付费用户人次', '增长量']),
        xAxis: {
          data: this.feeUserCounts.x,
          axisLine: {
            show: true,
            color: '#FFFFFF',
            lineStyle: { color: this.secondColor }
          },
          axisTick: { show: true },
          axisLabel: {
            show: true,
            textStyle: { color: '#FFFFFF' }
          }
        },
        yAxis: [yAxisAction, yAxisRise],
        series: [
          {
            name: '付费用户人次',
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              color: DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1)
            },
            data: this.feeUserCounts.y
          },
          {
            name: '增长量',
            type: 'line',
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, // 平滑曲线显示
            sampling: 'average',
            showAllSymbol: true, // 显示所有图形。
            symbol: 'circle', // 标记的图形为实心圆
            symbolSize: 10, // 标记的大小
            itemStyle: { color: '#058cff' },
            lineStyle: { color: '#058cff' },
            areaStyle: { color: 'rgba(5,140,255, 0.2)' },
            data: this.feeUserCounts.r
          }
        ]
      })
    },

    drawActiveUserBar () {
      const myChart = this.Echarts.init(this.$refs.usreActive)
      let yAxisAction = DrawUtils.getCommonYAxis()
      yAxisAction.name = '活跃用户人次'
      yAxisAction.axisLabel.formatter = function (v, i) {
        return Math.floor(v / 10000) + '万'
      }

      let yAxisRise = DrawUtils.getCommonYAxis()
      yAxisRise.name = '增长量'
      yAxisRise.splitLine.show = false

      let tooltip = DrawUtils.getCommonTooptip()

      myChart.setOption({
        grid: { top: '20%', bottom: '20%' },
        tooltip: tooltip,
        legend: DrawUtils.getCommonLegend(['活跃用户人次', '增长量']),
        xAxis: {
          data: this.activeUserCounts.x,
          axisLine: {
            show: true, // 隐藏X轴轴线
            lineStyle: {
              color: this.secondColor
            }
          },
          axisTick: {
            show: true // 隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF' // X轴文字颜色
            }
          }
        },
        yAxis: [yAxisAction, yAxisRise],
        series: [
          {
            name: '活跃用户人次',
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              color: DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1)
            },
            data: this.activeUserCounts.y
          },
          {
            name: '增长量',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            sampling: 'average',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              color: '#058cff'
            },
            lineStyle: {
              color: '#058cff'
            },
            areaStyle: {
              color: 'rgba(5,140,255, 0.2)'
            },
            data: this.activeUserCounts.r
          }
        ]
      })
    },
    drawHadUserGraph () {
      var topChart = this.Echarts.init(document.getElementById('userAcceptance'))

      let xAxis = DrawUtils.getCommonYAxis()
      xAxis.splitLine.show = false
      xAxis.axisLabel.formatter = function (v, i) {
        return Math.floor(v / 10000) + '万'
      }

      let yAxis = DrawUtils.getCommonXAxis()
      yAxis.data = this.tops.y
      yAxis.axisLine.show = true
      yAxis.axisLine.lineStyle = { color: this.secondColor }
      yAxis.axisLabel.color = '#FFFFFF'

      let linerColor = DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1)
      linerColor.y = 0
      linerColor.x2 = 1

      let legend = DrawUtils.getCommonLegend(['用户人次'])
      legend.top = '2%'
      let sdata = []
      this.tops.x.forEach((item, index) => {
        if (index === this.tops.x.length - 1) {
          sdata.push({
            name: this.tops.y[index],
            value: item - 130000000,
            realValue: item
          })
        } else {
          sdata.push({
            name: this.tops.y[index],
            value: item,
            realValue: item
          })
        }
      })
      let tooltip = DrawUtils.getCommonTooptip()
      tooltip.formatter = function (params) {
        return params[0].seriesName + '<br/><i>' + params[0].data.name + '->' + Math.floor(params[0].data.realValue / 10000) + '万</i>'
      }
      topChart.setOption({
        tooltip: tooltip,
        legend: legend,
        grid: { top: '6%', left: '16%', right: '10%', bottom: '5%' },
        xAxis: xAxis,
        yAxis: yAxis,
        series: [
          {
            name: ['用户人次'],
            type: 'bar',
            barWidth: 23,
            itemStyle: { color: linerColor },
            data: sdata
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 1920px;
  height: 1080px;
  background-image: url('../../assets/V1/images/user/usercenter-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  overflow: hidden;
  position: relative;
  .to-home {
    position: absolute;
    left: 46px;
    top: 18px;
  }
  .leftHeader {
    position: absolute;
    left: 84px;
    top: 24px;
  }
  .rightHeader {
    position: absolute;
    right: 75px;
    top: 24px;
  }
  .userHeader {
    .userHeaderO {
      position: absolute;
      left: 577px;
      top: 0;

      .userHeadert {
        position: absolute;
        left: 292px;
        top: 7px;
      }
    }
  }

  .userLeft {
    width: 500px;
    height: 960px;
    background-image: url('../../assets/V1/images/user/left.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 90px;
    left: 31px;
    h4 {
      margin: auto;
      width: 416px;
      height: 32px;
      background-image: url('../../assets/V1/images/user/left1.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;
      text-align: center;
      line-height: 32px;
    }
    p {
      color: #fff;
      font-size: 11px;
      text-align: center;
      margin-top: 19px;
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: linear-gradient(
          -90deg,
          rgba(35, 174, 255, 1) 0%,
          rgba(35, 174, 255, 0) 100%
        );
        border-radius: 2px;
        margin-right: 4px;
        vertical-align: middle;
      }
    }
  }
  .userContent {
    .userCount {
      width: 820px;
      height: 241px;
      background-image: url('../../assets/V1/images/user/1.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 89px;
      left: 550px;
      .title {
        margin: auto;
        width: 416px;
        height: 32px;
        line-height: 32px;
        background-image: url('../../assets/V1/images/user/left1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: #fff;
        text-align: center;
      }
      ul {
        padding-top: 30px;
        .userCountOne {
          float: left;
          margin-top: 20px;
          width: 367px;
          height: 110px;
          // background-color: #fff;
          position: relative;
          h4 {
            // font-size: 22px;
            color: #fff;
            position: absolute;
            top: 0;
            left: 112px;
          }
          p {
            width: 100%;
            height: 100%;
            line-height: 76px;
          }
          .userCountOneTu {
            font-size: 44px;
            font-family: HYCuJianHeiJ;
            font-weight: 400;
            color: #4072ee;
            //  color: '#4693EC';
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 15%;
            span {
              padding-right: 10%;
            }
          }
        }
        .userCountTwo {
          float: left;
          height: 150px;
          margin-right: 30px;
          p {
            width: 110px;
            height: 18px;
            margin-left: 0px;
            font-size: 13px;
            font-family: HYCuJianHeiJ;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 24px;
          }
          #userCountTwoTu {
            margin-top: 24px;
            width: 110px;
            height: 110px;
            // border: 1px solid #fff;
          }
        }
        .userCountThree {
          float: left;
          height: 150px;
          margin-right: 30px;
          p {
            width: 110px;
            height: 18px;
            font-size: 13px;
            padding-left: 0px;
            font-family: HYCuJianHeiJ;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 24px;
          }
          #userCountThreeTu {
            margin-top: 24px;
            width: 110px;
            height: 110px;
            // border: 1px solid #fff;
          }
        }
        .userCountFour {
          float: left;
          height: 150px;
          p {
            width: 104px;
            height: 18px;
            margin-left: 20px;
            font-size: 13px;
            font-family: HYCuJianHeiJ;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 24px;
          }
          #userCountFourTu {
            margin-top: 24px;
            width: 110px;
            height: 110px;
          }
        }
      }
    }
    .userPay {
      width: 820px;
      height: 334px;
      background-image: url('../../assets/V1/images/user/ti1.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 350px;
      left: 550px;
      h4 {
        margin: auto;
        width: 416px;
        height: 32px;
        line-height: 32px;
        background-image: url('../../assets/V1/images/user/left1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: #fff;
        text-align: center;
      }
      .topPay {
        color: #fff;
        font-size: 11px;
        text-align: center;
        margin-top: 19px;

        b {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: linear-gradient(
            0deg,
            rgba(41, 199, 150, 1) 0%,
            rgba(41, 199, 150, 0) 100%
          );
          border-radius: 2px;
          margin-right: 4px;
        }
        i {
          vertical-align: middle;
          display: inline-block;
          width: 49px;
          height: 12px;
        }
        span {
          width: 48px;
          height: 12px;
          font-size: 11px;
          font-family: HYXiJianHeiJ;
          font-weight: bold;
          color: rgba(220, 255, 254, 1);
          line-height: 38px;
        }
      }
    }
    .usreActive {
      width: 820px;
      height: 345px;
      background-image: url('../../assets/V1/images/user/ti2.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: 31px;
      left: 550px;
      h4 {
        margin: auto;
        width: 416px;
        height: 32px;
        line-height: 32px;
        background-image: url('../../assets/V1/images/user/left1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: #fff;
        text-align: center;
      }
      .topActive {
        color: #fff;
        font-size: 11px;
        text-align: center;
        margin-top: 19px;
        i {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: rgba(248, 192, 2, 1);
          border-radius: 2px;
          margin-right: 4px;
          vertical-align: middle;
        }
      }
    }
  }
  .userRight {
    width: 500px;
    height: 960px;
    background-image: url('../../assets/V1/images/user/right.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 90px;
    right: 32px;
    h4 {
      margin: auto;
      width: 416px;
      height: 32px;
      background-image: url('../../assets/V1/images/user/left1.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;
      text-align: center;
      line-height: 32px;
    }
  }
}
</style>
