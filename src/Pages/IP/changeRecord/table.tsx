import type { ColumnsType } from "@/Components/Table";
import PageTableScope from "@/Pages/Components/Table";
import { GetIpLogListInterface } from "@/api";
import { timeFormate } from "@/utils/base";
import { uniqBy } from "lodash";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
const Table = (props, ref) => {
  let pagination = useRef({
    pageNo: 1,
    pageSize: 10,
    pageTotal: 1,
  });
  const [dataList, setDataList] = useState<any>([]);
  async function getTableList(
    conditions = {},
    pgt = pagination.current,
    isMergeData = false
  ) {
    let { data, pageNo, pageSize, pageTotal } = await GetIpLogListInterface({
      conditions,
      pgt,
    });
    pagination.current = {
      pageNo,
      pageSize,
      pageTotal,
    };
    if (isMergeData) {
      let formatList = data.map((item) => ((item.key = item.id), item));
      setDataList((list) => uniqBy([...list, ...formatList], "id"));
    } else {
      setDataList(data.map((item) => ((item.key = item.id), item)));
    }
  }
  const columns: ColumnsType = [
    {
      title: "IP地址",
      dataIndex: "ip",
    },
    {
      title: "备注",
      dataIndex: "note",
      render: (_) => _ || "--",
    },
    // {
    //   title: "IP类型",
    //   dataIndex: "action",
    //   render: (_) => _ || "--",
    // },
    {
      title: "操作类型",
      dataIndex: "action",
    },
    {
      title: "操作时间",
      dataIndex: "ipCreateTime",
      render: (_) => timeFormate(_, "YYYY.MM.DD HH:mm:ss"),
    },
    {
      title: "处理人",
      dataIndex: "adminId",
      width: 200,
      align: "left",
    },
  ];
  function updateTableList(conditions, pgt, isMergeData = false) {
    getTableList(conditions, pgt, isMergeData);
  }
  useImperativeHandle(
    ref,
    () => ({
      updateTableList,
    }),
    []
  );
  const isShowMoreBtn = () =>
    pagination.current.pageNo < pagination.current.pageTotal;
  useLayoutEffect(() => {
    getTableList({}, pagination.current, true);
  }, []);
  function moreCb(): void {
    throw new Error("Function not implemented.");
  }

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

export default forwardRef(Table);
