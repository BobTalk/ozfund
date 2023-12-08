import { ModalTitle } from "@/Components/Modal";
import TableAllocation from "./table";
import { useEffect, useRef, useState } from "react";
import MoreBtn from "@/Components/MoreBtn";
import ChartAssetsOzc from "./barCharts.jsx";
const Ozc = (props) => {
  let [chartsData] = useState([
    {
      date: "2023/07/01",
      produce: 100,
      destroy: 100,
      inflow: 100,
    },
    {
      date: "2023/07/02",
      produce: 100,
      destroy: 100,
      inflow: 100,
    },
    {
      date: "2023/07/03",
      produce: 100,
      destroy: 100,
      inflow: 100,
    },
    {
      date: "2023/07/04",
      produce: 100,
      destroy: 100,
      inflow: 100,
    },
  ]);
  let tableRefs = useRef<any>();
  let [tableHeight, setTableHeight] = useState<number>();
  useEffect(() => {
    setTimeout(() => {
      let { height } = tableRefs.current.getBoundingClientRect();
      setTableHeight(height);
    }, 100);
  }, []);
  return (
    <>
      <div ref={tableRefs} className="mb-[var(--gap15)]">
        <TableAllocation  />
      </div>
      <div
        className="w-full bg-white py-[.3rem] pr-[.2rem] pl-[.3rem] rounded-[var(--border-radius)]"
        style={{
          height: `calc(100% - ${tableHeight}px - .3rem)`,
          minHeight: "3.5rem",
        }}
      >
        <ChartAssetsOzc data={chartsData} />
      </div>
    </>
  );
};
export default Ozc;
