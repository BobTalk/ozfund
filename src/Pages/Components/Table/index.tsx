import MoreBtn from "@/Components/MoreBtn";
import TableComp from "@/Components/Table";
import { getTableShowLine } from "@/utils/base";
import { ConfigProvider } from "antd";
import { number } from "echarts";
import { useLayoutEffect, useRef, useState } from "react";

const PageTableScope = ({
  pagitions={pageNo:number,pageTotal:number},
  style={},
  isShowMoreBtn=false,
  dataList=[],
  columns=[],
  className="",
  moreLoad = () => {},
}) => {
  let { pageNo, pageTotal } = pagitions || {};
  let timer = useRef(null);
  let contentRefs = useRef<any>();
  let [tableContentLine, setTableContentLine] = useState<number>(10);
  useLayoutEffect(() => {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let btnH = pageNo < pageTotal ? 63 : 0;
      let line = getTableShowLine(contentRefs.current, btnH);
      setTableContentLine(line);
    }, 500);
  }, [JSON.stringify(dataList)]);
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          controlHeight: 36,
        },
      }}
    >
      <div ref={contentRefs} style={style} className="mt-[var(--gap15)]">
        <div
          style={{
            maxHeight: isShowMoreBtn ? `calc(100% - .63rem)` : "100%",
          }}
          className="overflow-hidden bg-white rounded-[0_0_var(--border-radius)_var(--border-radius)]"
        >
          <TableComp
            className={className}
            dataSource={dataList}
            line={tableContentLine}
            columns={columns}
          />
        </div>
        {isShowMoreBtn ? <MoreBtn onMore={moreLoad} /> : null}
      </div>
    </ConfigProvider>
  );
};
export default PageTableScope;
