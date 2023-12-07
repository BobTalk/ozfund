import RangePicker from "@/Components/RangePicker";
import { Button, ConfigProvider, Form, Input } from "antd";
import { forwardRef, useEffect, useRef, useState } from "react";
import Table from "./table";

import { useStopPropagation } from "@/Hooks/StopPropagation";
import FormItem from "antd/es/form/FormItem";
import { timeJoin } from "@/utils/base";

const ChangeRecord = () => {
  let topModuleRefs = useRef<any>();
  let tableRefs = useRef<any>();
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  function filterCb({ search, time }) {
    tableRefs.current.updateTableList(
      {
        search:search||null,
        beginTime: timeJoin(time[0]),
        endTime: timeJoin(time[1], true),
      },
      {
        pageNo: 1,
        pageSize: 10,
      }
    );
  }
  useEffect(() => {
    let { height } = topModuleRefs.current.getBoundingClientRect();
    setFilterModuleHeight(height);
  }, []);
  return (
    <>
      <TopModule ref={topModuleRefs} onFilter={filterCb} />
      <Table
        ref={tableRefs}
        style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }}
      />
    </>
  );
};
const TopModule = forwardRef((props: any, ref: any) => {
  let [stop] = useStopPropagation();
  let [form] = Form.useForm<{
    search: undefined | string;
    time: Array<Date | string>;
  }>();

  function filterCb({ search, time }) {
    time ??= [];
    props?.onFilter?.({ search, time });
  }
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
        className="flex items-center bg-white justify-between p-[var(--gap20)] rounded-[var(--border-radius)]"
      >
        <Form
          onFinish={filterCb}
          form={form}
          colon={false}
          className="flex items-center gap-[var(--gap10)]"
        >
          <FormItem
            name="search"
            label={<p className="text-[#666]">备注搜索</p>}
          >
            <Input allowClear placeholder="备注搜索" />
          </FormItem>
          <FormItem name="time">
            <RangePicker name="time" form={form} />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </FormItem>
        </Form>
      </div>
    </ConfigProvider>
  );
});

export default ChangeRecord;
