import type { ColumnsType } from "@/Components/Table";
import { useLayoutEffect, useRef, useState } from "react";
import { GetEmailTimeTaskInterface } from "@/api";
import { timeFormate } from "@/utils/base";
import { language1Enum } from "@/Enum";
import PageTableScope from "@/Pages/Components/Table";
const TableProcess = (props) => {
  const columns: ColumnsType = [
    {
      title: "序号",
      dataIndex: "id",
      render: (_, record, index) => index + 1,
    },
    {
      title: "发送时间",
      dataIndex: "sendTime",
      render: (_) => timeFormate(_, "YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "标题",
      dataIndex: "subject",
    },
    {
      title: "内容",
      dataIndex: "content",
    },
    {
      title: "发送人",
      dataIndex: "sender",
    },

    {
      title: "员工ID",
      dataIndex: "adminId",
      render: (_) => _ || "--",
    },
    {
      title: "分类",
      dataIndex: "language",
      render: (_) => language1Enum[_] || "--",
    },
  ];
  const [dataList, setDataList] = useState<any>([]);
  let once = useRef<boolean>(true);
  let pagination = useRef<{
    pageNo: number;
    pageSize: number;
    pageTotal?: number;
  }>({
    pageNo: 1,
    pageSize: 10,
  });

  function moreCb() {
    pagination.current.pageNo += 1;
    once.current = true;
    getTableList(pagination.current, true);
  }
  async function getTableList(pgt = pagination.current, isMergeData = false) {
    if (!once) return;
    let { status, data, pageNo, pageSize, pageTotal } =
      await GetEmailTimeTaskInterface(pgt, 1);
    if (status) {
      once.current = false;
      pagination.current = {
        pageNo,
        pageSize,
        pageTotal,
      };
      if (isMergeData) {
        setDataList((list) =>
          list.concat(data.map((item) => ((item.key = item.id), item)))
        );
      } else {
        setDataList(data.map((item) => ((item.key = item.id), item)));
      }
    }
  }
  const isShowMoreBtn = () =>
    pagination.current.pageNo < pagination.current.pageTotal;

  useLayoutEffect(() => {
    getTableList(pagination.current);
  }, []);
  return (
    <PageTableScope
      pagitions={pagination.current}
      style={props.style}
      className="_reset-table__btn"
      isShowMoreBtn={isShowMoreBtn()}
      dataList={dataList}
      columns={columns}
      moreLoad={moreCb}
    />
  );
};

export default TableProcess;
