<!-- 产品页 -->
<template>
  <div class="page-wrap">
    <head-part :titleName="$route.meta.title"></head-part>
    <div class="product">
      <div class="left">
        <div class="left-up content">
          <div class="title">产品分类</div>
          <div class="num">
            <div
              :class="[flag === 0 ? 'top-title-click' : 'top-title']"
              v-if="this.totalData.length > 0"
              @click="handlerTop(totalData[0].classifyName, 0)"
            >
              <p class="text">{{ totalData[0].classifyName.slice(0, 4) }}</p>
              <p class="textBottom">
                {{ totalData[0].classifyName.slice(4, 6) }}
              </p>
              <p class="number">
                {{ totalData[0].productCount }}<span>个</span>
              </p>
            </div>

            <div
              :class="[
                flag === index + 1
                  ? 'content-title-left-click'
                  : 'content-title-left',
              ]"
              v-for="(item, index) in subjectData"
              :key="index"
              @click="hanlerContentLeft(item.classifyName, index + 1)"
              ref="subject"
            >
              <div>
                <p class="text">{{ item.classifyName }}</p>
                <p class="number">{{ item.productCount }}<span>个</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="left-down content">
          <div class="title">产品分级</div>
          <!-- <div id="grade" style="width: 100%; height: 100%"></div> -->
          <div class="grade">
            <div
            v-for="(grade,index) in gradData" :key="index"
            :class="[flagGrade===index?'topGrade-click':'topGrade']"

              @click="onCompany(grade.gradeId, index)"
            >
              <span>{{ grade.projectCount }}</span>
            </div>

          </div>
          <div class="left-down-content">
            <div class="left-down-content-jt">
              集团
              <div class="left-down-content-jt-line line"></div>
              <div class="left-down-content-jt-circle circle"></div>
            </div>
            <div class="left-down-content-gs">
              公司
              <div class="left-down-content-gs-line line"></div>
              <div class="left-down-content-gs-circle circle"></div>
            </div>
            <div class="left-down-content-bm">
              部门
              <div class="left-down-content-bm-line line"></div>
              <div class="left-down-content-bm-circle circle"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-up">
          <div class="title">产品总视图</div>
          <div @click="toQuery" class="query"></div>
          <div class="prev" @click="prevFn"></div>
          <div class="next" @click="nextFn"></div>
          <div id="all" style="width: 100%; height: 100%; z-index: 1000"></div>
          <ul>
            <li
              :style="item.substyle"
              v-for="(item, key) in stageLst"
              :key="key"
            >
              <i></i>
              <span :style="'color:' + item.color">{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="middle-down">
          <div class="title">总视图</div>
          <div id="incomes" style="width: 100%; height: 50%"></div>
          <div id="users" style="width: 100%; height: 50%"></div>
        </div>
      </div>
      <div class="right">
        <div class="right-up content">
          <div class="title">目标市场产品数量</div>
          <div id="market" style="width: 100%; height: 100%"></div>
        </div>
        <div class="right-center content">
          <div class="title">知识产权产品数量</div>
          <div id="knowleage" style="width: 100%; height: 100%"></div>
        </div>
        <div class="right-down content">
          <div class="title">事业群产品分布</div>
          <div id="department" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HeadPart from '@/components/V2/HeadPart'
import ProductService from '@/service/V2/product/product-service.js'
export default {
  name: 'ProductCenter',
  components: { HeadPart },
  data () {
    return {
      flagGrade: null,
      flag: null,
      gradData: '',
      params: {
        year: 2020
      },
      life3DShow: 30,
      classifyData: [],
      stageLst: [],
      totalData: [],
      subjectData: [],
      childrenData: []
    }
  },
  watch: {

    '$route.path': {
      handler (newV, oldV) {
      }
    }
  },
  created () {
    this.getBusinessCount()
    this.getGradeViewTotal()
  },
  mounted () {
    // this.gradeCharts = this.Echarts.init(document.getElementById('grade'))
    this.marketCharts = this.Echarts.init(document.getElementById('market'))
    this.knowleageCharts = this.Echarts.init(document.getElementById('knowleage'))
    this.departmentCharts = this.Echarts.init(document.getElementById('department'))
    this.incomesCharts = this.Echarts.init(document.getElementById('incomes'))
    this.usersCharts = this.Echarts.init(document.getElementById('users'))
    this.allCharts = this.Echarts.init(document.getElementById('all'))

    this.getAllClassifyDatas()
    this.getMonthIncomeAndUserTotal()
    this.getLifecycleDatas()
    this.toProductiInfo()
  },
  methods: {

    // 跳转检索页
    toQuery () {
      this.$router.push('/V2/query')
    },
    // 产品总视图向前翻页
    async getBusinessCount () {
      let res = await ProductService.getBusinessCount(this.params)
      this.totalData = res.totalData
      this.subjectData = res.subjectData
      this.childrenData = res.childrenData
    },
    async getGradeViewTotal () {
      let res = await ProductService.getGradeViewTotal(this.params)

      this.gradData = res
      console.log('this.gradData', res)
    },
    getAllClassifyDatas () {
      ProductService.getAllClassifyDatas(this.params).then(res => {
        this.departmentCharts.setOption(res.departmentOption)
        this.marketCharts.setOption(res.marketOption)
        this.knowleageCharts.setOption(res.knowleageOption)
      })
    },
    // 产品总视图
    getMonthIncomeAndUserTotal () {
      ProductService.getMonthIncomeAndUserTotal(this.params).then(res => {
        this.incomesCharts.setOption(res.incomesOption)
        this.usersCharts.setOption(res.usersOption)
      })
    },
    getLifecycleDatas () {
      ProductService.getLifecycleDatas(this.params, this.life3DShow).then(res => {
        this.allCharts.setOption(res.option)
        this.stageLst = res.stageLst
      })
    },
    prevFn () {
      const res = ProductService.toShowOfIndex('prev', 3, this.life3DShow)
      if (res && res.option) {
        this.allCharts.setOption(res.option)
        this.stageLst = res.stageLst
      }
    },
    // 产品总视图向后翻页
    nextFn () {
      const res = ProductService.toShowOfIndex('next', 3, this.life3DShow)
      if (res && res.option) {
        this.allCharts.setOption(res.option)
        this.stageLst = res.stageLst
      }
    },
    clickClassify (id) {
      this.params = {}
      this.params.year = '2020'
      this.params.classifyId = id
      // _that.moveEnter()
      ProductService.lifecycleDatas = null
      ProductService.lifeIndex = 0
      this.getLifecycleDatas()
    },
    toProductiInfo () {
      let _that = this
      this.marketCharts.on('click', function (params) {
        _that.params = {}
        _that.params.year = '2020'
        _that.params.marketId = params.data.xid
        // _that.moveEnter()
        ProductService.lifecycleDatas = null
        ProductService.lifeIndex = 0
        _that.getLifecycleDatas()
      })

      this.knowleageCharts.on('click', function (params) {
        _that.params = {}
        _that.params.year = '2020'
        _that.params.knowledgeId = params.data.xid
        // _that.moveEnter()
        ProductService.lifecycleDatas = null
        ProductService.lifeIndex = 0
        _that.getLifecycleDatas()
      })

      this.departmentCharts.on('click', function (params) {
        _that.params = {}
        _that.params.year = '2020'
        _that.params.groupId = params.data.xid
        // _that.moveEnter()
        ProductService.lifecycleDatas = null
        ProductService.lifeIndex = 0
        _that.getLifecycleDatas()
      })

      _that.allCharts.on('click', function (params) {
        _that.$alert(`是否进入【${params.data.name}】详情页？`, '产品详情', {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              sessionStorage.setItem('productId', params.data.productId)
              sessionStorage.setItem('productName', params.data.name)
              sessionStorage.setItem('market', params.data.market)
              if (params.data.market.indexOf('2b2c') >= 0) {
                _that.$router.push({
                  name: 'V2ProductInfo2b2c'
                })
              } else if (params.data.market.indexOf('2b') >= 0) {
                _that.$router.push({
                  name: 'V2ProductInfo2b'
                })
              } else {
                _that.$router.push({
                  name: 'V2ProductInfo2c'
                })
              }
            }
          }
        })
      })
    },
    onCompany (val, index) {
      this.flagGrade = index
      this.params = {}
      this.params.year = '2020'
      this.params.gradeId = val
      // _that.moveEnter()
      ProductService.lifecycleDatas = null
      ProductService.lifeIndex = 0
      this.getLifecycleDatas()
    },

    // 总的
    handlerTop (val, index) {
      this.flag = index
      this.params = {}
      this.params.year = '2020'
      this.params.classifyId = val
      // _that.moveEnter()
      ProductService.lifecycleDatas = null
      ProductService.lifeIndex = 0
      this.getLifecycleDatas()
    },
    // 主题三个
    hanlerContentLeft (val, index) {
      this.flag = index
      this.params = {}
      this.params.year = '2020'
      this.params.classifyId = val
      // _that.moveEnter()
      ProductService.lifecycleDatas = null
      ProductService.lifeIndex = 0
      this.getLifecycleDatas()
    }

  },
  // 优化echarts卡顿
  beforeDestroy () {
    // this.gradeCharts.clear()
    this.marketCharts.clear()
    this.knowleageCharts.clear()
    this.departmentCharts.clear()
    this.incomesCharts.clear()
    this.usersCharts.clear()
    this.allCharts.clear()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Regular.css';
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '@/assets/V2/styles/common.scss';
@import '@/assets/V2/styles/product.scss';
</style>
