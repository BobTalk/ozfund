import Icon from "@/Components/Icon";
import Image from "@/Components/Image";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Button, ConfigProvider, Form, Input, InputNumber } from "antd";
import { forwardRef, useRef, useState } from "react";
import ModalFooter from "@/Components/ModalFooterBtn";
import ModalScopeComp from "@/Pages/ModalScope";

const AddOzc = () => {
  let [stop] = useStopPropagation();
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>();
  let [modalOpen, setModalOpen] = useState(false);
  let [modalTipOpen, setModalTipOpen] = useState(false);
  function configCb(e, crt) {
    stop(e, () => {
      moduleContent.current = crt.flag;
      moduleTitle.current = crt.title;
      setModalOpen(!modalOpen);
    });
  }
  function submitCb(values) {
    moduleContent.current = AddPublish;
    moduleTitle.current = "增发OZC";
    setModalOpen(!modalOpen);
    setModalTipOpen(!modalTipOpen);
  }
  return (
    <>
      <HeaderModule onConfig={configCb} />
      {/* 提示信息 */}
      <ModalScopeComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={modalTipOpen}
        onCancel={() => setModalTipOpen(!modalTipOpen)}
        onOk={(values) => setModalTipOpen(!modalTipOpen)}
      />
      {/* 信息收集 */}
      <ModalScopeComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={modalOpen}
        onCancel={() => setModalOpen(!modalOpen)}
        onOk={(values) => submitCb(values)}
      />
    </>
  );
};
const HeaderModule = forwardRef((props: any, ref: any) => {
  function operationCb(e, crt) {
    props?.onConfig?.(e, crt);
  }
  let [moduleList] = useState([
    {
      id: 1,
      title: "增发OZC",
      flag: AddOzcInfo,
      operateNode: (
        <Button icon={<Icon name="h-icon-add" />} type="primary">
          增发
        </Button>
      ),
    },
  ]);
  function liStyleFn(idx) {
    let strClassName =
      "w-[3.02rem] h-[1.4rem] bg-[var(--gray1)] rounded-[var(--border-radius)] pb-[var(--gap20)] px-[var(--gap30)]";
    if (idx % 2 == 0) {
      strClassName += " pt-[var(--gap30)]";
    } else {
      strClassName += " pt-[.23rem] flex flex-col justify-between";
    }
    return strClassName;
  }
  return (
    <ul
      ref={ref}
      className="flex h-full gap-x-[var(--gap20)] bg-white p-[var(--gap20)] rounded-[var(--border-radius)]"
    >
      {moduleList.map((item, index) => (
        <li key={item.id} className={liStyleFn(index)}>
          <p className="text-[#333] text-[16px]">{item.title}</p>

          <div onClick={(e) => operationCb(e, item)} className={"pt-[var(--gap20)]"}>
            {item.operateNode}
          </div>
        </li>
      ))}
    </ul>
  );
});
// 增发OZC
const AddPublish = (props) => {
  let [stop] = useStopPropagation();
  function submitCb(e) {
    stop(e, () => {
      props?.onOk();
    });
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
      }}
    >
      {false ? (
        <>
          <Image
            className="flex flex-col items-center mt-[var(--gap20)] mb-[var(--gap30)]"
            src="h-icon-error"
            imgStyle={{
              fontSize: ".5rem",
              color: "var(--red)",
              marginBottom: ".1rem",
            }}
            bottom={
              <span className="text-[#333]">地址无效，请验证后重新发起</span>
            }
          />
        </>
      ) : (
        <Image
          src="h-icon-right"
          className="flex flex-col items-center mt-[var(--gap20)] mb-[var(--gap30)]"
          imgStyle={{
            fontSize: ".5rem",
            color: "var(--green)",
            marginBottom: ".1rem",
          }}
          bottom={<span className="text-[#333]">成功发起</span>}
        />
      )}
      <ModalFooter only onSubmit={submitCb} />
    </ConfigProvider>
  );
};
// 添加OZC
const AddOzcInfo = (props) => {
  let [stop] = useStopPropagation();
  let [form] = Form.useForm();
  let [formInitVal] = useState({
    publishNum: "",
    address: "",
  });
  function submitCb(values) {
    console.log("values: ", values);
    props?.onOk(values);
  }
  function cancelCb(e) {
    stop(e, () => {
      props?.onCancel?.(false);
    });
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
      }}
    >
      <Form
        layout="vertical"
        onFinish={submitCb}
        initialValues={formInitVal}
        form={form}
      >
        <Form.Item
          className="mb-[var(--gap15)] mx-[var(--gap30)] mt-[var(--gap20)]"
          label={
            <span className="text-[var(--border-color)]">输入增发地址</span>
          }
          name="address"
        >
          <Input size="large" placeholder="请输入地址" />
        </Form.Item>
        <Form.Item
          className="mb-[var(--gap20)] mx-[var(--gap30)]"
          label={
            <span className="text-[var(--border-color)]">输入增发数量</span>
          }
          name="publishNum"
        >
          <InputNumber
            size="large"
            className="w-full"
            placeholder="请输入数量"
          />
        </Form.Item>
        <Form.Item className="mb-0">
          <ModalFooter onCancel={(e) => cancelCb(e)} />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default AddOzc;
