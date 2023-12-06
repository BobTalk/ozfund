import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider, Popconfirm, Switch, Typography, message } from "antd";
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
import { mergeClassName, timeFormate } from "@/utils/base";
import MoreBtn from "@/Components/MoreBtn";
import {
  DeleteProcessInterface,
  GetProcessInterface,
  SwitchProcessInterface,
} from "@/api";
import { languageEnum } from "@/Enum";
import { cloneDeep } from "lodash";
const TableProcess = (props, ref) => {
  const columns: ColumnsType = [
    {
      title: "序号",
      dataIndex: "id",
      render: (_, record, index) => index + 1,
    },
    {
      title: "进程标题",
      dataIndex: "subject",
    },
    {
      title: "进程内容",
      dataIndex: "content",
    },
    {
      title: "时间",
      dataIndex: "createTime",
      render: (_) => timeFormate(_),
    },
    {
      title: "员工ID",
      dataIndex: "adminId",
    },
    {
      title: "置顶",
      dataIndex: "top",
      render: (_, record, index) => {
        return (
          <Switch checked={_} onChange={() => changeTopCb(record, index)} />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 200,
      align: "left",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return (
          <div className="flex gap-[var(--gap10)]">
            <Typography.Link disabled={editable}>
              <div
                onClick={(e) => editorCb(e, record)}
                className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[var(--green1)] rounded-[4px] text-[var(--green2)]"
              >
                <EditOutlined className="mr-[8px]" />
                <span>编辑</span>
              </div>
            </Typography.Link>
            <Typography.Link disabled={editable}>
              <Popconfirm
                title="确定删除此数据?"
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
  function editorCb(e, crt) {
    stop(e, () => {
      props?.onEditor?.(crt);
    });
  }
  async function changeTopCb(value, index) {
    let { status, message: tipInfo } = await SwitchProcessInterface({
      id: value.id,
    });
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      let cloneList = cloneDeep(dataList);
      cloneList.splice(index, 1, {
        ...cloneList[index],
        top: !cloneList[index].top,
      });
      setDataList(cloneList);
    }
  }
  function deleteCb(e, crt, index) {
    stop(e, async () => {
      let { status, message: tipInfo } = await DeleteProcessInterface({
        id: crt.id,
      });
      message[status ? "success" : "error"](tipInfo);
      if (status) {
        let cloneList = cloneDeep(dataList);
        cloneList.splice(index, 1);
        setDataList(cloneList);
      }
    });
  }
  async function getTableList(
    conditions = {},
    gpt = pagination.current,
    isMergeData = false
  ) {
    let { data, status, pageSize, pageNo, pageTotal } =
      await GetProcessInterface({
        ...gpt,
        conditions: {
          language: languageEnum[props["language"]],
          ...conditions,
        },
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
  function updateTableList(conditions, gpt, isMergeData = false) {
    getTableList(conditions, gpt, isMergeData);
  }
  function loadMoreCb() {
    pagination.current.pageNo += 1;
    getTableList({}, pagination.current, true);
  }
  function editorLoadTableList() {
    let { pageNo, pageSize } = pagination.current;
    getTableList(
      {},
      {
        pageNo: 1,
        pageSize: pageNo * pageSize,
      },
      false
    );
  }
  useImperativeHandle(
    ref,
    () => ({
      updateTableList,
      editorLoadTableList,
    }),
    []
  );
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
      <div
        className={mergeClassName(
          "bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]"
        )}
      >
        <TableComp
          className="_reset-table__btn"
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

export default forwardRef(TableProcess);
