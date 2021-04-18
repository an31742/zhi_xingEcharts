<!-- 公司介绍页 -->
<template>
  <div class="company">
    <div class="page-wrap">
      <div class="to_home" @click="toHome"></div>
      <div class="logo"></div>
      <div class="title"></div>
      <div class="number"></div>
      <div class="btns">
        <div id="produc"></div>
        <div class="cercle"></div>
        <ol>
          <li class="history" @click="openPics(0)">
            <img src="~@/assets/V2/images/huq/company/his3.png" alt />
          </li>
          <li class="origan" @click="openPics(3)">
            <img src="~@/assets/V2/images/huq/company/organ3.png" alt />
          </li>
          <li class="people" @click="openPics(5)">
            <img src="~@/assets/V2/images/huq/company/people3.png" alt />
          </li>
          <li class="party" @click="openPics(10)">
            <img src="~@/assets/V2/images/huq/company/party3.png" alt />
          </li>
          <li class="develop" @click="openPics(7)">
            <img src="~@/assets/V2/images/huq/company/develop3.png" alt />
          </li>
          <li class="research" @click="openPics(6)">
            <img src="~@/assets/V2/images/huq/company/research3.png" alt />
          </li>
          <li class="product" @click="openPics(11)">
            <img src="~@/assets/V2/images/huq/company/productView.png" alt />
          </li>
        </ol>
      </div>
      <div class="footer">
        <div class="line"></div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'company',
  data () {
    return {
      btnLst: [
        {
          name: '历史沿革',
          toIndex: 0
        },
        {
          name: '组织架构',
          toIndex: 3
        },
        {
          name: '人员队伍',
          toIndex: 5
        },
        {
          name: '研发创新',
          toIndex: 6
        },
        {
          name: '发展思路',
          toIndex: 7
        },
        {
          name: '党建统领',
          toIndex: 10
        },
        {
          name: '业务产品',
          toIndex: 11
        }
      ]
      // dialogVisible: false,
    }
  },
  mounted () { },
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    },
    openPics (toIndex) {
      // console.log('33333333', toIndex)
      this.toIndex = toIndex
      if (this.$refs.carousel) {
        this.$refs.carousel.setActiveItem(toIndex)
      }
      this.$router.push({
        path: '/V2/companyDetail',
        query: {
          toIndex
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '@/assets/V2/styles/common.scss';
@import '@/assets/V2/styles/company.scss';
</style>
