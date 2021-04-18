<!--客服中心页面-->
<template>
  <div class="home">
    <div class="content">
      <div class="head-content">
        <div></div>
        <div></div>
        <div></div>
        <div class="home" @click="toHome"></div>
      </div>
      <div class="main-content">
        <div class="accept">
          <div class="accept-left">
            <app-card :title="`受理量分布`">
              <acceptDistribution :data-list="dataList"></acceptDistribution>
            </app-card>
          </div>
          <div class="accept-right">
            <div class="accept-right-top">
              <app-card :title="`月受理量`">
                <acceptMonth ref="acceptMonth"></acceptMonth>
              </app-card>
            </div>
            <div class="accept-right-bottom">
              <app-card :title="`渠道受理量`">
                <acceptChannel :access-channels="accessChannels"></acceptChannel>
              </app-card>
            </div>
          </div>
        </div>
        <div class="complaint">
          <div class="complaint-left">
            <app-card :title="`客户投诉量`">
              <serverComplaint :custom-service="customService"></serverComplaint>
            </app-card>
          </div>
          <div class="complaint-middle">
            <app-card :title="`10015投诉量`">
              <phoneComplaint :phone="phone"></phoneComplaint>
            </app-card>
          </div>
          <div class="complaint-right">
            <app-card :title="`工信部申诉量`">
              <MIITComplaint :miit="miit"></MIITComplaint>
            </app-card>
          </div>
        </div>
      <!-- <app-card :title="`网络安全态势`">
        <LeakTypeDistribution></LeakTypeDistribution>
      </app-card> -->
      </div>
    </div>
  </div>
</template>
<script>
import acceptChannel from './components/acceptChannel'
import acceptDistribution from './components/acceptDistribution'
import acceptMonth from './components/acceptMonth'
import MIITComplaint from './components/MIITComplaint'
import phoneComplaint from './components/phoneComplaint'
import serverComplaint from './components/serverComplaint'
import ServiceService from '@/service/V1/service-service'
export default {
  components: {
    acceptChannel, // 受理渠道
    acceptDistribution, // 受理量分布
    acceptMonth, // 分月受理量
    MIITComplaint, // 工信部申诉量
    phoneComplaint, // 10015投诉量
    serverComplaint// 客服投诉量
  },
  data () {
    return {
      dataList: [],
      accessChannels: {},
      customService: {},
      phone: {},
      miit: {}
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/V1' })
    },
    fetchData () {
      ServiceService.getDataListService({ year: '2020' }).then(res => {
        this.dataList = res.mapDatas
        this.accessChannels = res.accessChannels
        this.customService = res.customService
        this.phone = res.phone
        this.miit = res.miit
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 1920px;
  height: 1080px;
  background-image: url('../../../assets/V1/images/service/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  .content {
    width: 1920px;
    height: 1080px;
    background-image: url('../../../assets/V1/images/service/big_border.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    overflow: hidden;
    .head-content {
      height: 75px;
      position: relative;
      .home{
        background-image: url('../../../assets/V1/images/service/home_page.png');
        background-repeat: no-repeat;
        position:absolute;
        left:35px;
        top: 24px;
        width: 60px;
        height: 32px;
      }
      div {
        &:nth-child(1) {
          width: 464px;
          height: 100%;
          background-image: url('../../../assets/V1/images/service/title_left.png');
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: left top;
          position: absolute;
          top: 24px;
          left: 82px;
        }

        &:nth-child(2) {
          width: 780px;
          height: 65px;
          margin: 0 auto;
          background-image: url('../../../assets/V1/images/service/title_bg.png');
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: center top;
        }

        &:nth-child(3) {
          float: right;
          width: 464px;
          height: 100%;
          background-image: url('../../../assets/V1/images/service/title_right.png');
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: right top;
          position: absolute;
          top: 24px;
          right:82px;
        }
      }
    }
    .main-content{
      padding:15px 17px 10px 17px;
      .accept{
        display: flex;
        height: 660px;
        &-left{
          flex: 1;
          background: url('../../../assets/V1/images/service/map_bg.png') no-repeat;
          background-position:bottom center;
          background-size: 95% 60%;
        }
        &-right{
          width: 805px;
          margin-left:15px;
          &-top{
            height: 485px;
          }
          &-bottom{
            margin-top:9px;
            height: 166px;
          }
        }
      }
      .complaint{
        display: flex;
        height: 281px;
        margin-top:19px;
        &-left{
          flex: 1;
        }
        &-middle{
          flex: 1;
          margin-left:19px;
        }
        &-right{
          flex: 1;
          margin-left:19px;
        }
      }
    }

  }
}

</style>
