import MoreBtn from "@/Components/MoreBtn";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { getTableShowLine } from "@/utils/base";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { useLayoutEffect, useRef, useState } from "react";
const Table = (props) => {
  const columns: ColumnsType = [
    {
      title: "操作时间",
      dataIndex: "frezzTime",
      render: (_) => dayjs(_).format("YYYY.MM.DD HH:mm:ss"),
    },

    {
      title: "发起人",
      dataIndex: "notes",
    },
    {
      title: "事务类型",
      dataIndex: "notes",
    },
    {
      title: "事务详情",
      dataIndex: "operation",
      align: "left",
    },
    {
      title: "签名人",
      dataIndex: "operation",
      align: "left",
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
      let line = getTableShowLine(contentRefs.current, btnH);
      setTableContentLine(line);
    }, 500);
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
      <div className="mt-[var(--gap15)]" style={props.style}>
        <div
          style={{
            maxHeight: isShowMoreBtn() ? `calc(100% - .63rem)` : "100%",
          }}
          className="overflow-auto bg-white rounded-[0_0_var(--border-radius)_var(--border-radius)]"
        >
          <TableComp
            className="_reset-table__btn"
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

export default Table;
