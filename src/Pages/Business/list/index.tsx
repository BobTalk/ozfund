import RangePicker from "@/Components/RangePicker";
import { Button, ConfigProvider, Input, Select } from "antd";
import { forwardRef, useEffect, useRef, useState } from "react";
import Table from "./table";
import MoreBtn from "@/Components/MoreBtn";

const Work = () => {
  let topModuleRefs = useRef<any>();
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  useEffect(() => {
    let { height } = topModuleRefs.current.getBoundingClientRect();
    setFilterModuleHeight(height);
  }, []);
  return (
    <>
      <TopModule ref={topModuleRefs} />
      <TableModule
        style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }}
      />
    </>
  );
};
const TopModule = forwardRef((props: any, ref: any) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 35,
          borderRadius: 2,
        },
      }}
    >
      <div
        ref={ref}
        className="bg-white p-[var(--gap20)] rounded-[var(--border-radius)]"
      >
        <div className="flex items-center gap-[var(--gap10)]">
          <p className="text-[#666] whitespace-nowrap">类型</p>
          <Select className="w-[1.63rem]" placeholder='请选择' options={[]}/>
          <RangePicker />
          <Button type="primary">查询</Button>
        </div>
      </div>
    </ConfigProvider>
  );
});
function TableModule(props: any) {
  return (
    <div style={props.style}>
      <div
        style={{
          maxHeight: `calc(100% - .63rem)`,
        }}
        className="mt-[var(--gap15)] overflow-auto bg-white rounded-[var(--border-radius)]"
      >
        <Table />
      </div>
      <MoreBtn />
    </div>
  );
}
export default Work;
