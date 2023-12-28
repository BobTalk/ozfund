import MoreBtn from "@/Components/MoreBtn";
import Table from "./table";
import Modal from "@/Pages/ModalComp";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import TextArea from "antd/es/input/TextArea";
import { getSession, mergeClassName } from "@/utils/base";
import ModalScopeComp from "@/Pages/ModalScope";
import ModalFooter from "@/Components/ModalFooterBtn";
import { DestroyFreezeAddressInterface } from "@/api";
import { useWallatInfo } from "@/Hooks/Web";
const Destory = () => {
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  let [modalOpen, setModalOpen] = useState(false);
  let {destroyAddress} = useWallatInfo()
  let moduleContent = useRef<any>();
  let topModuleRefs = useRef<any>();
  let moduleTitle = useRef<any>("销毁地址");
  async function submitFrezzCb({address='', note='', num=0}: any) {
    let {status, messge:tipInfo} = await DestroyFreezeAddressInterface({
      address:""
    })
    message[status?'success':'error'](tipInfo)
    status&&destroyAddress({
      accountAddress:getSession('ethAddress'), 
      chainId:getSession('chainId'), 
      objVal:{ address, num } 
    }).then(res => console.log(res))
  }
  function deleteCb(crt) {
    console.log("crt: ", crt);
    moduleContent.current = DestoryModal;
    setModalOpen(!modalOpen);
  }
  useEffect(() => {
    let { height } = topModuleRefs.current.getFilterHeight();
    setFilterModuleHeight(height);
  }, []);
  return (
    <div className="h-full">
      <ListModule ref={topModuleRefs} />
      <Table
        style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }}
        onDelete={deleteCb}
      />
      <ModalScopeComp
        data={{a:1}}
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
const ListModule = forwardRef((props, ref) => {
  let filterHeight = useRef<any>(0);
  function getFilterHeight() {
    return filterHeight?.current.getBoundingClientRect();
  }
  useImperativeHandle(
    ref,
    () => ({
      getFilterHeight,
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
        ref={filterHeight}
        className="flex bg-white rounded-[var(--border-radius)] items-center gap-[var(--gap10)] py-[var(--gap20)] pl-[var(--gap30)]"
      >
        <Input placeholder="输入地址" className="w-[3.7rem]" />
        <Button type="primary">查询</Button>
      </div>
    </ConfigProvider>
  );
});
const DestoryModal = (props) => {
  let [form] = Form.useForm();
  let [stop] = useStopPropagation();
  let [formInitVal] = useState({
    note: "",
  });
  function finishCb(values) {
    props?.onOk?.({...values, ...props?.data});
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
            <TextArea
              autoSize={{
                minRows: 4,
                maxRows: 6,
              }}
            />
          </Form.Item>

          <Form.Item>
            {/* <Button onClick={cancelCb} className="mr-[var(--gap10)]">
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button> */}
            <ModalFooter onCancel={cancelCb} />
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
