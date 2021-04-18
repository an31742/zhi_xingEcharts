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
    this.toIndex = this.$route.query.toIndex
    const picCount = 11
    for (let index = 0; index < picCount; index++) {
      this.picLst.push(require('../../assets/V1/images/company/' + index + '.png'))
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
#active {
  color: red;
}
.back {
  width: 60px;
  height: 32px;
  background: url("~@/assets/V1/images/company/back.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  left: 35px;
  top: 24px;
  z-index: 999999;
}
.top {
  text-align: center;
  width: 60px;
  height: 60px;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  position: fixed;
  right: -11px;
  top: 25%;
  z-index: 99999;
}
.floor {
  text-align: center;
  width: 60px;
  height: 60px;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  position: fixed;
  right: -11px;
  bottom: 25%;
  z-index: 99999;
}
.top-center {
  width: 100%;
  height: 60px;
  color: #fff;
  font-size: 60px;
  font-weight: 400;
  position: fixed;

  top: 0;
  z-index: 99999;
  span {
    width: 100%;
    text-align: center;
  }
}
.floor-center {
  width: 100%;
  height: 60px;
  color: #fff;
  font-size: 60px;
  font-weight: 400;
  position: fixed;

  bottom: 0;
  z-index: 99999;
  span {
    width: 100%;
    text-align: center;
  }
}
</style>
