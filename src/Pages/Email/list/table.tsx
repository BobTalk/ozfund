import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider, Switch, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const TableEmailList = (props) => {
  const columns: ColumnsType = [
    {
      title: "订阅时间",
      dataIndex: "frezzTime",
      render: (_, record, index) => index + 1,
    },
    {
      title: "邮箱",
      dataIndex: "address",
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

export default TableEmailList;
