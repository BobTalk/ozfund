import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
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
