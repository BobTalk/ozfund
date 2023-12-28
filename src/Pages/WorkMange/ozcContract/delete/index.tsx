import { ModalTitle } from "@/Components/Modal";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getSession, mergeClassName } from "@/utils/base";
import Table from "./table";
import { AddExchangeTokensInterface, RemoveExchangeTokensInterface } from "@/api";
import { useWallatInfo } from "@/Hooks/Web";
const Delete = () => {
  let topModuleRefs = useRef<any>();
  let tableRefs = useRef<any>();
  let {addTokenExchange,removeTokenExchange} = useWallatInfo()
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  async function finishCb({tokenName:name, currencyType:address}) {
   let {status, message:tipInfo} = await AddExchangeTokensInterface({
    address,
    name
   })
   message[status?'success':'error'](tipInfo)
   status&&addTokenExchange({accountAddress:getSession('ethAddress'), chainId:getSession('chainId'), address}).then(res=>console.log(res))
  }
  async function submitDelete(crt){
    let {address} = crt
   let {status,message:tipInfo} =  await RemoveExchangeTokensInterface({address})
   message[status?'success':'error'](tipInfo)
   status && removeTokenExchange({accountAddress:getSession('ethAddress'), chainId:getSession('chainId'), address}).then(res=>console.log(res))
  }
  useEffect(() => {
    let { height } = topModuleRefs.current.getFilterHeight();
    setFilterModuleHeight(height);
  }, []);
  return (
    <div className="h-full">
      <TopModule ref={topModuleRefs} onFinish={finishCb} />
      <Table
      onDelete={submitDelete}
        ref={tableRefs}
        style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }}
      />
    </div>
  );
};

const TopModule = forwardRef((props: any, ref) => {
  let filterHeight = useRef<any>(0);
  let [form] = Form.useForm();
  let [formInitVal] = useState({
    tokenName: undefined,
    currencyType: "",
  });
  function finishCb(values) {
    props?.onFinish?.(values);
  }
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
    <div ref={filterHeight} className="bg-white rounded-[var(--border-radius)]">
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
          className="grid clear_required grid-cols-2 gap-x-[var(--gap20)] pt-[var(--gap20)] ml-[var(--gap30)] mr-[var(--gap20)]"
        >
          <Form.Item rules={[{
            required: true,
            message: ''
          }]} name="tokenName" label={<LabelComp title="Token名称" />}>
            <Input
              className="w-full"
              placeholder="输入Token名称"
            />
          </Form.Item>
          <Form.Item
            rules={[{
              required: true,
              message: ''
            }]}
            name="currencyType"
            label={<LabelComp title="代币地址" />}
          >
            <Input className="w-full" placeholder="输入代币地址" />
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
export default Delete;
