import React, { useState } from "react";
import TableComp from '@/Components/Table'
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Typography } from "antd";
const TableConfig = (props) => {
  let [data, setData] = useState([
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
  // 保存编辑信息
  async function submitCb(e, crt, index) {
    props?.onEditor?.(e, crt,index)
  }
  let columns = [
    {
      title: "序号",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_, record, index) => {
        return index + 1
      }
    },
    {
      title: "时间",
      key: "createTime",
      dataIndex: "createTime",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },

    {
      title: "事务发起人",
      key: "tradeConfirmNum",
      dataIndex: "tradeConfirmNum",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },

    {
      title: "事务类型",
      key: "tradeConfirmNum",
      dataIndex: "tradeConfirmNum",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
    },
    {
      title: "事务详情",
      key: "triggerQuantity",
      dataIndex: "triggerQuantity",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",

    },
    {
      title: "签名人",
      key: "supplementaryMinerFees",
      dataIndex: "supplementaryMinerFees",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",

    },

    {
      title: "操作",
      key: "operation",
      dataIndex: "operation",
      // width: "100",
      responsive: ["xl"],
      ellipsis: true,
      align: "left",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return <Typography.Link
          disabled={editable}
          className="mr-[.2rem]"
          onClick={(e) => submitCb(e, record, index)}
        >
          <Button className="bg-[rgba(3,133,242,0.1)] border-[rgba(3,133,242,0.1)] text-[#0385F2]" icon={<EditOutlined />}>签名</Button>
        </Typography.Link>

      },
    },
  ];
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  return (

    <TableComp
      className="mt-[var(--mt15)]"
      themeObj={{
        headerBorderRadius: 0,
      }}
      bordered={false}
      dataSource={data}
      columns={columns}
      pagination={false}
    />
  );
};

export default TableConfig;
