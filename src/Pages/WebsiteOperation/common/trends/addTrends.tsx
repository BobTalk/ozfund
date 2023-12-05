import { getSession, mergeClassName } from "@/utils/base";
import { Button, ConfigProvider, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

const AddProcessModule = (props) => {
  let { adminId } = getSession("userInfo");
  let { crtData = {} } = props;
  let [form] = Form.useForm<{
    title: string;
    content: string;
    time: string;
  }>();
  function cancelTrendsCb() {
    props?.onCancel();
  }
  function addTrendsCb(values) {
    Object.values(crtData).length
      ? props?.onUpdateTrends?.({
          ...crtData,
          subject: values.title ?? crtData.subject,
          content: values.content ?? crtData.content,
        })
      : props?.onAddTrends?.(values);
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 44,
          borderRadius: 0,
        },
      }}
    >
      <Form
        labelAlign="left"
        colon={false}
        onFinish={addTrendsCb}
        form={form}
        className="clear_required h-full px-[var(--gap20)] pt-[var(--gap20)] overflow-y-auto"
      >
        <Form.Item
          name="staffId"
          className="mb-[var(--gap15)]"
          label={<LabelComp title="员工ID" />}
        >
          <Input disabled defaultValue={adminId} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          name="title"
          className="mb-[var(--gap15)]"
          label={<LabelComp title="标题" />}
        >
          <Input defaultValue={crtData.subject} />
        </Form.Item>
        <Form.Item
          name="time"
          className="mb-[var(--gap15)]"
          label={<LabelComp title="时间戳" />}
        >
          <Input
            disabled
            defaultValue={crtData.time ?? dayjs(new Date()).valueOf()}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          name="content"
          className="mb-[var(--gap15)]"
          label={<LabelComp title="动态内容" />}
        >
          <TextArea defaultValue={crtData.content} autoSize={{ minRows: 18 }} />
        </Form.Item>
        <Form.Item className="mb-0">
          <div className="flex justify-end">
            <Button
              className="h-[.36rem] w-[.9rem] leading-none mr-[var(--gap10)] rounded-[4px]"
              onClick={cancelTrendsCb}
            >
              取消
            </Button>
            <Button
              className="h-[.36rem] w-[.9rem] leading-none rounded-[4px]"
              type="primary"
              htmlType="submit"
            >
              确定{Object.values(crtData).length ? "更新" : "新增"}
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
export default AddProcessModule;
