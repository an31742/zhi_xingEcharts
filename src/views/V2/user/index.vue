<!-- 用户页 -->
<template>
  <div class="page-wrap">
    <head-part :titleName="$route.meta.title"></head-part>
    <div class="main">
      <div class="up">
        <ul>
          <li >
            <h4>在线用户数</h4>
            <div>{{userCounts.userCount|toThousandFilter}}</div>
          </li>
          <li >
            <h4>大网用户数</h4>
            <div>{{userCounts.unicom|toThousandFilter}}</div>
          </li>
          <li >
            <h4 >月度用户贡献均值</h4>
             <div>{{userCounts.arpu|toThousandFilter}}</div>
          </li>
        </ul>
      </div>
      <div class="down">
        <div class="left">
          <h4>分省用户数</h4>
          <div id="province" style="width: 100%; height: 100%;"></div>
        </div>
        <div class="middle">
          <ul>
            <li >
              <h4>付费用户数</h4>
              <div id="pay" style="width: 100%; height: 100%;"></div>
            </li>
            <li >
               <h4>活跃用户数</h4>
              <div id="active" style="width: 100%; height: 100%;"></div>
            </li>
            <li >
               <h4>用户分布</h4>
              <div id="userProducts" style="width: 100%; height: 100%;"></div>
            </li>
          </ul>
        </div>
        <div class="right">
          <ul>
            <li >
               <h4>套餐</h4>
              <div id="networks" style="width: 100%; height: 100%;"></div>
            </li>
            <li >
               <h4>volte</h4>
              <div id="voltes" style="width: 100%; height: 100%;"></div>
            </li>
            <li >
               <h4>终端</h4>
              <div id="plateforms" style="width: 100%; height: 100%;"></div>
            </li>
            <li >
               <h4>用户群体</h4>
              <div id="userGroup" style="width: 100%; height: 100%;"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/service/V2/user/user-service.js'
import HeadPart from '@/components/V2/HeadPart'
export default {
  name: 'User',
  components: { HeadPart },
  data () {
    return {
      params: {
        year: 2020
      },
      userCounts: {}
    }
  },
  mounted () {
    this.provinceCharts = this.Echarts.init(document.getElementById('province'))
    this.payCharts = this.Echarts.init(document.getElementById('pay'))
    this.activeCharts = this.Echarts.init(document.getElementById('active'))
    this.userGroupCharts = this.Echarts.init(document.getElementById('userGroup'))

    this.networksCharts = this.Echarts.init(document.getElementById('networks'))
    this.voltesCharts = this.Echarts.init(document.getElementById('voltes'))
    this.plateformsCharts = this.Echarts.init(document.getElementById('plateforms'))
    this.userProductsCharts = this.Echarts.init(document.getElementById('userProducts'))

    this.getUserListServiceV2()
  },
  methods: {
    getUserListServiceV2 () {
      UserService.getUserListServiceV2(this.params).then(res => {
        this.userCounts = res.userCounts
        this.provinceCharts.setOption(res.provinceOption)
        this.payCharts.setOption(res.feeUserOption)
        this.activeCharts.setOption(res.activeUserOption)
        this.userGroupCharts.setOption(res.userGroupsOption)

        this.networksCharts.setOption(res.networksOption)
        this.voltesCharts.setOption(res.voltesOption)
        this.plateformsCharts.setOption(res.plateformsOption)

        this.userProductsCharts.setOption(res.userProductsOption)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '../../../assets/V2/font/number.css';
@import "../../../assets/V2/font/top.css";
@import '@/assets/V2/styles/common.scss';
@import '@/assets/V2/styles/user.scss';
</style>
