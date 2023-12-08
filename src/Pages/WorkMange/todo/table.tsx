import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { EditOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import { Typography } from "antd";
import Icon from "@/Components/Icon";
import MoreBtn from "@/Components/MoreBtn";
import { getTableShowLine } from "@/utils/base";
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
              className="bg-[rgba(3,133,242,0.1)] border-[rgba(3,133,242,0.1)] text-[#0385F2]"
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
  useLayoutEffect(() => {
    let { pageNo, pageTotal } = pagitions.current;
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let btnH = pageNo < pageTotal ? 63 : 0;
      setTableContentLine(getTableShowLine(contentRefs.current, btnH));
    }, 500);
  }, [dataList]);
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          controlHeight: 36,
        },
      }}
    >
      <div ref={contentRefs} style={props.style} className="mt-[var(--gap15)]">
        <div
          style={{
            maxHeight: isShowMoreBtn() ? `calc(100% - .63rem)` : "100%",
          }}
          className="overflow-auto bg-white rounded-[0_0_var(--border-radius)_var(--border-radius)]"
        >
          <TableComp
            className="mt-[var(--gap15)] _reset-table__btn"
            themeObj={{
              headerBorderRadius: 0,
            }}
            bordered={false}
            dataSource={dataList}
            columns={columns}
            line={tableContentLine}
            pagination={false}
          />
        </div>
        <MoreBtn />
      </div>
    </ConfigProvider>
  );
};

export default forwardRef(TableConfig);
