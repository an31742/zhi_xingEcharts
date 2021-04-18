<!--用户中心页面-->
<template>
  <div class="user">
    <div class="content">
      <div class="head-content">
        <div></div>
        <div></div>
        <div></div>
        <div class="home" @click="toHome"></div>
      </div>
      <div class="userLeft">
        <div class="userLeft-top">
          <h4>分省用户数</h4>
          <div class="userProvinceTu" id="userProvince" style="width:500px;height:610px;"></div>
        </div>
        <div class="userLeft-bottom">
          <h4>用户群体</h4>
          <div class="userGroupsTu" id="userGroups" style="width:500px;height:272px;"></div>
        </div>
      </div>
      <div class="userContent">
        <div class="userCon">
          <div class="userCount">
            <h4 class="title">开通（在线用户数、大网用户数和ARPU值）</h4>
            <div class="userCount-content">
              <div class="userCount-content-side">
                <h2 style="color:white;">在线用户数</h2>
                <div>
                  <img src="../../assets/V1/images/user/line.png" alt />
                </div>
                <div class="userCountTu" ref="userCount">
                    {{this.userCounts.userCount}}
                </div>
              </div>
            </div>
            <div class="userCount-content">
               <div class="userCount-content-side">
                <h2 style="color:white;">大网用户数</h2>
                  <div>
                    <img src="../../assets/V1/images/user/line.png" alt />
                  </div>
                  <div class="userCountTu" ref="userCount">
                     288,188,023
                  </div>
                </div>
              </div>
            <div class="userCount-content">
               <div class="userCount-content-side">
                <h2 style="color:white;">在线平均ARPU值</h2>
                  <div>
                    <img src="../../assets/V1/images/user/line.png" alt />
                  </div>
                  <div class="userCountTu" ref="userCount">
                     {{this.userCounts.arpu}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="userPay">
            <h4>付费用户数</h4>
            <div class="userPayTu" ref="userPay"></div>
          </div>
          <div class="usreActive">
            <h4>活跃用户数</h4>
            <div class="usreActiveLeft">
              <div class="usreActiveTu" ref="usreActive"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-Right">
        <div class="userRight" style="top:90px;">
          <h4>用户分布</h4>
          <div class="userAcceptance" id="userProducts"></div>
        </div>
        <div class="userRight" style="top:332px;">
          <h4>套餐</h4>
          <div class="userAcceptance" id="networks"></div>
        </div>
         <div class="userRight"  style="top:574px;">
          <h4>VoLTE</h4>
          <div class="userAcceptance" id="voltes"></div>
        </div>
         <div class="userRight" style="top:816px;">
          <h4>终端</h4>
          <div class="userAcceptance" id="plateforms"></div>
        </div>
      </div>
    </div>
</template>

<script>
import Api from '@/service/V1/user-service'
import { thousands } from '@/utils'
export default {
  data () {
    return {
      activeUserCounts: {},
      feeUserCounts: {},
      provinces: {},
      tops: {},
      userCounts: {
        userCount: '',
        arpu: ''
      },
      queryParams: {
        year: '2020'
      },
      secondColor: '#29C896'
    }
  },
  created () {},
  mounted () {
    this.provChart = this.Echarts.init(document.getElementById('userProvince'))
    this.userGroupsChart = this.Echarts.init(document.getElementById('userGroups'))
    this.userProductsChart = this.Echarts.init(document.getElementById('userProducts'))
    this.networksChart = this.Echarts.init(document.getElementById('networks'))
    this.voltesChart = this.Echarts.init(document.getElementById('voltes'))
    this.plateformsChart = this.Echarts.init(document.getElementById('plateforms'))
    this.userPayChart = this.Echarts.init(this.$refs.userPay)
    this.usreActiveChart = this.Echarts.init(this.$refs.usreActive)
    this.getUserListServiceV2()
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/V1' })
    },
    getUserListServiceV2 () {
      Api.getUserListServiceV2(this.queryParams).then(res => {
        this.userCounts.userCount = thousands(res.userCounts.userCount)
        this.userCounts.arpu = thousands(res.userCounts.arpu)
        this.provChart.setOption(res.provinceOption)

        let feeUserOption = res.feeUserOption
        feeUserOption.grid.bottom = '15%'
        feeUserOption.yAxis[0].nameTextStyle = { color: '#FFFFFF' }
        feeUserOption.yAxis[1].nameTextStyle = { color: '#FFFFFF' }
        this.userPayChart.setOption(feeUserOption)

        let activeUserOption = res.activeUserOption
        activeUserOption.grid.bottom = '25%'
        activeUserOption.yAxis[0].nameTextStyle = { color: '#FFFFFF' }
        activeUserOption.yAxis[1].nameTextStyle = { color: '#FFFFFF' }
        this.usreActiveChart.setOption(activeUserOption)

        let userGroupsOption = res.userGroupsOption
        userGroupsOption.grid = { left: '15%', bottom: '16%', top: '15%' }
        userGroupsOption.xAxis.name = '用户群体'
        userGroupsOption.xAxis.nameLocation = 'center'
        userGroupsOption.xAxis.nameGap = 30
        this.userGroupsChart.setOption(userGroupsOption)

        let userProductsOption = res.userProductsOption
        userProductsOption.grid = { bottom: '35%', left: '15%', top: '15%' }
        userProductsOption.xAxis.name = '产品个数'
        userProductsOption.xAxis.nameLocation = 'center'
        userProductsOption.xAxis.nameGap = 30
        userProductsOption.xAxis.axisLabel.formatter = function (v, i) {
          return v + '个'
        }
        this.userProductsChart.setOption(userProductsOption)

        this.networksChart.setOption(res.networksOption)
        this.voltesChart.setOption(res.voltesOption)
        this.plateformsChart.setOption(res.plateformsOption)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/V1/styles/user_center_new.scss";
</style>
