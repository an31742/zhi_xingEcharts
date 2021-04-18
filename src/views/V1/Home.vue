<template>
  <div class="home">
    <img src="../../assets/V1/images/home/bk2.png" alt />
    <div class="header">
      <ul>
        <!-- <li class="search">
          <router-link to="/Query">
            <img src="../assets/V1/images/home/jian.png" alt />
          </router-link>
        </li>-->
        <li class="topleft1">
          <img src="../../assets/V1/images/home/topright.gif" alt />
        </li>
        <li class="topleft2">
          <img src="../../assets/V1/images/home/topright.gif" alt />
        </li>
        <li class="topright1">
          <img src="../../assets/V1/images/home/topleft.gif" alt />
        </li>
        <li class="topright2">
          <img src="../../assets/V1/images/home/topleft.gif" alt />
        </li>
      </ul>
    </div>
    <div class="party-title">
      <img src="../../assets/V1/images/home/party_title.png" alt />
    </div>
    <div class="company-btn" @click="toCompany"></div>
    <div class="main">
      <ul>
        <li class="Product">
          <router-link to="/V1/ProductCenter">
            <div class="Production">
              <img src="../../assets/V1/images/home/chan1.png" />
            </div>
          </router-link>
          <span>
            <img src="../../assets/V1/images/home/active.gif" alt />
          </span>
        </li>
        <li class="ChannelCenter">
          <router-link to="/V1/ChannelCenter">
            <div class="ChannelCentered">
              <img src="../../assets/V1/images/home/qu.png" alt />
            </div>
          </router-link>
          <span>
            <img src="../../assets/V1/images/home/active.gif" alt />
          </span>
        </li>
        <li class="CustomersCenter">
          <router-link to="/V1/CustomersCenter">
            <div class="CustomersCentered">
              <img src="../../assets/V1/images/home/data.png" alt />
            </div>
          </router-link>
          <span style>
            <img src="../../assets/V1/images/home/active.gif" alt />
          </span>
        </li>
        <li class="ServiceCenter">
          <router-link to="/V1/ServiceCenter">
            <div class="ServiceCentered">
              <img src="../../assets/V1/images/home/experience.png" alt />
            </div>
          </router-link>
          <span>
            <img src="../../assets/V1/images/home/active.gif" alt />
          </span>
        </li>
        <li class="User">
          <router-link to="/V1/UserCenter">
            <div class="UserCentered">
              <img src="../../assets/V1/images/home/user.png" alt />
            </div>
          </router-link>
          <span>
            <img src="../../assets/V1/images/home/active.gif" alt />
          </span>
        </li>
      </ul>
    </div>
    <div class="qiu">
      <img src="../../assets/V1/images/home/ball.gif" alt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toCompany () {
      this.$router.push({
        path: '/V1/company'
      })
    }
  }
}
</script>

<style lang="scss" scope>
@import "../../assets/V1/styles/home.scss";
</style>
