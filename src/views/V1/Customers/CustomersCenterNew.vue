<!--客群中心页面-->
<template>
  <div class="container">
    <div class="qq">
      <div class="heade">
        <router-link tag="div" class="to_home" to="/V1">
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
              <div class="zu">标签类别</div>
              <img src="../../../assets/V1/images/ss.png" />
              <div class="zi">{{ dataItem.tagCounts.tagCount }}</div>
            </div>
          </div>
          <div class="num">
            <div>
              <div class="zu">自定义标签类别</div>
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
                <div class="zu">广告模型应用榜TOP5</div>
                <div class="tu" style="margin-top:20px">
                  <div class="w">模型名称</div>
                  <div class="w">调用量</div>
                </div>
                <div class="tu" v-for="(v, i) in dataItem.modelTopList" :key="i">
                  <div style="line-height:40px" @click="toQuery(v)">{{ v.model }}</div>
                  <div style="line-height:40px" @click="toQuery(v)">{{ v.usedCount }}</div>
                </div>
              </div>
              <div class="nu">
                <div class="zu">经营模型应用榜</div>
                <div class="tu" style="margin-top:20px">
                  <div class="w" >模型名称</div>
                  <div class="w" >应用率</div>
                </div>
                <div class="tu" v-for="(v, i) in dataItem.operateModelTopList" :key="i">
                  <div style="line-height:40px" @click="toQuery(v)">{{ v.model }}</div>
                  <div style="line-height:40px" @click="toQuery(v)">{{ v.usedRatio }}%</div>
                </div>
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
        <div class="advertising">
          <div class="advertising-top">
            <div class="dataStyle">
              <div class="item">
                <h3>总金额（亿）</h3>
                <span>{{showList.autoSense.totalCount}}</span>
              </div>
              <div class="item">
                <h3>总展示（万）</h3>
                <span>{{showList.autoSense.showCount}}</span>
              </div>
              <div class="item">
                <h3>总点击（万）</h3>
                <span>{{showList.autoSense.clickCount}}</span>
              </div>
            </div>
          </div>
          <div class="advertising-bottom">
            <div class="dataStyle">
              <div class="item">
                <h3>总金额（亿）</h3>
                <span>{{showList.brandAds.totalCount}}</span>
              </div>
              <div class="item">
                <h3>总展示（万）</h3>
                <span>{{showList.brandAds.showCount}}</span>
              </div>
              <div class="item">
                <h3>总点击（万）</h3>
                <span>{{showList.brandAds.clickCount}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="nn_num1">
          <div class="zu">自定义标签类别</div>
          <div id="num2"></div>
        </div>
        <div class="nn_num1">
          <div class="zu">自研模型类别</div>
          <div id="num3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customers from '@/service/V1/customers-service-new'
import { thousands } from '@/utils'
export default {
  data () {
    return {
      // 广告
      showList: {
        brandAds: {},
        autoSense: {}
      },
      dataItem: {
        tagCounts: {
          coverUserCount: '',
          tagCount: '',
          selfCount: '',
          modelCount: ''
        }
      },
      timingList: {},
      rootList: {},
      leafList: {},
      leafParam: {
        year: '2020'
      },
      secondColor: '#058cff'
    }
  },
  mounted () {
    this.diyTimingCharts = this.Echarts.init(document.getElementById('num2'))
    this.modelTimingBarCharts = this.Echarts.init(document.getElementById('num3'))
    this.rootChart = this.Echarts.init(document.getElementById('main'))
    this.oneChart = this.Echarts.init(document.getElementById('one'))
    this.twoChart = this.Echarts.init(document.getElementById('two'))
    this.threeChart = this.Echarts.init(document.getElementById('three'))
    this.getDataList()
    this.getTimingList()
    this.getRootList()
  },
  methods: {
    toQuery (v) {
      this.$router.push({ path: '/V1/Query' })
      sessionStorage.setItem('tagList', JSON.stringify(v.tagList))
      sessionStorage.setItem('queryName', '数据')
    },
    // 获取静态数据 接口
    getDataList () {
      customers.getDataListService({ year: '2020' }).then((res) => {
        this.dataItem = res
        let coverUserCount = this.dataItem.tagCounts.coverUserCount
        this.dataItem.tagCounts.coverUserCount = thousands(coverUserCount)

        let selfCount = this.dataItem.tagCounts.selfCount
        this.dataItem.tagCounts.selfCount = thousands(selfCount)
      })
      customers.getAdShowList({ year: '2020' }).then((res) => {
        this.showList = res

        let showCount = this.showList.autoSense.showCount
        this.showList.autoSense.showCount = thousands(showCount)

        let clickCount = this.showList.autoSense.clickCount
        this.showList.autoSense.clickCount = thousands(clickCount)

        let bshowCount = this.showList.brandAds.showCount
        this.showList.brandAds.showCount = thousands(bshowCount)

        let bclickCount = this.showList.brandAds.clickCount
        this.showList.brandAds.clickCount = thousands(bclickCount)
      })
    },
    // 客群中心实时数据接口
    getTimingList () {
      customers.getTimingListService({ year: '2020' }).then((res) => {
        // this.tagBarCharts.setOption(res.tagTimingOption)
        this.diyTimingCharts.setOption(res.divTagTimingOption)
        this.modelTimingBarCharts.setOption(res.modelTimingOption)
      })
    },
    getRootList () {
      customers.getRootListService({ year: '2020' }).then((res) => {
        this.rootList = res
        this.leafParam.tagId = res[1]
        this.rootChart.setOption(res[0])
        this.getLeafList()

        let _that = this
        this.rootChart.on('click', function (params) {
          _that.leafParam.tagId = params.data.tagId
          _that.secondColor = params.data.color
          _that.getLeafList()
        })
      })
    },
    getLeafList () {
      customers.getLeafListService(this.leafParam, this.secondColor).then((res) => {
        this.leafList = res
        this.oneChart.setOption(res.usedOption)
        this.twoChart.setOption(res.userCountOption)
        this.threeChart.setOption(res.productOption)
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
      .to_home {
        width: 120px;
        height: 32px;
        background-image: url('../../../assets/V1/images/service/home_page.png');
        background-repeat: no-repeat;
        cursor: pointer;
        position: absolute;
        left: 45px;
        top: 36px;
        z-index: 1000;
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
            color: #29c896;
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
                border: 1px solid #29c896;
                background-image: url("../../../assets/V1/images/juxing.png");
                background-size: 100% 100%;
                opacity: 0.8;
                color: #ffffff;
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
      .advertising {
        width: 480px;
        height: 319px;
        .dataStyle {
          width: 480px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          .item {

            width: 140px;
            height: 60px;
            text-align: center;
            h3 {
                      margin-top: 40px;
              margin-bottom: 20px;
              font-size: 18px;
              width: 140px;
              height: 24px;
              font-size: 22px;
              font-family: HYXiJianHeiJ;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 24px;
            }
            span {
              color:#29c896;
              font-size: 33px;
              font-family: HYCuJianHeiJ;
              font-weight: 400;
            }
          }
        }
        &-top {
          width: 480px;
          height: 155px;
          margin-bottom: 9px;
          background: url("../../../assets/V1/images/customersCenter/brand.png")
            no-repeat;
          background-size: 100% 100%;
        }
        &-bottom {
          width: 480px;
          height: 155px;
          background: url("../../../assets/V1/images/customersCenter/accurate.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
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
