import { ModalTitle } from "@/Components/Modal";
import ModalScope from "@/Pages/ModalComp";
import {
  EditFilled,
  EditOutlined,
  SaveOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Form, InputNumber, Switch } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styleScope from "./index.module.less";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { mergeClassName } from "@/utils/base";
const TodoContract = () => {
  let [stop] = useStopPropagation();
  let headerRefs = useRef<any>();
  let [headerHeight, setHeaderHeight] = useState<number>();
  let [modalOpen, setModalOpen] = useState(false);
  function configCb(e, flag) {
    stop(e, () => {
      console.log("flag: ", flag);
      setModalOpen(!modalOpen);
    });
  }
  useEffect(() => {
    let { height } = headerRefs.current.getBoundingClientRect();
    setHeaderHeight(height);
  }, []);
  return (
    <>
      <HeaderModule ref={headerRefs} onConfig={configCb} />
      <Contentmodule headerH={headerHeight} />
      <ModalComp
        modalOpen={modalOpen}
        onCancel={(value) => setModalOpen(value)}
        onOk={(value) => setModalOpen(value)}
      />
    </>
  );
};
const HeaderModule = forwardRef((props: any, ref: any) => {
  function switchCb(e) {
    props?.onConfig?.(e, "switch");
  }
  function totalPublishCb(e) {
    props?.onConfig?.(e, "total");
  }
  function addPublishCb(e) {
    props?.onConfig?.(e, "add");
  }
  function updateAddrCb(e) {
    props?.onConfig?.(e, "update");
    console.log(this);
  }
  let [moduleList] = useState([
    {
      id: 1,
      title: "开启/关闭TOTO出售",
      operateNode: <Switch onClick={switchCb} defaultChecked />,
    },
    {
      id: 2,
      title: "设置TOTO发行总量",
      label: "当前发行总量",
      value: 10000,
      operateNode: (
        <Button
          onClick={totalPublishCb}
          icon={<SettingOutlined />}
          type="primary"
        >
          设置
        </Button>
      ),
    },
    {
      id: 3,
      title: "增发TOTO",
      operateNode: (
        <Button onClick={addPublishCb} icon={<EditOutlined />} type="primary">
          增发
        </Button>
      ),
    },
    {
      id: 4,
      title: "更改TOTO调度地址",
      label: "当前调度地址",
      value: "dkjahiuhf35hahd8",
      operateNode: (
        <Button onClick={updateAddrCb} icon={<EditOutlined />} type="primary">
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
          <div className={item.label ? "pt-[.1rem]" : "pt-[.2rem]"}>
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
  function editorCb() {
    setEditorPercentage(!editorPercentage);
    BtnName.current = BtnName.current == "编辑" ? "保存" : "编辑";
  }
  function formFieldChangeCb(changedValues, allValues) {
    console.log("allValues: ", allValues);
    console.log("changedValues: ", changedValues);
  }
  return (
    <div
      style={{
        height: `calc(100% - ${props.headerH}px - .15rem)`,
      }}
      className="bg-white mt-[.15rem] rounded-[var(--border-radius)] overflow-y-auto"
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
const PublishTotal = forwardRef((props, ref) => {
  let [form] = Form.useForm();
  let [formInitVal] = useState({
    publishNum: "",
  });
  useImperativeHandle(
    ref,
    () => ({
      form,
    }),
    [form]
  );
  return (
    <>
      <p className="flex justify-between text-[14px] pb-[.2rem] border-b border-b-[#e6e6e6]">
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
          initialValues={formInitVal}
          form={form}
        >
          <Form.Item
            className="mb-0"
            label={<span className="text-[var(--border-color)]">输入数量</span>}
            name="publishNum"
          >
            <InputNumber
              size="large"
              className="w-full"
              placeholder="请输入数量"
            />
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
});
// 添加TOTO
const AddToto = () => {};
// 生产分配比例
const AllocationProportion = () => {};
// TOTO调度地址
const DispatchAddress = () => {};
// 提示信息
const TipMessage = () => {};
// 增发OZC
const addPublish = () => {};
const ModalComp = (props) => {
  function cancelCb(value) {
    props?.onCancel?.(value);
  }
  function okCb(value) {
    props?.onOk?.(value);
  }
  return props.modalOpen ? (
    <ModalScope
      onCancel={cancelCb}
      onOk={okCb}
      modalOpen={true}
      footer={{
        paddingBlock: ".2rem",
        paddingRight: ".28rem",
        button: {
          borderRadius: "2px",
        },
      }}
      body={{
        paddingInline: ".3rem",
        paddingTop: ".2rem",
        paddingBottom: ".3rem",
      }}
      title={props.title}
    >
      <PublishTotal />
    </ModalScope>
  ) : null;
};
export default TodoContract;
