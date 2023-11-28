import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const Table = (props) => {
  const columns: ColumnsType = [
    {
      title: "IP地址",
      dataIndex: "frezzTime",
      render: (_) => dayjs(_).format("YYYY.MM.DD HH:mm:ss"),
    },
    {
      title: "备注",
      dataIndex: "address",
    },
    {
      title: "IP类型",
      dataIndex: "num",
    },
    {
      title: "操作类型",
      dataIndex: "notes",
    },
    {
      title: "操作时间",
      dataIndex: "notes",
    },
    {
      title: "处理人",
      dataIndex: "operation",
      width: 200,
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
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          controlHeight: 36,
        },
      }}
    >
      <TableComp
        className="_reset-table__btn"
        dataSource={dataList}
        columns={columns}
      />
    </ConfigProvider>
  );
};

export default Table;
