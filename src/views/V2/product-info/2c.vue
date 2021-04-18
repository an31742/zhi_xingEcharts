<!-- 2C产品详情页 -->
<template>
  <div class="page-wrap">
    <head-part-two :titleName="productName"></head-part-two>
    <div class="toB">
      <div class="up">
        <div class="up-content">
          <div class="up-content-name">累计开通用户数</div>
          <div id="open" class="up-content-num" style="font-family: 300-CAI978">
            {{ productInfo.open | toThousandFilter }}
          </div>
        </div>
        <div class="up-content">
          <div class="up-content-name">累计付费用户数</div>
          <div id="pay" class="up-content-num">
            {{ productInfo.pay | toThousandFilter }}
          </div>
        </div>
        <div class="up-content">
          <div class="up-content-name">累计活跃用户数</div>
          <div id="active" class="up-content-num">
            {{ productInfo.active | toThousandFilter }}
          </div>
        </div>
      </div>
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
          <div class="down-center-up">
            <div class="title">收入总视图</div>
            <div id="incomes" style="width: 100%; height: 100%"></div>
            <div v-show="incomesFlag" class="incomesFlag">【暂无数据】</div>
          </div>
          <div class="down-center-center">
            <div class="title">用户总视图</div>
            <div id="users" style="width: 100%; height: 100%"></div>
            <div v-show="usersFlag" class="usersFlag">【暂无数据】</div>
          </div>
          <div class="down-center-down">
            <div class="down-center-down-left">
              <div class="title">开通用户数</div>
              <div v-show="openFlag" class="openFlag">【暂无数据】</div>
              <div id="openCharts" style="width: 100%; height: 100%"></div>
            </div>
            <div class="down-center-down-right">
              <div class="title">用户群体</div>
              <div v-show="userGroupsFlag" class="userGroupsFlag">
                【暂无数据】
              </div>
              <div id="userGroups" style="width: 100%; height: 100%"></div>
            </div>
          </div>
        </div>
        <div class="down-right">
          <div class="down-right-up">
            <div class="title">地域分布</div>
            <div id="province" style="width: 100%; height: 100%"></div>
          </div>
          <div class="down-right-center">
            <div class="title">活跃用户数</div>
            <div id="activeCharts" style="width: 100%; height: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HeadPartTwo from '@/components/V2/HeadPartTwo'
import 'echarts/map/js/china.js'
import Info2CService from '@/service/V2/product-info/2c-service.js'
import Info2BService from '@/service/V2/product-info/2b-service.js'
import { CountUp } from 'countup.js'
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
      userList: [],
      // 试商用
      preCommercialTimeFlag: false,
      // 正式商用
      commercialTimeFlag: false,
      // 亮点展示
      starPointsFlag: false,
      // 开通用户数和用户分布暂无数据
      openFlag: false,
      userGroupsFlag: false,
      // 收入和用户暂无数据

      usersFlag: false,
      incomesFlag: false,
      endVal: {
        open: 0,
        pay: 0,
        active: 0
      },
      timer: ''
    }
  },
  watch: {

  },
  mounted () {
    this.incomesCharts = this.Echarts.init(document.getElementById('incomes'))
    this.usersCharts = this.Echarts.init(document.getElementById('users'))
    this.provinceCharts = this.Echarts.init(document.getElementById('province'))
    this.openCharts = this.Echarts.init(document.getElementById('openCharts'))
    this.activeCharts = this.Echarts.init(document.getElementById('activeCharts'))
    this.userGroupsCharts = this.Echarts.init(document.getElementById('userGroups'))

    this.getProjectDetail()
    this.getMonthIncomeAndUserOne()
    this.getUserTotal()
    this.getProvinceDatas()
    this.getNewUserList()
    this.initEvent()
  },
  methods: {
    // 设置地图默认样式
    initEvent () {
      var _that = this
      // this.mapChart.on('click', function (params) {
      //   _that.params.provinceCode = params.data.provinceCode
      //   _that.getMonthListService(_that.params)
      // })
      this.provinceCharts.on('mouseover', function (event) {
        if (event.componentType === 'series' && event.seriesIndex === 1) {
          let option = _that.provinceCharts.getOption()
          option.series[0].data = Info2CService.convertData([event.data])
          _that.provinceCharts.setOption(option, true)
          // 由于绑定了mouseover事件，地图默认的高亮事件不触发了
          // 所以手动高亮一下
          _that.provinceCharts.dispatchAction({
            type: 'highlight',
            seriesIndex: event.seriesIndex,
            dataIndex: event.dataIndex
          })
        }
      })
    },
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
        if ((res.info.starPoints.point1 === undefined || res.info.starPoints.point1 === '') &&
          (res.info.starPoints.point2 === undefined || res.info.starPoints.point2 === '') &&
          (res.info.starPoints.point3 === undefined || res.info.starPoints.point3 === '')) {
          this.starPointsFlag = true
        }
        this.createScroll('open', res.open)
        this.createScroll('pay', res.pay)
        this.createScroll('active', res.active)
        let _that = this
        _that.timer = setInterval(function () {
          _that.getNewUserList()
        }, 9000)
      })
    },
    createScroll (dom, numb) {
      this.endVal[dom] = numb || 0
      if (!this[dom + 'Fn']) {
        this[dom + 'Fn'] = new CountUp(dom, this.endVal[dom], this.countUpOptions)
        this[dom + 'Fn'].start()
      } else {
        this[dom + 'Fn'].update(this.endVal[dom])
      }
    },
    getMonthIncomeAndUserOne () {
      Info2CService.getMonthIncomeAndUserOne(this.params).then(res => {
        // 收入
        if (Object.keys(res.incomes).length === 0) {
          this.incomesCharts.dispose()
          this.incomesFlag = true
        } else {
          this.incomesCharts.setOption(res.incomes)
        }

        // 用户
        if (Object.keys(res.users).length === 0) {
          this.usersCharts.dispose()
          this.usersFlag = true
        } else {
          this.usersCharts.setOption(res.users)
        }
      })
    },
    getUserTotal () {
      Info2CService.getUserTotal(this.params).then(res => {
        this.activeCharts.setOption(res.active)

        // 用户群体
        if (res.userGroups === 0 || Object.keys(res.userGroups).length === 0 || !res.userGroups) {
          this.userGroupsCharts.dispose()
          this.userGroupsFlag = true
        } else {
          this.userGroupsCharts.setOption(res.userGroups)
        }
        // 开通用户数
        if (res.open === 0 || Object.keys(res.open).length === 0 || !res.open) {
          this.openCharts.dispose()
          this.openFlag = true
        } else {
          this.openCharts.setOption(res.open)
        }
      })
    },
    getProvinceDatas () {
      Info2CService.getProvinceDatas(this.params).then(res => {
        this.provinceCharts.setOption(res)
      })
    },
    getNewUserList () {
      Info2CService.getNewUserList(this.params).then(res => {
        this.userList = res
        res.forEach(item => {
          if (item.kinds === '开通') {
            this.endVal['open'] = this.endVal['open'] + 1
          }
          if (item.kinds === '付费') {
            this.endVal['pay'] = this.endVal['pay'] + 1
          }
          if (item.kinds === '活跃') {
            this.endVal['active'] = this.endVal['active'] + 1
          }
        })
        this.createScroll('open', this.endVal['open'])
        this.createScroll('pay', this.endVal['pay'])
        this.createScroll('active', this.endVal['active'])
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.incomesCharts.clear()
    this.usersCharts.clear()
    this.provinceCharts.clear()
    this.openCharts.clear()
    this.activeCharts.clear()
    this.userGroupsCharts.clear()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '../../../assets/V2/font/top.css';
@import '../../../assets/V2/font/number.css';
@import '@/assets/V2/styles/common.scss';
@import '@/assets/V2/styles/product-info-2c.scss';
</style>
