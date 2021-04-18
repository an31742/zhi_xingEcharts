const color = ['#78FCFF', '#FEF888', '#F9AD73', '#2B82F5', '#034CFF', '#1CBA6B', '#B584F6']
const colorBlue = '#2D82F3'
const linerColorOne = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0, color: 'rgb(120, 252, 255, 0.4)'// 0% 处的颜色
  }, {
    offset: 1, color: 'rgb(120, 252, 255, 0)' // 100% 处的颜色
  }],
  global: false // 缺省为 false
}

const linerColorTwo = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0, color: 'rgb(254,248,136, 0.4)'// 0% 处的颜色
  }, {
    offset: 1, color: 'rgb(254,248,136, 0)' // 100% 处的颜色
  }],
  global: false // 缺省为 false
}
const linerColorThree = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0, color: 'rgb(243,170,114, 1)'// 0% 处的颜色
  }, {
    offset: 1, color: 'rgb(255,127,28, 1)' // 100% 处的颜色
  }],
  global: false // 缺省为 false
}
const linerColorFour = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0, color: 'rgb(91,249,255, 1)'// 0% 处的颜色
  }, {
    offset: 1, color: 'rgb(33,170,255, 1)' // 100% 处的颜色
  }],
  global: false // 缺省为 false
}
const linerColorFive = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0, color: 'rgb(7,86,251, 1)'// 0% 处的颜色
  }, {
    offset: 1, color: 'rgb(41,162,255, 1)' // 100% 处的颜色
  }],
  global: false // 缺省为 false
}
const tooltip = {
  trigger: 'axis',
  axisPointer: { // 坐标轴指示器，坐标轴触发有效
    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
  },
  backgroundColor: '#FFFFFF',
  textStyle: {
    color: '#000000',
    fontSize: 16
  },
  confine: true
}

const legend = {
  show: true,
  // icon: 'roundRect',
  itemWidth: 20,
  textStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20
  },
  data: []
}

const grid = {
  left: '5%',
  right: '3%',
  bottom: '8%',
  containLabel: true
}

const xAxis = {
  type: 'category',
  name: '',
  namelocation: 'end',
  nameTextStyle: {
    color: '#FFFFFF',
    align: 'center',
    verticalAlign: 'middle'
  },
  data: [],
  axisLine: {
    show: true,
    onZero: false,
    lineStyle: {
      color: '#FFFFFF'
    }
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    show: true,
    interval: 0,
    rotate: 45,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 400,
    align: 'center'
  },
  splitLine: {
    show: false
  }
}

const yAxis = {
  position: 'left',
  type: 'value',
  name: '',
  namelocation: 'end',
  nameTextStyle: {
    color: '#FFFFFF',
    align: 'center',
    verticalAlign: 'middle'
  },
  scale: true,
  axisLabel: {
    show: true,
    interval: 0,
    rotate: 45,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 400
  },
  axisLine: {
    show: false
  },
  axisTick: {
    show: false
  },
  splitLine: {
    show: false
  }
}

// 柱状图
const seriesBar = {

  type: 'bar',
  name: '',
  barWidth: 20,
  barMaxWidth: 20,
  smooth: true,
  label: {
    show: false,
    position: 'top',
    fontSize: 12,
    fontWeight: 400
  },
  data: []

}
const commonBar = {
  tooltip: tooltip,
  legend: legend,
  grid: grid,
  xAxis: xAxis,
  yAxis: yAxis,
  series: [{
    type: 'bar',
    name: '',
    barWidth: 20,
    barMaxWidth: 20,
    smooth: true,
    label: {
      show: false,
      position: 'top',
      fontSize: 12,
      fontWeight: 400
    },
    data: []
  }]
}

const commonLine = {
  legend: legend,
  tooltip: tooltip,
  grid: grid,
  xAxis: xAxis,
  yAxis: yAxis,
  series: [{
    type: 'line',
    name: '',
    smooth: true,
    symbol: 'circle',
    symbolSize: 4,
    areaStyle: {
      shadowOffsetY: 5,
      color: linerColorTwo

    },
    data: []
  }]
}

const common3DBar = {
  tooltip: tooltip,
  xAxis3D: {
    name: '',
    type: 'category',
    splitLine: {
      show: false
    },
    data: []
  },
  yAxis3D: {
    name: '',
    type: 'category',
    splitLine: {
      show: false
    },
    data: []
  },
  zAxis3D: {
    name: '',
    type: 'value',
    splitLine: {
      show: false
    },
    show: true
  },
  grid3D: {
    boxWidth: 280,
    boxHeight: 120,
    boxDepth: 50,
    axisLabel: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        opacity: 0
      }
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      show: false
    },
    light: {
      main: {
        alpha: 30,
        beta: 30
      }
    },
    viewControl: {
      autoRotate: false,
      distance: 220,
      minDistance: 220,
      maxDistance: 220,
      alpha: 0,
      beta: 0,
      minAlpha: 0,
      maxAlpha: 0,
      minBeta: 0,
      maxBeta: 0
    }
  },
  series: {
    name: '',
    type: 'bar3D',
    shading: 'realistic',
    barMaxWidth: 20,
    label: {
      show: true,
      distance: 4,
      textStyle: {
        fontSize: 10,
        borderWidth: 0
      }
    },
    itemStyle: {
      opacity: 1
    },
    emphasis: {
      label: {
        textStyle: {
          fontSize: 10,
          color: '#fff'
        }
      }
    },
    data: []
  }
}

const commonMap = {
  tooltip: tooltip,
  visualMap: {
    type: 'continuous',
    min: 0,
    max: 10000000,
    calculable: true,
    align: 'left',
    show: true,
    left: '25%',
    bottom: '10%',
    seriesIndex: 1,

    inRange: {

      // 之前样式
      // color: ['#d5f3ff', '#0077b2']
      color: ['#b0dbff', '#29c896', '#425ced', '#425ced']
      // borderColor: '#fff'
    },
    orient: 'vertical',
    textStyle: {
      color: '#FFFFFF',
      fontSize: 14,
      lineHeight: 16
    }
  },
  geo: {
    map: 'china',
    show: true,
    roam: false,
    zoom: 1.0,
    scaleLimit: {
      min: 0,
      max: 3
    }, // 缩放级别
    itemStyle: {
      normal: {
        // areaColor: '#24CFF4',
        borderColor: '#fff',
        borderWidth: 1.3
      },
      emphasis: {
        areaColor: '#1890ff',
        borderWidth: 1.6
      }
    }

  },
  series: [
    {
      type: 'effectScatter',
      z: 999,
      coordinateSystem: 'geo',
      symbolSize: 14,
      data: []
    },
    {
      type: 'map',
      z: 998,
      geoIndex: 0,
      data: []

    }]

}

const geoCoordMap = {
  '台湾': [121.5135, 25.0308],
  '黑龙江': [127.9688, 45.368],
  '内蒙古': [110.3467, 41.4899],
  '吉林': [125.8154, 44.2584],
  '北京': [116.4551, 40.2539],
  '辽宁': [123.1238, 42.1216],
  '河北': [114.4995, 38.1006],
  '天津': [117.4219, 39.4189],
  '山西': [112.3352, 37.9413],
  '陕西': [109.1162, 34.2004],
  '甘肃': [103.5901, 36.3043],
  '宁夏': [106.3586, 38.1775],
  '青海': [101.4038, 36.8207],
  '新疆': [87.9236, 43.5883],
  '西藏': [91.11, 29.97],
  '四川': [103.9526, 30.7617],
  '重庆': [108.384366, 30.439702],
  '山东': [117.1582, 36.8701],
  '河南': [113.4668, 34.6234],
  '江苏': [118.8062, 31.9208],
  '安徽': [117.29, 32.0581],
  '湖北': [114.3896, 30.6628],
  '浙江': [119.5313, 29.8773],
  '福建': [119.4543, 25.9222],
  '江西': [116.0046, 28.6633],
  '湖南': [113.0823, 28.2568],
  '贵州': [106.6992, 26.7682],
  '云南': [102.9199, 25.4663],
  '广东': [113.12244, 23.009505],
  '广西': [108.479, 23.1152],
  '海南': [110.3893, 19.8516],
  '上海': [121.4648, 31.2891]
}

const commonFunnel = {
  tooltip: tooltip,
  calculable: true,
  series: [{
    name: '',
    type: 'funnel',
    sort: 'ascending',
    gap: 10,
    itemStyle: {
      borderWidth: 0
    }
  }]
}

const commonPie = {
  tooltip: tooltip,
  grid: grid,
  legend: legend,
  series: [{
    type: 'pie',
    // roseType: 'radius',
    center: ['50%', '55%'],
    radius: ['55%', '70%'],
    label: {
      position: 'outside',
      formatter: ['{t|{b}}', '{h|}', '{c|{c}}'].join('\n'),
      rich: {
        t: {
          color: color[1],
          align: 'center',
          fontSize: 18,
          fontWeight: 400,
          lineHeight: 22
        },
        h: {
          borderColor: color[0],
          width: '100%',
          borderWidth: 2,
          align: 'left',
          height: 0
        },
        c: {
          color: color[0],
          align: 'center',
          fontSize: 20,
          lineHeight: 24
        }
      }
    },
    data: []
  }]
}

const commonTree = {
  grid: grid,
  tooltip: tooltip,
  series: [{
    type: 'tree',
    data: [],
    layout: 'orthogonal',
    orient: 'TB',
    symbol: 'emptyCircle',
    symbolSize: 10,
    edgeShape: 'polyline',
    label: { // 标签样式
      color: '#FFFFFF',
      fontSize: 12,
      position: 'right',
      rotate: 0
    }
  }]
}

const commonGauge = {
  tooltip: tooltip,
  series: [{
    type: 'gauge',
    startAngle: 180,
    endAngle: 0,
    radius: '80%',
    splitNumber: 5,
    title: {
      fontSize: 20,
      fontWeight: 'bolder',
      color: color[0],
      offsetCenter: ['0%', '-120%']
    },
    detail: {
      fontSize: 30,
      fontWeight: 'bolder',
      offsetCenter: ['0%', '30%']
    },
    axisLine: {
      fontSize: 20,
      lineStyle: {
        width: 8,
        color: [
          [0.2, color[0]],
          [0.5, color[1]],
          [0.8, color[2]],
          [1, color[3]]
        ]
      }
    },
    axisTick: {
      splitNumber: 5,
      show: true,
      lineStyle: {
        color: 'auto',
        width: 2
      },
      length: 15
    },
    splitLine: {
      show: true,
      length: 20,
      lineStyle: {
        color: 'auto',
        width: 4
      }
    },
    itemStyle: {
      normal: {
        color: 'auto'
      }
    },
    pointer: {
      width: 5,
      length: '80%'
    },
    data: []
  }]
}
const commonGraph = {
  // 图表标题

  backgroundColor: '#000',
  tooltip: {},
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
export {
  color,
  linerColorOne,
  linerColorTwo,
  linerColorThree,
  linerColorFour,
  linerColorFive,
  tooltip,
  grid,
  legend,
  xAxis,
  yAxis,
  geoCoordMap,
  commonBar,
  common3DBar,
  commonLine,
  commonFunnel,
  commonMap,
  commonPie,
  commonTree,
  commonGauge,
  commonGraph,
  colorBlue,
  seriesBar
}
