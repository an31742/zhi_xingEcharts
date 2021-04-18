<!-- 检索页 -->
<template>
  <div class="query">
    <div class="header"></div>
    <div class="neck">
      <span @click="toHome">首页</span> /
      <span @click="toPage">{{ secondPathName }}</span> /
      <span>索引页</span>
    </div>
    <div class="body">
      <el-collapse v-model="activeNames" ref="collaps" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title" class="main-header">
            <div class="el-collapse-item-title">
              <strong></strong>
              <span class="main-headerleft">检索条件设置</span>
            </div>
          </template>
          <div class="main">
            <ul class="main-body">
              <li class="massage">
                <div class="masssger-header">
                  <span>基础信息类</span>
                </div>
                <div class="xin" style="padding-top: 20px">
                  <el-form>
                    <el-form-item
                      label="产品关键字："
                      class="xin1"

                    >
                      <el-input
                       @blur="queryDatas"
                        v-model="formData.searchKey"
                        placeholder="请输入产品关键字"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="事业群：" class="xin2">
                      <el-select
                        v-model="formData.groupId"
                        @change="queryDatas"
                        popper-class="select-option !impotant"
                      >
                        <el-option label="请选择事业群" value=""></el-option>
                        <el-option
                          v-for="item in groupList"
                          :key="item.value"
                          :label="item.group"
                          :value="item.groupId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="产品分类：" class="xin3">
                      <el-select
                        v-model="formData.classifyId"
                        @change="queryDatas"
                        popper-class="select-option !impotant"
                      >
                        <el-option label="请选择产品分类" value=""></el-option>
                        <el-option
                          v-for="item in classifyList"
                          :key="item.value"
                          :label="item.classify"
                          :value="item.classifyId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="xin">
                  <el-form>
                    <el-form-item label="目标市场：" class="xin1">
                      <el-select
                        v-model="formData.marketId"
                        @change="queryDatas"
                        popper-class="select-option !impotant"
                      >
                        <el-option label="请选择目标市场" value=""></el-option>
                        <el-option
                          v-for="item in marketList"
                          :key="item.value"
                          :label="item.market"
                          :value="item.marketId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="客户群体：" class="xin2">
                      <el-select
                        v-model="formData.customId"
                        @change="queryDatas"
                        popper-class="select-custom !impotant"
                      >
                        <el-option label="请选择客户群体" value=""></el-option>
                        <el-option
                          v-for="item in customList"
                          :key="item.value"
                          :label="item.custom"
                          :value="item.customId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="xin">
                  <el-form>
                    <el-form-item label="产品分级：" class="xin1">
                      <el-select
                        v-model="formData.gradeId"
                        @change="queryDatas"
                        popper-class="select-option !impotant"
                      >
                        <el-option label="请选择产品分级" value=""></el-option>
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
                        <el-option label="请选择三曲线" value=""></el-option>
                        <el-option
                          v-for="item in threeList"
                          :key="item.value"
                          :label="item.three"
                          :value="item.threeId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="xin">
                  <el-form>
                    <el-form-item label="知识产权IP：" class="xin1">
                      <el-select
                        v-model="formData.knowledgeId"
                        @change="queryDatas"
                        popper-class="select-option !impotant"
                      >
                        <el-option label="请选择知识产权" value=""></el-option>
                        <el-option
                          v-for="item in knowledgeList"
                          :key="item.value"
                          :label="item.knowledge"
                          :value="item.knowledgeId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="归属部门：" class="xin3">
                      <el-select
                        v-model="formData.departmentId"
                        @change="queryDatas"
                        popper-class="select-option !impotant"
                      >
                        <el-option label="请选择部门" value=""></el-option>
                        <el-option
                          v-for="item in departmentList"
                          :key="item.value"
                          :label="item.department"
                          :value="item.departmentId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </li>
              <li class="time">
                <div class="time-header">
                  <span>时间查询类</span>
                </div>
                <div class="time-body">
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
                      <em>至</em>
                      <el-date-picker
                        v-model="formData.commercialTrialEndTime"
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
                      <em>至</em>
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
                  <div class="timeUP" style="padding-top:13px;">
                    <div class="shi">
                      <span
                        ><em
                          style="
                            width: 8px;
                            height: 22px;
                            display: inline-block;
                          "
                        ></em
                        >上线时间：</span
                      >
                      <el-date-picker
                        v-model="formData.onlineStartTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="date"
                        placeholder="选择日期"
                        popper-class="select-option !impotant"
                      ></el-date-picker>
                      <em>至</em>
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
                      <span>生命阶段：</span>
                      <el-select
                        v-model="formData.lifecycleId"
                        @change="queryDatas"
                        popper-class="select-option !impotant"
                      >
                        <el-option label="请选择生命阶段" value=""></el-option>
                        <el-option
                          v-for="item in lifecycleList"
                          :key="item.value"
                          :label="item.lifecycle"
                          :value="item.lifecycleId"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="time-footer"></div>
              </li>
              <li class="tips">
                <!-- <el-collapse v-model="tipsNames" @change="subChange" style="margin-left: 73px;margin-top: 69px;">
                  <el-collapse-item name="1"> -->
                <!-- <template slot="title" class="tips-header">
                      <div class="el-collapse-item-title">
                        <span class="main-headerleft" style="color:#78fcff;font-size: 28px;">标签类</span>
                      </div>
                    </template> -->
                <div class="tips-header">
                  <span>标签类</span>
                </div>
                <div class="tips-body">
                  <span
                    class="tag-item"
                    v-for="item in tagList"
                    :key="item.tagId"
                    :data-id="item.tagId"
                    @click.prevent.stop="tagSelectClick()"
                  >
                    <i></i>
                    {{ item.tag }}
                  </span>
                </div>
                <!-- </el-collapse-item>
                </el-collapse> -->
              </li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- <el-collapse-item title="搜索结果集" name="2"> -->

      <div class="footer">
        <div class="footer-header">
          <i></i>
          <span class="footer-header-left">搜索结果集</span>
        </div>
        <div class="footer-body">
          <!-- :cell-style="{
              background: '#242e3e',
              color: '#FFFFFF',
              fontSize: '20px',
            }" -->

          <el-table

            :data="tableDatas.dataItem"
            :highlight-current-row="true"
            :header-row-style="{ backgroundColor: '#162845', fontSize: '22px',height:'53px' }"
            :cell-style="{
              background: 'transparent',
              color: '#FFFFFF',
              fontSize: '20px',
              height:'44px'
            }"
            :row-class-name="tableRowClassName"
            :height="700"
            :max-height="700"
          >
            <el-table-column
              label="序号"
              header-align="center"
              align="center"
              fixed
            >
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
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
                  {{ scope.row.productName }}
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
              prop="market"
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
              prop="classify"
              label="分类"
              header-align="center"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="grade"
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
          <!-- <el-pagination
            background
            style="text-align: left; background: transparent"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="this.tableDatas.size"
            :current-page="this.tableDatas.page"
            :total="this.tableDatas.total"
            layout="total, prev, pager, next"
            popper-class="page !important"
          ></el-pagination> -->
        </div>
      </div>
      <!-- </el-collapse-item> -->
    </div>
  </div>
</template>

<script>
import QueryApi from '@/api/V1/query.js'
import $ from 'jquery'
export default {
  data () {
    return {
      tipsNames: [],
      activeNames: [],
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
        tagIds: '',
        page: '1',
        size: '100'
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
        $('.tag-item[data-id=' + item.tagId + ']').addClass(['success', 'dark'])
      })
      sessionStorage.removeItem('tagList')
    }, 1000)

    this.initSelect()
    this.queryDatas()
  },
  methods: {
    // 表格实现各行变色
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    handleChange (val) {
      if (val.length === 1 && this.tipsNames.length === 0) {
        this.$refs.collaps.$el.children[0].children[1].className = 'sub'
      }
    },
    subChange (val, $event) {
      if (val.length === 0) {
        this.$refs.collaps.$el.children[0].children[1].className = 'sub'
      } else if (val.length === 1) {
        this.$refs.collaps.$el.children[0].children[1].className = 'el-collapse-item__wrap'
      }
    },
    toHome () {
      this.$router.push({ path: '/' })
    },
    toPage () {
      if (this.secondPathName === '产品') {
        this.$router.push({ path: '/V2/product' })
      } else {
        this.$router.push({ path: '/V2/CustomersCenter' })
      }
    },
    productNameHandler (row) {
      sessionStorage.setItem('productId', row.id)
      sessionStorage.setItem('productName', row.productName)
      sessionStorage.setItem('market', row.market)
      if (row.market.indexOf('2b2c') >= 0) {
        this.$router.push({
          name: 'V2ProductInfo2b2c'
        })
      } else if (row.market.indexOf('2b') >= 0) {
        this.$router.push({
          name: 'V2ProductInfo2b'
        })
      } else {
        this.$router.push({
          name: 'V2ProductInfo2c'
        })
      }
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
      if ($(event.target).hasClass('success')) {
        $(event.target).removeClass(['success', 'dark'])
        $(event.target).addClass(['info', 'light'])
      } else {
        flag = true
        $(event.target).addClass(['success', 'dark'])
      }

      let tags = $(event.target).siblings('.success')
      $.each(tags, function (i, k) {
        _that.formData.tagIds += $(k).attr('data-id') + ','
      })
      if (flag) {
        _that.formData.tagIds += $(event.target).attr('data-id')
      }

      this.queryDatas()
    }
    // // 设置页面大小
    // handleSizeChange (size) {
    //   this.formData.size = size
    //   this.queryDatas()
    // },
    // // 设置当前页面
    // handleCurrentChange (page) {
    //   this.formData.page = page
    //   this.queryDatas()
    // }
  }
}
</script>

<style lang="scss" scope>
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '@/assets/V2/styles/query.scss';
</style>
