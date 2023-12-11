import type { ColumnsType } from "@/Components/Table";
import { useRef, useState } from "react";
import PageTableScope from "@/Pages/Components/Table";
const TableAllocation = (props) => {
  const columns: ColumnsType = [
    {
      title: "日期",
      dataIndex: "frezzTime",
      render: (_, record, index) => index + 1,
    },
    {
      title: "链上时间(天）",
      dataIndex: "address",
    },
    {
      title: "新增(TOTO)",
      dataIndex: "num",
    },
    {
      title: "基金会(30%)",
      dataIndex: "num",
    },
    {
      title: "Oz团队(20%)",
      dataIndex: "num",
    },
    {
      title: "长期支持者(15%)",
      dataIndex: "num",
    },
    {
      title: "OZC质押(5%)",
      dataIndex: "num",
    },
    {
      title: "Ozfund挖矿(30%)",
      dataIndex: "num",
    },
    {
      title: "Ozfund VIP挖矿(30%)",
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
  ]);
  let pagitions = useRef<any>({
    pageNo: 1,
    pageSize: 10,
  });
  const isShowMoreBtn = () =>
    pagitions.current.pageNo < pagitions.current.pageTotal;

  function moreCb(): void {}

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
