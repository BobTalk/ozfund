import type { ColumnsType } from "@/Components/Table";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { GetEmailListInterface } from "@/api";
import { timeFormate } from "@/utils/base";
import { language1Enum } from "@/Enum";
import PageTableScope from "@/Pages/Components/Table";
const TableEmailList = (props, ref) => {
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
    props?.onMore(pagination.current);
  }
  const isShowMoreBtn = () =>
    pagination.current.pageNo < pagination.current.pageTotal;

  useImperativeHandle(
    ref,
    () => ({
      getTableList,
    }),
    []
  );
  useLayoutEffect(() => {
    getTableList({}, pagination.current, false);
  }, []);

  return (
    <PageTableScope
      pagitions={pagination.current}
      style={props.style}
      className="_reset-table__no-btn"
      isShowMoreBtn={isShowMoreBtn()}
      dataList={dataList}
      columns={columns}
      moreLoad={loadMoreCb}
    />
  );
};

export default forwardRef(TableEmailList);
