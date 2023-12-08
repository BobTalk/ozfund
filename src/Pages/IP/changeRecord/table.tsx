import MoreBtn from "@/Components/MoreBtn";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { GetIpLogListInterface } from "@/api";
import { getTableShowLine, timeFormate } from "@/utils/base";
import { ConfigProvider } from "antd";
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
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);
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
    let { pageNo, pageTotal } = pagination.current;
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let btnH = pageNo < pageTotal ? 63 : 0;
      setTableContentLine(getTableShowLine(contentRefs.current, btnH));
    }, 500);
  }, []);
  useLayoutEffect(() => {
    getTableList({}, pagination.current, true);
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
      <div ref={contentRefs} className="mt-[var(--gap15)]" style={props.style}>
        <div
          style={{
            maxHeight: isShowMoreBtn() ? `calc(100% - .63rem)` : "100%",
          }}
          className="overflow-auto bg-white rounded-[var(--border-radius)]"
        >
          <TableComp
            className="_reset-table__btn"
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

export default forwardRef(Table);
