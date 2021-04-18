let colorList = ['#85FCFC', '#0756F9', '#2D82F3', '#B383F6', '#EEE982']
// TIC指数-本部业务部门贡献度排名
let ticTableData = [
  { 'name': '卡部', 'value': '6.62' },
  { 'name': '家互', 'value': '3.89' },
  { 'name': '畅视', 'value': '3.78' },
  { 'name': '云邮', 'value': '3.36' },
  { 'name': '全场景', 'value': '2.17' },
  { 'name': '通助', 'value': '2.16' },
  { 'name': '通创', 'value': '1.81' },
  { 'name': '流量', 'value': '1.67' },
  { 'name': '营销', 'value': ' 0.99' },
  { 'name': '云信', 'value': '0.95' }
]
// TIC指数-在线公司贡献度季度排名
let ticContributionSortData = {
  'sort': [
    { 'name': '2020Q1', 'value': '12' },
    { 'name': '2020Q2', 'value': '7' },
    { 'name': '2020Q3', 'value': '6' },
    { 'name': '2020Q4', 'value': '3' }
  ],
  'contribution': [
    { 'name': '2020Q1', 'value': '0' },
    { 'name': '2020Q2', 'value': '0.06' },
    { 'name': '2020Q3', 'value': '0.065' },
    { 'name': '2020Q4', 'value': '0.137' }
  ]
}

// TIC指数-研发投入金额(累计值）
let ticDevelopmentIncomeData = [
  { 'name': '20-04', 'value': '2220' },
  { 'name': '20-05', 'value': '2799' },
  { 'name': '20-06', 'value': '4004' },
  { 'name': '20-07', 'value': '5537' },
  { 'name': '20-08', 'value': '6490' },
  { 'name': '20-09', 'value': '7678.23' },
  { 'name': '20-10', 'value': '8670.28' },
  { 'name': '20-11', 'value': '10623.36' },
  { 'name': '20-12', 'value': '16900.86' }
]
// TIC指数-研发项目数量（每月新增）
let ticDevelopmentProjectData = [
  { 'name': '20-04', 'value': '4' },
  { 'name': '20-05', 'value': '20' },
  { 'name': '20-06', 'value': '6' },
  { 'name': '20-07', 'value': '12' },
  { 'name': '20-08', 'value': '1' },
  { 'name': '20-09', 'value': '2' },
  { 'name': '20-10', 'value': '13' },
  { 'name': '20-11', 'value': '5' },
  { 'name': '20-12', 'value': '2' }
]

// 科研项目规模贡献度
let ticScaleContributionData = [
  { 'name': '卡部', 'value': '2.1' },
  { 'name': '云邮', 'value': '1.64' },
  { 'name': '家互', 'value': '1.43' },
  { 'name': '畅视', 'value': '1.13' },
  { 'name': '通助', 'value': '0.81' },
  { 'name': '流量', 'value': '0.6' },
  { 'name': '商旅', 'value': '0.49' },
  { 'name': '全场景', 'value': '0.29' },
  { 'name': '营销', 'value': '0.28' },
  { 'name': '积分', 'value': '0.23' },
  { 'name': '通创', 'value': '0.14' },
  { 'name': '门户', 'value': '0.12' }
]
// 科技创新成果贡献度
let ticInnovateResultData = [
  { 'name': '全场景', 'value': '0.87' },
  { 'name': '卡部', 'value': '0.62' },
  { 'name': '畅视', 'value': '0.49' },
  { 'name': '商旅', 'value': '0.27' },
  { 'name': '家互', 'value': '0.27' },
  { 'name': '流量', 'value': '0.17' },
  { 'name': '云邮', 'value': '0.12' },
  { 'name': '云信', 'value': '0.12' },
  { 'name': '广告', 'value': '0.12' },
  { 'name': '营销', 'value': '0.12' }
]
// TIC能力指数构成
let ticAbilityData = [
  { 'name': '科研项目规模', 'value': 13 },
  { 'name': '科技创新成果', 'value': 6.3 },
  { 'name': '开发流程', 'value': 4.9 },
  { 'name': '内部科研人员', 'value': 9 },
  { 'name': '技术人才', 'value': 3 },
  { 'name': '科研投入', 'value': 5.3 }
]

let ticKnowledgeData = {
  'soft': [
    { 'name': '2020Q1', 'value': 1 },
    { 'name': '2020Q2', 'value': 15 },
    { 'name': '2020Q3', 'value': 26 },
    { 'name': '2020Q4', 'value': 61 }
  ],
  'knowledge': [
    { 'name': '2020Q1', 'value': 1 },
    { 'name': '2020Q2', 'value': 3 },
    { 'name': '2020Q3', 'value': 5 },
    { 'name': '2020Q4', 'value': 6 }
  ],
  'x': ['2020Q1', '2020Q2', '2020Q3', '2020Q4']
}

// 子公司TIC指数
let ticSubCompanyData = [
  { 'name': '沃悦读', 'value': 1.42 },
  { 'name': '小沃科技', 'value': 2.59 },
  { 'name': '沃音乐', 'value': 3.48 }
]
// 子公司TIC指数贡献度
let ticSubCompanyContributionData = {
  'scale': [
    { 'name': '沃悦读', 'value': 0.69 },
    { 'name': '小沃科技', 'value': 1.11 },
    { 'name': '沃音乐', 'value': 0.96 }
  ],
  'result': [
    { 'name': '沃悦读', 'value': 0.44 },
    { 'name': '小沃科技', 'value': 0.47 },
    { 'name': '沃音乐', 'value': 1.67 }
  ],
  'person': [
    { 'name': '沃悦读', 'value': 0.03 },
    { 'name': '小沃科技', 'value': 0.38 },
    { 'name': '沃音乐', 'value': 0.24 }
  ],
  'income': [
    { 'name': '沃悦读', 'value': 0.16 },
    { 'name': '小沃科技', 'value': 0.32 },
    { 'name': '沃音乐', 'value': 0.43 }
  ],
  'x': ['沃悦读', '小沃科技', '沃音乐']
}
export {
  colorList,
  ticContributionSortData,
  ticDevelopmentIncomeData,
  ticDevelopmentProjectData,
  ticTableData,
  ticScaleContributionData,
  ticInnovateResultData,
  ticAbilityData,
  ticKnowledgeData,
  ticSubCompanyData,
  ticSubCompanyContributionData
}
