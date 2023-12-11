import { forwardRef, useRef, useState } from "react";
import type { ColumnsType } from "@/Components/Table";
import { Button } from "antd";
import { Typography } from "antd";
import Icon from "@/Components/Icon";
import PageTableScope from "@/Pages/Components/Table";
const TableConfig = (props) => {
  let [dataList, setData] = useState([
    {
      key: "table1",
      assetsType: "USDT",
      walletProtocol: "USDT-ERC20",
      createTime: "2023.7.17 15:22:20",
      tradeType: "充币",
      num: 189,
      payAddr: "0x32983464f44",
      tradeId: "0x32983464f440x32983464f44",
      tradeConfirmNum: 87,
      triggerQuantity: 87,
      supplementaryMinerFees: 89,
    },
    {
      key: "table12",
      assetsType: "USDT",
      walletProtocol: "USDT-ERC20",
      createTime: "2023.7.17 15:22:20",
      tradeType: "充币",
      num: 189,
      payAddr: "0x32983464f44",
      tradeId: "0x32983464f440x32983464f44",
      tradeConfirmNum: 87,
      triggerQuantity: 87,
      supplementaryMinerFees: 89,
    },
  ]);
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);

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
    },

    {
      title: "事务发起人",
      dataIndex: "tradeConfirmNum",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },

    {
      title: "事务类型",
      dataIndex: "tradeConfirmNum",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },
    {
      title: "事务详情",
      dataIndex: "triggerQuantity",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },
    {
      title: "签名人",
      dataIndex: "supplementaryMinerFees",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
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

export default forwardRef(TableConfig);
