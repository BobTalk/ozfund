import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const Table = (props) => {
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
    {
      title: "操作",
      dataIndex: "operation",
      width: 200,
      align: "left",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return (
          <Typography.Link disabled={editable}>
            {index % 2 ? (
              <div
                onClick={(e) => deleteCb(e, record)}
                className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[#eeeff0] rounded-[4px] text-[#53585E]"
              >
                <DeleteOutlined className="mr-[8px]" />
                <span>删除</span>
              </div>
            ) : (
              <span className="text-[14px] btn text-[#666]">已销毁</span>
            )}
          </Typography.Link>
        );
      },
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
    {
      key: 2,
      frezzTime: new Date(),
      address: "djahoaic4234kahdiuahdajag",
      num: 439487,
      notes: "Ozfund投注挖矿：sifjsidijjisd-Ozfund投注挖矿：Aioeowie",
      staffId: "xiaowu",
    },
  ]);
  let [stop] = useStopPropagation();
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  function deleteCb(e, crt) {
    stop(e, () => {
      props?.onDelete(crt);
    });
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
      <div className="flex items-center gap-[var(--gap10)] mt-[var(--gap20)] mb-[var(--gap17)] ml-[var(--gap30)]">
        <Input placeholder="输入地址" className="w-[3.7rem]" />
        <Button type="primary">查询</Button>
      </div>
      <TableComp
        className="_reset-table__btn"
        dataSource={dataList}
        columns={columns}
      />
    </ConfigProvider>
  );
};

export default Table;
