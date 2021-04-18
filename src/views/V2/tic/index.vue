<template>
  <div class="page-wrap">
    <HeadPart :titleName="$route.meta.title" />
    <div class="top">
      <ul>
        <li>
          <p>TIC指数</p>
          <p class="number">
            {{ 41.38 | toThousandFilter }}<span>/62.75</span>
          </p>
        </li>
        <li>
          <p>研发能力指数</p>
          <p class="number">
            {{ 19.23 | toThousandFilter }}<span>/30.00</span>
          </p>
        </li>
        <li>
          <p>管理能力指数</p>
          <p class="number">
            {{ 4.88 | toThousandFilter }}<span>/7.50</span>
          </p>
        </li>
        <li>
          <p>人才能力指数</p>
          <p class="number">
            {{ 12.03 | toThousandFilter }}<span>/20.00</span>
          </p>
        </li>
        <li>
          <p>财务能力指数</p>
          <p class="number">
            {{ 5.25 | toThousandFilter }}<span>/5.25</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="left">
        <ul>
          <li>
            <div class="part-title">TIC指数-在线公司贡献度季度排名</div>
            <div
              id="contributionSort"
              class="part-content"
              style="width: 100%; height: 100%"
            ></div>
          </li>
          <li>
            <div class="part-title">TIC指数-研发投入金额(累计值）</div>
            <div
              id="developmentIncome"
              class="part-content"
              style="width: 100%; height: 100%"
            ></div>
          </li>
          <li>
            <div class="part-title">TIC指数-研发项目数量（每月新增）</div>
            <div
              id="developmentProject"
              class="part-content"
              style="width: 100%; height: 100%"
            ></div>
          </li>
        </ul>
      </div>
      <div class="center">
        <div class="center-top">
          <div class="part-title">TIC指数-本部业务部门贡献度排名</div>
          <div
            id="department"
            class="part-content"
            style="width: 100%; height: 100%"
          >
            <table class="total">
              <tr>
                <th>排名</th>
                <th>部门名称</th>
                <th>贡献度</th>
              </tr>
              <tr v-for="(item, index) in total.slice(0, 5)" :key="index">
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.value }}
                </td>
              </tr>
            </table>

            <table class="total">
              <tr>
                <th>排名</th>
                <th>部门名称</th>
                <th>贡献度</th>
              </tr>
              <tr v-for="(item, index) in total.slice(5, 10)" :key="index">
                <td>
                  {{ index + 6 }}
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.value }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="center-center center-common">
          <div class="part-title">TIC指数-科研项目规模贡献度</div>
          <div
            id="scaleContribution"
            class="part-content"
            style="width: 100%; height: 100%"
          ></div>
        </div>
        <div class="center-bottom center-common">
          <div class="part-title">TIC指数-科技创新成果贡献度</div>
          <div
            id="innovateResult"
            class="part-content"
            style="width: 100%; height: 100%"
          ></div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <div class="part-title">TIC能力指数构成</div>
          <div
            id="ability"
            class="part-content"
            style="width: 100%; height: 100%"
          ></div>
        </div>
        <div class="right-center right-common">
          <div class="part-title">公司年度知识产权受理情况</div>
          <div
            id="knowledge"
            class="part-content"
            style="width: 100%; height: 100%"
          ></div>
        </div>
        <div class="right-bottom">
          <div class="rght-bottom-left right-bottom-common">
            <div class="part-title">子公司TIC指数</div>
            <div
              id="subCompany"
              class="part-content"
              style="width: 100%; height: 100%"
            ></div>
          </div>
          <div class="rght-bottom-right right-bottom-common">
            <div class="part-title">子公司TIC指数贡献度</div>
            <div
              id="subCompanyContribution"
              class="part-content"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ticService from '../../../service/V2/tic/tic-service'
import TicService from '../../../service/V2/tic/tic-service'
// import { ticContributionData } from '../../../service/V2/tic/data/data'
export default {
  data () {
    return {
      total: []
    }
  },
  mounted () {
    // TIC指数-在线公司贡献度季度排名
    this.contributionSortEcharts = this.Echarts.init(document.getElementById('contributionSort'))
    // TIC指数-研发投入金额(累计值
    this.developmentIncomeECharts = this.Echarts.init(document.getElementById('developmentIncome'))
    // TIC指数-研发项目数量（每月新增）
    this.developmentProjectECharts = this.Echarts.init(document.getElementById('developmentProject'))
    // TIC指数-本部业务部门贡献度排名

    // TIC指数-科研项目规模贡献度排名
    this.scaleContributionECharts = this.Echarts.init(document.getElementById('scaleContribution'))
    // TIC指数-科技创新成果贡献度
    this.InnovateResultECharts = this.Echarts.init(document.getElementById('innovateResult'))

    // TIC能力指数构成
    this.abilityECharts = this.Echarts.init(document.getElementById('ability'))
    // 公司年度知识产权受理情况
    this.knowledgeECharts = this.Echarts.init(document.getElementById('knowledge'))
    // 子公司TIC指数
    this.subCompanyeECharts = this.Echarts.init(document.getElementById('subCompany'))
    // 子公司贡献度
    this.subCompanyContributionECharts = this.Echarts.init(document.getElementById('subCompanyContribution'))

    this.setContributionSortOption()
    this.setDevelopmentProjectOption()
    this.setdevelopmentIncomeOption()

    this.setTableData()
    this.setScaleContributionOption()
    this.setInnovateResultOption()

    this.setAbilityOption()
    this.setKnowledgeOption()
    this.setSubCompanyOption()
    this.setSubCompanyContributionOption()
  },
  methods: {
    // TIC指数-在线公司贡献度季度排名
    setContributionSortOption () {
      this.contributionSortEcharts.setOption(TicService.getContributionSortOption())
    },
    // TIC指数-研发投入金额(累计值
    setDevelopmentProjectOption () {
      this.developmentIncomeECharts.setOption(TicService.getDevelopmentProjectOption())
    },
    // TIC指数-研发项目数量（每月新增）
    setdevelopmentIncomeOption () {
      this.developmentProjectECharts.setOption(TicService.getdevelopmentIncomeOption())
    },

    // TIC指数-本部业务部门贡献度排名
    setTableData () {
      this.total = TicService.getTableData()
    },
    // TIC指数-科研项目规模贡献度排名
    setScaleContributionOption () {
      this.scaleContributionECharts.setOption(TicService.getScaleContributionOption())
    },
    // TIC指数-科技创新成果贡献度
    setInnovateResultOption () {
      this.InnovateResultECharts.setOption(TicService.getInnovateResultOption())
    },
    // TIC能力指数构成
    setAbilityOption () {
      this.abilityECharts.setOption(TicService.getAbilityOption())
    },
    // 公司年度知识产权受理情况
    setKnowledgeOption () {
      this.knowledgeECharts.setOption(TicService.getKnowledgeOption())
    },
    // 子公司TIC指数
    setSubCompanyOption () {
      this.subCompanyeECharts.setOption(TicService.getSubCompanyOption())
    },
    // 子公司贡献度
    setSubCompanyContributionOption () {
      this.subCompanyContributionECharts.setOption(TicService.getSubCompanyContributionOption())
    }

  },
  beforeDestroy () {
    // TIC指数-在线公司贡献度季度排名
    this.contributionSortEcharts.clear()
    // TIC指数-研发投入金额(累计值
    this.developmentIncomeECharts.clear()
    // TIC指数-研发项目数量（每月新增）
    this.developmentProjectECharts.clear()
    // TIC指数-本部业务部门贡献度排名

    // TIC指数-科研项目规模贡献度排名
    this.scaleContributionECharts.clear()
    // TIC指数-科技创新成果贡献度
    this.InnovateResultECharts.clear()

    // TIC能力指数构成
    this.abilityECharts.clear()
    // 公司年度知识产权受理情况
    this.knowledgeECharts.clear()
    // 子公司TIC指数
    this.subCompanyeECharts.clear()
    // 子公司贡献度
    this.subCompanyContributionECharts.clear()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/V2/font/top.css';
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Regular.css';
@import '../../../assets/V2/font/Alibaba-PuHuiTi-Bold.css';
@import '@/assets/V2/styles/common.scss';
@import '@/assets/V2/styles/tic.scss';
</style>
