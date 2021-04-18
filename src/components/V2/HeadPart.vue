<!-- 头部 -->
<template>
  <div  :class="[titleName.length > 5 ? 'big' : 'head-part']">
    <h4>
      <span class="title">{{
        titleName
      }}</span>
      <span
        v-if="market != ''"
        style="
          vertical-align: super;
          font-size: 16px;
          letter-spacing: 3px;
          border-bottom: 2px solid #f3aa72;
          color: #78fcff;
        "
        >{{ $route.meta.market }}</span
      >
    </h4>
    <div class="button" @click="$router.push('/')"></div>
  </div>
</template>

<script>
export default {
  name: 'HeadPart',
  props: {
    titleName: {
      type: String,
      required: true
    },
    market: sessionStorage.getItem('market') || ''
  },
  data () {
    return { }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
@import '../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import "@/assets/V2/styles/head-part.scss";
.big {
 height: 80px;
   text-align: center;
  background-image: url('../../assets/images/11.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  position: relative;
   .title {

    height: 80px;
    line-height: 80px;
    font-size: 40px;
    // text-align: center;
    background: linear-gradient(to bottom, rgb(44, 132, 245), rgb(116, 246, 255));
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 10px;

  }

  .button {
    width: 102px;
    height: 42px;
    background-image: url(../../assets/images/100x43home.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    cursor: pointer;
    position: absolute;
    left: 60px;
    top: 24px;
    z-index: 1000;
  }
}
</style>
