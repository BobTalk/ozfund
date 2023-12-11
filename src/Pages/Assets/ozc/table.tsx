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
      title: "流通量(TOTO)",
      dataIndex: "num",
    },
    {
      title: "新增(TOTO)",
      dataIndex: "num",
    },
    {
      title: "销毁(TOTO)",
      dataIndex: "num",
    },
  ];
  const [dataList, setDataList] = useState<any>([]);
  let pagitions = useRef<{
    pageNo: number;
    pageSize: number;
    pageTotal?: number;
  }>({
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
