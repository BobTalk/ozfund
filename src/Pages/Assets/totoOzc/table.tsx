import type { ColumnsType } from "@/Components/Table";
import PageTableScope from "@/Pages/Components/Table";
import { useRef, useState } from "react";
const TableAllocation = (props) => {
  const columns: ColumnsType = [
    {
      title: "时间",
      dataIndex: "frezzTime",
      render: (_, record, index) => index + 1,
    },
    {
      title: "TOTO流通数量",
      dataIndex: "address",
    },
    {
      title: "OZC流通数量",
      dataIndex: "num",
    },
    {
      title: "TOTO/OZC",
      dataIndex: "num",
    },
  ];
  const [dataList, setDataList] = useState<any>([
    {
      key: 1,
      frezzTime: new Date(),
      address: "djahoaic4234kahdiuahdajag",
      num: 439487,
      notes: "Ozfund投注挖矿：sifjsidijjisd-Ozfund投注挖矿：Aioeowie",
      staffId: "xiaowu",
    },
    {
      key: 2,
      frezzTime: new Date(),
      address: "djahoaic4234kahdiuahdajag",
      num: 439487,
      notes: "Ozfund投注挖矿：sifjsidijjisd-Ozfund投注挖矿：Aioeowie",
      staffId: "xiaowu",
    },
  ]);
  let pagitions = useRef<any>({
    pageNo: 1,
    pageSize: 10,
  });
  const isShowMoreBtn = () =>
    pagitions.current.pageNo < pagitions.current.pageTotal;

  function moreCb(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <PageTableScope
      pagitions={pagitions.current}
      style={props.style}
      className="_reset-table__no-btn"
      isShowMoreBtn={isShowMoreBtn()}
      dataList={dataList}
      columns={columns}
      moreLoad={moreCb}
    />
  );
};

export default TableAllocation;
