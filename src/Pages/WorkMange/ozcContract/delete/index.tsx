import { ModalTitle } from "@/Components/Modal";
import Modal from "@/Pages/ModalComp";
import { Button, ConfigProvider, Form, InputNumber, Select } from "antd";
import Table from "./table";
import MoreBtn from "@/Components/MoreBtn";
import {
  useRef,
  useState,
} from "react";
import TextArea from "antd/es/input/TextArea";
import { mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";

const Delete = () => {
  let [modalOpen, setModalOpen] = useState(false);
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>("冻结地址");
  function submitFrezzCb(values: any) {
    console.log("submitFrezzCb: ", values);
  }
  function finishCb(values) {
    moduleContent.current = FrezzModal;
    setModalOpen(!modalOpen);
  }
  return (
    <div className="h-full">
      <TopModule onFinish={finishCb} />
      <ListModule />
      <ModalComp
        content={moduleContent.current}
        title={moduleTitle.current}
        footer={false}
        modalOpen={modalOpen}
        onCancel={() => setModalOpen(!modalOpen)}
        onOk={(values) => submitFrezzCb(values)}
      />
    </div>
  );
};

const TopModule = (props) => {
  let [form] = Form.useForm();
  let [formInitVal] = useState({
    address: "",
    num: 0,
  });
  function finishCb(values) {
    props?.onFinish?.(values);
  }
  return (
    <div className="bg-white rounded-[var(--border-radius)]">
      <TitleComp title="新增OZC允许代币兑换" />
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 20,
            },
            Button: {
              borderRadius: 2,
              paddingInline: 18,
            },
          },
          token: {
            borderRadius: 0,
            controlHeight: 36,
          },
        }}
      >
        <Form
          form={form}
          initialValues={formInitVal}
          layout="vertical"
          onFinish={finishCb}
          className="grid grid-cols-2 gap-x-[var(--gap20)] pt-[var(--gap20)] ml-[var(--gap30)] mr-[var(--gap20)]"
        >
          <Form.Item name="address" label={<LabelComp title="Token名称" />}>
            <Select className="w-full" placeholder="选择Token名称" options={[]} />
          </Form.Item>
          <Form.Item name="num" label={<LabelComp title="加密货币种类" />}>
            <InputNumber className="w-full" placeholder="输入加密货币种类" />
          </Form.Item>
          <Form.Item />
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit">
              新增
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};
const FrezzModal = (props) => {
  let [form] = Form.useForm();
  let [stop] = useStopPropagation();
  let [formInitVal] = useState({
    note: "",
  });
  function finishCb(values) {
    props?.onOk?.(values);
  }
  function cancelCb(e) {
    stop(e, () => {
      props.onCancel();
    });
  }
  return (
    <div className="bg-white rounded-[var(--border-radius)]">
      <div className="py-[var(--gap30)] mx-[var(--gap30)] border-b border-b-[#e6e6e6]">
        <p className="flex justify-between items-center text-[14px]">
          <span className="text-[var(--border-color)]">地址</span>
          <span className="text-[#333]">ahdsuaiiha3298akhdakchbdbca</span>
        </p>
        <p className="flex justify-between items-center mt-[var(--gap15)]">
          <span className="text-[var(--border-color)]">数量</span>
          <span className="text-[#333]">1000</span>
        </p>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 20,
            },
            Button: {
              borderRadius: 2,
              paddingInline: 18,
            },
          },
          token: {
            borderRadius: 0,
            controlHeight: 36,
          },
        }}
      >
        <Form
          form={form}
          initialValues={formInitVal}
          layout="vertical"
          onFinish={finishCb}
          className="pt-[var(--gap20)] "
        >
          <Form.Item
            className="ml-[var(--gap30)] mr-[var(--gap30)]"
            name="note"
            label={
              <LabelComp title="备注" className="text-[var(--border-color)]" />
            }
          >
            <TextArea />
          </Form.Item>

          <Form.Item className="flex justify-end mt-0 border-t border-t-[var(--border-color)] py-[var(--gap20)] mr-[var(--gap30)]">
            <Button onClick={cancelCb} className="mr-[var(--gap10)]">
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

const ListModule = () => {
  return (
    <>
      <div className="bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pt-[var(--gap10)] pb-[var(--gap14)]">
        <Table />
      </div>
      <MoreBtn />
    </>
  );
};
const LabelComp = ({ title, className = "" }) => {
  return (
    <span className={mergeClassName("text-[14px] text-[#666]", className)}>
      {title}
    </span>
  );
};
const TitleComp = ({ title }) => {
  return (
    <ModalTitle
      showTitleIcon
      title={title}
      classTitleName="py-[var(--gap20)] ml-[var(--gap30)]  border-b border-b-[#e6e6e6] text-[16px] text-[#333]"
      classIconName="w-[.03rem] h-[.13rem]"
    />
  );
};
const ModalComp = (props: any) => {
  function cancelCb(value) {
    props?.onCancel?.(value);
  }
  function okCb(values) {
    props?.onOk?.(values);
  }
  let CompName = props.content;
  return props.modalOpen ? (
    <Modal
      onCancel={cancelCb}
      showFooter={false}
      modalOpen={true}
      body={{
        paddingInline: "0",
        paddingBlock: "0",
      }}
      title={props.title}
    >
      <CompName onCancel={cancelCb} onOk={okCb} />
    </Modal>
  ) : null;
};
export default Delete;
