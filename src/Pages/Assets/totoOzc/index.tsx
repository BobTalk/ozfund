import TableAllocation from "./table";
import { useEffect, useRef, useState } from "react";
import MoreBtn from "@/Components/MoreBtn";
const TotoOzc = (props) => {
  let [chartsData] = useState([
    {
      date: "2023/07/01",
      produce: 100,
      destroy: 80,
      inflow: 20,
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
    <div className="h-full overflow-y-auto">
      <TableAllocation
        style={{
          height: `100%`,
        }}
      />
    </div>
  );
};
export default TotoOzc;
