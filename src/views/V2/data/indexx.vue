<!-- 数据页 -->
<template>
  <div class="page-wrap">
    <HeadPart :titleName="$route.meta.title" />
    <div class="main">
      <div class="left">
        <div class="left-top left-common">
          <div class="part-title">大网数据</div>
          <ul class="layout" style="margin-top: 12px; padding-left: 10px">
            <li class="title">
              <span style="line-height: 40px">标签名称</span
              ><span style="line-height: 40px">类别数量</span>
            </li>
            <li v-for="(item, i) in top5.network" :key="i + 60">
              <span :key="i + 70" :title="item.key">{{ item.key }}</span
              >
              <span :key="i + 80" :title="item.value">{{ item.value }}</span>
            </li>
          </ul>
        </div>
        <div class="left-center left-common">
          <div class="part-title">广告模型应用榜TOP5</div>
          <ul class="layout">
            <li class="title" id="title-center">
              <span>排名</span><span style="width: 554px">模型名称</span
              ><span>调用量</span>
            </li>
            <li
              v-for="(item, i) in top5.advertisement"
              :key="i"
              id="content-center"
            >
              <span id="content-center-top">Top{{ i + 1 }}</span
              ><span :key="i + 10" :title="item.key" style="width: 432px">{{
                item.key
              }}</span
              ><span :key="i + 20" :title="item.value | toThousandFilter">{{
                item.value | toThousandFilter
              }}</span>
            </li>
          </ul>
        </div>
        <div class="left-bottom left-common">
          <div class="part-title">经营模型应用榜</div>
          <ul class="layout" style="padding-left: 10px">
            <li class="title"><span>模型名称</span><span>应用率</span></li>
            <li v-for="(item, i) in top5.management" :key="i + 30">
              <span :key="i + 40" :title="item.key">{{ item.key }}</span
              ><span :key="i + 50" :title="item.value">{{ item.value }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="center">
        <div class="center-1">
          <div class="item">
            <div class="number">
            <div class="desc">覆盖用户数</div>
              {{ tagCounts.coverUserCount | toThousandFilter }}
            </div>
          </div>
          <div class="item">
            <div class="desc">标签类别</div>
            <div class="number">
              {{ tagCounts.tagCount | toThousandFilter }}
            </div>
          </div>
          <div class="item">
            <div class="desc">自定义标签类别</div>
            <div class="number">
              {{ tagCounts.selfCount | toThousandFilter }}
            </div>
          </div>
          <div class="item">
            <div class="desc">自研模型数</div>
            <div class="number">
              {{ tagCounts.modelCount | toThousandFilter }}
            </div>
          </div>
        </div>
        <div class="center-2">
          <div
            class="item"
            v-for="(e, i) in tagList"
            :key="e"
            @click.prevent="tagClick(e, i)"
            ref="select"
          :class="[i===falg ? 'visited' :'item' ]"
          >
            {{ e }}
          </div>
          <!-- <div
            class="item"
            v-for="(e, i) in tagList"
            :key="e"
            @click="tagClick(e, i)"
            ref="select"
            @mouseleave="MouseOut(i)"
            @mouseenter="mouseIn(i)"

          >
          <img :src="tag" alt="" >
          <span>{{e}}</span>
          </div> -->
        </div>
        <div class="center-3">
          <div id="center-title" class="part-title">地域标签</div>
          <div id="tag" style="width: 100%; height: 100%"></div>
        </div>
        <div class="center-4">
          <div class="part-title">产品数量</div>
          <div class="box">
            <span class="product">产品总数量:<span>76</span></span>
            <div class="item">
              <span
                v-for="(item, i) in productList.slice(0, 3)"
                :key="i + 10"
                >{{ item.productName }}</span
              >
              <!-- {{productList}} -->
            </div>
            <div class="item">
              <span
                v-for="(item, i) in productList.slice(3, 6)"
                :key="i + 10"
                >{{ item.productName }}</span
              >
              <!-- {{productList}} -->
            </div>
          </div>
        </div>
        <div class="center-5">
          <div class="part-title" style="margin-top: -6px">业务数据</div>
          <ul>
            <li v-for="(item, i) in businessList" :key="i + 30">
              {{ item.businessTag }}
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="right-top left-common">
          <div class="part-title">自定义标签类别</div>
          <div id="selfTag" style="width: 100%; height: 100%"></div>
        </div>
        <div class="right-center left-common">
          <div class="part-title">自研模型数</div>
          <div id="selfModel" style="width: 100%; height: 100%"></div>
        </div>
        <div class="right-bottom left-common">
          <div class="part-title">精准/品牌广告</div>
          <div class="accurate">
            <div class="title">* 精准广告 *</div>
            <ul>
              <li>
                <p class="desc">总金额（亿）</p>
                <p class="number">
                  {{ advs.brandAds.totalCount | toThousandFilter }}
                </p>
              </li>
              <li>
                <p class="desc">总展示（万）</p>
                <p class="number">
                  {{ advs.brandAds.showCount | toThousandFilter }}
                </p>
              </li>
              <li>
                <p class="desc">总点击（万）</p>
                <p class="number">
                  {{ advs.brandAds.clickCount | toThousandFilter }}
                </p>
              </li>
            </ul>
          </div>
          <div class="accurate">
            <div class="title">* 品牌广告 *</div>
            <ul>
              <li>
                <p class="desc">总金额（亿）</p>
                <p class="number">
                  {{ advs.autoSense.totalCount | toThousandFilter }}
                </p>
              </li>
              <li>
                <p class="desc">总展示（万）</p>
                <p class="number">
                  {{ advs.autoSense.showCount | toThousandFilter }}
                </p>
              </li>
              <li>
                <p class="desc">总点击（万）</p>
                <p class="number">
                  {{ advs.autoSense.clickCount | toThousandFilter }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DataService from '@/service/V2/data/data-service.js'
import 'echarts/map/js/china.js'
export default {
  data () {
    return {
      falg: 0,

      // view: 'url(' + require('../../../assets/V2/ljhImages/tag.png') + ')',
      // hover: 'url(' + require('../../../assets/V2/ljhImages/hover.png') + ')',
      // select: 'url(' + require('../../../assets/V2/ljhImages/select.png') + ')',
      params: {
        year: 2020

      },
      advs: { brandAds: {}, autoSense: {} },
      top5: { network: [], advertisement: [], management: [] },
      tagList: [],
      tagCounts: {},
      productList: [],
      businessList: []
    }
  },
  mounted () {
    this.tagCharts = this.Echarts.init(document.getElementById('tag'))
    this.selfTagCharts = this.Echarts.init(document.getElementById('selfTag'))
    this.selfModelCharts = this.Echarts.init(document.getElementById('selfModel'))

    this.getDataList()
    this.getAdShowList()
    this.getSurroundList()
    this.getCenterList('地域标签')
    this.initEvent()
  },
  methods: {
    // 设置地图默认样式
    initEvent () {
      var _that = this // 为什么使用that
      // this.mapChart.on('click', function (params) {
      //   _that.params.provinceCode = params.data.provinceCode
      //   _that.getMonthListService(_that.params)
      // })
      this.tagCharts.on('mouseover', function (event) {
        if (event.componentType === 'series' && event.seriesIndex === 1) {
          let option = _that.tagCharts.getOption()
          option.series[0].data = DataService.convertData([event.data])
          _that.tagCharts.setOption(option, true)
          // 由于绑定了mouseover事件，地图默认的高亮事件不触发了
          // 所以手动高亮一下
          _that.tagCharts.dispatchAction({
            type: 'highlight',
            seriesIndex: event.seriesIndex,
            dataIndex: event.dataIndex
          })
        }
      })
    },
    tagClick (tag, i) {
      this.falg = i
      this.$refs.select[i].className = 'visited'

      document.getElementById('center-title').innerText = tag
      // this.tag = select

      this.tagCharts.clear()
      this.getCenterList(tag)
    },
    // // 移入改变样式
    // mouseIn (i) {
    //   this.$refs.select[i].style.color = '#aaffff'
    //   this.$refs.select[i].style.backgroundImage = this.hover
    //   // console.log('this.tag', this.tag)
    //   // this.tag = hover
    // },
    // // 移出改变样式
    // MouseOut (i) {
    //   this.$refs.select[i].style.color = '#78FCFF'
    //   this.$refs.select[i].style.backgroundImage = this.view
    //   // this.tag = tag
    // },

    getDataList () {
      DataService.getDataList(this.params).then(res => {
        this.tagCounts = res.tagCounts
      })
    },
    getAdShowList () {
      DataService.getAdShowList(this.params).then(res => {
        this.advs = res
      })
    },
    getSurroundList () {
      DataService.getSurroundList(this.params).then(res => {
        this.top5 = res
        this.selfTagCharts.setOption(res.customOption)
        this.selfModelCharts.setOption(res.modelOption)
        this.productList = res.productList

        this.businessList = res.businessList
      })
    },
    getCenterList (tagName) {
      DataService.getCenterList(this.params).then(res => {
        this.tagList = res.tagList
        this.tagCharts.setOption(res[tagName])
      })
    }

  }
}

</script>

<style lang="scss" scoped>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '../../../assets/V2/font/number.css';
@import '../../../assets/V2/font/top.css';
@import '@/assets/V2/styles/common.scss';
@import '@/assets/V2/styles/data.scss';
</style>
