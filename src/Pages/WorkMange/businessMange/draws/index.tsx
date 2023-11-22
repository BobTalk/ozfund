import { ModalTitle } from "@/Components/Modal";
import SplitComp from "../common";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button, ConfigProvider, Form, InputNumber, Select } from "antd";
const DrawsContractMoney = () => {
  let [listInfo] = useState([
    {
      id: "1",
      title: "OZC",
    },
    {
      id: "2",
      title: "TOTO",
    },
    {
      id: "3",
      title: "质押",
    },
  ]);
  function editorCb(crt) {
    console.log("crt: ", crt);
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
            <EditOutlined />
            <span className=" ml-[.1rem] font-normal">提取</span>
          </>
        }
      />
      <TitleComp title="OZC" />
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
          layout="vertical"
          className="grid grid-cols-2 gap-x-[var(--gap20)] py-[var(--gap20)] pr-[var(--gap20)] pl-[var(--gap30)]"
        >
          <Form.Item label="选择Token" className="mb-[var(--gap15)]">
            <Select placeholder="选择Token" options={[]} />
          </Form.Item>
          <Form.Item label="数量" className="mb-[var(--gap15)]">
            <InputNumber className="w-full" placeholder="输入数量" />
          </Form.Item>
          <Form.Item label="提取地址" className="mb-[var(--gap15)]">
            <Select placeholder="输入地址" options={[]} />
          </Form.Item>
          <Form.Item label="提取数量" className="mb-[var(--gap15)]">
            <InputNumber className="w-full" placeholder="输入数量" />
          </Form.Item>
          <Form.Item className="mb-0" />
          <Form.Item className="flex justify-end mb-0">
            <Button className="w-[.75rem] text-[#999]">取消</Button>
            <Button className="w-[.75rem] ml-[.1rem]" type="primary">
              确认
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
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
