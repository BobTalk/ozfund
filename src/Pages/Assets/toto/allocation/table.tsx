import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider, Switch, Typography } from "antd";
import dayjs from "dayjs";
import { useLayoutEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import MoreBtn from "@/Components/MoreBtn";
import { getTableShowLine } from "@/utils/base";
const TableAllocation = (props) => {
  const columns: ColumnsType = [
    {
      title: "日期",
      dataIndex: "frezzTime",
      render: (_, record, index) => index + 1,
    },
    {
      title: "链上时间(天）",
      dataIndex: "address",
    },
    {
      title: "新增(TOTO)",
      dataIndex: "num",
    },
    {
      title: "基金会(30%)",
      dataIndex: "num",
    },
    {
      title: "Oz团队(20%)",
      dataIndex: "num",
    },
    {
      title: "长期支持者(15%)",
      dataIndex: "num",
    },
    {
      title: "OZC质押(5%)",
      dataIndex: "num",
    },
    {
      title: "Ozfund挖矿(30%)",
      dataIndex: "num",
    },
    {
      title: "Ozfund VIP挖矿(30%)",
      dataIndex: "num",
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
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);
  const isShowMoreBtn = () =>
    pagitions.current.pageNo < pagitions.current.pageTotal;
  useLayoutEffect(() => {
    let { pageNo, pageTotal } = pagitions.current;
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let btnH = pageNo < pageTotal ? 63 : 0;
      setTableContentLine(getTableShowLine(contentRefs.current, btnH));
    }, 500);
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerColor: "#333",
            colorText: "#666",
          },
        },
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
          className="bg-white rounded-[0_0_var(--border-radius)_var(--border-radius)]"
        >
          <TableComp
            className="_reset-table__no-btn"
            dataSource={dataList}
            line={tableContentLine}
            columns={columns}
          />
        </div>
        {isShowMoreBtn() ? <MoreBtn /> : null}
      </div>
    </ConfigProvider>
  );
};

export default TableAllocation;
