import { ModalTitle } from "@/Components/Modal";
import ModalScope from "@/Pages/ModalComp";
import {
  EditFilled,
  EditOutlined,
  SaveOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, InputNumber, Switch } from "antd";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import styleScope from "./index.module.less";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
const TodoContract = () => {
  let [stop] = useStopPropagation();
  let headerRefs = useRef<any>();
  let [headerHeight, setHeaderHeight] = useState<number>();
  let [modalOpen, setModalOpen] = useState(false);
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>();
  function configCb(e, crt) {
    stop(e, () => {
      moduleContent.current = crt.flag;
      moduleTitle.current = crt.title;
      setModalOpen(!modalOpen);
    });
  }
  function saveCb(e) {
    stop(e, () => {
      moduleContent.current = TipMessage;
      moduleTitle.current = "提示信息";
      setModalOpen(!modalOpen);
    });
  }
  useEffect(() => {
    let { height } = headerRefs?.current?.getBoundingClientRect?.() ?? 0;
    setHeaderHeight(height);
  }, []);
  return (
    <>
      <HeaderModule ref={headerRefs} onConfig={configCb} />
      <Contentmodule headerH={headerHeight} onSave={saveCb} />
      <ModalComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={modalOpen}
        onCancel={() => setModalOpen(!modalOpen)}
        onOk={(values) => setModalOpen(!modalOpen)}
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
      flag: "switch",
      title: "开启/关闭TOTO出售",
      operateNode: <Switch defaultChecked />,
    },
    {
      id: 2,
      flag: PublishTotal,
      title: "设置TOTO发行总量",
      label: "当前发行总量",
      value: 10000,
      operateNode: (
        <Button icon={<SettingOutlined />} type="primary">
          设置
        </Button>
      ),
    },
    {
      id: 3,
      flag: AddToto,
      title: "增发TOTO",
      operateNode: (
        <Button icon={<Icon name="h-icon-add" />} type="primary">
          增发
        </Button>
      ),
    },
    {
      id: 4,
      flag: DispatchAddress,
      title: "更改TOTO调度地址",
      label: "当前调度地址",
      value: "dkjahiuhf35hahd8",
      operateNode: (
        <Button icon={<EditOutlined />} type="primary">
          修改
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
          {item.label ? (
            <p className="text-[#666] text-[14px] mt-[.12rem]">
              <span>{item.label}：</span>
              <span>{item.value}</span>
            </p>
          ) : null}
          <div
            onClick={(e) => operationCb(e, item)}
            className={item.label ? "pt-[.1rem]" : "pt-[.2rem]"}
          >
            {item.operateNode}
          </div>
        </li>
      ))}
    </ul>
  );
});
const Contentmodule = (props) => {
  let BtnName = useRef<string>("编辑");
  let [listInfo] = useState([
    {
      id: "1",
      title: "长期支持者占比",
    },
    {
      id: "2",
      title: "OZ基金会占比",
    },
    {
      id: "3",
      title: "OZ团队成员占比",
    },
    {
      id: "4",
      title: "流动性占比",
    },
    {
      id: "5",
      title: "用户OZC投注主矿池挖矿",
    },
    {
      id: "6",
      title: "VIP用户OZC投注VIP矿池挖矿",
    },
  ]);
  let [listValues] = useState({
    percentage0: 15,
    percentage1: 30,
    percentage2: 20,
    percentage3: 5,
    percentage4: 20,
    percentage5: 10,
  });
  let [editorPercentage, setEditorPercentage] = useState(false);
  function editorCb(e) {
    setEditorPercentage(!editorPercentage);

    if (BtnName.current == "保存") {
      props?.onSave?.(e);
    }
    BtnName.current = BtnName.current == "编辑" ? "保存" : "编辑";
  }
  function formFieldChangeCb(changedValues, allValues) {
    console.log("allValues: ", allValues);
    console.log("changedValues: ", changedValues);
  }
  return (
    <div
      style={{
        height: `calc(100% - ${props.headerH}px - var(--mt15))`,
      }}
      className="bg-white mt-[var(--mt15)] rounded-[var(--border-radius)] overflow-y-auto"
    >
      <TitleComp
        title={
          <div className="flex flex-1 items-center justify-between pr-[.2rem]">
            <span>提取合约中代币</span>
            <Button
              onClick={editorCb}
              className="bg-[#e6f2fd] text-[var(--blue)] hover:text-[#FFF]"
              type="primary"
              icon={
                BtnName.current == "编辑" ? <EditFilled /> : <SaveOutlined />
              }
            >
              {BtnName.current}
            </Button>
          </div>
        }
      />
      <Form
        initialValues={listValues}
        onValuesChange={formFieldChangeCb}
        labelAlign="left"
        className={styleScope["_reset-form"]}
      >
        {listInfo.map((item, index) => (
          <Form.Item
            name={`percentage` + index}
            label={
              <span className="text-[#333] w-[1.9rem]">{item.title}：</span>
            }
            key={item.id}
            className="text-[14px] mb-[.14rem]"
          >
            {!editorPercentage ? (
              <span className="text-[#666]">
                {listValues["percentage" + index] ?? "--"}%
              </span>
            ) : (
              <InputNumber
                max={100}
                min={0}
                addonAfter="%"
                className="w-[1rem]"
                defaultValue={listValues["percentage" + index]}
              />
            )}
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};
const TitleComp = ({ title }) => {
  return (
    <>
      <ModalTitle
        showTitleIcon
        title={title}
        classTitleName="py-[.25rem] ml-[.3rem]  border-b border-b-[#e6e6e6] text-[16px] text-[#333]"
        classIconName="w-[.03rem] h-[.13rem]"
      />
    </>
  );
};
// TOTO发行总量
const PublishTotal = (props) => {
  let [stop] = useStopPropagation();
  let [form] = Form.useForm();
  let [formInitVal] = useState({
    publishNum: "",
  });
  function submitCb(values) {
    props?.onOk(values);
  }
  function cancelCb(e) {
    stop(e, () => {
      props?.onCancel?.(false);
    });
  }
  return (
    <>
      <p className="flex justify-between mx-[.3rem] text-[14px] py-[.2rem] border-b border-b-[#e6e6e6]">
        <span className="text-[var(--border-color)]">当前发行总量</span>
        <span className="text-[#333]">100000</span>
      </p>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 2,
          },
        }}
      >
        <Form
          layout="vertical"
          className="mt-[.2rem]"
          onFinish={submitCb}
          initialValues={formInitVal}
          form={form}
        >
          <Form.Item
            className="mb-[.2rem] mx-[.3rem]"
            label={<span className="text-[var(--border-color)]">输入数量</span>}
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
    </>
  );
};
// 添加TOTO
const AddToto = (props) => {
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
          className="mb-[var(--mt15)] mx-[.3rem] mt-[.2rem]"
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
// 生产分配比例
// const AllocationProportion = forwardRef((props, ref) => {
//   let [form] = Form.useForm();
//   let [formInitVal] = useState({
//     supporterRatio: 0, // 支持者比例
//     foundationRatio: 0, // 基金会
//     membersRatio: 0, //  成员占比
//     mobilityRatio: 0, // 流动性
//     mainStopeRatio: 0, // 用户OZC投注主矿池挖矿
//     vipStopeRatio: 0, // VIP用户OZC投注VIP矿池挖矿
//   });
//   useImperativeHandle(
//     ref,
//     () => ({
//       form,
//     }),
//     [form]
//   );
//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           borderRadius: 2,
//         },
//       }}
//     >
//       <Form layout="vertical" initialValues={formInitVal} form={form}>
//         <Form.Item
//           className="mb-[var(--mt15)]"
//           label={
//             <span className="text-[var(--border-color)]">长期支持者占比</span>
//           }
//           name="supporterRatio"
//         >
//           <InputNumber
//             className="w-full"
//             size="large"
//             placeholder="请输入地址"
//           />
//         </Form.Item>
//         <Form.Item
//           className="mb-[var(--mt15)]"
//           label={
//             <span className="text-[var(--border-color)]">OZ基金会占比</span>
//           }
//           name="foundationRatio"
//         >
//           <InputNumber
//             size="large"
//             className="w-full"
//             placeholder="请输入数量"
//           />
//         </Form.Item>
//         <Form.Item
//           className="mb-[var(--mt15)]"
//           label={
//             <span className="text-[var(--border-color)]">OZ团队成员占比</span>
//           }
//           name="membersRatio"
//         >
//           <InputNumber
//             size="large"
//             className="w-full"
//             placeholder="请输入数量"
//           />
//         </Form.Item>
//         <Form.Item
//           className="mb-[var(--mt15)]"
//           label={<span className="text-[var(--border-color)]">流动性占比</span>}
//           name="mobilityRatio"
//         >
//           <InputNumber
//             size="large"
//             className="w-full"
//             placeholder="请输入数量"
//           />
//         </Form.Item>
//         <Form.Item
//           className="mb-[var(--mt15)]"
//           label={
//             <span className="text-[var(--border-color)]">
//               用户OZC投注主矿池挖矿
//             </span>
//           }
//           name="mainStopeRatio"
//         >
//           <InputNumber
//             size="large"
//             className="w-full"
//             placeholder="请输入数量"
//           />
//         </Form.Item>
//         <Form.Item
//           className="mb-0"
//           label={
//             <span className="text-[var(--border-color)]">
//               VIP用户OZC投注VIP矿池挖矿
//             </span>
//           }
//           name="vipStopeRatio"
//         >
//           <InputNumber
//             size="large"
//             className="w-full"
//             placeholder="请输入数量"
//           />
//         </Form.Item>
//       </Form>
//     </ConfigProvider>
//   );
// });
// TOTO调度地址
const DispatchAddress = (props) => {
  let [stop] = useStopPropagation();
  let [form] = Form.useForm();
  let [formInitVal] = useState({
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
    <>
      <p className="flex justify-between mx-[.3rem] text-[14px] py-[.2rem] border-b border-b-[#e6e6e6]">
        <span className="text-[var(--border-color)]">当前调度地址</span>
        <span className="text-[#333]">100000</span>
      </p>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 2,
          },
        }}
      >
        <Form
          onFinish={submitCb}
          layout="vertical"
          className="mt-[.2rem]"
          initialValues={formInitVal}
          form={form}
        >
          <Form.Item
            className="mb-[.2rem] mx-[.3rem]"
            label={
              <span className="text-[var(--border-color)]">输入新调度地址</span>
            }
            name="address"
          >
            <Input size="large" className="w-full" placeholder="请输入数量" />
          </Form.Item>
          <Form.Item className="mb-0">
            <ModalFooter onCancel={(e) => cancelCb(e)} />
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
};
// 提示信息
const TipMessage = (props) => {
  let [stop] = useStopPropagation();
  function submitCb(e) {
    stop(e, () => {
      props?.onOk();
    });
  }
  return (
    <>
      <p className="p-[.3rem] text-center">
        合计生产分配比例必须为100%，请检查后重新输入
      </p>
      <ModalFooter only onSubmit={submitCb} />
    </>
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
export default TodoContract;
