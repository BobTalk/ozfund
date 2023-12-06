import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider } from "antd";
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { GetEmailListInterface } from "@/api";
import MoreBtn from "@/Components/MoreBtn";
import { timeFormate } from "@/utils/base";
import { language1Enum } from "@/Enum";
const TableEmailList = (props,ref) => {
  const columns: ColumnsType = [
    {
      title: "订阅时间",
      dataIndex: "createTime",
      render: (_) => timeFormate(_),
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "分类",
      dataIndex: "language",
      render: (_) => language1Enum[_],
    },
  ];
  const [dataList, setDataList] = useState<any>([]);
  let pagination = useRef<{
    pageNo: number;
    pageSize: number;
    pageTotal?: number;
  }>({
    pageNo: 1,
    pageSize: 10,
    pageTotal: 10,
  });
  async function getTableList(conditions, gpt, isMergeData = false) {
    let { status, data, pageSize, pageNo, pageTotal } =
      await GetEmailListInterface({
        conditions,
        ...gpt,
      });
    if (status) {
      pagination.current = {
        pageTotal,
        pageNo,
        pageSize,
      };
      isMergeData
        ? setDataList((list) =>
            list.concat(data?.map((item) => ((item.key = item.id), item)))
          )
        : setDataList(data?.map((item) => ((item.key = item.id), item)));
    }
  }
  function loadMoreCb() {
    pagination.current.pageNo += 1;
   props?.onMore(pagination.current)
  }
  useImperativeHandle(ref, ()=>({
    getTableList
  }),[])
  useLayoutEffect(() => {
    getTableList({}, pagination.current, false);
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
      <div className="bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]">
        <TableComp
          className="_reset-table__no-btn"
          dataSource={dataList}
          columns={columns}
        />
      </div>
      {pagination.current.pageNo < pagination.current.pageTotal ? (
        <MoreBtn onMore={loadMoreCb} />
      ) : null}
    </ConfigProvider>
  );
};

export default forwardRef(TableEmailList);
