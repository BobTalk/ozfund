import {ChartsComp as LineChart} from "@/Components/Charts";
import LineInitOptions from "./charts-mock.js";
import dayjs from "dayjs";
const ChartAssetsOzc = ({ data }) => {
  function chartDataFormat(list = []) {
    LineInitOptions.dataset.source = list.reduce((prv, next) => {
      prv.push({
        date: dayjs(next.date).format("YY/MM/DD"),
        生产: next.produce,
        销毁: next.destroy,
        净流入: next.inflow,
      });
      return prv;
    }, []);
    return LineInitOptions;
  }
  return (
    <LineChart
      style={{
        width: "100%",
        height: "100%",
      }}
      option={chartDataFormat(data)}
    />
  );
};
export default ChartAssetsOzc;
