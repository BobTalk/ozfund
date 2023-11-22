import { ModalTitle } from "@/Components/Modal";
import { Button, ConfigProvider, Form, InputNumber, Select } from "antd";
import Table from "./table";
import MoreBtn from "@/Components/MoreBtn";

const Frezz = () => {
  return (
    <div className="h-full">
      <TopModule />
      <ListModule />
    </div>
  );
};

const TopModule = () => {
  return (
    <div className="bg-white rounded-[var(--border-radius)]">
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
          layout="vertical"
          className="grid grid-cols-2 gap-x-[var(--gap20)] pt-[var(--gap20)] ml-[var(--gap30)] mr-[var(--gap20)]"
        >
          <Form.Item label={<LabelComp title="地址" />}>
            <Select className="w-full" placeholder="选择地址" options={[]} />
          </Form.Item>
          <Form.Item label={<LabelComp title="数量" />}>
            <InputNumber className="w-full" placeholder="输入数量" />
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
};

const ListModule = () => {
  return (
    <>
      <div className="bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pt-[var(--gap10)] pb-[var(--gap14)]">
        <TitleComp title="冻结地址列表" />
        <Table />
      </div>
      <MoreBtn />
    </>
  );
};
const LabelComp = ({ title }) => {
  return <span className="text-[14px] text-[#666]">{title}</span>;
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
