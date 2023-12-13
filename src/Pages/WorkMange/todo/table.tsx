import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import type { ColumnsType } from "@/Components/Table";
import { Button } from "antd";
import { Typography } from "antd";
import Icon from "@/Components/Icon";
import PageTableScope from "@/Pages/Components/Table";
import { GetTodoTaskInterface } from "@/api";
import { timeFormate } from "@/utils/base";
import { transactionTypeEnum } from "@/Enum";
const TableConfig = (props) => {
  let [dataList, setDataList] = useState([]);

  let columns: ColumnsType = [
    {
      title: "序号",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: "时间",
      dataIndex: "createTime",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_) => timeFormate(_),
    },

    {
      title: "事务发起人",
      dataIndex: "adminId",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },

    {
      title: "事务类型",
      dataIndex: "transactionType",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_) => transactionTypeEnum[_],
    },
    {
      title: "事务详情",
      dataIndex: "transactionDetail",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },
    {
      title: "签名人",
      dataIndex: "signAdmins",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_) => _ || "--",
    },

    {
      title: "操作",
      dataIndex: "operation",
      // width: "100",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return (
          <Typography.Link
            disabled={editable}
            className="mr-[var(--gap20)]"
            onClick={(e) => submitCb(e, record, index)}
          >
            <Button
              className="btn bg-[rgba(3,133,242,0.1)] border-[rgba(3,133,242,0.1)] text-[#0385F2]"
              icon={
                <Icon name="h-icon-qianming" style={{ fontSize: "16px" }} />
              }
            >
              签名
            </Button>
          </Typography.Link>
        );
      },
    },
  ];
  let pagitions = useRef<any>({
    pageNo: 1,
    pageSize: 10,
  });
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  function isShowMoreBtn() {
    return pagitions.current.pageNo < pagitions.current.pageTotal;
  }
  // 保存编辑信息
  async function submitCb(e, crt, index) {
    props?.onEditor?.(e, crt, index);
  }
  function moreCb(): void {
    pagitions.current.pageNo += 1;
    getTableList(pagitions.current, true);
  }
  async function getTableList(pgt = pagitions.current, isMergeData = false) {
    let { data, pageNo, pageTotal, pageSize } = await GetTodoTaskInterface(pgt);
    pagitions.current = {
      pageNo,
      pageTotal,
      pageSize,
    };
    if (isMergeData) {
      setDataList((list) =>
        list.concat(data?.map((item) => ((item.key = item.id), item)))
      );
    } else {
      setDataList(data?.map((item) => ((item.key = item.id), item)));
    }
  }
  useLayoutEffect(() => {
    getTableList();
  }, []);
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

export default forwardRef(TableConfig);
