import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider, Switch, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
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
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerColor: "#333",
            colorText:"#666",
          },
        },
        token: {
          borderRadius: 2,
          controlHeight: 36,
        },
      }}
    >
      <TableComp
        className="_reset-tabel"
        dataSource={dataList}
        columns={columns}
      />
    </ConfigProvider>
  );
};

export default TableAllocation;
