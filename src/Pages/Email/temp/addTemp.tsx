import { AddEmailTempInterface, UpdateEmailTempInterface } from "@/api";
import { getSession, mergeClassName } from "@/utils/base";
import { Button, Checkbox, ConfigProvider, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

const AddTrendsModule = (props) => {
  let { adminId } = getSession("userInfo");
  let [form] = Form.useForm<{ name: string; note: string; content: string }>();
  let { crtData = {}, disabled } = props;
  function cancelProcessCb() {
    props?.onCancel();
  }
  function templateSubmitCb(values) {
    Object.values(crtData).length
      ? updateTemplateInfo({ ...values, id: crtData.id })
      : addTemplateInfo(values);
  }
  async function addTemplateInfo(parmas = {}) {
    let { status, message: tipInfo } = await AddEmailTempInterface(parmas);
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      props?.onAdd?.();
    }
  }
  async function updateTemplateInfo(parmas) {
    let { status, message: tipInfo } = await UpdateEmailTempInterface(parmas);
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      props?.onUpdate?.();
    }
  }
  useEffect(() => {
    if (!Object.values(crtData).length) return;
    form.setFieldValue("name", crtData.name);
    form.setFieldValue("note", crtData.note);
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
        colon={false}
        form={form}
        onFinish={templateSubmitCb}
        className="h-full clear_required px-[var(--gap20)] pt-[var(--gap20)] overflow-y-auto"
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="员工ID" />}
        >
          <Input disabled defaultValue={adminId} />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="邮箱类型" />}
        >
          <Input disabled={disabled} defaultValue={crtData.name} />
        </Form.Item>
        <Form.Item
          name="note"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="备注" />}
        >
          <Input disabled={disabled} defaultValue={crtData.note} />
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
          label={<LabelComp title="邮件内容" />}
        >
          <TextArea
            disabled={disabled}
            defaultValue={crtData.content}
            autoSize={{ minRows: 18 }}
          />
        </Form.Item>

        <>
          <Form.Item className="mb-0">
            <div className="flex justify-end">
              <Button
                className="h-[.36rem] w-[.9rem] leading-none  rounded-[4px]"
                onClick={cancelProcessCb}
              >
                取消
              </Button>
              {!disabled ? (
                <Button
                  className="h-[.36rem] w-[.9rem] ml-[var(--gap10)] leading-none rounded-[4px]"
                  type="primary"
                  htmlType="submit"
                >
                  确定{Object.values(crtData).length ? "更新" : "新增"}
                </Button>
              ) : null}
            </div>
          </Form.Item>
        </>
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
