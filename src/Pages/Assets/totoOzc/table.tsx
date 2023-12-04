import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider } from "antd";
import { useState } from "react";
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
  ]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerColor: "#333",
            colorText: "#666",
          },
        },
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

export default TableAllocation;
