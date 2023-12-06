import { getSession, mergeClassName } from "@/utils/base";
import { Button, ConfigProvider, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

const AddProcessModule = (props) => {
  let { adminId } = getSession("userInfo");
  let { crtData = {} } = props;
  let [form] = Form.useForm<{
    title: string;
    content: string;
  }>();
  function cancelProcessCb() {
    props?.onCancel();
  }
  function addProcessCb(values) {
    Object.values(crtData).length
      ? props?.onUpdateProcess?.({
          ...crtData,
          subject: values.title ?? crtData.subject,
          content: values.content ?? crtData.content,
        })
      : props?.onAddProcess?.(values);
  }
  useEffect(() => {
    form.setFieldValue("title", crtData.subject);
    form.setFieldValue("content", crtData.content);
  }, []);
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
        onFinish={addProcessCb}
        form={form}
        className="h-full clear_required px-[var(--gap20)] pt-[var(--gap20)] overflow-y-auto"
      >
        <Form.Item
          name="staffId"
          className="mb-[var(--gap15)]"
          label={<LabelComp title="员工ID" />}
        >
          <Input disabled defaultValue={adminId} />
        </Form.Item>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="标题" />}
        >
          <Input defaultValue={crtData.subject} />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="进程内容" />}
        >
          <TextArea defaultValue={crtData.content} autoSize={{ minRows: 18 }} />
        </Form.Item>
        <Form.Item className="mb-0">
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
