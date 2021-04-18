<!-- 渠道页 -->
<template>
  <div class="page-wrap">
    <HeadPart :titleName="$route.meta.title" />
    <div class="main">
      <div class="top">
        <div class="top-left">
          <div class="part-title">互联网渠道产品收入TOP10</div>
          <div class="box" style="padding-top: 37px">
            <div class="list" style="padding-top: 18px">
              <!-- <div class="item" v-for="(item, i) in top10.month" :key="i"> -->
              <div class="item" v-for="(item, i) in top10.network" :key="i">
                <!-- 进度组件，参数：颜色，长度(总长度230px) -->

                <Rectangle
                  :indColor="item.numColor"
                  :fontWeight="item.fontWeight"
                  Color="#7AFAFC"
                  bgColor="linear-gradient(90deg, #7DFEFD  0%, #2B82F5 100%)"
                  :width="item.width"
                  :index="i + 1"
                  :desc="item.key"
                  :number="item.value"
                  :numbColor="item.numColor ? item.numColor : '#7AFAFC'"
                  :numWeight="item.numWeight"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="top-center">
          <div class="top-center-top">
            <div class="part-title">渠道总视图</div>
            <div id="all" style="width: 100%; height: 100%"></div>
          </div>
          <div class="top-center-bottom">
            <div class="part-title">互联网渠道收入TOP5</div>
            <div class="netTop5">
              <!-- for循环渲染top5 -->
              <div class="item" v-for="(item, i) in company" :key="i">
                <div class="item-top">
                  <img :src="item.icon" width="40px" height="40px" alt="" />
                  <span>{{ item.key }}</span>
                </div>
                <div class="item-bottom">{{ parseInt(item.income) | toThousandFilter}}万</div>
              </div>
            </div>
          </div>
        </div>
        <div class="top-right">
          <div class="part-title">渠道产品收入TOP10</div>
          <div class="box" style="padding-top: 37px">
            <div class="list" style="padding-top: 18px">
              <div class="item" v-for="(item, i) in top10.month" :key="i">
                <!-- 进度组件，参数：颜色，长度 -->

                <Rectangle
                  bgColor="linear-gradient(90deg, #FEDDA6 0%, #F9AD73 100%)"
                  :width="item.width"
                  :index="i + 1"
                  :desc="item.key"
                  Color="#FEDCA6"
                  :number="item.value"
                  :indColor="item.numColor"
                  :numbColor="item.numColor ? item.numColor : '#FEDCA6'"
                  :fontWeight="item.fontWeight"
                  :numWeight="item.numWeight"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <div class="part-title">集团省份渠道收入TOP10</div>
          <div class="box">
            <div class="list">
              <!-- 前五个 -->
              <div
                class="item"
                v-for="(item, i) in top10.unicom.slice(0, 5)"
                :key="i"
                style="margin-bottom: 15px"
              >
                <Rectangle
                  bgColor="linear-gradient(90deg, #F3CCFF 0%, #B584F6 100%)"
                  :width="item.width"
                  :index="i + 1"
                  :desc="item.key"
                  :number="item.value"
                  Color="#F3CCFF"
                  :indColor="item.numColor"
                  :numbColor="item.numColor ? item.numColor : '#F3CCFF'"
                  :fontWeight="item.fontWeight"
                  :numWeight="item.numWeight"
                />
              </div>
            </div>
            <img src="@/assets/V2/ljhImages/column_line.png" alt="" />
            <!-- 后五个 -->
            <div class="list">
              <div
                class="item"
                v-for="(item, i) in top10.unicom.slice(5)"
                :key="i + 6"
              >
                <Rectangle
                  bgColor="linear-gradient(90deg, #F3CCFF 0%, #B584F6 100%)"
                  :width="item.width"
                  :index="i + 6"
                  :desc="item.key"
                  :number="item.value"
                  Color="#F3CCFF"
                  numbColor="#F3CCFF"
                  widthSpan="184px"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-right">
          <div class="part-title">自有渠道产品收入TOP10</div>
          <div class="box">
            <div class="list">
              <!-- 前五个 -->
              <div
                class="item"
                v-for="(item, i) in top10.own.slice(0, 5)"
                :key="i"
                style="margin-bottom: 15px"
              >
                <Rectangle
                  bgColor="linear-gradient(90deg, #3EEBDD 0%, #24B299 100%)"
                  :width="item.width"
                  :index="i + 1"
                  :desc="item.key"
                  :number="item.value"
                  Color="#3EEADE"
                  :indColor="item.numColor"
                  :numbColor="item.numColor ? item.numColor : '#3eeade'"
                  :fontWeight="item.fontWeight"
                  :numWeight="item.numWeight"
                />
              </div>
            </div>
            <img src="@/assets/V2/ljhImages/column_line.png" alt="" />
            <!-- 后五个 -->
            <div class="list" id="last">
              <div
                class="item"
                v-for="(item, i) in top10.own.slice(5)"
                :key="i + 6"
              >
                <Rectangle
                  bgColor="linear-gradient(90deg, #3EEBDD 0%, #24B299 100%)"
                  :width="item.width"
                  :index="i + 6"
                  :desc="item.key"
                  :number="item.value"
                  Color="#3EEADE"
                  numbColor="#3EEADE"
                  widthSpan="184px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelService from '@/service/V2/channel/channel-service.js'
import Rectangle from '@/components/V2/rect'
export default {
  components: {
    Rectangle
  },
  data () {
    return {
      params: {
        year: 2020
      },
      top10: { network: [], own: [], unicom: [], month: [] },
      company: []
    }
  },
  mounted () {
    this.allCharts = this.Echarts.init(document.getElementById('all'))
    this.getChannelList()
    this.getPartnerList()
  },
  methods: {
    getPartnerList () {
      ChannelService.getPartnerList(this.params).then(res => {
        console.log('res.top', res.top)
        this.company = res.top
      })
    },
    getChannelList () {
      ChannelService.getChannelList(this.params).then(res => {
        this.top10 = res

        this.filter(this.top10.month)
        this.filter(this.top10.own)
        this.filter(this.top10.network)
        this.filter(this.top10.unicom)

        this.allCharts.setOption(res.option)
      })
    },
    // 使用方法并调用添加颜色
    filter (arr) {
      arr.forEach((item, index) => {
        if (index === 0) {
          item.numWeight = 'bold'
          item.fontWeight = '700'
          item.numColor = '#C61831'
        } else if (index === 1) {
          item.numWeight = 'bold'
          item.fontWeight = '700'
          item.numColor = '#DD8810'
        } else if (index === 2) {
          item.numWeight = 'bold'
          item.fontWeight = '700'
          item.numColor = '#24BE7E'
        }
      })
      return arr
    }
  },
  beforeDestroy () {
    this.allCharts.clear()
  }

}
</script>

<style lang="scss" scoped>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '@/assets/V2/styles/common.scss';
@import '@/assets/V2/styles/channel.scss';
</style>
