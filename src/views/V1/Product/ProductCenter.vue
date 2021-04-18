<!--产品中心页面
-->
<template>
  <div class="home">
    <div class="content">
      <div class="to_home" @click="toHome"></div>
      <div class="to_query" @click="toQuery"></div>
      <div class="head_content"></div>
      <div class="top_content">
        <div class="left_side"></div>
        <div class="container">
          <h4>产品数量</h4>
          <ul>
            <li class="account_lst" v-for="(item, key) in accountLst" :key="key" @click="accountListClickHandler(item)">
              <img :src="item.icon" alt="">
              <p class="name">{{item.classifyName}}</p>
              <p class="numb">{{item.productCount}}<span> 个</span></p>
            </li>
          </ul>
        </div>
        <div class="right_side"></div>
      </div>
      <div class="center_content">
        <div class="left_bar">
          <h4>总视图</h4>
          <div class="income_wrap">
            <h4>收入总视图</h4>
            <div class="chart_wrap" ref="income"></div>
          </div>
          <div class="user_wrap">
            <h4>用户总视图</h4>
            <div class="chart_wrap" ref="user"></div>
          </div>
        </div>
        <div class="center_bar" @mouseenter="moveEnter" @mouseleave="moveLeave">
          <h4>产品现状分析</h4>
          <button class="prev" @click="prevFn"></button>
          <button class="next" @click="nextFn"></button>
          <div class="chart_wrap" ref="life3d"></div>
          <ul>
            <li :style="'width: ' + item.percent" v-for="(item, key) in stageLst" :key="key">
              <i></i>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="right_bar">
          <h4>分级管理</h4>
          <div class="labels">
            <p>集团</p>
            <p>公司</p>
            <p>部门</p>
          </div>
          <div class="chart_wrap" ref="grade"></div>
        </div>
      </div>
      <div class="bottom_content">
        <div class="box">
          <h4>事业群项目数量</h4>
          <div class="chart_wrap" ref="rank1">

          </div>
        </div>
        <div class="box">
          <h4>目标市场项目数量</h4>
          <div class="chart_wrap" ref="rank2">

          </div>
        </div>
        <div class="box">
          <h4>知识产权项目数量</h4>
          <div class="chart_wrap" ref="rank3">

          </div>
        </div>
        <div class="box">
          <h4>产品分类项目数量</h4>
          <div class="chart_wrap" ref="rank4">

          </div>
        </div>
        <div class="box">
          <h4>产品分级项目数量</h4>
          <div class="chart_wrap" ref="rank5">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BoardServiceApi from '@/service/board-service'
export default {
  name: 'ProductCenter',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      accountLst: [],
      stageLst: [],
      rankDomsLen: 5,
      scatterDomsLen: 2,
      life3DChart: '',
      lifecycleDatasParams: {
        year: '2020'
      }
    }
  },
  mounted () {
    for (let index = 0; index < this.rankDomsLen; index++) {
      this['rankChart' + (index + 1)] = this.Echarts.init(this.$refs['rank' + (index + 1)])
    }
    this.incomeChart = this.Echarts.init(this.$refs.income)
    this.userChart = this.Echarts.init(this.$refs.user)
    this.life3DChart = this.Echarts.init(this.$refs.life3d)
    this.gradeChart = this.Echarts.init(this.$refs.grade)
    this.getBusinessCount()
    this.getMonthIncomeAndUserTotal()
    this.getLifecycleDatas()
    this.getGradeViewTotal()
    this.getAllClassifyDatas()
    this.initFn()
  },
  methods: {
    accountListClickHandler (item) {
      this.lifecycleDatasParams = {}
      this.lifecycleDatasParams.year = '2020'
      this.lifecycleDatasParams.classifyId = item.classifyId
      this.moveEnter()
      BoardServiceApi.lifecycleDatas = null
      BoardServiceApi.lifeIndex = 0
      this.getLifecycleDatas()
    },
    toQuery () {
      this.$router.push({ path: '/Query' })
    },
    toHome () {
      this.$router.push({ path: '/' })
    },
    initFn () {
      let _that = this
      _that.life3DChart.on('click', function (params) {
        _that.$alert(`是否进入${params.data.name}？`, '产品详情', {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              sessionStorage.setItem('productId', params.data.productId)
              sessionStorage.setItem('productName', params.data.name)
              _that.$router.push({
                name: 'product',
                params: {
                  name: params.data.name,
                  id: params.data.productId,
                  infos: params.data.infos
                }
              })
            }
          }
        })
      })
    },
    prevFn () {
      const res = BoardServiceApi.toShowOfIndex('prev', 3, 30)
      if (res && res.option) {
        this.life3DChart.setOption(res.option)
        this.stageLst = res.stageLst
      }
    },
    nextFn () {
      const res = BoardServiceApi.toShowOfIndex('next', 3, 30)
      if (res && res.option) {
        this.life3DChart.setOption(res.option)
        this.stageLst = res.stageLst
      }
    },
    moveEnter () {
      clearInterval(this.timer)
    },
    moveLeave () {
      this.getLifecycleDatas()
    },
    getBusinessCount () {
      BoardServiceApi.getBusinessCount({ year: '2020' }).then(res => {
        this.accountLst = res
      })
    },
    getMonthIncomeAndUserTotal () {
      BoardServiceApi.getMonthIncomeAndUserTotal({ year: '2020' }).then(res => {
        this.incomeChart.setOption(res[0])
        this.userChart.setOption(res[1])
      })
    },
    getLifecycleDatas () {
      BoardServiceApi.getLifecycleDatas(this.lifecycleDatasParams, 30).then(res => {
        this.life3DChart.setOption(res.option)
        this.stageLst = res.stageLst
      })
      // this.timer = setInterval(() => {
      //   BoardServiceApi.getLifecycleDatas(this.lifecycleDatasParams, 30).then(res => {
      //     this.life3DChart.setOption(res.option)
      //     this.stageLst = res.stageLst
      //   })
      //   BoardServiceApi.autoAdd()
      // }, 3000)
    },
    getGradeViewTotal () {
      BoardServiceApi.getGradeViewTotal({ year: '2020' }).then(res => {
        this.gradeChart.setOption(res)
      })
      let _that = this
      _that.gradeChart.on('click', function (params) {
        _that.lifecycleDatasParams = {}
        _that.lifecycleDatasParams.year = '2020'
        _that.lifecycleDatasParams.gradeId = params.data.gradeId
        _that.moveEnter()
        BoardServiceApi.lifecycleDatas = null
        BoardServiceApi.lifeIndex = 0
        _that.getLifecycleDatas()
      })
    },
    getAllClassifyDatas () {
      var _that = this
      BoardServiceApi.getAllClassifyDatas({ year: '2020' }).then(res => {
        res.forEach((item, key) => {
          _that['rankChart' + (key + 1)].setOption(res[key])
          _that['rankChart' + (key + 1)].on('click', function (params) {
            _that.lifecycleDatasParams = {}
            _that.lifecycleDatasParams.year = '2020'
            if (key === 0) {
              _that.lifecycleDatasParams.groupId = params.data.xid
            }
            if (key === 1) {
              _that.lifecycleDatasParams.marketId = params.data.xid
            }
            if (key === 2) {
              _that.lifecycleDatasParams.knowledgeId = params.data.xid
            }
            if (key === 3) {
              _that.lifecycleDatasParams.classifyId = params.data.xid
            }
            if (key === 4) {
              _that.lifecycleDatasParams.gradeId = params.data.xid
            }
            _that.moveEnter()
            BoardServiceApi.lifecycleDatas = null
            BoardServiceApi.lifeIndex = 0
            _that.getLifecycleDatas()
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/V1/styles/product_center.scss";
</style>
