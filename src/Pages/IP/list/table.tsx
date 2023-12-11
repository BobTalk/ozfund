import Icon from "@/Components/Icon";
import type { ColumnsType } from "@/Components/Table";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import PageTableScope from "@/Pages/Components/Table";
import { GetIpListInterface } from "@/api";
import { timeFormate } from "@/utils/base";
import { Typography, Popconfirm } from "antd";
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
    let { data, pageNo, pageSize, pageTotal } = await GetIpListInterface({
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
