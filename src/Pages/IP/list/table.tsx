import Icon from "@/Components/Icon";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { ConfigProvider, Typography } from "antd";
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
      title: "新增时间",
      dataIndex: "num",
    },
    {
      title: "处理人",
      dataIndex: "notes",
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
            <div
                onClick={(e) => deleteCb(e, record, index)}
                className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[#eeeff0] rounded-[4px] text-[#53585E]"
              >
                <Icon className="mr-[8px]" name="h-icon-delete"/>
                <span>删除</span>
              </div>
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
  let [stop] = useStopPropagation();
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  function deleteCb(e, crt, index) {
    stop(e, () => {
      props?.onDelete(crt, index);
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
      <TableComp
        className="_reset-table__btn"
        dataSource={dataList}
        columns={columns}
      />
    </ConfigProvider>
  );
};

export default Table;
