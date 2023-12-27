import { ModalTitle } from "@/Components/Modal";
import { Button, ConfigProvider, Form, Input, InputNumber, Select, message } from "antd";
import Table from "./table";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TextArea from "antd/es/input/TextArea";
import { getSession, mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalScopeComp from "@/Pages/ModalScope";
import ModalFooter from "@/Components/ModalFooterBtn";
import { FreezeAddressInterface } from "@/api";
import { useWallatInfo } from "@/Hooks/Web";

const Frezz = () => {
  let {frezzAddress} = useWallatInfo()
  let [modalOpen, setModalOpen] = useState(false);
  let moduleContent = useRef<any>();
  let moduleData = useRef<any>();
  let filterRefs = useRef<any>();
  let tableRefs = useRef<any>();
  let topModuleRefs = useRef<any>();
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);

  let moduleTitle = useRef<any>("冻结地址");
  async function submitFrezzCb(values: any) {
    let {address, note} = values
    let { status, message:tipInfo } = await FreezeAddressInterface({address, note})
    message[status?"success":'error'](tipInfo)
    status&& frezzAddress({
      accountAddress:getSession('ethAddress'), 
      chainId:getSession('chainId'),
      address
    }).then(res => console.log(res))
  }
  function finishCb(values) {
    console.log('values: ', values);
    moduleData.current = values
    moduleContent.current = FrezzModal;
    setModalOpen(!modalOpen);
  }
  useEffect(() => {
    let { height: topHeight } = topModuleRefs.current.getContentHeight();
    let { height: filterHeight } = filterRefs.current.getContentHeight();
    setFilterModuleHeight(topHeight + filterHeight);
  }, []);
  return (
    <div className="h-full">
      <TopModule ref={topModuleRefs} onFinish={finishCb} />
      <ListModule ref={filterRefs} />
      <Table
        ref={tableRefs}
        style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }}
      />
      <ModalScopeComp
        data={moduleData.current}
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

const TopModule = forwardRef((props: any, ref) => {
  console.log('props: ', props);
  let {getAmountByAddress} = useWallatInfo()
  let [stop]=useStopPropagation()
  let [form] = Form.useForm();
  let [formInitVal] = useState({
    address: undefined,
    num: 0,
  });
  let contentRefs = useRef<any>();
  function finishCb(values) {
    props?.onFinish?.(values);
  }
  function getContentHeight() {
    return contentRefs.current.getBoundingClientRect();
  }
  function addressChangeCb(e){
    stop(e, ()=>{
      let address = e.target.value
      getAmountByAddress({address}).then(res => {
        form.setFieldValue('num', res??0)
      }).catch(err=>{
        console.error('err: ', err);
      })
    })

  }
  useImperativeHandle(
    ref,
    () => ({
      getContentHeight,
    }),
    []
  );
  return (
    <div ref={contentRefs} className="bg-white rounded-[var(--border-radius)]">
      <TitleComp title="OZC冻结地址" />
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
          className="clear_required grid grid-cols-2 gap-x-[var(--gap20)] pt-[var(--gap20)] ml-[var(--gap30)] mr-[var(--gap20)]"
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
            name="address"
            label={<LabelComp title="地址" />}
          >
            <Input allowClear onChange={addressChangeCb} className="w-full" placeholder="输入地址" />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
              message: "",
            },
          ]} name="num" label={<LabelComp title="数量" />}>
            {/* ozc余额 */}
            <InputNumber disabled className="w-full" placeholder="输入数量" />
          </Form.Item>
          <Form.Item />
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit">
              冻结
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
});
const FrezzModal = (props) => {
  let [form] = Form.useForm();
  let [stop] = useStopPropagation();
  let [formInitVal] = useState({
    note: "",
  });
  function finishCb(values) {
    props?.onOk?.({...values, ...props.data});
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
          <span className="text-[#333]">{props.data.address}</span>
        </p>
        <p className="flex justify-between items-center mt-[var(--gap15)]">
          <span className="text-[var(--border-color)]">数量</span>
          <span className="text-[#333]">{props.data.num}</span>
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
            <TextArea
              autoSize={{
                minRows: 4,
                maxRows: 6,
              }}
            />
          </Form.Item>

          <Form.Item>
            <ModalFooter onCancel={cancelCb} />
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

const ListModule = forwardRef((props, ref) => {
  let contentRefs = useRef<any>();
  function getContentHeight() {
    return contentRefs.current.getBoundingClientRect();
  }
  useImperativeHandle(
    ref,
    () => ({
      getContentHeight,
    }),
    []
  );
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          controlHeight: 36,
        },
      }}
    >
      <div
        ref={contentRefs}
        className="bg-white rounded-[var(--border-radius)_var(--border-radius)_0_0] mt-[var(--gap15)] pt-[var(--gap10)] pb-[var(--gap17)]"
      >
        <TitleComp title="冻结地址列表" />
        <div className="flex items-center gap-[var(--gap10)] mt-[var(--gap20)] ml-[var(--gap30)]">
          <Input placeholder="输入地址" className="w-[3.7rem]" />
          <Button type="primary">查询</Button>
        </div>
      </div>
    </ConfigProvider>
  );
});
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
export default Frezz;
