<!--单产品页面-->
<template>
  <div class="product">
    <div class="content">
      <div class="to_product" @click="toHome"></div>
      <div class="head_content">
        <div></div>
        <div>{{ productName || '' }}</div>
        <div></div>
      </div>
      <div class="notice_content">
        <p><span>事业群：{{info.groupName || ''}}</span><span>部门：{{info.grade || ''}}</span><span>产品介绍：{{info.detail || ''}}</span></p>
      </div>
      <div class="top_content">
        <div class="numbs_box">
          <h4><img src="../assets/V1/images/product/numbs/title_1.png" alt=""></h4>
          <div class="numbs openNumb" id="openNumb"></div>
        </div>
        <div class="numbs_box">
          <h4><img src="../assets/V1/images/product/numbs/title_2.png" alt=""></h4>
          <i></i>
          <div class="numbs payNumb" id="payNumb"></div>
        </div>
        <div class="numbs_box">
          <h4><img src="../assets/V1/images/product/numbs/title_3.png" alt=""></h4>
          <div class="numbs activeNumb" id="activeNumb"></div>
        </div>
      </div>
      <div class="center_content">
        <div class="left_bar">
          <div class="chart_box">
            <h4>收入总视图</h4>
            <div class="chart_wrap" ref="income"></div>
          </div>
          <div class="chart_box">
            <h4>用户总视图</h4>
            <div class="chart_wrap" ref="user"></div>
          </div>
        </div>
        <div class="center_bar">
          <h4>地图</h4>
          <div class="chart_wrap" ref="map"></div>
        </div>
        <div class="right_bar">
          <div class="chart_box">
            <h4>开通用户数</h4>
            <div class="chart_wrap" ref="open"></div>
          </div>
          <div class="chart_box">
            <h4>付费用户数</h4>
            <div class="chart_wrap" ref="pay"></div>
          </div>
          <div class="chart_box">
            <h4>活跃用户数</h4>
            <div class="chart_wrap" ref="active"></div>
          </div>
        </div>
      </div>
      <div class="bottom_content">
        <div class="chart_box">
          <h4>详情</h4>
          <div class="detail">
            <h5><span>手机号</span><span>类别</span><span>时间</span></h5>
            <div class="scroll_wrap">
              <ul :class="{ animate: animate == true }" ref="lst" @mouseenter="moveEnter" @mouseleave="moveLeave">
                <li v-for="(item, key) in detailLst" :key="key">
                  <span>{{ item&&item.mobile?item.mobile:'' }}</span>
                  <span>{{ item&&item.kinds?item.kinds:''}}</span>
                  <span>{{ item&&item.datetime?item.datetime:'' }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="chart_box">
          <h4>用户画像</h4>
          <div class="chart_wrap" ref="userface">

          </div>
        </div>
        <div class="chart_box">
          <h4>趋势预测</h4>
          <div class="chart_wrap" ref="tendency">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../node_modules/echarts/map/js/china.js'
import BoardServiceApi from '@/service/board-service'
// import { ScrollNumber } from '@/utils/scrollNumber.js'
import { CountUp } from 'countup.js'
// import $ from 'jquery'
export default {
  name: 'ProductCenter',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      productName: '',
      productId: '',
      info: {},
      openNumb: '',
      payNumb: '',
      activeNumb: '',
      accountLst: [],
      rankDomsLen: 5,
      scatterDomsLen: 2,
      detailLst: [],
      animate: false,
      timer: null,
      provinceCode: '',
      queryParams: {
        productId: '',
        year: '2020',
        provinceCode: '',
        cycle: 30000
      },
      endVal: 0,
      countUpOptions: {
        delay: 5000,
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },
  mounted () {
    this.productName = this.$route.params.name || sessionStorage.getItem('productName') || ''
    this.productId = this.$route.params.id || sessionStorage.getItem('productId') || ''
    this.incomeChart = this.Echarts.init(this.$refs.income)
    this.userChart = this.Echarts.init(this.$refs.user)
    this.mapChart = this.Echarts.init(this.$refs.map)
    this.openChart = this.Echarts.init(this.$refs.open)
    this.payChart = this.Echarts.init(this.$refs.pay)
    this.activeChart = this.Echarts.init(this.$refs.active)
    this.userfaceChart = this.Echarts.init(this.$refs.userface)
    this.tendencyChart = this.Echarts.init(this.$refs.tendency)

    this.getProjectDetail()
    this.getMonthIncomeAndUserOne()
    this.getProvinceDatas()
    this.getUserTotal()
    this.getNewUserList()
    this.scrollTotalNum()
    this.getUserFace()
    this.getTendency()
    this.mapClick()
  },
  methods: {
    mapClick () {
      let _that = this
      this.mapChart.on('click', function (params) {
        _that.provinceCode = params.data.provinceCode || ''
        _that.getUserTotal()
      })
    },
    toHome () {
      this.$router.push({ path: '/ProductCenter' })
    },
    scrollFn () {
      const lst = this.$refs.lst
      const _that = this
      if (lst && lst.style) {
        lst.style.top = '0px'
        _that.animate = !_that.animate
        setTimeout(function () {
          lst.style.top = '-40px'
          const lastChild = _that.detailLst.pop()
          _that.detailLst.unshift(lastChild)
          _that.animate = !_that.animate
        }, 1000)
      }
    },
    moveEnter () {
      clearInterval(this.timer)
    },
    moveLeave () {
      this.timer = setInterval(this.scrollFn, 2000)
    },
    getProjectDetail () {
      let params = {}
      const _that = this
      params.productId = _that.productId
      BoardServiceApi.getProjectDetail(params).then(res => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            _that[key] = res[key]
            _that.setNumbs(key, res[key])
          }
        }
      })
    },
    setNumbs (dom, numb) {
      if (dom === 'info') return
      this.endVal = numb || 0
      if (!this[dom + 'Fn']) {
        this.countUpOptions.formattingFn = function (n) {
          let result = n.toString()
          let res = ''
          let ll = result.length
          for (let i = 0; i < 10 - ll; i++) { result = '0' + result }
          for (let i = 0; i < 10; i++) {
            res += '<span class="g-num-item" style="position: absolute; display: block; left:' + (i + 1) * 49 + 'px; top: 62px; width: 50px;">' + result[i] + '</span>'
          }
          return res
        }
        this[dom + 'Fn'] = new CountUp(dom, this.endVal, this.countUpOptions)
        // this[dom + 'Fn'] = new ScrollNumber('.' + dom, {
        //   width: 50, // 每个数字元素的宽
        //   color: '#57c2d7', // 数字元素的字体颜色
        //   fontSize: 40, // 数字元素的字体大小
        //   autoSizeContainerWidth: true, // 自动计算容器宽度 .scroll-number-0 ，如果已经使用css 制定了容器的宽度，此处可设置为false
        //   background: ''
        // })
        this[dom + 'Fn'].start()
      } else {
        this[dom + 'Fn'].update(this.endVal)
      }
      // this[dom + 'Fn'].run(numb || 0, 10) // 10是位数
    },
    getMonthIncomeAndUserOne () {
      let params = {}
      params.productId = this.productId
      params.year = '2020'
      BoardServiceApi.getMonthIncomeAndUserOne(params).then(res => {
        this.incomeChart.setOption(res[0])
        this.userChart.setOption(res[1])
      })
    },
    getProvinceDatas () {
      let params = {}
      params.productId = this.productId
      params.year = '2020'
      BoardServiceApi.getProvinceDatas(params).then(res => {
        this.mapChart.setOption(res)
      })
    },
    getUserTotal () {
      let params = {}
      params.productId = this.productId
      params.year = '2020'
      params.provinceCode = this.provinceCode
      BoardServiceApi.getUserTotal(params).then(res => {
        this.openChart.setOption(res.open)
        this.payChart.setOption(res.pay)
        this.activeChart.setOption(res.active)
      })
    },
    getNewUserList () {
      let _that = this
      _that.queryParams.productId = _that.productId
      BoardServiceApi.getNewUserList(_that.queryParams).then(res => {
        _that.detailLst = res
        if (_that.detailLst.length === 0) {
          _that.detailLst.push({ mobile: '', kinds: '', datetime: '' })
        }
        res.forEach(item => {
          if (item.kinds === '开通') {
            _that['openNumb'] = _that['openNumb'] + 1
          }
          if (item.kinds === '付费') {
            _that['payNumb'] = _that['payNumb'] + 1
          }
          if (item.kinds === '活跃') {
            _that['activeNumb'] = _that['activeNumb'] + 1
          }
        })
        _that.setNumbs('openNumb', _that['openNumb'])
        _that.setNumbs('payNumb', _that['payNumb'])
        _that.setNumbs('activeNumb', _that['activeNumb'])
      })
      _that.moveLeave()
    },
    scrollTotalNum () {
      let _that = this
      setInterval(function () {
        _that.getNewUserList()
      }, _that.queryParams.cycle)
    },
    getUserFace () {
      let params = {}
      params.productId = this.productId
      params.year = '2020'
      params.provinceCode = this.provinceCode
      BoardServiceApi.getUserFace(params).then(res => {
        this.userfaceChart.setOption(res)
      })
    },
    getTendency () {
      let params = {}
      params.productId = this.productId
      params.year = '2020'
      params.provinceCode = this.provinceCode
      BoardServiceApi.getTendency(params).then(res => {
        this.tendencyChart.setOption(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/V1/styles/product.scss";
</style>
