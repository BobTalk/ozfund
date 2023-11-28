import RangePicker from "@/Components/RangePicker";
import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { forwardRef, useEffect, useRef, useState } from "react";
import Table from "./table";
import MoreBtn from "@/Components/MoreBtn";
import TextArea from "antd/es/input/TextArea";
import ModalScope from "@/Pages/ModalComp";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalFooter from "@/Components/ModalFooterBtn";

const List = () => {
  let topModuleRefs = useRef<any>();
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<string>("新增IP地址");
  let [modalOpen, setModalOpen] = useState(false);
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  function addIpAddressCb() {
    moduleContent.current = AddIpAddress;
    setModalOpen(!modalOpen);
  }
  // 新增IP地址 提交
  function submitAddCb(values) {
    console.log("values: ", values);
  }
  useEffect(() => {
    let { height } = topModuleRefs.current.getBoundingClientRect();
    setFilterModuleHeight(height);
  }, []);
  return (
    <>
      <TopModule ref={topModuleRefs} onAddIpAddress={addIpAddressCb} />
      <TableModule
        style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }}
      />
      <ModalComp
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
  function addIpAddressCb(e) {
    stop(e, () => {
      props?.onAddIpAddress?.();
    });
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
        <div className="flex items-center gap-[var(--gap10)]">
          <p className="text-[#666]">配置搜索</p>
          <Select
            placeholder="请选择"
            className="mr-[var(--gap10)] w-[1.63rem]"
            options={[]}
          />
          <RangePicker />
          <Button type="primary">查询</Button>
        </div>
        <Button type="primary" onClick={addIpAddressCb} icon={<PlusOutlined />}>
          新增IP地址
        </Button>
      </div>
    </ConfigProvider>
  );
});
function TableModule(props: any) {
  function deleteCb(crt, index) {
    console.log("删除项数据: ", crt);
    console.log("删除项位置: ", index);
  }
  return (
    <div style={props.style}>
      <div
        style={{
          maxHeight: `calc(100% - .63rem)`,
        }}
        className="mt-[var(--gap15)] overflow-auto bg-white rounded-[var(--border-radius)]"
      >
        <Table onDelete={deleteCb} />
      </div>
      <MoreBtn />
    </div>
  );
}
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
        className="mt-[var(--gap20)]"
      >
        <Form.Item
          name="address"
          className="mb-[var(--gap15)] px-[var(--gap30)]"
          label={<span className="text-[var(--border-color)]">IP地址</span>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="note"
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
const ModalComp = forwardRef((props: any, ref: any) => {
  function cancelCb(value) {
    props?.onCancel?.(value);
  }
  function okCb(values) {
    props?.onOk?.(values);
  }
  let CompName = props.content;
  return props.modalOpen ? (
    <ModalScope
      onCancel={cancelCb}
      onOk={okCb}
      showFooter={props.showFooter ?? false}
      modalOpen={true}
      body={{
        paddingInline: 0,
        paddingBlock: 0,
      }}
      footer={{
        paddingInline: props.showFooter ? 20 : 0,
        paddingBlock: props.showFooter ? 20 : 0,
      }}
      title={props.title}
    >
      <CompName onCancel={cancelCb} onOk={okCb} />
    </ModalScope>
  ) : null;
});

export default List;
