<template>
  <div id="app">
    <!-- <keep-alive >
    <router-view />
    </keep-alive> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive &&isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive&&isRouterAlive"></router-view>

    <!-- <router-view   v-if="isRouterAlive"/> -->
  </div>
</template>
<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  mounted () {
    console.log('$route.meta.keepAlive', this.$route.meta.keepAlive)
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
</style>
