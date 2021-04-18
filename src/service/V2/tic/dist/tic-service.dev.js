'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _ticOptionsV = require('@/utils/V2/tic-options-v2.js')

var _default = {
  getruleData: function getruleData () {
    var option = JSON.parse(JSON.stringify(_ticOptionsV.commonGraph))
    var colorList = ['#85FCFC', '#0756F9', '#2D82F3', '#B383F6', '#EEE982']
    var data = [{
      'name': '务实取数',
      'value': 2058124,
      'symbolSize': 143,
      'draggable': true,
      'itemStyle': {
        'normal': {
          'shadowBlur': 10,
          'shadowColor': colorList[1],
          'color': colorList[1]
        }
      }
    }, {
      'name': '体现全貌',
      'value': 1751491,
      'symbolSize': 132,
      'draggable': true,
      'itemStyle': {
        'normal': {
          'shadowBlur': 10,
          'shadowColor': colorList[2],
          'color': colorList[2]
        }
      }
    }, {
      'name': '强化牵引',
      'value': 1751491,
      'symbolSize': 132,
      'draggable': true,
      'itemStyle': {
        'normal': {
          'shadowBlur': 10,
          'shadowColor': colorList[2],
          'color': colorList[2]
        }
      }
    }, {
      'name': '分别画像',
      'value': 1751491,
      'symbolSize': 132,
      'draggable': true,
      'itemStyle': {
        'normal': {
          'shadowBlur': 10,
          'shadowColor': colorList[2],
          'color': colorList[2]
        }
      }
    }, {
      'name': '动态演进',
      'value': 1751491,
      'symbolSize': 132,
      'draggable': true,
      'itemStyle': {
        'normal': {
          'shadowBlur': 10,
          'shadowColor': colorList[2],
          'color': colorList[2]
        }
      }
    }]
    option.series[0].data = data

    return option
  },
  // getPieOption () {
  //   const option = JSON.parse(JSON.stringify(commonPie))
  //   var colorLine = ['#33C0CD', '#73ACFF', '#9E87FF', '#FE6969', '#FDB36A', '#FECE43']
  //   let data = [{
  //     'name': '北京',
  //     'value': 25
  //   }, {
  //     'name': '上海',
  //     'value': 20
  //   }, {
  //     'name': '广州',
  //     'value': 18
  //   }, {
  //     'name': '深圳',
  //     'value': 15
  //   }, {
  //     'name': '未知',
  //     'value': 13
  //   }, {
  //     'name': '海外',
  //     'value': 9
  //   }].sort((a, b) => {
  //     return b.value - a.value
  //   })
  //   data.forEach((v, i) => {
  //     v.labelLine = {
  //       lineStyle: {
  //         width: 1,
  //         color: colorLine[i]
  //       }
  //     }
  //   })

  //   return option
  // },
  getTotalOption: function getTotalOption () {
    var data = [{
      name: '卡部',
      value: '5.76'
    }, {
      name: '家互',
      value: '3.88'
    }, {
      name: '畅视',
      value: '3.65'
    }, {
      name: '云邮',
      value: '3.19'
    }, {
      name: '通助',
      value: '2.11'
    }, {
      name: '全场景',
      value: '2.04'
    }, {
      name: '通创',
      value: '1.77'
    }, {
      name: '流量',
      value: '1.61'
    }, {
      name: '门户',
      value: ' 0.89'
    }, {
      name: '云信',
      value: '0.85'
    }, {
      name: '营销',
      value: '0.83'
    }, {
      name: '积分',
      value: '0.56'
    }, {
      name: '卡商旅部',
      value: '0.53'
    }, {
      name: '云客服',
      value: '0'
    }, {
      name: '广告',
      value: '0'
    }, {
      name: '征信',
      value: '0'
    }]
    return data
  }
}
exports['default'] = _default
