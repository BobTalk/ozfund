export default {
  color: ["#0385F2", '#FFBF5D', '#01A471'],
  dataset: {
    dimentsions: ['date', "生产", "销毁", "净流入"],
    source: []
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
    show: true,
    bottom: 0,
    left: 'center',
    icon: 'rect',
    itemHeight: 12,
    itemWidth: 12
  },
  grid: {
    top: 10,
    bottom: 50,
    left: 0,
    right: 0,
    containLabel: true
  },
  series: formatSeriesList(["bar", "bar", "bar"])
}
function formatSeriesList(arrType) {
  return arrType.map(item => ({
    type: item,
    barWidth: 12,
    // barCategoryGap: '5px',
    barGap: .5,
    itemStyle: {
      borderRadius: item == "bar" ? [6, 6, 0, 0] : 0
    },
  }))
}