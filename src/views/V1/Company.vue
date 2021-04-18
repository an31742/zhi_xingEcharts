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
            <img src="../../assets/V1/images/company/his3.png" alt />
          </li>
          <li class="origan" @click="openPics(3)">
            <img src="../../assets/V1/images/company/organ3.png" alt />
          </li>
          <li class="people" @click="openPics(5)">
            <img src="../../assets/V1/images/company/people3.png" alt />
          </li>
          <li class="party" @click="openPics(10)">
            <img src="../../assets/V1/images/company/party3.png" alt />
          </li>
          <li class="develop" @click="openPics(7)">
            <img src="../../assets/V1/images/company/develop3.png" alt />
          </li>
          <li class="research" @click="openPics(6)">
            <img src="../../assets/V1/images/company/research3.png" alt />
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
// 调用接口方式

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
          toIndex: 2
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
        }
      ]
      // dialogVisible: false,
    }
  },
  mounted () {},
  methods: {
    toHome () {
      this.$router.push({ path: '/V1' })
    },
    openPics (toIndex) {
      this.toIndex = toIndex
      if (this.$refs.carousel) {
        this.$refs.carousel.setActiveItem(toIndex)
      }
      this.$router.push({
        path: '/V1/cardshow',
        query: {
          toIndex
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/V1/styles/company.scss";
</style>
