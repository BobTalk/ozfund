import Icon from "@/Components/Icon";
import Image from "@/Components/Image";
import ModalScope from "@/Pages/ModalComp";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Button, ConfigProvider, Form, Input, InputNumber } from "antd";
import { forwardRef, useRef, useState } from "react";

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
      <div className="mt-[.15rem] bg-white h-full">
        <HeaderModule onConfig={configCb} />
      </div>
      {/* 提示信息 */}
      <ModalComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={modalTipOpen}
        onCancel={() => setModalTipOpen(!modalTipOpen)}
        onOk={(values) => setModalTipOpen(!modalTipOpen)}
      />
      {/* 信息收集 */}
      <ModalComp
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
      "w-[3.02rem] h-[1.4rem] bg-[var(--gray1)] rounded-[var(--border-radius)] pb-[.2rem] px-[.3rem]";
    if (idx % 2 == 0) {
      strClassName += " pt-[.3rem]";
    } else {
      strClassName += " pt-[.23rem] flex flex-col justify-between";
    }
    return strClassName;
  }
  return (
    <ul
      ref={ref}
      className="flex items-center gap-x-[.2rem] bg-white p-[.2rem] rounded-[var(--border-radius)]"
    >
      {moduleList.map((item, index) => (
        <li key={item.id} className={liStyleFn(index)}>
          <p className="text-[#333] text-[16px]">{item.title}</p>

          <div onClick={(e) => operationCb(e, item)} className={"pt-[.2rem]"}>
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
            className="flex flex-col items-center mt-[.2rem] mb-[.3rem]"
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
          className="flex flex-col items-center mt-[.2rem] mb-[.3rem]"
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
          className="mb-[.15rem] mx-[.3rem] mt-[.2rem]"
          label={
            <span className="text-[var(--border-color)]">输入增发地址</span>
          }
          name="address"
        >
          <Input size="large" placeholder="请输入地址" />
        </Form.Item>
        <Form.Item
          className="mb-[.2rem] mx-[.3rem]"
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
const ModalFooter = (props) => {
  return (
    <div className="flex justify-end py-[.28rem] pr-[.28rem] border-t border-t-[#e6e6e6]">
      {props.only ? (
        <>
          <Button type="primary" onClick={(e) => props?.onSubmit(e)}>
            确定
          </Button>
        </>
      ) : (
        <>
          <Button onClick={(e) => props?.onCancel(e)} className="mr-[.1rem]">
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </>
      )}
    </div>
  );
};
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
      showFooter={false}
      modalOpen={true}
      body={{
        paddingInline: "0",
        paddingBlock: "0",
      }}
      title={props.title}
    >
      <CompName onCancel={cancelCb} onOk={okCb} />
    </ModalScope>
  ) : null;
});
export default AddOzc;
