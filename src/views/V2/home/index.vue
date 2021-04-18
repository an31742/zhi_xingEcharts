<!-- 首页 -->
<template>
<!-- @click="run" -->
  <div class="homeV2" >
  <div class="company" @click="toCompany">
      <div class="company-btn"></div>
    </div>
    <div class="logo"></div>
    <div class="title">

     <div class="title-left"></div>
      <div class="title-center"></div>
    </div>
    <div class="party-title"></div>
    <div class="pedestal">
      <ul class="ball">
        <li
          @click.stop="OnClick(0)"
          @mouseleave.stop="MouseOut(0)"
          @mouseenter.stop="mouseIn(0)"
          ref="product"
        >
          <img :src="productSrc" alt="" />
        </li>
        <li
          @click.stop="OnClick(1)"
          @mouseleave.stop="MouseOut(1)"
          @mouseenter.stop="mouseIn(1)"
          ref="data"
        >
          <img :src="experienceSrc" alt="" />
        </li>
        <li
          @click.stop="OnClick(2)"
          @mouseleave.stop="MouseOut(2)"
          @mouseenter="mouseIn(2)"
          ref="user"
        >
          <img :src="userSrc" alt="" />
        </li>
        <li
          @click.stop="OnClick(3)"
          @mouseleave.stop="MouseOut(3)"
          @mouseenter.stop="mouseIn(3)"
          ref="experience"
        >
          <img :src="dataSrc" alt="" />
        </li>

        <li
          @click.stop="OnClick(4)"
          @mouseleave.stop="MouseOut(4)"
          @mouseenter.stop="mouseIn(4)"
          ref="channel"
        >
          <img :src="channelSrc" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import productSelectPng from '@/assets/V2/images/huq/select/5.png'
import productViewSrc from '@/assets/V2/images/huq/dongxiao/232x232.png'
import productHeightSrc from '@/assets/V2/images/huq/height/280x280.png'
import dataSelectPng from '@/assets/V2/images/huq/select/4.png'
import dataViewSrc from '@/assets/V2/images/huq/dongxiao/200x200datahview.png'
import dataHeightSrc from '@/assets/V2/images/huq/height/240x240.png'
import userSelectPng from '@/assets/V2/images/huq/select/2.png'
import userViewSrc from '@/assets/V2/images/huq/dongxiao/210x210.png'
import userHeightSrc from '@/assets/V2/images/huq/height/222.png'
import experienceSelectPng from '@/assets/V2/images/huq/select/1.png'
import experienceViewSrc from '@/assets/V2/images/huq/dongxiao/210x210ex.png'
import experienceHeightSrc from '@/assets/V2/images/huq/height/222x222.png'
import ticSelectPng from '@/assets/V2/images/huq/tic/select.png'
import ticViewSrc from '@/assets/V2/images/huq/tic/222.png'
import ticHeightSrc from '@/assets/V2/images/huq/tic/height.png'

// import ticSelectPng from '@/assets/V2/images/huq/tic/select.png'
// import ticViewSrc from '@/assets/V2/images/huq/tic/222.png'
// import ticHeightSrc from '@/assets/V2/images/huq/tic/height.png'
export default {
  name: 'Home',
  inject: ['reload'],
  data () {
    return {
      clickTime: 0,
      productSrc: '',
      dataSrc: '',
      userSrc: '',
      experienceSrc: '',
      channelSrc: ''
    }
  },
  // directives: { clickoutside },
  mounted () {
    this.MouseOut()
    this.stop()
    setInterval(() => {
      this.run()
    }, 3000)
  },
  methods: {
    run () {
      this.$refs.product.style.animationPlayState = 'running'
      this.$refs.experience.style.animationPlayState = 'running'
      this.$refs.user.style.animationPlayState = 'running'
      this.$refs.data.style.animationPlayState = 'running'
      this.$refs.channel.style.animationPlayState = 'running'
      this.timer = setTimeout(() => {
        this.$refs.product.style.animationPlayState = 'paused'
        this.$refs.experience.style.animationPlayState = 'paused'
        this.$refs.user.style.animationPlayState = 'paused'
        this.$refs.data.style.animationPlayState = 'paused'
        this.$refs.channel.style.animationPlayState = 'paused'
      //   this.clickTime++
      //   if (this.clickTime % 5 === 0) {
      //     this.reload()
      //   }
      }, 1000)
    },
    // 跳转公司
    toCompany () {
      this.$router.push({
        path: '/V2/company'
      })
    },
    OnClick (index) {
      switch (index) {
        case 0:
          this.productSrc = productSelectPng
          setTimeout(() => {
            this.$router.push({
              path: '/V2/product'
            })
          }, 500)
          break
        case 1:
          this.dataSrc = dataSelectPng
          setTimeout(() => {
            this.$router.push({
              path: '/V2/experience'
            })
          }, 500)
          break
        case 2:
          this.userSrc = userSelectPng
          setTimeout(() => {
            this.$router.push({
              path: '/V2/user'
            })
          }, 500)
          break
        case 3:
          this.experienceSrc = experienceSelectPng
          setTimeout(() => {
            this.$router.push({
              path: '/V2/data'
            })
          }, 500)
          break
        case 4:
          this.channelSrc = ticSelectPng
          setTimeout(() => {
            this.$router.push({
              path: '/V2/tic'
            })
          }, 500)
          break
      }
    },
    stop () {
      this.$refs.product.style.animationPlayState = 'paused'
      this.$refs.experience.style.animationPlayState = 'paused'
      this.$refs.user.style.animationPlayState = 'paused'
      this.$refs.data.style.animationPlayState = 'paused'
      this.$refs.channel.style.animationPlayState = 'paused'
    },
    MouseOut (index) {
      console.log(111111)
      this.productSrc = productViewSrc

      this.dataSrc = dataViewSrc

      this.userSrc = userViewSrc

      this.experienceSrc = experienceViewSrc

      this.channelSrc = ticViewSrc
    },
    // 悬停图片鼠标移入
    mouseIn (index) {
      switch (index) {
        case 0:
          this.productSrc = productHeightSrc
          break
        case 1:
          this.experienceSrc = experienceHeightSrc
          break
        case 2:
          this.userSrc = userHeightSrc
          break
        case 3:
          this.dataSrc = dataHeightSrc
          break
        case 4:
          this.channelSrc = ticHeightSrc
          break
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '@/assets/V2/styles/common.scss';
@import '@/assets/V2/styles/home2.scss';
</style>
