import type { ColumnsType } from "@/Components/Table";
import PageTableScope from "@/Pages/Components/Table";
import dayjs from "dayjs";
import { useRef, useState } from "react";
const Table = (props) => {
  const columns: ColumnsType = [
    {
      title: "操作时间",
      dataIndex: "frezzTime",
      render: (_) => dayjs(_).format("YYYY.MM.DD HH:mm:ss"),
    },

    {
      title: "发起人",
      dataIndex: "notes",
    },
    {
      title: "事务类型",
      dataIndex: "notes",
    },
    {
      title: "事务详情",
      dataIndex: "operation",
      align: "left",
    },
    {
      title: "签名人",
      dataIndex: "operation",
      align: "left",
    },
  ];
  const [dataList, setDataList] = useState<any>([
    {
      key: 1,
      frezzTime: new Date(),
      address: "djahoaic4234kahdiuahdajag",
      num: 439487,
      notes: "Ozfund投注挖矿：",
      staffId: "xiaowu",
    },
    {
      key: 2,
      frezzTime: new Date(),
      address: "djahoaic4234kahdiuahdajag",
      num: 439487,
      notes: "Ozfund投注挖矿：",
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

export default Table;
