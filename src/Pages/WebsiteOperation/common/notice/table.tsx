import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider, Switch, Typography } from "antd";
import dayjs from "dayjs";
import styleScope from "./index.module.less";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const TableProcess = (props) => {
  const columns: ColumnsType = [
    {
      title: "序号",
      dataIndex: "frezzTime",
      render: (_, record, index) => index + 1,
    },
    {
      title: "标题",
      dataIndex: "address",
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
      title: "时间",
      dataIndex: "num",
    },
    {
      title: "员工ID",
      dataIndex: "num",
    },
    {
      title: "置顶",
      dataIndex: "num",
      render:(_,record, index)=>{
        return <Switch checked/>
      }
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 200,
      align: "left",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return (<div className="flex gap-[var(--gap10)]">
          <Typography.Link disabled={editable}>
            <div
              className="flex items-center justify-center h-[.3rem] w-[.76rem] bg-[var(--green1)] rounded-[4px] text-[var(--green2)]"
            >
              <EditOutlined className="mr-[8px]" />
              <span>编辑</span>
            </div>
          </Typography.Link>
          <Typography.Link disabled={editable}>
            <div
              onClick={(e) => deleteCb(e, record)}
              className="flex items-center justify-center h-[.3rem] w-[.76rem] bg-[#eeeff0] rounded-[4px] text-[#53585E]"
            >
              <DeleteOutlined className="mr-[8px]" />
              <span>移除</span>
            </div>
          </Typography.Link>
          </div>
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
  ]);
  let [stop] = useStopPropagation();
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  function deleteCb(e, crt) {
    stop(e, () => {
      props?.onDelete?.(crt);
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
        className={styleScope["tabel_reset"]}
        dataSource={dataList}
        columns={columns}
      />
    </ConfigProvider>
  );
};

export default TableProcess;
