export default {
  color: ["#0385F2", '#FFBF5D', '#01A471'],
  dataset: {
    dimentsions: ['date', "生产", "销毁", "净流入"],
    source: []
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false,

    }
  },
  yAxis: {
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  legend: {
    bottom: 0,
    left: 'center',
    icon: 'circle',
  },
  grid: {
    top: 10,
    bottom: 50,
    left: 0,
    right: 0,
    containLabel: true
  },
  series: formatSeriesList(["line", "line", "line"])
}
function formatSeriesList(arrType) {
  return arrType.map(item => ({
    type: item,
    smooth: true,
    showSymbol: false,
    // symbol: 'circle',
    symbolSize: 10,
    lineStyle: {
      width: 2
    }
  }))
}