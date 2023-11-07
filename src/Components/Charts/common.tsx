import ReactECharts from "echarts-for-react";
import { forwardRef } from "react";
type CommonPropsType = {
  option: {};
};
const CommonChart = (props: CommonPropsType, ref: any) => {
  let { option } = props;
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
      ref={ref}
      onEvents={{
        click: onChartClick,
        legendselectchanged: onChartLegendSelectChanged,
      }}
      style={{
        height: "inherit",
      }}
      opts={{ renderer: "svg" }}
      onChartReady={onChartReadyCallback}
      option={option}
    />
  );
};
export default forwardRef(CommonChart);
