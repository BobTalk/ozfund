import ReactECharts from "echarts-for-react";
type CommonPropsType = {
  option: {};
  className?: string;
  style?: {};
};
const CommonChart = (props: CommonPropsType) => {
  let { option, className: classNameProps, style: styleProps } = props;
  function onChartReadyCallback(chart) {
    setTimeout(() => {
      chart.resize();
    }, 100);
  }
  // 图表点击事件 https://echarts.apache.org/zh/api.html#events
  function onChartClick(obj) {
    console.log("obj1: ", obj);
  }
  // legend点击事件 https://echarts.apache.org/zh/api.html#events
  function onChartLegendSelectChanged(obj) {
    console.log("obj2: ", obj);
  }
  return (
    <ReactECharts
      onEvents={{
        click: onChartClick,
        legendselectchanged: onChartLegendSelectChanged,
      }}
      className={classNameProps}
      style={{
        height: "inherit",
        ...styleProps,
      }}
      opts={{ renderer: "svg" }}
      onChartReady={onChartReadyCallback}
      option={option}
    />
  );
};
export default CommonChart;
