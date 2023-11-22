import MoreBtn from "@/Components/MoreBtn";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";

import { Button, ConfigProvider, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const Table = () => {
  const columns: ColumnsType = [
    {
      title: "冻结时间",
      dataIndex: "frezzTime",
      render: (_)=> dayjs(_).format("YYYY.MM.DD HH:mm:ss")
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
      width: 200,
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
      <div className="flex items-center gap-[var(--gap10)] mt-[var(--gap20)] mb-[var(--gap17)] ml-[var(--gap30)]">
        <Input placeholder="输入地址" className="w-[3.7rem]" />
        <Button type="primary">查询</Button>
      </div>
      <TableComp dataSource={dataList} columns={columns} />
      <MoreBtn />
    </ConfigProvider>
  );
};

export default Table;
