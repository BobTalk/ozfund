import RangePicker from "@/Components/RangePicker";
import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select, message } from "antd";
import { forwardRef, useEffect, useRef, useState } from "react";
import Table from "./table";
import TextArea from "antd/es/input/TextArea";

import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalFooter from "@/Components/ModalFooterBtn";
import ModalScopeComp from "@/Pages/ModalScope";
import { AddIpInterface, DeleteIpInterface } from "@/api";
import FormItem from "antd/es/form/FormItem";
import { timeJoin } from "@/utils/base";

const List = () => {
  let topModuleRefs = useRef<any>();
  let moduleContent = useRef<any>();
  let tableRefs = useRef<any>();
  let moduleTitle = useRef<string>("新增IP地址");
  let [modalOpen, setModalOpen] = useState(false);
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  function addIpAddressCb() {
    moduleContent.current = AddIpAddress;
    setModalOpen(!modalOpen);
  }
  // 新增IP地址 提交
  async function submitAddCb({ address, note }) {
    let { message: tipInfo, status } = await AddIpInterface({
      ip: address,
      note,
    });
    message[status ? "success" : "error"](tipInfo);
    status && setModalOpen(!modalOpen);
    status &&
      tableRefs.current.updateTableList(
        {},
        {
          pageNo: 1,
          pageSize: 10,
        }
      );
  }
  async function deleteCb(crt, index) {
    let { status, message: tipInfo } = await DeleteIpInterface({ id: crt.id });
    message[status ? "success" : "error"](tipInfo);
  }
  function filterCb({ search, time }) {
    console.log('time: ', time);
    tableRefs.current.updateTableList(
      {
        search,
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
      <TopModule
        ref={topModuleRefs}
        onFilter={filterCb}
        onAddIpAddress={addIpAddressCb}
      />
      <Table
        ref={tableRefs}
        onDelete={deleteCb}
        style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }}
      />
      <ModalScopeComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={modalOpen}
        showFooter={false}
        onCancel={() => setModalOpen(!modalOpen)}
        onOk={submitAddCb}
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
  function addIpAddressCb(e) {
    stop(e, () => {
      props?.onAddIpAddress?.();
    });
  }
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
        <Button type="primary" onClick={addIpAddressCb} icon={<PlusOutlined />}>
          新增IP地址
        </Button>
      </div>
    </ConfigProvider>
  );
});
function AddIpAddress(props) {
  let [formInitVal] = useState({
    address: "",
    note: "",
  });
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 0,
          },
        },
        token: {
          controlHeight: 42,
          borderRadius: 2,
        },
      }}
    >
      <Form
        layout="vertical"
        initialValues={formInitVal}
        onFinish={props?.onOk}
        className="mt-[var(--gap20)] clear_required"
      >
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)] px-[var(--gap30)]"
          label={<span className="text-[var(--border-color)]">IP地址</span>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="note"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap30)] px-[var(--gap30)]"
          label={<span className="text-[var(--border-color)]">备注</span>}
        >
          <TextArea autoSize={{ minRows: 4 }} />
        </Form.Item>
        <Form.Item>
          <ModalFooter onCancel={props?.onCancel} />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}

export default List;
