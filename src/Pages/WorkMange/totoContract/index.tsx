import { ModalTitle } from "@/Components/Modal";
import {
  EditFilled,
  SaveOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
} from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styleScope from "./index.module.less";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
import ModalFooter from "@/Components/ModalFooterBtn";
import ModalScopeComp from "@/Pages/ModalScope";
import {
  AddPublishInterface,
  GetProductionRatioInterface,
  GetTotoConfigInterface,
  SwitchExchaneInterface,
} from "@/api";
import { useWallatInfo } from "@/Hooks/Web";
import { getSession } from "@/utils/base";
import { poolIdEnum } from "@/Enum";
import { cloneDeep } from "lodash";
const TodoContract = () => {
  let [stop] = useStopPropagation();
  let headerRefs = useRef<any>();
  let [headerHeight, setHeaderHeight] = useState<number>();
  let [modalOpen, setModalOpen] = useState(false);
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>();
  let moduleData = useRef<any>();
  let contentRefs = useRef<any>();
  let [totoSell, setTotoSell] = useState<boolean>(false);
  let [dispatchAddr, setDispatchAddr] = useState();
  let [pubulishNum, setPubulishNum] = useState();
  let { openOrCloseTotoSell, changeTotoSchedulingAddress, setTotoPubulishTotal, productionAllocationRatio } = useWallatInfo()
  let accountAddress = getSession('ethAddress')
  let chainId = getSession('chainId')
  function configCb(e, crt) {
    stop(e, async () => {
      if (crt.flag === "switch") {
        let { status, message: tipInfo } = await SwitchExchaneInterface({});
        message[status ? "success" : "error"](tipInfo);
        if (status) {
          openOrCloseTotoSell({
            accountAddress,
            chainId,
            sellFlag: !totoSell
          })
        }
        setTotoSell(!totoSell);
        return;
      }
      moduleData.current = {
        pubulishNum,
        dispatchAddr,
      };
      moduleContent.current = crt.flag;
      moduleTitle.current = crt.title;
      setModalOpen(!modalOpen);
    });
  }
  function saveCb(e, list, cb) {
    let obj = {
      team: 0,
      support: 0,
      fund: 0,
      pledge: 0,
      mining: 0,
      vipMining: 0
    }
    let map = {
      1: 'team',
      2: 'support',
      3: 'fund',
      4: 'pledge',
      5: 'mining',
      6: 'vipMining'
    }
    for (const iterator of list) {
      obj[map[iterator['pool']]] = iterator['proportion']
    }
    stop(e, () => {
      let result = Object.values(list).reduce((prv: number, next: any) => (prv += +next.proportion, prv), 0)
      if (result !== 100) {
        moduleContent.current = TipMessage;
        moduleTitle.current = "提示信息";
        setModalOpen(!modalOpen);
      } else {
        cb()
        productionAllocationRatio({
          accountAddress,
          chainId,
          objVal: obj
        }).then(res => console.log(res))
      }
    });
  }
  function submitInfoCb({ values: { address = '', publishNum = 0 }, flag }) {
    if (flag == 'dispatch') {
      changeTotoSchedulingAddress({
        accountAddress,
        chainId,
        address
      }).then(res => console.log(res))
    }
    if (flag == 'publish') {
      setTotoPubulishTotal({
        accountAddress,
        chainId,
        total: publishNum
      }).then(res => console.log(res))
    }
    setModalOpen(!modalOpen);
  }
  async function getAddress() {
    let { status, data } = await GetTotoConfigInterface();
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      if (item.keyname == "toto_exchange") {
        // toto_exchange  toto交易开启状态  1开启 0关闭
        setTotoSell(item.value == 1 ? true : false);
      }
      if (item.keyname == "toto_owner") {
        // toto调度地址
        setDispatchAddr(item.value);
      }
      if (item.keyname == "toto_produce_limit") {
        // toto生产总量
        setPubulishNum(item.value);
      }
    }
  }
  useLayoutEffect(() => {
    getAddress();
  }, []);
  useEffect(() => {
    let { height } = headerRefs?.current?.getBoundingClientRect?.() ?? 0;
    setHeaderHeight(height);
  }, []);
  return (
    <>
      <HeaderModule
        ref={headerRefs}
        pubulishNum={pubulishNum}
        dispatchAddr={dispatchAddr}
        totoSell={totoSell}
        onConfig={configCb}
      />
      <Contentmodule headerH={headerHeight} ref={contentRefs} onSave={saveCb} />
      <ModalScopeComp
        content={moduleContent.current}
        title={moduleTitle.current}
        data={moduleData.current}
        modalOpen={modalOpen}
        onCancel={() => setModalOpen(!modalOpen)}
        onOk={submitInfoCb}
      />
    </>
  );
};
const HeaderModule = forwardRef((props: any, ref: any) => {
  let [moduleList] = useState([
    {
      id: 1,
      flag: "switch",
      title: "开启/关闭TOTO出售",
      operateNode: <Switch defaultChecked={props.totoSell} />,
    },
    {
      id: 2,
      flag: PublishTotal,
      title: "设置TOTO发行总量",
      label: "当前发行总量",
      value: "pubulishNum",
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
      value: "dispatchAddr",
      operateNode: (
        <Button icon={<EditFilled />} type="primary">
          修改
        </Button>
      ),
    },
  ]);
  function operationCb(e, crt) {
    props?.onConfig?.(e, crt);
  }

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
      className="flex items-center gap-x-[var(--gap20)] bg-white p-[var(--gap20)] rounded-[var(--border-radius)]"
    >
      {moduleList.map((item, index) => (
        <li key={item.id} className={liStyleFn(index)}>
          <p className="text-[#333] text-[16px]">{item.title}</p>
          {item.label ? (
            <p className="text-[#666] text-[14px] mt-[.12rem]">
              <span>{item.label}：</span>
              <span>{props[item.value]}</span>
            </p>
          ) : null}
          <div
            onClick={(e) => operationCb(e, item)}
            className={item.label ? "pt-[.1rem]" : "pt-[var(--gap20)]"}
          >
            {item.operateNode}
          </div>
        </li>
      ))}
    </ul>
  );
});
const Contentmodule = forwardRef((props: any, ref) => {
  let BtnName = useRef<string>("编辑");
  let [form] = Form.useForm()
  let [listInfo, setListInfo] = useState([]);
  let [editorPercentage, setEditorPercentage] = useState(false);
  function editorCb(e) {
    setFormField(listInfo)
    if (BtnName.current == "保存") {
      props?.onSave?.(e, listInfo, cb);
    } else {
      cb()
    }
  }
  function setFormField(listInfo) {
    for (let iterator of listInfo) {
      let key = `proportion_` + iterator['pool']
      form.setFieldValue([key], iterator['proportion'])
    }
  }
  function cb() {
    setEditorPercentage(!editorPercentage);
    BtnName.current = BtnName.current == "编辑" ? "保存" : "编辑";
  }
  function formFieldChangeCb(changedValues, allValues) {
    let key = Object.keys(changedValues)
    let value = Object.values(changedValues)
    let [name, index] = key[0].split("_")
    let updateItemIndex = listInfo.findIndex(item => item.pool == index)
    setListInfo(info => {
      let newVal = cloneDeep(info)
      newVal.splice(updateItemIndex, 1, {
        ...newVal[updateItemIndex],
        proportion: value[0]
      })
      return newVal
    })
  }
  function getInfo() {
    GetProductionRatioInterface({}).then(res => {
      setListInfo(res.data ?? [])
      setFormField(res.data ?? [])
    })
  }
  const getListInfo = () => listInfo
  useImperativeHandle(ref, () => ({
    getListInfo
  }), [listInfo])
  useEffect(() => {
    getInfo()
  }, [])
  return (
    <div
      style={{
        height: `calc(100% - ${props.headerH}px - var(--gap15))`,
      }}
      className="bg-white mt-[var(--gap15)] rounded-[var(--border-radius)] overflow-y-auto"
    >
      <TitleComp
        title={
          <div className="flex flex-1 items-center justify-between pr-[var(--gap20)]">
            <span>生产分配比例</span>
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
        form={form}
        onValuesChange={formFieldChangeCb}
        labelAlign="left"
        className={styleScope["_reset-form"]}
      >
        {listInfo.map((item, index) => (
          <Form.Item
            name={`proportion_` + item['pool']}
            label={
              <span className="text-[#333] w-[1.9rem]">{poolIdEnum[item['pool']]}：</span>
            }
            key={item['pool']}
            className="text-[14px] mb-[.14rem]"
          >
            {!editorPercentage ? (
              <span className="text-[#666]">
                {item['proportion'] ?? "--"}%
              </span>
            ) : (
              <InputNumber
                max={100}
                min={0}
                addonAfter="%"
                className="w-[1rem]"
                defaultValue={item['proportion'] ?? 0}
              />
            )}
          </Form.Item>
        ))}
      </Form>
    </div>
  );
});
const TitleComp = ({ title }) => {
  return (
    <>
      <ModalTitle
        showTitleIcon
        title={title}
        classTitleName="py-[.25rem] ml-[var(--gap30)]  border-b border-b-[#e6e6e6] text-[16px] text-[#333]"
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
    props?.onOk({ values, flag: 'publish' });
  }
  function cancelCb(e) {
    stop(e, () => {
      props?.onCancel?.(false);
    });
  }
  return (
    <>
      <p className="flex justify-between mx-[var(--gap30)] text-[14px] py-[var(--gap20)] border-b border-b-[#e6e6e6]">
        <span className="text-[var(--border-color)]">当前发行总量</span>
        <span className="text-[#333]">{props?.data?.pubulishNum ?? 0}</span>
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
          className="clear_required mt-[var(--gap20)]"
          onFinish={submitCb}
          initialValues={formInitVal}
          form={form}
        >
          <Form.Item
            className="mb-[var(--gap20)] mx-[var(--gap30)]"
            rules={[
              {
                required: true,
                message: ''
              }
            ]}
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
// 增发TOTO
const AddToto = (props) => {
  let accountAddress = getSession('ethAddress')
  let chainId = getSession('chainId')
  let [stop] = useStopPropagation();
  let { addPublishToto } = useWallatInfo()
  let [form] = Form.useForm();
  async function submitCb({ address, amount }) {
    let { status, message: tipInfo } = await AddPublishInterface({
      address,
      amount,
    });
    message[status ? "success" : "error"](tipInfo);
    props?.onCancel?.(false);
    status && addPublishToto({ accountAddress, chainId, tatol: amount }).then(res => console.log(res))
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
        className="clear_required"
        onFinish={submitCb}
        form={form}
      >
        <Form.Item
          className="mb-[var(--gap15)] mx-[var(--gap30)] mt-[var(--gap20)]"
          label={
            <span className="text-[var(--border-color)]">输入增发地址</span>
          }
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          name="address"
        >
          <Input size="large" placeholder="请输入地址" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap20)] mx-[var(--gap30)]"
          label={
            <span className="text-[var(--border-color)]">输入增发数量</span>
          }
          name="amount"
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
//           className="mb-[var(--gap15)]"
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
//           className="mb-[var(--gap15)]"
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
//           className="mb-[var(--gap15)]"
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
//           className="mb-[var(--gap15)]"
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
//           className="mb-[var(--gap15)]"
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
    props?.onOk({ values, flag: 'dispatch' });
  }
  function cancelCb(e) {
    stop(e, () => {
      props?.onCancel?.(false);
    });
  }
  return (
    <>
      <p className="flex justify-between mx-[var(--gap30)] text-[14px] py-[var(--gap20)] border-b border-b-[#e6e6e6]">
        <span className="text-[var(--border-color)]">当前调度地址</span>
        <span className="text-[#333]">{props?.data?.dispatchAddr ?? "--"}</span>
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
          className="clear_required mt-[var(--gap20)]"
          initialValues={formInitVal}
          form={form}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: ''
              }
            ]}
            className="mb-[var(--gap20)] mx-[var(--gap30)]"
            label={
              <span className="text-[var(--border-color)]">输入新调度地址</span>
            }
            name="address"
          >
            <Input size="large" className="w-full" placeholder="请输入新调度地址" />
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
      props?.onOk({ values: {}, flag: 'tipMessage' });
    });
  }
  return (
    <>
      <p className="p-[var(--gap30)] text-center">
        合计生产分配比例必须为100%，请检查后重新输入
      </p>
      <ModalFooter only onSubmit={submitCb} />
    </>
  );
};

export default TodoContract;
