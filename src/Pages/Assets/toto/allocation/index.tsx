import { ModalTitle } from "@/Components/Modal";
import TableAllocation from "./table";
import { useState } from "react";
import MoreBtn from "@/Components/MoreBtn";

const Allocation = (props) => {
  return (
    <>
      <TopModule />
      <div className="mt-[var(--gap15)] pb-[var(--gap14)] bg-white rounded-[0_0_var(--border-radius)_var(--border-radius)]">
        <TableAllocation />
      </div>
      <MoreBtn />
    </>
  );
};
const TopModule = () => {
  let tableHeaderList = [
    {
      title: "Oz开发者团队",
      attr: "devTeam",
    },
    {
      title: "长期支持者",
      attr: "devTeam1",
    },
    {
      title: "Oz基金会",
      attr: "devTeam2",
    },
    {
      title: "质押OZC挖矿TOTO",
      attr: "devTeam3",
    },
    {
      title: "Ozbet.one普通用户OZC投注挖矿",
      attr: "devTeam4",
    },
    {
      title: "Ozbet.one VIP用户OZC投注叠加挖矿",
      attr: "devTeam5",
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
  return (
    <div className="bg-white rounded-[var(--border-radius)] pb-[var(--gap20)]">
      <ModalTitle
        showTitleIcon
        classTitleName="py-[var(--gap20)] ml-[var(--gap30)]  border-b border-b-[#e6e6e6] text-[16px] text-[#333]"
        classIconName="w-[.03rem] h-[.13rem]"
        title={
          <div className="flex flex-1 items-center justify-between">
            <p className="text-[16px] text-[#333]">TOTO发行量：9999</p>
            <span className="text-[14px] text-[#666] mr-[var(--gap20)]">
              2022.05.10{" "}
            </span>
          </div>
        }
      />
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
  );
};
export default Allocation;
