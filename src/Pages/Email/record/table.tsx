import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider } from "antd";
import { useState } from "react";
const TableProcess = (props) => {
  const columns: ColumnsType = [
    {
      title: "序号",
      dataIndex: "frezzTime",
      render: (_, record, index) => index + 1,
    },
    {
      title: "发送时间",
      dataIndex: "address",
    },
    {
      title: "标题",
      dataIndex: "num",
    },
    {
      title: "内容",
      dataIndex: "num",
    },
    {
      title: "发送人",
      dataIndex: "num",
    },

    {
      title: "员工ID",
      dataIndex: "num",
    },
    {
      title: "分类",
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
        className="_reset-table__no-btn"
        dataSource={dataList}
        columns={columns}
      />
    </ConfigProvider>
  );
};

export default TableProcess;
