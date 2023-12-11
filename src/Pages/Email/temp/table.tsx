import type { ColumnsType } from "@/Components/Table";
import { Popconfirm, Typography, message } from "antd";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { EditOutlined } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
import { DeleteEmailTempInterface, GetEmailTempInterface } from "@/api";
import { cloneDeep } from "lodash";
import PageTableScope from "@/Pages/Components/Table";
const TableProcess = (props, ref) => {
  const columns: ColumnsType = [
    {
      title: "序号",
      dataIndex: "id",
      render: (_, record, index) => index + 1,
    },
    {
      title: "邮箱类型",
      dataIndex: "name",
    },
    {
      title: "备注",
      dataIndex: "note",
    },

    {
      title: "员工ID",
      dataIndex: "adminId",
    },

    {
      title: "操作",
      dataIndex: "operation",
      width: 300,
      align: "left",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return (
          <div className="flex gap-[var(--gap10)]">
            <Typography.Link disabled={editable}>
              <div
                onClick={(e) => lookCb(e, record, index)}
                className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[var(--blue1)] rounded-[4px] text-[var(--blue)]"
              >
                <EditOutlined className="mr-[8px]" />
                <span>查看</span>
              </div>
            </Typography.Link>
            <Typography.Link disabled={editable}>
              <div
                onClick={(e) => editorCb(e, record, index)}
                className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[var(--green1)] rounded-[4px] text-[var(--green2)]"
              >
                <EditOutlined className="mr-[8px]" />
                <span>编辑</span>
              </div>
            </Typography.Link>
            <Typography.Link disabled={editable}>
              <Popconfirm
                title="确认删除此数据?"
                onConfirm={(e) => deleteCb(e, record, index)}
              >
                <div className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[#eeeff0] rounded-[4px] text-[#53585E]">
                  <Icon className="mr-[8px]" name="h-icon-delete" />
                  <span>移除</span>
                </div>
              </Popconfirm>
            </Typography.Link>
          </div>
        );
      },
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
  let [stop] = useStopPropagation();
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  function deleteCb(e, crt, index) {
    stop(e, async () => {
      let { status, message: tipInfo } = await DeleteEmailTempInterface({
        id: crt.id,
      });
      message[status ? "success" : "error"](tipInfo);
      if (status) {
        let copyList = cloneDeep(dataList);
        copyList.splice(index, 1);
        setDataList(copyList);
        props?.onDelete?.(crt, index);
      }
    });
  }
  function lookCb(e, crt, index) {
    stop(e, () => {
      props?.onLook(crt, index);
    });
  }
  function editorCb(e, crt, index) {
    stop(e, () => {
      props?.onEditor(crt, index, pagination.current);
    });
  }
  function moreCb() {
    pagination.current.pageNo += 1;
    once.current = true;
    getTableList(pagination.current, true);
  }
  async function getTableList(pgt = pagination.current, isMergeData = false) {
    if (!once) return;
    let { status, data, pageNo, pageSize, pageTotal } =
      await GetEmailTempInterface(pgt);
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
  function updateTableList(pgt) {
    for (let index = 2; index <= pgt.pageNo; index++) {
      once.current = true;
      getTableList(
        {
          pageNo: index,
          pageSize: 10,
        },
        index > 1 ? true : false
      );
    }
  }
  const isShowMoreBtn = () =>
    pagination.current.pageNo < pagination.current.pageTotal;

  useImperativeHandle(
    ref,
    () => ({
      getTableList,
      updateTableList,
    }),
    []
  );
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

export default forwardRef(TableProcess);
