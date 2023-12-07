import { ConfigProvider, Select } from "antd";
import TableEmail from "./table";
import { useEffect, useRef, useState } from "react";
import { formatEnum } from "@/utils/base";
import { language1Enum } from "@/Enum";
const List = () => {
  let topModuleRefs = useRef<any>();
  let tableRefs = useRef<any>();
  let filterVal = useRef<number>();
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  function reloadTableList(filterParams, paginationParams, isMergeData) {
    tableRefs.current.getTableList(filterParams, paginationParams, isMergeData);
  }
  function loadMoreCb(pgt) {
    reloadTableList(
      {
        language: filterVal.current,
      },
      pgt,
      true
    );
  }
  function filterCb(val) {
    filterVal.current = val;
    reloadTableList(
      {
        language: val,
      },
      {
        pageNo: 1,
        pageSize: 10,
      },
      false
    );
  }
  useEffect(() => {
    let { height } = topModuleRefs.current.getBoundingClientRect();
    setFilterModuleHeight(height);
  }, []);
  return (
    <>
      <div ref={topModuleRefs} className="flex items-center bg-white p-[var(--gap20)] rounded-[var(--border-radius)]">
        <span className="text-[14px] text-[#666] mr-[var(--gap10)]">分类</span>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 2,
            },
          }}
        >
          <Select
            placeholder="请选择"
            onChange={filterCb}
            className="w-[1.63rem] h-[.36rem]"
            allowClear
            options={formatEnum(language1Enum)}
          />
        </ConfigProvider>
      </div>

      <TableEmail style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }} ref={tableRefs} onMore={loadMoreCb} />
    </>
  );
};
export default List;
