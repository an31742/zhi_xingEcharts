<!-- 详情页 -->
<template>
  <div>
    <div class="back" @click="goBack"></div>
    <el-carousel
      direction="vertical"
      ref="carousel"
      width="1920px"
      height="1080px"
      :autoplay="false"
      :initial-index="toIndex"
      arrow="always"
    >
      <span class="el-icon-arrow-up top" @click="prev"></span>
      <!-- @mouseenter="changeActive($event)"  @mouseleave="removeActive($event)" -->
      <div class="top-center" @click="prev" @mouseenter="changeActive" @mouseleave="removeActive">
        <span class="el-icon-arrow-up"></span>
      </div>
      <el-carousel-item v-for="(item, key) in picLst" :key="key">
        <img :src="item" alt width="100%" height="100%" />
      </el-carousel-item>
      <span class="el-icon-arrow-down floor" @click="next"></span>
      <!-- @mouseenter="changeActive($event)" @mouseleave="removeActive($event)" -->
      <div class="floor-center" @click="next" @mouseover="changeActive" @mouseout="removeActive">
        <span class="el-icon-arrow-down"></span>
      </div>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'cardshow',
  data () {
    return {
      picLst: [],
      toIndex: 0
    }
  },
  mounted () {
    this.toIndex = Number(this.$route.query.toIndex)
    const picCount = 15
    for (let index = 0; index < picCount; index++) {
      this.picLst.push(require('../../../assets/V2/images/huq/company/' + index + '.png'))
    }
  },
  methods: {
    prev (val) {
      this.$refs.carousel.prev()
    },
    next (val) {
      this.$refs.carousel.next()
    },
    changeActive ($event) {
      $event.target.id = 'active'
    },
    removeActive ($event) {
      $event.target.id = ''
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '@/assets/V2/styles/detail.scss';
</style>
