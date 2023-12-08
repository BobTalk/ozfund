import Icon from "@/Components/Icon";
import MoreBtn from "@/Components/MoreBtn";
import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { GetIpListInterface } from "@/api";
import { getTableShowLine, timeFormate } from "@/utils/base";
import { ConfigProvider, Typography, Popconfirm } from "antd";
import { uniqBy, cloneDeep } from "lodash";
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
    let { status, data, pageNo, pageSize, pageTotal } =
      await GetIpListInterface({
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
      render: (_) => _ || "--",
    },
    {
      title: "备注",
      dataIndex: "note",
      render: (_) => _ || "--",
    },
    {
      title: "新增时间",
      dataIndex: "createTime",
      render: (_) => timeFormate(_),
    },
    {
      title: "处理人",
      dataIndex: "adminId",
      render: (_) => _ || "--",
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
            <Popconfirm
              onConfirm={(e) => deleteCb(e, record, index)}
              title="确定删除此数据?"
              placement="top"
            >
              <div className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[#eeeff0] rounded-[4px] text-[#53585E]">
                <Icon className="mr-[8px]" name="h-icon-delete" />
                <span>删除</span>
              </div>
            </Popconfirm>
          </Typography.Link>
        );
      },
    },
  ];
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);
  let [stop] = useStopPropagation();
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  function deleteCb(e, crt, index) {
    stop(e, () => {
      let newList = cloneDeep(dataList);
      newList.splice(index, 1);
      setDataList(newList);
      props?.onDelete(crt, index);
    });
  }
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
  }, [dataList]);
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
      <div ref={contentRefs} style={props.style} className="mt-[var(--gap15)]">
        <div
          style={{
            maxHeight: isShowMoreBtn() ? `calc(100% - .63rem)` : "100%",
          }}
          className="overflow-auto bg-white rounded-[var(--border-radius)]"
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

export default forwardRef(Table);
