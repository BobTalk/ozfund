import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider, Switch, Typography } from "antd";
import { useState } from "react";
import { EditOutlined, EyeFilled } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
const TableProcess = (props) => {
  const columns: ColumnsType = [
    {
      title: "序号",
      dataIndex: "frezzTime",
      render: (_, record, index) => index + 1,
    },
    {
      title: "问题分类",
      dataIndex: "address",
    },
    {
      title: "置顶",
      dataIndex: "num",
      render: (_, record, index) => {
        return <Switch checked />;
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 280,
      align: "left",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return (
          <div className="flex gap-[var(--gap10)]">
            <Typography.Link disabled={editable}>
              <div
                onClick={(e) => props?.onLook?.(e, record, index)}
                className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[var(--blue1)] rounded-[4px] text-[var(--blue)]"
              >
                <EyeFilled className="mr-[8px]" />
                <span>查看</span>
              </div>
            </Typography.Link>
            <Typography.Link disabled={editable}>
              <div className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[var(--green1)] rounded-[4px] text-[var(--green2)]">
                <EditOutlined className="mr-[8px]" />
                <span>编辑</span>
              </div>
            </Typography.Link>
            <Typography.Link disabled={editable}>
              <div
                onClick={(e) => deleteCb(e, record)}
                className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[#eeeff0] rounded-[4px] text-[#53585E]"
              >
                <Icon className="mr-[8px]" name="h-icon-delete"/>
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
        className="_reset-table__btn"
        dataSource={dataList}
        columns={columns}
      />
    </ConfigProvider>
  );
};

export default TableProcess;
