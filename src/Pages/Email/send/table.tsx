import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { ConfigProvider, Popconfirm, Typography, message } from "antd";
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
import MoreBtn from "@/Components/MoreBtn";
import { DeleteEmailTaskInterface, GetEmailTimeTaskInterface } from "@/api";
import { cloneDeep } from "lodash";
import { getTableShowLine, timeFormate } from "@/utils/base";
import { language1Enum } from "@/Enum";
const TableProcess = (props, ref) => {
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
                onClick={(e) => editorCb(e, record, index)}
                className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[var(--green1)] rounded-[4px] text-[var(--green2)]"
              >
                <EditOutlined className="mr-[8px]" />
                <span>编辑</span>
              </div>
            </Typography.Link>
            <Typography.Link disabled={editable}>
              <Popconfirm
                title="确实移除此项数据?"
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
  // let [once, setOnce] = useState(true);
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
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);
  function deleteCb(e, crt, index) {
    stop(e, async () => {
      let { status, message: tipInfo } = await DeleteEmailTaskInterface({
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
      await GetEmailTimeTaskInterface(pgt, 0);
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
  useImperativeHandle(
    ref,
    () => ({
      getTableList,
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
    getTableList(pagination.current);
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
        <div className="bg-white rounded-[var(--border-radius)]">
          <TableComp
            className="_reset-table__btn"
            dataSource={dataList}
            line={tableContentLine}
            columns={columns}
          />
        </div>
        {isShowMoreBtn() ? <MoreBtn onMore={moreCb} /> : null}
      </div>
    </ConfigProvider>
  );
};

export default forwardRef(TableProcess);
