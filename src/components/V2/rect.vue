<template>
  <div class="box" id="boxId">
    <!-- filter:filter, background:backgColor,-->
    <em class="no" :style="{color:indColor,fontWeight:fontWeight}">{{index}}</em><span class="desc" :style="{color:Color,width:widthSpan}">{{desc}}</span>
    <!-- :style="{marginLeft:marginLeft}" -->
    <div class="rect">
      <div class="first" :style="{ background: bgColor, width} "></div>
      <div class="second" :style="{ background: bgColor} "></div>
      <div class="third" :style="{ background: bgColor} "></div>
      <div class="number" :style="{color:numbColor,fontWeight:numWeight}" id="numberId">{{number| toThousandFilter}}万</div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    widthSpan: {
      type: String,
      default: ''
    },
    // marginLeft: {
    //   type: String,
    //   default: ''
    // },
    numWeight: {
      type: String,
      default: ''
    },
    fontWeight: {
      type: String,
      default: ''
    },
    // backgColor: {
    //   type: String,
    //   default: ''
    // },
    // filter: {
    //   type: String,
    //   default: ''
    // },
    indColor: {
      type: String,
      default: ''
    },
    numbColor: {
      type: String,
      default: ''
    },
    Color: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#2C82F5'
    },
    width: {
      type: String,
      default: '100px'
    },
    index: {
      type: Number,
      default: 1
    },
    desc: {
      type: String,
      default: ''
    },
    number: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
.box{
  width:426px;
  // border:1px solid red;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  .no{
    margin-right: 20px;
    width: 50px;
    height: 26px;
    font-size: 38px;
    text-align: right;
    font-family: 'Alibaba-PuHuiTi';
    font-weight: bold;
    color: #FFFFFF;
    line-height: 26px;
  }
  .desc{
    // text-align: right;
    margin-right: 15px;
    width: 112px;
    height: 18px;
    font-size: 18px;
    font-family: 'Alibaba-PuHuiTi';
    color: #FFFFFF;
    line-height: 14px;

  }
  .rect{
    display: flex;
    color: #FFF;
    width:300px;
    position: relative;
    .first{
      height:20px;
      background-color: #fff;
      transform:skewX(-30deg);
    }
    .second{
      width:10px;
      height:20px;
      background-color: #fff;
      transform:skewX(-30deg);
      margin-left: 5px;
    }
    .third{
      width:10px;
      height:20px;
      background-color: #fff;
      transform:skewX(-30deg);
      margin-left: 5px;
    }
    .number{
      position: absolute;
      right: 30px;
      line-height:20px;
      font-size: 16px;
      font-family: 'Alibaba-PuHuiTi';
    }
  }
}
</style>
