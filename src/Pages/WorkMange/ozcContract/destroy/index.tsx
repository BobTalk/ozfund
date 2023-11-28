import MoreBtn from "@/Components/MoreBtn";
import Table from "./table";
import Modal from "@/Pages/ModalComp";
import { useRef, useState } from "react";
import { Button, ConfigProvider, Form } from "antd";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import TextArea from "antd/es/input/TextArea";
import { mergeClassName } from "@/utils/base";
import ModalScopeComp from "@/Pages/ModalScope";
import ModalFooter from "@/Components/ModalFooterBtn";
const Destory = () => {
  let [modalOpen, setModalOpen] = useState(false);
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>("销毁地址");
  function submitFrezzCb(values: any) {
    console.log("submitDestroyCb: ", values);
  }
  function deleteCb(crt) {
    console.log("crt: ", crt);
    moduleContent.current = DestoryModal;
    setModalOpen(!modalOpen);
  }
  return (
    <div className="h-full">
      <ListModule onDelete={deleteCb} />
      <ModalScopeComp
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
const ListModule = (props) => {
  function deleteCb(crt) {
    props?.onDelete?.(crt);
  }
  function moreCb() {}
  return (
    <>
      <div className="bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pt-[var(--gap10)] pb-[var(--gap14)]">
        <Table onDelete={deleteCb} />
      </div>
      <MoreBtn onMore={moreCb} />
    </>
  );
};
const DestoryModal = (props) => {
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
          <span className="text-[var(--border-color)]">确认销毁地址</span>
          <span className="text-[#333]">ahdsuaiiha3298akhdakchbdbca</span>
        </p>
        <p className="flex justify-between items-center mt-[var(--gap15)]">
          <span className="text-[var(--border-color)]">销毁数量</span>
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

          <Form.Item>
            {/* <Button onClick={cancelCb} className="mr-[var(--gap10)]">
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button> */}
            <ModalFooter onCancel={cancelCb}/>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};
const LabelComp = ({ title, className = "" }) => {
  return (
    <span className={mergeClassName("text-[14px] text-[#666]", className)}>
      {title}
    </span>
  );
};
export default Destory;
