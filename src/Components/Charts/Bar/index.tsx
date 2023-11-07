import ReactECharts from 'echarts-for-react';
import CommonChart from '../common';
import { forwardRef } from 'react';
type BarPropsType = {
  option: {};
  className?: "";
  style?: {};
};
const Bar = (props: BarPropsType, ref: any) => {
  let { option, className, style } = props;
  function onChartReadyCallback(chart) {
    setTimeout(() => {
      chart.resize()
    }, 100)
  }
  return <div className={className} style={style}>
    <CommonChart ref={ref} option={option} />
  </div>;
};

export default forwardRef(Bar);
