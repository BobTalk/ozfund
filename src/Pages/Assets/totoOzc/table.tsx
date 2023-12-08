import MoreBtn from "@/Components/MoreBtn";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { getTableShowLine } from "@/utils/base";
import { ConfigProvider } from "antd";
import { useLayoutEffect, useRef, useState } from "react";
const TableAllocation = (props) => {
  const columns: ColumnsType = [
    {
      title: "时间",
      dataIndex: "frezzTime",
      render: (_, record, index) => index + 1,
    },
    {
      title: "TOTO流通数量",
      dataIndex: "address",
    },
    {
      title: "OZC流通数量",
      dataIndex: "num",
    },
    {
      title: "TOTO/OZC",
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
    {
      key: 2,
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
  }, [dataList]);
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
      <div ref={contentRefs} style={props.style}>
        <div
          style={{
            maxHeight: isShowMoreBtn() ? `calc(100% - .63rem)` : "100%",
          }}
          className="bg-white rounded-[0_0_var(--border-radius)_var(--border-radius)]"
        >
          <TableComp
            className="_reset-table__no-btn"
            line={tableContentLine}
            dataSource={dataList}
            columns={columns}
          />
        </div>
        {isShowMoreBtn() ? <MoreBtn /> : null}
      </div>
    </ConfigProvider>
  );
};

export default TableAllocation;
