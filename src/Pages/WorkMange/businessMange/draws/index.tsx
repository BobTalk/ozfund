import { ModalTitle } from "@/Components/Modal";
import SplitComp from "../common";
import { useState } from "react";
import { Button, ConfigProvider, Form, InputNumber, Select, message } from "antd";
import Icon from "@/Components/Icon";
import { WithdrawTokenInterface } from "@/api";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useWallatInfo } from "@/Hooks/Web";
import { getSession } from "@/utils/base";
const DrawsContractMoney = () => {
  let {extractingTokensFromContracts,getAmountByToken} = useWallatInfo()
  let [stop] = useStopPropagation();
  let [listInfo] = useState([
    {
      id: "1",
      title: "OZC",
      contractAddress: "OZC",
    },
    {
      id: "2",
      title: "TOTO",
      contractAddress: "TOTO",
    },
    {
      id: "3",
      title: "质押",
      contractAddress: "质押",
    },
  ]);
  let [crtInfo, setCrtInfo] = useState<any>({});
  let [form] = Form.useForm<{num:null,tokenContractAddress:any,spenderAddress:any,amount:number}>();
  let formInitVal = useState<any>({
    num:0
  })
  function editorCb(crt) {
    setCrtInfo(crt);
  }
  async function submitToken({ tokenContractAddress, spenderAddress, amount }) {
    let { status,message:tipInfo } = await WithdrawTokenInterface({
      contractAddress: crtInfo.contractAddress, // 合约地址,
      tokenContractAddress, // token合约地址
      spenderAddress, // 提取地址
      amount, //  提取数量
    });
    message[status?"success":'error'](tipInfo)
    if(status){
      cancelToken(undefined)
      extractingTokensFromContracts({
        accountAddress:getSession('ethAddress'),
         chainId:getSession('chainId'),
         objVal:{
        select: "Toto",
        tokenSelect: "Toto",
        number: 0
      }}).then(res=>console.log(res))
    }
  }
  function cancelToken(e) {
    stop(e, () => {
      setCrtInfo({});
    });
  }
  function changeTokenCb(value){
    getAmountByToken({
      accountAddress:getSession('ethAddress'),
      token: value
    })
  }
  return (
    <div className="h-full overflow-y-auto bg-white rounded-[var(--border-radius)] mt-[var(--gap15)]">
      <TitleComp title="提取合约中代币" />
      <SplitComp
        listClassName="grid-cols-[.4rem_1fr] gap-[1em]"
        onEditor={editorCb}
        className="px-[var(--gap30)] pt-[var(--gap20)]"
        list={listInfo}
        opertion={
          <>
            <Icon name="h-icon-draw" />
            <span className=" ml-[.1rem] font-normal">提取</span>
          </>
        }
      />
      {crtInfo.title ? (
        <>
          <TitleComp title={crtInfo.title} />
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  paddingBlock: 6,
                },
                InputNumber: {
                  paddingBlock: 6,
                },
                Form: {
                  labelColor: "#666",
                },
              },
              token: {
                controlHeight: 36,
                borderRadius: 2,
              },
            }}
          >
            <Form
              form={form}
              onFinish={submitToken}
              initialValues={formInitVal}
              layout="vertical"
              className="grid clear_required grid-cols-2 gap-x-[var(--gap20)] py-[var(--gap20)] pr-[var(--gap20)] pl-[var(--gap30)]"
            >
              <Form.Item
                name="tokenContractAddress"
                label="选择Token"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
                className="mb-[var(--gap15)]"
              >
                <Select
                onChange={changeTokenCb}
                  placeholder="选择Token"
                  options={[
                    {
                      label: "USDT",
                      value: "USDT",
                    },
                    {
                      label: "OZCoin",
                      value: "OZCoin",
                    },
                    {
                      label: "TOTO",
                      value: "TOTO",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="num"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
                label="数量"
                className="mb-[var(--gap15)]"
              >
                <InputNumber disabled defaultValue={formInitVal['num']} className="w-full" placeholder="输入数量" />
              </Form.Item>
              <Form.Item
                name="spenderAddress"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
                label="提取地址"
                className="mb-[var(--gap15)]"
              >
                <Select
                  placeholder="输入地址"
                  options={[
                    {
                      label: "A",
                      value: "A",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
                label="提取数量"
                className="mb-[var(--gap15)]"
              >
                <InputNumber className="w-full" placeholder="输入数量" />
              </Form.Item>
              <Form.Item className="mb-0" />
              <Form.Item className="flex justify-end mb-0">
                <Button
                  className="w-[.75rem] text-[#999]"
                  onClick={cancelToken}
                >
                  取消
                </Button>
                <Button
                  className="w-[.75rem] ml-[.1rem]"
                  htmlType="submit"
                  type="primary"
                >
                  确认
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </>
      ) : null}
    </div>
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
export default DrawsContractMoney;
