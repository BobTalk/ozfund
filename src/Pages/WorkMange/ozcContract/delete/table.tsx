import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider, Typography } from "antd";
import dayjs from "dayjs";
import { useLayoutEffect, useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
import MoreBtn from "@/Components/MoreBtn";
import { getTableShowLine } from "@/utils/base";
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
      render: (_, record, index) => {
        const editable = isEditing(record);
        return (
          <Typography.Link disabled={editable}>
            <div
              onClick={(e) => deleteCb(e, record)}
              className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[#eeeff0] rounded-[4px] text-[#53585E]"
            >
              <Icon className="mr-[8px]" name="h-icon-delete" />
              <span>移除</span>
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
        token: {
          controlHeight: 36,
        },
      }}
    >
      <div ref={contentRefs} style={props.style} className="mt-[var(--gap15)]">
        <div
          style={{
            maxHeight: isShowMoreBtn() ? `calc(100% - .63rem)` : "100%",
          }}
          className="bg-white overflow-auto rounded-[var(--border-radius)]"
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
