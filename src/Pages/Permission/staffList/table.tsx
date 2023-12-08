import TableComp from "@/Components/Table";
import type { ColumnsType } from "@/Components/Table";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { FindListInterface } from "@/api";
import { EyeFilled } from "@ant-design/icons";
import { ConfigProvider, Typography, message } from "antd";
import { getTableShowLine, timeFormate } from "@/utils/base";
import { userAcountStateEnum } from "@/Enum";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import MoreBtn from "@/Components/MoreBtn";
import { uniqBy } from "lodash";
const Table = (props, ref) => {
  const columns: ColumnsType = [
    {
      title: "员工ID",
      dataIndex: "adminId",
    },
    {
      title: "备注",
      dataIndex: "note",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: (_) => timeFormate(_),
    },
    {
      title: "联系方式",
      dataIndex: "mobile",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "账户状态",
      dataIndex: "state",
      render: (_) => userAcountStateEnum[_],
    },
    {
      title: "最近登录时间",
      dataIndex: "loginTime",
      render: (_) => timeFormate(_),
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 200,
      align: "left",
      render: (_, record, index) => {
        return (
          <Typography.Link disabled={!props.childrenPermison}>
            <div
              onClick={(e) => lookCb(e, record)}
              className="flex btn items-center justify-center h-[.3rem] w-[.76rem] bg-[var(--blue1)] rounded-[4px] text-[var(--blue)]"
            >
              <EyeFilled className="mr-[8px]" />
              <span>查看</span>
            </div>
          </Typography.Link>
        );
      },
    },
  ];
  const [dataList, setDataList] = useState<any>([]);
  let [onceExc, setOnceExc] = useState(true);
  let [stop] = useStopPropagation();
  let [paginationInfo, setPaginationInfo] = useState<any>({
    pageSize: 10,
    pageNo: 1,
  });
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);
  function lookCb(e, crt) {
    stop(e, () => {
      props?.onLook(crt);
    });
  }
  async function getPermissionList(conditions = {}, isRestData = false) {
    if (!onceExc) return;
    let {
      status,
      data = [],
      message: tipInfo,
      rank,
      code,
      ...pgt
    } = await FindListInterface({
      pageNo: paginationInfo.pageNo,
      pageSize: paginationInfo.pageSize,
      conditions,
    });
    if (status) {
      setOnceExc(false);
      setPaginationInfo(pgt);
      setDataList((oldArr: Array<any>) => {
        let res = data.map((item) => ((item.key = item.adminId), item));
        return isRestData ? res : uniqBy(oldArr.concat(res), "adminId");
      });
    } else {
      message.error(tipInfo);
    }
  }
  function moreCb() {
    setOnceExc(true);
    setPaginationInfo((paginationInfo) => ({
      ...paginationInfo,
      pageNo: ++paginationInfo.pageNo,
    }));
  }
  function updateList(conditions, isRestData) {
    setOnceExc(true);
    getPermissionList(conditions, isRestData);
  }
  const isShowMoreBtn = () => paginationInfo.pageNo < paginationInfo.pageTotal;
  useLayoutEffect(() => {
    let { pageNo, pageTotal } = paginationInfo;
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let btnH = pageNo < pageTotal ? 63 : 0;
      setTableContentLine(getTableShowLine(contentRefs.current, btnH));
    }, 500);
  }, []);
  useLayoutEffect(() => {
    getPermissionList();
  }, [JSON.stringify(paginationInfo)]);
  useImperativeHandle(
    ref,
    () => ({
      updateList,
    }),
    []
  );
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
          className="bg-white rounded-[var(--border-radius)]"
        >
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

export default forwardRef(Table);
