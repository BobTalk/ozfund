import type { ColumnsType } from "@/Components/Table";
import { Popconfirm, Typography } from "antd";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
import PageTableScope from "@/Pages/Components/Table";
const Table = (props) => {
  const columns: ColumnsType = [
    {
      title: "冻结时间",
      dataIndex: "frezzTime",
      render: (_) => dayjs(_).format("YYYY.MM.DD HH:mm:ss"),
    },
    {
      title: "Token",
      dataIndex: "address",
    },
    {
      title: "代币种类",
      dataIndex: "num",
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 200,
      align: "left",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <Typography.Link disabled={editable}>
            <Popconfirm onConfirm={(e) => deleteCb(e, record)} placement="top" arrow={{pointAtCenter: true}} title='确定删除此数据?'>
            <div
              className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[#eeeff0] rounded-[4px] text-[#53585E]"
            >
              <Icon className="mr-[8px]" name="h-icon-delete" />
              <span>移除</span>
            </div>
            </Popconfirm>
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
  ]);
  let pagitions = useRef<any>({
    pageNo: 1,
    pageSize: 10,
  });
  let [stop] = useStopPropagation();
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  function deleteCb(e, crt) {
    stop(e, () => {
      props?.onDelete(crt);
    });
  }
  const isShowMoreBtn = () =>
    pagitions.current.pageNo < pagitions.current.pageTotal;

  function moreCb(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <PageTableScope
      pagitions={pagitions.current}
      style={props.style}
      className="_reset-table__btn"
      isShowMoreBtn={isShowMoreBtn()}
      dataList={dataList}
      columns={columns}
      moreLoad={moreCb}
    />
  );
};

export default Table;
