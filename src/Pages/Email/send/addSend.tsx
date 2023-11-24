import { mergeClassName } from "@/utils/base";
import { Button, Checkbox, ConfigProvider, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const AddTrendsModule = (props) => {
  function cancelProcessCb() {
    props?.onCancel();
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 44,
          borderRadius: 0,
          controlInteractiveSize: 16,
        },
      }}
    >
      <Form
        labelAlign="left"
        className="h-full px-[var(--gap20)] pt-[var(--gap20)] overflow-y-auto"
      >
        <Form.Item
          colon={false}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="发布人" />}
        >
          <Input />
        </Form.Item>
        <Form.Item
          colon={false}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="标题" />}
        >
          <Input />
        </Form.Item>
        <Form.Item
          colon={false}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="选择模板" />}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          colon={false}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="选择时间" />}
        >
          <DatePicker placeholder="" className="w-full"/>
        </Form.Item>
        <Form.Item
          colon={false}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="选择分类" />}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          colon={false}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="邮件内容" />}
        >
          <TextArea autoSize={{ minRows: 18 }} />
        </Form.Item>
        <Form.Item className="mb-[.26rem]">
          <div className="flex justify-end">
            <Button
              className="h-[.36rem] w-[.9rem] leading-none mr-[var(--gap10)] rounded-[4px]"
              onClick={cancelProcessCb}
            >
              取消
            </Button>
            <Button
              className="h-[.36rem] w-[.9rem] leading-none rounded-[4px]"
              type="primary"
              htmlType="submit"
            >
              确定新增
            </Button>
          </div>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

const LabelComp = ({ title, className = "" }) => {
  return (
    <span
      className={mergeClassName("text-[14px] w-[.6rem] text-[#222]", className)}
    >
      {title}
    </span>
  );
};
export default AddTrendsModule;
