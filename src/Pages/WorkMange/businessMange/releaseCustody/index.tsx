import { ModalTitle } from "@/Components/Modal";
import { Button, ConfigProvider, Form, InputNumber, Select } from "antd";
const TotoReleaseCustody = () => {
  return (
    <div className="h-full overflow-y-auto bg-white rounded-[var(--border-radius)] mt-[var(--gap15)]">
      <TitleComp title="解押TOTO质押挖矿" />
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
          <Form.Item label="地址" className="mb-[var(--gap15)]">
            <Select placeholder="选择Token" options={[]} />
          </Form.Item>
          <Form.Item label="数量" className="mb-[var(--gap15)]">
            <InputNumber className="w-full" placeholder="输入数量" />
          </Form.Item>

          <Form.Item className="mb-0" />
          <Form.Item className="flex justify-end mb-0">
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
export default TotoReleaseCustody;
