<!-- 2b产品详情页 -->
<template>
  <div class="page-wrap">
    <head-part-two :titleName="productName"></head-part-two>
    <div class="toB">
      <div class="down">
        <div class="down-left">
          <div class="down-left-up">
            <div class="title">产品介绍</div>
            <div class="down-left-up-content">
              <div class="down-left-up-content-up">
                <div class="down-left-up-content-up-row">
                  <i></i>
                  <label>事业群：</label>
                  <span>{{ productInfo.info.groupName }}</span>
                </div>
                <div class="down-left-up-content-up-row">
                  <i></i>
                  <label>部门：</label>
                  <span :title="productInfo.info.departmentName">{{
                    productInfo.info.departmentName
                  }}</span>
                </div>
                <div>
                  <i></i>
                  <label>产品描述：</label>
                  <el-scrollbar style="height=100%;">
                    <span class="dec">
                      {{ productInfo.info.detail }}
                    </span>
                  </el-scrollbar>
                </div>
              </div>
              <div class="dividing-line"></div>
              <div class="time-line">
                  <div class="time-line-data">
                    <div class="circle"></div>
                    试商用时间：
                    <span v-if="productInfo.info.preCommercialTime&&productInfo.info.preCommercialTime!=='0000-00-00 00:00:00'">
                      {{ productInfo.info.preCommercialTime | toFormatYM }}
                    </span>
                    <span v-else class="time-line-font">【未试商用】</span>
                  </div>
                  <div class="link-right"></div>
                  <div class="time-line-data">
                    <div class="circle"></div>
                    正式商用时间：
                    <span v-if="productInfo.info.commercialTime&&productInfo.info.commercialTime !== '0000-00-00 00:00:00'">
                      {{ productInfo.info.commercialTime | toFormatYM }}
                    </span>
                    <span v-else class="time-line-font">【未正式商用】</span>
                  </div>
              </div>
            </div>
          </div>
          <div class="down-left-down" v-if="starPointsFlag">
            <div class="title">亮点展示</div>
            <div class="light">
              <img
                src="../../../assets/V2/yszImages/woStudent/84x33.png"
                alt="暂无亮点展示"
              />
              <span> 【暂无亮点展示】 </span>
            </div>
          </div>
           <div class="down-left-down" v-else>
            <div class="title">亮点展示</div>
            <div class="down-left-down-content">
              <div
                class="down-left-down-content-main"
                v-show="productInfo.info.starPoints.point1"
              >
                <span class="light-point">亮点1:</span>
                <span class="light-section">
                  {{ productInfo.info.starPoints.point1 }}
                </span>
              </div>

              <div
                class="down-left-down-content-main"
                v-show="productInfo.info.starPoints.point2"
              >
                <span class="light-point">亮点2:</span>
                <span class="light-section">
                  {{ productInfo.info.starPoints.point2 }}
                </span>
              </div>
              <div
                class="down-left-down-content-main"
                v-show="productInfo.info.starPoints.point3"
              >
                <span class="light-point">亮点3:</span>
                <span class="light-section">
                  {{ productInfo.info.starPoints.point3 }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="down-center">
          <div class="down-center-center content">
            <div class="title">收入</div>
            <div id="incomes" style="width: 100%; height: 100%"></div>
            <div v-show="incomesFlag" class="incomesFlag">【暂无数据】</div>
          </div>
          <div class="down-center-down content">
            <div class="title">合作企业数</div>

            <div id="cooperativations" style="width: 100%; height: 100%"></div>
            <div v-show="cooperativationsFlag" class="cooperativationsFlag">
              【暂无数据】
            </div>
          </div>

          <div class="down-center-bottom content">
            <div class="title">调用量</div>
            <div id="usages" style="width: 100%; height: 100%"></div>
            <div v-show="usagesFlag" class="usagesFlag">【暂无数据】</div>
          </div>
          <div class="down-center-up">
            <div class="down-center-up-left upContent">
              <div class="title">行业所占份额</div>
              <div v-if="tradesInfo === '【暂无数据】'" class="nothing">
                {{ tradesInfo }}
              </div>
              <div v-else class="dataView">

                   <el-scrollbar>
                  <span>
                 {{ tradesInfo }}

                  </span>
                </el-scrollbar>
              </div>
            </div>
            <div class="down-center-up-right upContent">
              <div class="title">场景规模</div>

              <div v-if="sensesInfo === '【暂无数据】'" class="nothing">
                {{ sensesInfo }}
              </div>
              <div v-else class="dataView">
                <el-scrollbar>
                  <span>
                {{ sensesInfo }}

                  </span>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </div>
        <div class="down-right">
          <div class="down-right-up content">
            <div class="title">渠道</div>
            <div id="places" style="width: 100%; height: 100%"></div>
            <div
              v-show="placesFlag"
              style="position: relative; top: -198px; left: 286px"
            >
              【暂无数据】
            </div>
          </div>
          <div class="down-right-center content">
            <div class="title">合作关系</div>
            <div id="partnership" style="width: 100%; height: 100%"></div>
            <div v-show="partnershipFlag" class="noData">【暂无数据】</div>
          </div>
          <div class="down-right-down">
            <div class="title">典型案例</div>

            <div class="down-right-down-content" v-if="cases.length > 1">
              <el-carousel
                height="158px"
                :autoplay="false"
                class="classic-case"
              >
                <el-carousel-item
                  class="classic-case"
                  v-for="(item, i) in cases"
                  :key="i + 3"
                >
                  <div class="classic-case" v-for="(item, i) in cases" :key="i">
                    <div class="white-circle"><img :src="item.icon" /></div>
                    <div class="classic-case-name">
                      {{ item.name || '【无】' }}
                    </div>
                    <div class="blue-bg">{{ item.case || '【无】' }}</div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="down-right-down-content" v-else-if="cases.length === 0">
              <div class="typical">【暂无典型案例】</div>
            </div>
            <div class="down-right-down-content" v-else-if="cases.length === 1">
              <div class="classic-case">
                <div class="white-circle"><img :src="cases[0].logo" /></div>
                <div class="classic-case-name">
                  {{ cases[0].name || '【无】' }}
                </div>
                <div :class="[cases[0].case === '' ? 'noData' : 'blue-bg']">
                  {{
                    cases[0].case === '' ? '【暂无典型案例】' : cases[0].case
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadPartTwo from '@/components/V2/HeadPartTwo'
import Info2BService from '@/service/V2/product-info/2b-service.js'
export default {
  name: 'ProductCenter',
  components: { HeadPartTwo },
  data () {
    return {
      productName: sessionStorage.getItem('productName') || '',
      productInfo: { info: { starPoints: {} } },
      params: {
        year: 2020,
        productId: sessionStorage.getItem('productId')
      },
      cases: [],
      sensesInfo: '',
      tradesInfo: '',
      // 试商用
      preCommercialTimeFlag: false,
      // 正式商用
      commercialTimeFlag: false,
      // 亮点展示
      starPointsFlag: false,
      // 收入
      incomesFlag: false,
      // 企业合作数
      cooperativationsFlag: false,
      // 调用量
      usagesFlag: false,
      // 渠道
      placesFlag: false,
      // 合作
      partnershipFlag: false

    }
  },
  mounted () {
    // this.tradesCharts = this.Echarts.init(document.getElementById('trades'))
    // this.sensesCharts = this.Echarts.init(document.getElementById('senses'))
    this.partnershipCharts = this.Echarts.init(document.getElementById('partnership'))
    this.cooperativationsCharts = this.Echarts.init(document.getElementById('cooperativations'))
    this.incomesCharts = this.Echarts.init(document.getElementById('incomes'))
    this.placesCharts = this.Echarts.init(document.getElementById('places'))
    this.usagesCharts = this.Echarts.init(document.getElementById('usages'))

    this.getProjectDetail()
    this.getProductCase()
    this.getProductChannel()
  },
  methods: {
    getProjectDetail () {
      Info2BService.getProjectDetail(this.params).then(res => {
        this.productInfo = res
        // 正式商用时间
        if (res.info.commercialTime === undefined ||
          res.info.commercialTime === '0000-00-00 00:00:00') {
          this.commercialTimeFlag = true
        }
        // 试商用
        if (res.info.preCommercialTime === undefined ||
          res.info.preCommercialTime === '0000-00-00 00:00:00') {
          this.preCommercialTimeFlag = true
        }

        // 亮点展示
        if ((res.info.starPoints.point1 === undefined || !res.info.starPoints.point1) &&
          (res.info.starPoints.point2 === undefined || !res.info.starPoints.point2) &&
          (res.info.starPoints.point3 === undefined || !res.info.starPoints.point3)) {
          this.starPointsFlag = true
        }
      })
    },
    getProductCase () {
      Info2BService.getProductCase(this.params).then(res => {
        // this.tradesCharts.setOption(res.trades)
        // this.sensesCharts.setOption(res.senses)
        // 合作关系

        if (!res.partnership) {
          this.partnershipCharts.dispose()
          this.partnershipFlag = true
        } else {
          this.partnershipCharts.setOption(res.partnership)
        }
        // 场景规模及行业所占份额
        this.cases = res.cases
        if (res.sensesInfo === '' || res.sensesInfo === undefined) {
          this.sensesInfo = '【暂无数据】'
        } else {
          this.sensesInfo = res.sensesInfo
        }
        if (res.tradesInfo === '' || res.tradesInfo === undefined) {
          this.tradesInfo = '【暂无数据】'
        } else {
          this.tradesInfo = res.tradesInfo
        }
      })
    },
    getProductChannel () {
      Info2BService.getProductChannel(this.params).then(res => {
        // 收入
        if (Object.keys(res.incomes).length === 0) {
          this.incomesCharts.dispose()
          this.incomesFlag = true
        } else {
          this.incomesCharts.setOption(res.incomes)
        }
        // 合作

        if (Object.keys(res.cooperativations).length === 0) {
          this.cooperativationsCharts.dispose()
          this.cooperativationsFlag = true
        } else {
          this.cooperativationsCharts.setOption(res.cooperativations)
        }

        // 调用量
        if (Object.keys(res.usages).length === 0) {
          this.usagesCharts.dispose()
          this.usagesFlag = true
        } else {
          this.usagesCharts.setOption(res.usages)
        }
        // 渠道
        if (Object.keys(res.places).length === 0) {
          this.placesCharts.dispose()
          this.placesFlag = true
        } else {
          this.placesCharts.setOption(res.places)
        }
      })
    }
  },
  beforeDestroy () {
    this.partnershipCharts.clear()
    this.cooperativationsCharts.clear()
    this.incomesCharts.clear()
    this.placesCharts.clear()
    this.usagesCharts.clear()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/V2/styles/common.scss';
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '@/assets/V2/styles/product-info-2b.scss';
</style>
