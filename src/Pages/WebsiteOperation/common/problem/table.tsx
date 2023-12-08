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
import { EditOutlined, EyeFilled } from "@ant-design/icons";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
import {
  DeleteProbelmInterface,
  GetProbelmInterface,
  SwitchProbelmInterface,
} from "@/api";
import { languageEnum } from "@/Enum";
import MoreBtn from "@/Components/MoreBtn";
import { cloneDeep } from "lodash";
import { getTableShowLine } from "@/utils/base";
const TableProcess = (props, ref) => {
  const columns: ColumnsType = [
    {
      title: "序号",
      dataIndex: "frezzTime",
      render: (_, record, index) => index + 1,
    },
    {
      title: "问题",
      dataIndex: "subject",
    },
    {
      title: "内容",
      dataIndex: "content",
    },
    {
      title: "员工ID",
      dataIndex: "adminId",
      render: (_) => _ || "--",
    },
    {
      title: "置顶",
      dataIndex: "top",
      render: (_, record, index) => {
        return (
          <Switch
            defaultChecked={_}
            onChange={() => changeTopCb(record, index)}
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 280,
      align: "left",
      render: (_, record, index) => {
        const editable = isEditing(record);
        return (
          <div className="flex gap-[var(--gap10)]">
            {/* {props.isDetail ? (
              <Typography.Link disabled={editable}>
                <div
                  onClick={(e) => toDetailCb(e, record, index)}
                  className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[var(--blue1)] rounded-[4px] text-[var(--blue)]"
                >
                  <EyeFilled className="mr-[8px]" />
                  <span>查看</span>
                </div>
              </Typography.Link>
            ) : null} */}
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
                  <span>删除</span>
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
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);
  let [stop] = useStopPropagation();
  let [editingKey, setEditingKey] = useState("");
  let isEditing = (record) => record.key === editingKey;
  function deleteCb(e, crt, index) {
    stop(e, async () => {
      let { status, message: tipInfo } = await DeleteProbelmInterface({
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
  function editorCb(e, crt) {
    stop(e, () => {
      props?.onEditor?.(crt);
    });
  }
  async function changeTopCb(value, index) {
    let { status, message: tipInfo } = await SwitchProbelmInterface({
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

  // 获取列表数据
  async function getTableList(gpt = pagination.current, isMergeData = false) {
    let { status, data, pageSize, pageNo, pageTotal } =
      await GetProbelmInterface({
        ...gpt,
        conditions: {
          language: languageEnum[props["language"]],
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
  function loadMoreCb() {
    pagination.current.pageNo += 1;
    getTableList(pagination.current, true);
  }
  function editorLoadTableList() {
    let { pageNo, pageSize } = pagination.current;
    getTableList(
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
      getTableList,
      editorLoadTableList,
    }),
    []
  );
  useLayoutEffect(() => {
    let { pageNo, pageTotal } = pagination.current;
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let btnH = pageNo < pageTotal ? 63 : 0;
      setTableContentLine(getTableShowLine(contentRefs.current, btnH));
    }, 500);
  }, [dataList]);
  useLayoutEffect(() => {
    getTableList(pagination.current, true);
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
        {pagination.current.pageNo < pagination.current.pageTotal ? (
          <MoreBtn onMore={loadMoreCb} />
        ) : null}
      </div>
    </ConfigProvider>
  );
};

export default forwardRef(TableProcess);
