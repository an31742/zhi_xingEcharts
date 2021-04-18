import { ticRuleData } from '../../service/V2/tic/data/data'
// import { color } from './unisk-options-v2'
// import Echarts from 'echarts'
const colorList = ['#B584F6', '#0655FB', '#84FCFD', '#F8F386', '#2B82F5']

const commonGraph = {
  // 图表标题
  animationDurationUpdate: function (idx) {
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
}
const commonRosePie = {

  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },

  visualMap: {
    show: false,
    min: 500,
    max: 600,
    inRange: {
      // colorLightness: [0, 1]
    }
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '50%',
    center: ['50%', '50%'],
    color: colorList,
    legend: {
      show: true,
      // icon: 'roundRect',
      itemWidth: 20,
      textStyle: {
        color: colorList,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 20
      },
      data: ticRuleData
    },
    data: ticRuleData.sort(function (a, b) {
      return a.value - b.value
    }),
    roseType: 'radius',

    labelLine: {
      normal: {
        lineStyle: {
          color: 'rgb(98,137,169)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20

      }
    },
    itemStyle: {
      normal: {
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowBlur: 50
      }
    }
  }]
}
const commonRingpie = {
  backgroundColor: '#000',
  legend: {
    show: true,
    icon: 'circle',
    top: 'center',
    left: '70%',
    data: [],
    width: 50,
    padding: [0, 5],
    itemGap: 25,
    // formatter: function (name) {
    //   return '{title|' + name + '}\n{value|' + (objData[name].value) + '}  {title|项}'
    // },

    textStyle: {
      rich: {
        title: {
          fontSize: 16,
          lineHeight: 15,
          color: 'rgb(0, 178, 246)'
        },
        value: {
          fontSize: 18,
          lineHeight: 20,
          color: '#fff'
        }
      }
    }
  },
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{a}<br>{b}:{c}({d}%)'
  },
  color: ['rgb(24, 183, 142)', 'rgb(1, 179, 238)', 'rgb(22, 75, 205)', 'rgb(52, 52, 176)'],
  grid: {
    top: '16%',
    bottom: '53%',
    left: '30%',
    containLabel: false
  },
  yAxis: [{
    type: 'category',
    inverse: true,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      inside: true,
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      show: true
    },
    data: []
  }],
  xAxis: [{
    show: false
  }],
  series: []
}
const commonSubBar = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: function (params) { // 自动提示工具
      var params0Value = params[0].value + '%'
      var params1Value = params[0].value + '%'
      var params2Value = params[0].value + '%'
      if (params[0].value <= 0) { params0Value = params[0].value }
      if (params[1].value <= 0) { params0Value = params[1].value }
      if (params[2].value <= 0) { params0Value = params[2].value }
      return params[0].axisValue + '<br />' + params[0].marker + '小沃科技：' + params0Value + '<br />' + params[1].marker + '沃音乐：' + params1Value + '<br />' + params[2].marker + '沃阅读：' + params2Value
    }
  },
  legend: {
    selectedMode: false, // 取消图例上的点击事件
    data: ['小沃科技', '沃音乐', '沃阅读']

  },
  grid: {
    left: '5px',
    right: '4%',
    bottom: '45px',

    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: [],
    axisLabel: {
      color: '#fff'
    }
  }],
  yAxis: [{
    type: 'value',
    axisLabel: {
      color: '#fff',
      formatter: '{value}%'
    }
  }],
  'dataZoom': [{
    'xAxisIndex': [0],
    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z'
  }],
  series: [
    {
      name: '小沃科技',
      type: 'bar',
      stack: '饱和度',
      data: []
    },
    {
      name: '沃音乐',
      type: 'bar',
      stack: '饱和度',
      data: []
    },
    {
      name: '沃阅读',
      type: 'bar',
      stack: '饱和度',
      barMaxWidth: 30, // 柱子的宽度
      data: []
    }

  ]
}
export {
  commonGraph,
  commonRosePie,
  commonRingpie,
  commonSubBar

}
