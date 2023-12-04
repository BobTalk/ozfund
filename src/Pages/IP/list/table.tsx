import Icon from "@/Components/Icon";
import MoreBtn from "@/Components/MoreBtn";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { GetIpListInterface } from "@/api";
import { ConfigProvider, Typography } from "antd";
import dayjs from "dayjs";
import { useLayoutEffect, useState } from "react";
const Table = (props) => {
  async function getTableList() {
    let { status, data } = await GetIpListInterface({});
  }
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
              <Icon className="mr-[8px]" name="h-icon-delete" />
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
  useLayoutEffect(() => {
    getTableList();
  }, []);
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
