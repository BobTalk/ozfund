import MoreBtn from "@/Components/MoreBtn";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { GetIpLogListInterface } from "@/api";
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
  async function getTableList() {
    let { status, data } = await GetIpLogListInterface({});
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          controlHeight: 36,
        },
      }}
    >
      <div style={props.style}>
        <div
          style={{
            maxHeight: `calc(100% - .63rem)`,
          }}
          className="mt-[var(--gap15)] overflow-auto bg-white rounded-[var(--border-radius)]"
        >
          <TableComp
            className="_reset-table__btn"
            dataSource={dataList}
            columns={columns}
          />
        </div>
        <MoreBtn />
      </div>
    </ConfigProvider>
  );
};

export default Table;
