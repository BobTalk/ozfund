import { getSession, mergeClassName } from "@/utils/base";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

const AddProblemModule = (props) => {
  let { adminId } = getSession("userInfo");
  let { crtData = {} } = props;
  let [form] = Form.useForm<{
    problem: string;
    content: string;
  }>();
  function cancelProblemCb() {
    props?.onCancel();
  }
  function addProblemCb(values) {
    Object.values(crtData).length
      ? props?.onUpdateProcess?.({
          ...crtData,
          subject: values.title ?? crtData.subject,
          content: values.content ?? crtData.content,
        })
      : props?.onAddProcess?.(values);
  }
  useEffect(() => {
    form.setFieldValue("problem", crtData.subject);
    form.setFieldValue("content", crtData.content);
  }, []);
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
        onFinish={addProblemCb}
        form={form}
        className="h-full clear_required px-[var(--gap20)] pt-[var(--gap20)] overflow-y-auto"
      >
        <Form.Item
          colon={false}
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
          name="problem"
          colon={false}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="问题" />}
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
          colon={false}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="问题内容" />}
        >
          <TextArea defaultValue={crtData.content} autoSize={{ minRows: 18 }} />
        </Form.Item>
        <Form.Item className="mb-0">
          <div className="flex justify-end">
            <Button
              className="h-[.36rem] w-[.9rem] leading-none mr-[var(--gap10)] rounded-[4px]"
              onClick={cancelProblemCb}
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
export default AddProblemModule;
