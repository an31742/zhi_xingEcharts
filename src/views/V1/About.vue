<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{username}}</div>
    <div>{{userRole}}</div>
  </div>
</template>

<script>
// 调用接口方式
import userApi from '@/api/V1/user'
import BoardServiceApi from '@/service/V1/board-service'

export default {
  data () {
    return {
      username: '',
      userRole: ''
    }
  },
  mounted () {
    // this.fetchData()
    this.testBoard()
  },
  methods: {
    testBoard () {
      BoardServiceApi.departmentInfosService({ year: '2019' }).then(res => {
        console.log(res)
      })
    },
    fetchData () {
      userApi.getUserInfo().then(res => {
        this.username = res.data.username
        this.userRole = res.data.role
      })
    }
  }
}
</script>
