import { getSession, mergeClassName } from "@/utils/base";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import scopeStyle from "./index.module.less";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const AddProcessModule = (props) => {
  let { adminId } = getSession("userInfo");
  let [stop] = useStopPropagation();
  let { crtData = {} } = props;
  let checkboxRef = useRef<boolean>(crtData.sendEmail);
  let [form] = Form.useForm<{
    title: string;
    content: string;
    sender: string;
    sendEmail: boolean;
  }>();
  function cancelTrendsCb() {
    props?.onCancel();
  }
  function addTrendsCb(values) {
    Object.values(crtData).length
      ? props?.onUpdateNotice?.({
          ...crtData,
          sender:values.sender,
          subject: values.title ?? crtData.subject,
          content: values.content ?? crtData.content,
          sendEmail: checkboxRef.current,
        })
      : props?.onAddNotice?.({ ...values, sendEmail: checkboxRef.current });
  }
  function checkboxCb(e) {
    stop(e, () => {
      checkboxRef.current = e.target.checked;
    });
  }
  useEffect(() => {
    if (Object.values(crtData).length) {
      form.setFieldValue("title", crtData.subject);
      form.setFieldValue("sender", crtData.sender);
      form.setFieldValue("content", crtData.content);
      checkboxRef.current = !!crtData.sendEmail;
    }
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
        onFinish={addTrendsCb}
        form={form}
        className="clear_required h-full px-[var(--gap20)] pt-[var(--gap20)] overflow-y-auto"
      >
        <Form.Item
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
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          name="sender"
          className="mb-[var(--gap15)]"
          label={<LabelComp title="发送人" />}
        >
          <Input defaultValue={crtData.sender} />
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
          label={<LabelComp title="公告内容" />}
        >
          <TextArea defaultValue={crtData.content} autoSize={{ minRows: 18 }} />
        </Form.Item>
        <Form.Item
          name="sendEmail"
          className={scopeStyle["async-send_mail"]}
          label={<LabelComp title="" />}
        >
          <div className="flex items-center text-[14px] text-[#222]">
            <p className="mr-[.2rem]">同步发送邮件</p>
            <Checkbox
              onChange={checkboxCb}
              defaultChecked={crtData.sendEmail}
            />
          </div>
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
