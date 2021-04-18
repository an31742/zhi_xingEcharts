<!--客群中心页面-->
<template>
  <div class="container">
    <div class="qq">
      <div class="heade">
        <router-link tag="div" class="header_home" to="/">
          <img src="../../../assets/V1/images/home.png" style="padding-top: 18px;padding-left: 45;" />
        </router-link>
        <div class="header_left">
          <img src="../../../assets/V1/images/juxing42.png" />
        </div>
        <div class="header_info">
          <img src="../../../assets/V1/images/kequn.png" />
        </div>
        <div class="header_right">
          <img src="../../../assets/V1/images/juxingg42.png" />
        </div>
      </div>
      <div class="mm">
        <div class="header">
          <div class="num">
            <div>
              <div class="zu">覆盖用户数</div>
              <img src="../../../assets/V1/images/ss.png" />
              <div class="zi">{{ dataItem.tagCounts.coverUserCount }}</div>
            </div>
          </div>
          <div class="num">
            <div>
              <div class="zu">标签数</div>
              <img src="../../../assets/V1/images/ss.png" />
              <div class="zi">{{ dataItem.tagCounts.tagCount }}</div>
            </div>
          </div>
          <div class="num">
            <div>
              <div class="zu">自定义标签数</div>
              <img src="../../../assets/V1/images/ss.png" />
              <div class="zi">{{ dataItem.tagCounts.selfCount }}</div>
            </div>
          </div>
          <div class="num">
            <div>
              <div class="zu">自研模型数</div>
              <img src="../../../assets/V1/images/ss.png" />
              <div class="zi">{{ dataItem.tagCounts.modelCount }}</div>
            </div>
          </div>
        </div>
        <div class="content">
          <div style="display:flex">
            <div class="content_left">
              <div class="nu">
                <div class="zu">模型应用top5榜单</div>
                <div class="tu" style="margin-top:20px">
                  <div class="w">模型名称</div>
                  <div class="w">调用量</div>
                </div>
                <div class="tu" v-for="(v, i) in dataItem.topList" :key="i">
                  <div>{{ v.model }}</div>
                  <div>{{ v.usedCount }}</div>
                </div>
              </div>
              <div class="nu">
                <div class="zu">支撑平台</div>
                <div id="plateform" style="height:330px;"></div>
              </div>
            </div>
            <div class="content_info">
              <div class="nu">
                <div class="zu">覆盖用户数</div>
                <div id="main" style="height:501px"></div>
              </div>
              <div class="num">
                <div class="bb">
                  <div class="zu">二级标签调用量</div>
                  <div id="one"></div>
                </div>
                <div class="bb">
                  <div class="zu">二级标签用户量</div>
                  <div id="two"></div>
                </div>
                <div class="bb">
                  <div class="zu">二级标签产品数量</div>
                  <div id="three"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nn">
        <div class="nn_num1">
          <div class="zu">标签数</div>
          <div id="num1"></div>
        </div>
        <div class="nn_num1">
          <div class="zu">自定义标签数</div>
          <div id="num2"></div>
        </div>
        <div class="nn_num1">
          <div class="zu">自研模型数</div>
          <div id="num3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customers from '@/service/V1/customers-service'
import DrawUtils from '@/utils/draw-utils.js'
export default {
  data () {
    return {
      dataItem: {
        tagCounts: {
          coverUserCount: '',
          tagCount: '',
          selfCount: '',
          modelCount: ''
        },
        topList: [],
        plateforms: []
      },
      timingList: {},
      rootList: {},
      leafList: {},
      leafParam: {
        year: '2020'
      },
      secondColor: '#29C896',
      color: [
        '#00ffff',
        '#00cff',
        '#006ced',
        '#ffe000',
        '#ffa800',
        '#ff5b00',
        '#ff3000'
      ]
    }
  },
  mounted () {
    this.getDataList()
    this.getTimingList()
    this.getRootList()
  },
  methods: {
    // 获取静态数据 接口
    getDataList () {
      customers.getDataListService({ year: '2020' }).then(res => {
        this.dataItem = res
        this.drawPalteform()
      })
    },
    // 客群心时科数据接口
    getTimingList () {
      customers.getTimingListService({ year: '2020' }).then(res => {
        this.timingList = res
        this.drawTagBar()
        this.drawDiyTimingBar()
        this.drawModelTimingBar()
      })
    },
    getRootList () {
      customers.getRootListService({ year: '2020' }).then(res => {
        this.rootList = res
        this.leafParam.tagId = res.t
        this.drawLine()
        this.getLeafList()
      })
    },
    getLeafList () {
      customers.getLeafListService(this.leafParam).then(res => {
        this.leafList = res
        this.drawUsedBar()
        this.drawUserCountBar()
        this.drawProductBar()
      })
    },
    drawLine () {
      const myChart = this.Echarts.init(document.getElementById('main'))
      let tooltip = DrawUtils.getCommonTooptip()
      tooltip.formatter = function (params) {
        return (
          params[0].seriesName + ' [' + params[0].data.tagType +
              ']<br/>' + params[0].name + ':' + params[0].value
        )
      }

      let legend = DrawUtils.getCommonLegend(['覆盖用户数'])
      let yAxis = DrawUtils.getCommonYAxis()
      yAxis.axisLabel.formatter = function (v, i) {
        return Math.floor(v / 10000) + '万'
      }
      // 绘制图表
      myChart.setOption({
        color: this.secondColor,
        grid: { top: '15%', right: '8%', bottom: '10%', left: '12%' },
        tooltip: tooltip,
        legend: legend,
        xAxis: {
          data: this.rootList.x, // this.timingList.tagTimingList.x,
          type: 'category',
          axisLine: { show: true, lineStyle: { color: '#29C896' } },
          axisTick: { show: true },
          axisLabel: {
            show: true,
            textStyle: { color: '#FFFFFF' }
          }
        },
        yAxis: yAxis,
        series: [
          {
            name: '覆盖用户数',
            type: 'bar',
            barWidth: 24.5,
            data: this.rootList.y
          }
        ]
      })
      let _that = this
      myChart.on('click', function (params) {
        _that.leafParam.tagId = params.data.tagId
        _that.secondColor = params.data.color
        _that.getLeafList()
      })
    },

    drawUsedBar () {
      const one = this.Echarts.init(document.getElementById('one'))
      // 绘制图表
      one.setOption({
        grid: { top: '22%', right: '10%', bottom: '18%', left: '18%' },
        tooltip: DrawUtils.getCommonTooptip(),
        legend: DrawUtils.getCommonLegend(['调用量'], this.secondColor),
        xAxis: {
          name: '标签',
          nameLocation: 'middle',
          nameGap: 25,
          data: this.leafList.usedList.x, // this.timingList.tagTimingList.x,
          type: 'category',
          axisLine: { show: true, lineStyle: { color: '#29C896' } },
          axisTick: { show: true },
          axisLabel: {
            show: true,
            textStyle: { color: '#FFFFFF' },
            interval: 3,
            fontWeight: 'bolder',
            formatter: function (v, i) {
              v = v.substring(0, 1) + '\n' + v.substring(1)
              return v
            }
          }
        },
        yAxis: [DrawUtils.getCommonYAxis()],
        series: [
          {
            name: '调用量',
            type: 'bar',
            itemStyle: { color: DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1) },
            data: this.leafList.usedList.y
          }
        ]
      })
    },
    drawUserCountBar () {
      const two = this.Echarts.init(document.getElementById('two'))

      let yAxis = DrawUtils.getCommonYAxis()
      yAxis.axisLabel.formatter = function (v, i) {
        return Math.floor(v / 10000)
      }
      // 绘制图表
      two.setOption({
        grid: { top: '22%', right: '10%', bottom: '18%', left: '18%' },
        tooltip: DrawUtils.getCommonTooptip(),
        legend: DrawUtils.getCommonLegend(['用户量（万）'], this.secondColor),
        xAxis: {
          name: '标签',
          nameLocation: 'middle',
          nameGap: 25,
          data: this.leafList.userCountList.x, // this.timingList.tagTimingList.x,
          type: 'category',
          axisLine: { show: true, lineStyle: { color: '#29C896' } },
          axisTick: { show: true },
          axisLabel: {
            show: true,
            textStyle: { color: '#FFFFFF' },
            interval: 3,
            fontWeight: 'bolder',
            formatter: function (v, i) {
              v = v.substring(0, 1) + '\n' + v.substring(1)
              return v
            }
          }
        },
        yAxis: yAxis,
        series: [
          {
            name: '用户量（万）',
            type: 'bar',
            itemStyle: { color: DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1) },
            data: this.leafList.userCountList.y
          }
        ]
      })
    },
    drawProductBar () {
      const three = this.Echarts.init(document.getElementById('three'))
      // 绘制图表
      three.setOption({
        grid: { top: '22%', right: '10%', bottom: '18%', left: '20%' },
        tooltip: DrawUtils.getCommonTooptip(),
        legend: DrawUtils.getCommonLegend(['产品数量']),
        xAxis: {
          name: '标签',
          nameLocation: 'middle',
          nameGap: 25,
          data: this.leafList.productList.x,
          type: 'category',
          axisLine: { show: true, lineStyle: { color: '#29C896' } },
          axisTick: { show: true },
          axisLabel: {
            show: true,
            textStyle: { color: '#FFFFFF' },
            interval: 0,
            fontWeight: 'bolder',
            formatter: function (v, i) {
              if (v.indexOf('人群') !== -1) {
                v = v.substring(0, v.indexOf('人群'))
                v = v.substring(0, 2) + '\n' + v.substring(2)
              }
              return v
            }
          }
        },
        yAxis: [DrawUtils.getCommonYAxis()],
        series: [
          {
            name: '产品数量',
            type: 'bar',
            barWidth: 15,
            itemStyle: { color: DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1) },
            data: this.leafList.productList.y
          }
        ]
      })
    },
    // 支撑平台绘制
    drawPalteform () {
      const plateform = this.Echarts.init(document.getElementById('plateform'))
      // 绘制图表
      plateform.setOption({
        color: DrawUtils.getCommonColor(),
        series: [
          {
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 180,
              edgeLength: 1
            },
            roam: true,
            data: this.dataItem.plateforms
          }
        ]
      })
    },
    // 绘制标签时序柱状图
    drawTagBar () {
      const num1 = this.Echarts.init(document.getElementById('num1'))
      // 绘制图表
      num1.setOption({
        color: DrawUtils.getCommonColor(),
        legend: {
          type: 'scroll',
          top: '5%',
          right: '5%',
          left: '5%',
          data: this.timingList.tagTimingList.l,
          textStyle: { color: ['FFFFFF'] },
          pageTextStyle: { color: ['FFFFFF'] }
        },
        grid: {
          top: '22%',
          bottom: '18%' // 也可设置left和right设置距离来控制图表的大小
        },
        tooltip: DrawUtils.getCommonTooptip(),
        xAxis: {
          name: '季度',
          nameLocation: 'middle',
          nameGap: 28,
          data: this.timingList.tagTimingList.x,
          type: 'category',
          axisLine: { show: true, lineStyle: { color: '#29C896' } },
          axisTick: { show: true },
          axisLabel: { show: true, textStyle: { color: '#FFFFFF' } }
        },
        yAxis: [DrawUtils.getCommonYAxis()],
        series: this.timingList.tagTimingList.y
      })
    },
    drawDiyTimingBar () {
      const num2 = this.Echarts.init(document.getElementById('num2'))
      // 绘制图表
      num2.setOption({
        grid: { top: '22%', bottom: '18%' },
        tooltip: DrawUtils.getCommonTooptip(),
        legend: DrawUtils.getCommonLegend(this.timingList.divTagTimingList.l),
        xAxis: {
          name: '季度',
          nameLocation: 'middle',
          nameGap: 28,
          data: this.timingList.divTagTimingList.x,
          type: 'category',
          axisLine: { show: true, lineStyle: { color: '#29C896' } },
          axisTick: { show: true },
          axisLabel: { show: true, textStyle: { color: '#FFFFFF' } }
        },
        yAxis: [DrawUtils.getCommonYAxis()],
        series: [
          {
            name: '自定义标签数',
            type: 'bar',
            barWidth: '10',
            itemStyle: { color: DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1) },
            data: this.timingList.divTagTimingList.y
          }
        ]
      })
    },
    drawModelTimingBar () {
      const num3 = this.Echarts.init(document.getElementById('num3'))
      // 绘制图表
      num3.setOption({
        grid: {
          top: '22%',
          bottom: '18%' // 也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        legend: DrawUtils.getCommonLegend(this.timingList.modelTimingList.l),
        xAxis: {
          name: '季度',
          nameLocation: 'middle',
          nameGap: 28,
          data: this.timingList.modelTimingList.x,
          type: 'category',
          axisLine: { show: true, lineStyle: { color: '#29C896' } },
          axisTick: { show: true },
          axisLabel: { show: true, textStyle: { color: '#FFFFFF' } }
        },
        yAxis: [DrawUtils.getCommonYAxis()],
        series: [
          {
            name: '自研模型数',
            type: 'bar',
            barWidth: '10',
            itemStyle: { color: DrawUtils.getLinearGradient(this.secondColor, 0.6, this.secondColor, 1) },
            data: this.timingList.modelTimingList.y
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 1920px;
  height: 1080px;
  background-image: url("../../../assets/V1/images/tiao.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  padding: 15px;
  position: relative;
  .qq {
    width: 1891px;
    height: 1068px;
    background-image: url("../../../assets/V1/images/juxing4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    .heade {
      width: 1899.5px;
      display: flex;
      justify-content: space-around;
      padding-top: 0px;
      .hader_home {
        margin-top: 18px;
        margin-left: 48px;
      }
      .header_left {
        img {
          width: 464px;
          height: 32px;
          margin: 20px 6px;
        }
      }
      .header_info {
        img {
          width: 780px;
          height: 65px;
        }
      }
      .header_right {
        img {
          width: 467px;
          height: 32px;
          margin: 20px 6px;
        }
      }
    }
    .mm {
      float: left;
      .header {
        display: flex;
        margin: 0px 14px;
        .num {
          width: 330px;
          height: 104px;
          margin-left: 9px;
          background: rgba(9, 12, 33, 0.3);
          background-image: url("../../../assets/V1/images/zu318.png");
          background-repeat: no-repeat;
          text-align: center;
          background-size: 100% 100%;
          background-position: center;
          border: 1px solid rgba(15, 75, 136, 0.48);
          img {
            width: 150px;
          }
          .zu {
            font-size: 18px;
            padding-top: 5px;
            font-family: HYCuJianHeiJ;
            font-weight: bold;
            margin-top: 10px;
            color: rgba(255, 255, 255, 1);
          }

          .zi {
            font-size: 27px;
            font-family: HYCuJianHeiJ;
            font-weight: bold;
            color: #29C896;
          }
        }

        .num:nth-of-type(1) {
          margin-left: 0px;
        }
      }

      .content {
        text-align: center;

        span {
          display: inline-block;
          width: 262px;
          height: 82px;
          margin-left: 10px;
          background: rgba(9, 12, 33, 0.3);
          border: 1px solid rgba(15, 75, 136, 0.48);
        }

        span:nth-of-type(1) {
          margin-left: 0px;
        }

        .content_left {
          .nu {
            width: 488px;
            height: 408px;
            margin: 18px 7px 0px 18px;
            background-image: url("../../../assets/V1/images/bianjiao.png");
            background-repeat: no-repeat;
            text-align: center;
            background-size: 100% 100%;
            background-position: center;

            .zu {
              width: 488px;
              height: 44.3px;
              line-height: 44.3px;
              background-image: url("../../../assets/V1/images/titlebg.png");
              font-size: 18px;
              font-family: HYCuJianHeiJ;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }

            .tu {
              width: 410px;
              margin: 0 auto;
              display: flex;
              flex-wrap: wrap;
              font-family: HYXiJianHeiJ;
              font-weight: 400;
              color: #ffffffff;
              line-height: 22px;

              div {
                width: 178px;
                height: 44.3px;
                line-height: 35px;
                margin: 4px 10px;
                background: rgba(0, 0, 0, 1);
                border: 1px solid rgba(24, 247, 255, 1);
                opacity: 0.6;
              }

              .w {
                border: 1px solid #29C896;
                background-image: url("../../../assets/V1/images/juxing.png");
                background-size: 100% 100%;
                opacity: 0.8;
                color: #FFFFFF;
              }
            }
          }
        }

        .content_info {
          margin-left: 12px;

          .nu {
            width: 868px;
            height: 545px;
            margin-top: 10px;
            background-image: url("../../../assets/V1/images/bianjiao.png");
            background-repeat: no-repeat;
            text-align: center;
            background-size: 100% 100%;
            background-position: center;

            .zu {
              width: 868px;
              height: 44.3px;
              line-height: 44.3px;
              background-image: url("../../../assets/V1/images/titlebg.png");
              background-repeat: no-repeat;
              text-align: center;
              background-size: 100% 100%;
              background-position: center;
              font-size: 18px;
              font-family: HYCuJianHeiJ;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
          }

          .num {
            display: flex;
            margin-top: 19px;
            justify-content: space-between;
            padding: 0 10px;

            .bb {
              width: 272px;
              height: 285px;
              background-image: url("../../../assets/V1/images/bianjiao.png");
              background-repeat: no-repeat;
              text-align: center;
              background-size: 100% 100%;
              background-position: center;

              .zu {
                width: 272px;
                height: 44.3px;
                line-height: 44.3px;
                background-image: url("../../../assets/V1/images/titlebg.png");
                background-repeat: no-repeat;
                text-align: center;
                background-size: 100% 100%;
                background-position: center;
                font-size: 18px;
                font-family: HYCuJianHeiJ;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }

              #one {
                width: 272px;
                height: 241px;
              }

              #two {
                width: 272px;
                height: 241px;
              }

              #three {
                width: 272px;
                height: 241px;
              }
            }
          }
        }
      }
    }

    .nn {
      width: 480px;
      margin-right: 12px;
      float: right;

      .nn_num1 {
        width: 480px;
        height: 317px;
        text-align: center;
        background-image: url("../../../assets/V1/images/bianjiao.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        margin-top: 7px;

        .zu {
          width: 487px;
          height: 44.3px;
          line-height: 44.3px;
          background-image: url("../../../assets/V1/images/titlebg.png");
          font-size: 18px;
          font-family: HYCuJianHeiJ;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }

      .nn_num1:nth-of-type(1) {
        margin-top: 0px;
      }

      #num1 {
        width: 487px;
        height: 272.7px;
      }

      #num2 {
        width: 487px;
        height: 272px;
      }

      #num3 {
        width: 487px;
        height: 272px;
      }
    }
  }
}
</style>
