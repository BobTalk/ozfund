import { language1Enum } from "@/Enum";
import {
  AddEmailTaskInterface,
  GetEmailAllTempInfoInterface,
  UpdateEmailTaskInterface,
} from "@/api";
import { formatEnum, mergeClassName } from "@/utils/base";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Select,
  message,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useState } from "react";

const AddTrendsModule = (props) => {
  let [form] = Form.useForm<{
    subject: string;
    content: string;
    sender: string;
    templateId: number;
    language: string;
    sendTime: string | Date;
  }>();
  let { crtData = {}, disabled } = props;
  let [crtDataInfo, setCrtDataInfo] = useState(() => {
    if (Object.values(crtData).length) {
      crtData.sendTime = dayjs(crtData.sendTime, "YYYY-mm-DD HH:mm:ss");
      return crtData;
    }
    return {};
  });
  let [allTemp, setAllTemp] = useState([]);
  function cancelProcessCb() {
    props?.onCancel();
  }
  function templateSubmitCb(values) {
    Object.values(crtDataInfo).length
      ? updateSendInfo({ ...values, id: crtDataInfo.id })
      : addSendInfo(values);
  }
  async function addSendInfo(parmas = {}) {
    let { status, message: tipInfo } = await AddEmailTaskInterface(parmas);
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      props?.onAdd?.();
    }
  }
  async function updateSendInfo(parmas) {
    let { status, message: tipInfo } = await UpdateEmailTaskInterface(parmas);
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      props?.onUpdate?.();
    }
  }
  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };
  async function getAllEmailTemp() {
    let { status, data } = await GetEmailAllTempInfoInterface();
    status && setAllTemp(data);
  }
  function templateChangeCb(value, option) {
    form.setFieldValue("content", option.content);
  }
  useLayoutEffect(() => {
    getAllEmailTemp();
  }, []);
  useEffect(() => {
    if (!Object.values(crtDataInfo).length) return;
    form.setFieldValue("subject", crtDataInfo.subject);
    form.setFieldValue("sender", crtDataInfo.sender);
    form.setFieldValue("templateId", crtDataInfo.templateId);
    form.setFieldValue("language", crtDataInfo.language);
    form.setFieldValue("sendTime", crtDataInfo.sendTime);
    form.setFieldValue("content", crtDataInfo.content);
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 44,
          borderRadius: 0,
          controlInteractiveSize: 16,
        },
        components: {
          Select: {
            colorTextPlaceholder: "rgba(0,0,0,0.08)",
          },
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
          name="sender"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="发布人" />}
        >
          <Input placeholder="发布人" allowClear disabled={disabled} />
        </Form.Item>
        <Form.Item
          name="subject"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="标题" />}
        >
          <Input allowClear placeholder="标题" disabled={disabled} />
        </Form.Item>
        <Form.Item
          name="templateId"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="选择模版" />}
        >
          <Select
            allowClear
            fieldNames={{
              label: "name",
              value: "id",
            }}
            onChange={templateChangeCb}
            options={allTemp}
            placeholder="选择模版"
          ></Select>
        </Form.Item>
        <Form.Item
          name="sendTime"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="选择时间" />}
        >
          <DatePicker
            allowClear
            placeholder="选择时间"
            showNow={false}
            locale={locale}
            className="w-full"
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={disabledDate}
            showTime={{
              defaultValue: dayjs("00:00:00", "HH:mm:ss"),
            }}
          />
        </Form.Item>
        <Form.Item
          name="language"
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
          className="mb-[var(--gap15)]"
          label={<LabelComp title="选择分类" />}
        >
          <Select
            allowClear
            placeholder="选择分类"
            options={formatEnum(language1Enum)}
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
          label={<LabelComp title="邮件内容" />}
        >
          <TextArea disabled={disabled} autoSize={{ minRows: 18 }} />
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
                  确定{Object.values(crtDataInfo).length ? "更新" : "新增"}
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
