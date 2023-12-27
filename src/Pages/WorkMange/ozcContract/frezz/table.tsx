import type { ColumnsType } from "@/Components/Table";
import dayjs from "dayjs";
import { forwardRef, useRef, useState } from "react";
import PageTableScope from "@/Pages/Components/Table";
const Table = (props) => {
  let pagitions = useRef<any>({
    pageNo: 1,
    pageSize: 10,
  });
  const columns: ColumnsType = [
    {
      title: "冻结时间",
      dataIndex: "frezzTime",
      render: (_) => dayjs(_).format("YYYY.MM.DD HH:mm:ss"),
    },
    {
      title: "地址",
      dataIndex: "address",
    },
    {
      title: "数量",
      dataIndex: "num",
    },
    {
      title: "备注",
      dataIndex: "notes",
    },
    {
      title: "员工ID",
      dataIndex: "staffId",
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
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);
  let isShowMoreBtn = () =>
    pagitions.current.pageNo < pagitions.current.pageTotal;

  function moreCb(): void {
    throw new Error("Function not implemented.");
  }
function getTableList(){
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

export default forwardRef(Table);
