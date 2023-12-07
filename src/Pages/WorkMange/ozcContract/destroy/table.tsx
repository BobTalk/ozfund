import Icon from "@/Components/Icon";
import MoreBtn from "@/Components/MoreBtn";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { getTableShowLine } from "@/utils/base";
import { Button, ConfigProvider, Input, Typography } from "antd";
import dayjs from "dayjs";
import { useLayoutEffect, useRef, useState } from "react";
const Table = (props) => {
  const columns: ColumnsType = [
    {
      title: "冻结时间",
      dataIndex: "frezzTime",
      render: (_) => dayjs(_).format("YYYY.MM.DD HH:mm:ss"),
    },
    {
      title: "地址",
      dataIndex: "address",
    },
    {
      title: "数量",
      dataIndex: "num",
    },
    {
      title: "备注",
      dataIndex: "notes",
    },
    {
      title: "员工ID",
      dataIndex: "staffId",
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
            {index % 2 ? (
              <div
                onClick={(e) => deleteCb(e, record)}
                className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[#eeeff0] rounded-[4px] text-[#53585E]"
              >
                <Icon className="mr-[8px]" name="h-icon-delete" />
                <span>删除</span>
              </div>
            ) : (
              <span className="text-[14px] btn text-[#666]">已销毁</span>
            )}
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
    {
      key: 2,
      frezzTime: new Date(),
      address: "djahoaic4234kahdiuahdajag",
      num: 439487,
      notes: "Ozfund投注挖矿：sifjsidijjisd-Ozfund投注挖矿：Aioeowie",
      staffId: "xiaowu",
    },
  ]);
  let [stop] = useStopPropagation();
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;

  let pagitions = useRef<any>({
    pageNo: 1,
    pageSize: 10,
  });
  const isShowMoreBtn = () =>
    pagitions.current.pageNo < pagitions.current.pageTotal;
  function deleteCb(e, crt) {
    stop(e, () => {
      props?.onDelete(crt);
    });
  }
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
          className="bg-white overflow-auto rounded-[0_0_var(--border-radius)_var(--border-radius)]"
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
