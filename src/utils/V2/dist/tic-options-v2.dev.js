'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.commonGraph = void 0
var commonGraph = {
  // 图表标题
  backgroundColor: '#000',
  tooltip: {},
  animationDurationUpdate: function animationDurationUpdate (idx) {
    // 越往后的数据延迟越大
    return idx * 100
  },
  animationEasingUpdate: 'bounceIn',
  color: ['#fff', '#fff', '#fff'],
  series: [{
    type: 'graph',
    layout: 'force',
    force: {
      repulsion: 250,
      edgeLength: 10
    },
    roam: true,
    label: {
      normal: {
        show: true
      }
    },
    data: []
  }]
} // const compie = {
//   series: [
//     {
//     type: 'pie',
//     radius: '60%',
//     center: ['50%', '50%'],
//     clockwise: true,
//     avoidLabelOverlap: true,
//     label: {
//       show: true,
//       position: 'outside',
//       formatter: function (params) {
//         const name = params.name
//         const percent = params.percent + '%'
//         const index = params.dataIndex
//         return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join('\n')
//       }
//     },
//     itemStyle: {
//       normal: {
//         color: function (params) {
//           return colorList[params.dataIndex]
//         }
//       }
//     },
//     data: [],
//     roseType: 'radius'
//   }]
// }

exports.commonGraph = commonGraph
