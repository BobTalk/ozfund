import { ModalTitle } from "@/Components/Modal";
import TableAllocation from "./table";
import { useEffect, useRef, useState } from "react";
import MoreBtn from "@/Components/MoreBtn";
import ChartAssetsOzc from "./lineCharts.jsx";
const TotoPrice = (props) => {
  let tableHeaderList = [
    {
      title: "TOTO发行量",
      attr: "devTeam",
    },
    {
      title: "销毁量",
      attr: "devTeam1",
    },
    {
      title: "流通量",
      attr: "devTeam2",
    },
    {
      title: "Prize Pool",
      attr: "devTeam3",
    },
  ];
  let [tableContentList] = useState([
    {
      id: 1,
      devTeam: 99999,
      devTeam1: 99999,
      devTeam2: 99999,
      devTeam3: 99999,
      devTeam4: 99999,
      devTeam5: 99999,
    },
  ]);
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
      <div ref={tableRefs}>
        <div className="bg-white pb-[var(--gap20)] rounded-[var(--border-radius)]">
          <p className="ml-[var(--gap30)] py-[var(--gap20)] border-b border-b-[var(--border-color)]">
            <span>TOTO=0.999OZC</span>
          </p>
          <div className="text-[14px] border border-[var(--border-color)] mt-[var(--gap20)] mr-[var(--gap20)] ml-[var(--gap30)]">
            <ul>
              <li
                style={{
                  gridTemplateColumns: `repeat(${tableHeaderList.length}, 1fr)`,
                }}
                className={`grid place-items-center h-[.46rem] border-b border-b-[var(--border-color)]`}
              >
                {tableHeaderList.map((item) => (
                  <p
                    key={item.title}
                    className="h-full w-full border-r border-r-[var(--border-color)] last:border-r-[0]"
                  >
                    <span className="flex bg-[#f8f9fa] text-[#666] items-center justify-center h-full">
                      {item.title}
                    </span>
                  </p>
                ))}
              </li>
            </ul>
            <ul>
              {tableContentList.map((itemLi) => (
                <li
                  key={itemLi.id}
                  style={{
                    gridTemplateColumns: `repeat(${tableHeaderList.length}, 1fr)`,
                  }}
                  className={`grid place-items-center  h-[.46rem] border-b border-b-[var(--border-color)] last:border-b-[0]`}
                >
                  {tableHeaderList.map((item) => (
                    <p
                      className="w-full h-full  border-r border-r-[var(--border-color)] last:border-r-[0]"
                      key={item.title + "child"}
                    >
                      <span className=" text-[#333] flex h-full items-center justify-center">
                        {itemLi[item["attr"]]}
                      </span>
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <TableAllocation />
      </div>
      <div
        className="w-full mt-[.07rem] bg-white py-[.3rem] pr-[.2rem] pl-[.3rem] rounded-[var(--border-radius)]"
        style={{
          height: `calc(100% - ${tableHeight}px - .15rem)`,
          minHeight: "3.5rem",
        }}
      >
        <ChartAssetsOzc data={chartsData} />
      </div>
    </div>
  );
};
export default TotoPrice;
