<template>
  <div class="main">
    <div class="header">
      <div class="header-text">电话</div>
      <div class="header-text">邮件</div>
      <div class="header-text">线上</div>
      <div class="header-text">工单流</div>
    </div>
    <div class="content">
      <div class="content-text">{{this.accessChannels.telephone}}</div>
      <div class="content-text">{{this.accessChannels.email}}</div>
      <div class="content-text">{{this.accessChannels.online}}</div>
      <div class="content-text">{{this.accessChannels.stream}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accessChannels: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {

    }
  },

  mounted () {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.main{
  padding:5px;
  margin:5px auto;
  line-height:50px;
  width:736px;
  .header{
    border:1px solid #0976C0;
    border-radius:6px;
    background-image: url('../../../../assets/V1/images/service/channel_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    display:flex;
    justify-content: center;
  }
  .content{
    margin-top:1px;
    border-radius:6px;
    border:1px solid #0976C0;
    display:flex;
  justify-content: center;
  }
}
.header-text{
  font-size:20px;
  font-family:HYCuJianHeiJ;
  font-weight:400;
  color:rgba(240,185,3,1);
  width:25%;
  text-align:center;
}
.content-text{
  font-size:20px;
  font-family:HYXiJianHeiJ;
  font-weight:400;
  color:#29C896;
  width:25%;
  text-align:center;
}
</style>
