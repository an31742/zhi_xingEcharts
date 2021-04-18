<template>
  <div class="query">
    <div class="header">
      <div class="header-left">
        <img src="../../assets/V1/images/query/zi.png" alt />
      </div>
      <div class="header-main">
        <img src="../../assets/V1/images/query/zhi.png" alt />
      </div>
      <div class="header-right">
        <span>
          <img src="../../assets/V1/images/query/user.png" alt />
        </span>
        <p>登录用户</p>
      </div>
    </div>
    <div class="neck">
      <span class="neck3" ><el-button type="text" @click="toHome">首页</el-button></span> /
      <span class="neck3"><el-button type="text" @click="toPage">{{secondPathName}}</el-button></span> /
      <span class="neck3">索引页</span>
    </div>
    <div class="main">
      <div class="main-header">
        <span class="main-headerleft">检索条件设置</span>
      </div>
      <div class="main-body">
        <ul>
          <li class="massage">
            <div class="masssger-header">
              <span>基础信息类</span>
            </div>
            <ul>
              <li class="xin">
                <el-form>
                  <el-form-item label="关键字：" class="xin1" >
                    <el-input v-model="formData.searchKey" placeholder="请输入产品关键字" @blur="queryDatas"></el-input>
                  </el-form-item>
                  <el-form-item label="事业群：" class="xin2">
                    <el-select
                      v-model="formData.groupId"
                      @change="queryDatas"
                      popper-class="select-option !impotant"
                    >
                      <el-option label="请选择事业群" value="" ></el-option>
                      <el-option
                        v-for="item in groupList"
                        :key="item.value"
                        :label="item.group"
                        :value="item.groupId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部门：" class="xin3">
                    <el-select
                      v-model="formData.departmentId"
                      @change="queryDatas"
                      popper-class="select-option !impotant"
                    >
                      <el-option label="请选择部门" value="" ></el-option>
                      <el-option
                        v-for="item in departmentList"
                        :key="item.value"
                        :label="item.department"
                        :value="item.departmentId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </li>
              <li class="xin">
                <el-form>
                  <el-form-item label="目标市场：" class="xin1">
                    <el-select
                      v-model="formData.marketId"
                      @change="queryDatas"
                      popper-class="select-option !impotant"
                    >
                      <el-option label="请选择目标市场" value="" ></el-option>
                      <el-option
                        v-for="item in marketList"
                        :key="item.value"
                        :label="item.market"
                        :value="item.marketId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="客户群体：" class="xin2">
                    <el-select v-model="formData.customId"
                      @change="queryDatas"
                      popper-class="select-custom !impotant"
                    >
                      <el-option label="请选择客群" value="" ></el-option>
                      <el-option
                        v-for="item in customList"
                        :key="item.value"
                        :label="item.custom"
                        :value="item.customId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产品分类：" class="xin3">
                    <el-select
                      v-model="formData.classifyId"
                      @change="queryDatas"
                      popper-class="select-option !impotant"
                    >
                      <el-option label="请选择产品分类" value="" ></el-option>
                      <el-option
                        v-for="item in classifyList"
                        :key="item.value"
                        :label="item.classify"
                        :value="item.classifyId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </li>
              <li class="xin">
                <el-form>
                  <el-form-item label="产品分级：" class="xin1">
                    <el-select
                      v-model="formData.gradeId"
                      @change="queryDatas"
                      popper-class="select-option !impotant"
                    >
                      <el-option label="请选择产品分级" value="" ></el-option>
                      <el-option
                        v-for="item in gradeList"
                        :key="item.value"
                        :label="item.grade"
                        :value="item.gradeId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="三曲线：" class="xin2">
                    <el-select
                      v-model="formData.threeId"
                      @change="queryDatas"
                      popper-class="select-option !impotant"
                    >
                      <el-option label="请选择三曲线" value="" ></el-option>
                      <el-option
                        v-for="item in threeList"
                        :key="item.value"
                        :label="item.three"
                        :value="item.threeId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </li>
              <li class="xin">
                <el-form>
                  <el-form-item label="知识产权：" class="xin1">
                    <el-select
                      v-model="formData.knowledgeId"
                      @change="queryDatas"
                      popper-class="select-option !impotant"
                    >
                      <el-option label="请选择知识产权" value="" ></el-option>
                      <el-option
                        v-for="item in knowledgeList"
                        :key="item.value"
                        :label="item.knowledge"
                        :value="item.knowledgeId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form>
                  <el-form-item label="生命阶段：" class="xin2">
                    <el-select
                      v-model="formData.lifecycleId"
                      @change="queryDatas"
                      popper-class="select-option !impotant"
                    >
                      <el-option label="请选择生命阶段" value="" ></el-option>
                      <el-option
                        v-for="item in lifecycleList"
                        :key="item.value"
                        :label="item.lifecycle"
                        :value="item.lifecycleId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </li>
            </ul>
          </li>
          <li class="time">
            <div class="time-header">
              <span>时间查询类</span>
            </div>
            <div class="time-body">
              <div class="timeUP">
                <div class="shi">
                  <span>上线时间：</span>
                  <el-date-picker
                    v-model="formData.onlineStartTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="选择日期"
                    popper-class="select-option !impotant"
                  ></el-date-picker>
                  <i>至</i>
                  <el-date-picker
                    v-model="formData.onlineEndTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="选择日期"
                    @change="queryDatas"
                    popper-class="select-option !impotant"
                  ></el-date-picker>
                </div>
                <div class="shi">
                  <span>商用时间：</span>
                  <el-date-picker
                    v-model="formData.commercialStartTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="选择日期"
                    popper-class="select-option !impotant"
                  ></el-date-picker>
                  <i>至</i>
                  <el-date-picker
                    v-model="formData.commercialEndTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="选择日期"
                    @change="queryDatas"
                    popper-class="select-option !impotant"
                  ></el-date-picker>
                </div>
              </div>
              <div class="timeUP">
                <div class="shi">
                  <span>试商用时间：</span>
                  <el-date-picker
                    v-model="formData.commercialTrialStartTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="选择日期"
                    popper-class="select-option !impotant"
                  ></el-date-picker>
                  <i>至</i>
                  <el-date-picker
                    v-model="formData.commercialTrialEndTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="选择日期"
                    @change="queryDatas"
                    popper-class="select-option !impotant"
                  ></el-date-picker>
                </div>
              </div>
            </div>
            <div class="time-footer"></div>
          </li>
          <li class="tips">
            <div class="tips-header">
              <span>标签类</span>
            </div>
            <div class="tips-body">
              <el-tag class="tag-item" type="info"
                  v-for="item in tagList"
                  :key="item.tagId"
                  :data-id="item.tagId"
                  @click.prevent.stop="tagSelectClick()" >
                  {{item.tag}}
              </el-tag>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <div class="footer-header">
        <span class="footer-header-left">搜索结果集</span>
      </div>
      <div class="footer-body">
        <el-table
          style="background:'#C8C8C8'"
          :data="tableDatas.dataItem"
          :stripe = "true"
          :highlight-current-row="true"
          :header-row-style="{background:'#FFFFFF',opacity:'0.9'}"
          :cell-style="{background:'#0a193b',color:'#FFFFFF'}"
          :height="540"
          :max-height="900"
        >
          <el-table-column label="序号" header-align="center" align="center" fixed>
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            header-align="center"
            align="center"
            width="150"
            :show-overflow-tooltip="true"
            fixed
          >
          <template slot-scope="scope">
            <el-link type="primary" @click="productNameHandler(scope.row)">
            {{scope.row.productName}}
            </el-link>
          </template>
          </el-table-column>
          <el-table-column
            prop="group"
            label="事业群"
            header-align="center"
            align="center"
            width="130"
            fixed
          ></el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            header-align="center"
            align="center"
            width="160"
            fixed
          ></el-table-column>
          <el-table-column
            prop="detail"
            label="产品介绍"
            align="center"
            width="200px"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="income"
            label="收入"
            header-align="center"
            align="center"
            width="110px"
            ></el-table-column>
          <el-table-column
            prop="profit"
            label="利润"
            header-align="center"
            align="center"
            width="110px"
            ></el-table-column>
          <el-table-column
            prop="scale"
            label="目标市场"
            header-align="center"
            align="center"
            width="120"
            :show-overflow-tooltip="true"
            ></el-table-column>
          <el-table-column
            prop="customer"
            label="客户群体"
            header-align="center"
            align="center"
            width="200px"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="market"
            label="分类"
            header-align="center"
            align="center"
            width="100"
            ></el-table-column>
          <el-table-column
            prop=".grade"
            label="分级"
            header-align="center"
            align="center"
            ></el-table-column>
          <el-table-column
            prop="three"
            label="三曲线"
            header-align="center"
            align="center"
            width="100"
            ></el-table-column>
          <el-table-column
            prop="knowledge"
            label="知识产权"
            header-align="center"
            align="center"
            width="110"
            ></el-table-column>
          <el-table-column
            prop="lifecycle"
            label="生命阶段"
            header-align="center"
            align="center"
            width="110"
            ></el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            header-align="center"
            align="center"
            width="150"
            :show-overflow-tooltip="true"
            ></el-table-column>
          <el-table-column
            prop="poston"
            label="波士顿信息"
            header-align="center"
            align="center"
            width="120"
            ></el-table-column>
          <el-table-column
            prop="scale"
            label="规模"
            width="110"
            header-align="center"
            align="center"
            :show-overflow-tooltip="true"
            ></el-table-column>
          <el-table-column
            prop="onlineTime"
            label="上线时间"
            header-align="center"
            align="center"
            width="110"
            ></el-table-column>
          <el-table-column
            prop="commercialTime"
            label="商用时间"
            header-align="center"
            align="center"
            width="110"
          ></el-table-column>
          <el-table-column
            prop="commercialTrialTime"
            label="试商用时间"
            header-align="center"
            align="center"
            width="110"
          ></el-table-column>
        </el-table>
        <el-pagination
        background
          style="text-align:left;background: transparent;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="this.tableDatas.size"
          :current-page="this.tableDatas.page"
          :total="this.tableDatas.total"
          layout="total, prev, pager, next"
          popper-class="page !important"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import QueryApi from '@/api/V1/query.js'
import $ from 'jquery'
export default {
  data () {
    return {
      lifecycleDatasParams: JSON.parse(sessionStorage.getItem('lifecycleDatasParams')),
      secondPathName: sessionStorage.getItem('queryName') || '产品',
      formData: {
        year: '2020',
        searchKey: '',
        departmentId: '',
        groupId: '',
        gradeId: '',
        marketId: '',
        customId: '',
        lifecycleId: '',
        threeId: '',
        classifyId: '',
        knowledgeId: '',
        onlineStartTime: '',
        onlineEndTime: '',
        commercialStartTime: '',
        commercialEndTime: '',
        commercialTrialStartTime: '',
        commercialTrialEndTime: '',
        tagIds: ''
      },
      tableDatas: [
        {
          page: null,
          size: null,
          pageCount: null,
          total: null,
          dataItem: []
        }
      ],
      groupList: {},
      departmentList: {},
      marketList: {},
      customList: {},
      classifyList: {},
      gradeList: {},
      threeList: {},
      knowledgeList: {},
      lifecycleList: {},
      groupId: {},
      tagList: [],
      newTagList: []
    }
  },
  mounted () {
    if (this.lifecycleDatasParams) {
      this.formData.year = this.lifecycleDatasParams.year
      this.formData.departmentId = this.lifecycleDatasParams.departmentId
      this.formData.groupId = this.lifecycleDatasParams.groupId
      this.formData.gradeId = this.lifecycleDatasParams.gradeId
      this.formData.marketId = this.lifecycleDatasParams.marketId
      this.formData.customId = this.lifecycleDatasParams.customId
      this.formData.lifecycleId = this.lifecycleDatasParams.lifecycleId
      this.formData.classifyId = this.lifecycleDatasParams.classifyId
      this.formData.knowledgeId = this.lifecycleDatasParams.knowledgeId
    }
    this.tagQueryList = JSON.parse(sessionStorage.getItem('tagList')) || []
    this.tagQueryList.forEach(item => {
      this.formData.tagIds += item.tagId + ','
    })
    let _that = this
    setTimeout(function () {
      _that.tagQueryList.forEach(item => {
        $('.tag-item[data-id=' + item.tagId + ']').addClass(['el-tag--success', 'el-tag--dark'])
      })
      sessionStorage.removeItem('tagList')
    }, 1000)

    this.initSelect()
    this.queryDatas()
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/V1' })
    },
    toPage () {
      if (this.secondPathName === '产品') {
        this.$router.push({ path: '/V1/ProductCenter' })
      } else {
        this.$router.push({ path: '/V1/CustomersCenter' })
      }
    },
    productNameHandler (row) {
      sessionStorage.setItem('productId', row.id)
      sessionStorage.setItem('productName', row.productName)
      this.$router.push({
        name: 'product',
        params: {
          name: row.productName,
          id: row.id,
          infos: []
        }
      })
    },
    initSelect () {
      QueryApi.getSearchConditionList({}).then(res => {
        if (res.code === '200') {
          this.groupList = res.data.groupList
          this.departmentList = res.data.departmentList
          this.marketList = res.data.marketList
          this.customList = res.data.customList
          this.classifyList = res.data.classifyList
          this.gradeList = res.data.gradeList
          this.threeList = res.data.threeList
          this.knowledgeList = res.data.knowledgeList
          this.lifecycleList = res.data.lifecycleList
          this.tagList = res.data.tagList
        }
      })
    },
    queryDatas () {
      QueryApi.getSearchList(this.formData).then(res => {
        if (res.code === '200') {
          this.tableDatas = res.data
          this.tableDatas.page = Number(this.tableDatas.page)
          this.tableDatas.size = Number(this.tableDatas.size)
          this.tableDatas.pageCount = Number(this.tableDatas.pageCount)
          this.tableDatas.total = Number(this.tableDatas.total)
        }
      })
      sessionStorage.removeItem('lifecycleDatasParams')
    },
    tagSelectClick () {
      let _that = this
      _that.formData.tagIds = ''
      let flag = false
      if ($(event.target).hasClass('el-tag--success')) {
        $(event.target).removeClass(['el-tag--success', 'el-tag--dark'])
        $(event.target).addClass(['el-tag--info', 'el-tag--light'])
      } else {
        flag = true
        $(event.target).addClass(['el-tag--success', 'el-tag--dark'])
      }

      let tags = $(event.target).siblings('.el-tag--success')
      $.each(tags, function (i, k) {
        _that.formData.tagIds += $(k).attr('data-id') + ','
      })
      if (flag) {
        _that.formData.tagIds += $(event.target).attr('data-id')
      }

      this.queryDatas()
    },
    // 设置页面大小
    handleSizeChange (size) {
      this.formData.size = size
      this.queryDatas()
    },
    // 设置当前页面
    handleCurrentChange (page) {
      this.formData.page = page
      this.queryDatas()
    }
  }
}
</script>

<style lang="scss" scope>
div /deep/input.el-input__inner {
  color: #FFFFFF;
}
.select-custom{
  width: 300px;
    background: #222;
  opacity: 0.8;
  color: #fff;
}
.el-select-dropdown__list{
  background-color: #FFFFFF;
}
.el-picker-panel__body{
  background-color: #FFFFFF;
  color:#000000;
}
.el-tag.el-tag--info {
    background-color: #C8C8C8;
    border-color: #e9e9eb;
    color: #000000;
}
.el-tag--dark.el-tag--success {
    background-color: #0a193b;
    border-color: #67c23a;
    color: #fff;
}
.el-table__body-wrapper.is-scrolling-left {
  background-color: #0a193b;
}
.el-pagination__total{
  margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      min-width: 30px;
      border-radius: 2px;
}
.el-button--text {
    font-size: 25px;
    color: #FFFFFF;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
}
.page {
  background: #222;
  opacity: 0.8;
  color: #fff;
}

.query {
  width: 1920px;
  height: 1614px;
  background-image: url("../../assets/V1/images/query/bg3.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  overflow: hidden;
  position: relative;
  .header {
    width: 1920px;
    height: 118px;
    background-image: url("../../assets/V1/images/query/header1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .header-left {
      position: absolute;
      top: 17px;
      left: 40px;
    }
    .header-main {
      position: absolute;
      top: 29px;
      left: 235px;
    }

    .header-right {
      vertical-align: middle;
      span {
        position: absolute;
        top: 36px;
        right: 180px;
        margin-right: 10px;
      }
      p {
        position: absolute;
        top: 42px;
        right: 42px;
        width: 132px;
        height: 31px;
        font-size: 33px;
        font-family: HYXiJianHeiJ;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
      }
    }
  }
  .neck {
    font-size: 25px;
    font-family: HYCuJianHeiJ;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 36px;
    opacity: 0.2;
    margin-left: 39px;
    margin-top: 27px;
    .router-link-active {
      width: 60px;
      height: 32px;
      vertical-align: middle;
      display: inline-block;
      margin-right: 30px;
      background-image: url("../../assets/V1/images/query/home1.png");
    }
    img {
      display: inline-block;
      width: 19px;
      height: 23px;
      margin: 0 5px;
    }
  }
  .main {
    .main-header {
      width: 1840px;
      height: 70px;
      margin-left: 39px;
      margin-top: 5px;
      background-image: url("../../assets/V1/images/query/bg4.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      .main-headerleft {
        width: 260px;
        height: 38px;
        font-size: 36px;
        position: absolute;
        left: 21px;
        top: 20px;
        font-family: HYCuJianHeiJ;
        font-weight: 400;
        color: rgba(64, 114, 238, 1);
        line-height: 36px;
      }
    }
    .main-body {
      margin-left: 39px;
      padding-top: 2px;
      width: 1840px;
      height: 700px;
      background-image: url("../../assets/V1/images/query/bg5.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .massage {
        position: relative;
        .masssger-header {
          span {
            width: 221px;
            height: 30px;
            font-size: 28px;
            font-family: HYCuJianHeiJ;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 36px;
            position: absolute;
            top: 10px;
            left: 21px;
          }
        }
        ul {
          .xin {
            width: 1840px;
            padding-top: 60px;
            padding-left: 45px;
            .el-form-item {
              width: 550px;
              height: 60px;
              .el-form-item__label {
                width: 200px;
                height: 22px;
                font-size: 22px;
                font-family: HYXiJianHeiJ;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 45px;
              }
              &/deep/ .el-input {
                width: 300px;
                height: 40px;
                .el-input__inner {
                  color: #000000;
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .xin1 {
              float: left;
              width: 550px;
              height: 38px;
            }
            .xin2 {
              margin-left: 60px;
              float: left;
              width: 550px;
              height: 38px;
            }
            .xin3 {
              margin-left: 60px;
              float: left;
              width: 550px;
              height: 38px;
            }
          }
        }
      }
      .time {
        margin-top: 48px;
        height: 180px;
        border-top: 1px solid rgba(64, 114, 238, 1);
        border-bottom: 1px solid rgba(64, 114, 238, 1);
        position: relative;
        .time-header {
          span {
            width: 221px;
            height: 30px;
            font-size: 28px;
            font-family: HYCuJianHeiJ;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 36px;
            position: absolute;
            top: 10px;
            left: 21px;
          }
        }
        .time-body {
          padding-top: 60px;
          padding-left: 45px;
          .timeUP {
            height: 60px;
            padding-left: 90px;
            .shi {
              float: left;
              width: 800px;
              span {
                width: 176px;
                height: 22px;
                font-size: 22px;
                font-family: HYXiJianHeiJ;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 45px;
              }
              .el-input,
              .el-date-editor.el-input__inner {
                width: 300px;
                height: 40px;
                border-radius: 6px;
                text-align: right;
                .el-input__inner {
                  color: #000000;
                  width: 100%;
                  height: 100%;
                }
                .el-input__prefix .el-input__icon {
                  padding-left: 240px;
                }
              }
            }
            i {
              display: inline-block;
              margin: 0 7px;
              font-style: normal;
              width: 30px;
              height: 22px;
              font-size: 22px;
              font-family: HYXiJianHeiJ;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 45px;
            }
          }
        }
      }
      .tips {
        position: relative;
        .tips-header {
          span {
            width: 221px;
            height: 30px;
            font-size: 28px;
            font-family: HYCuJianHeiJ;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 36px;
            position: absolute;
            top: 10px;
            left: 21px;
          }
        }
        .tips-body {
          padding-top: 60px;
          padding-left: 80px;
          height: 80px;
          .tag-item {
            margin-right: 10px;
            margin-bottom: 10px;
            opacity:0.4
          }
        }
      }
    }
  }
  .footer {
    .footer-header {
      width: 1840px;
      height: 70px;
      margin-left: 39px;
      margin-top: 5px;
      background-image: url("../../assets/V1/images/query/bg6.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      .footer-header-left {
        width: 260px;
        height: 38px;
        font-size: 36px;
        position: absolute;
        left: 21px;
        top: 20px;
        font-family: HYCuJianHeiJ;
        font-weight: 400;
        color: rgba(64, 114, 238, 1);
        line-height: 36px;
      }
    }
    .footer-body {
      margin-left: 39px;
      margin-top: 10px;
      width: 1840px;
      height: auto;
      background-image: url("../../assets/V1/images/query/bg6.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
