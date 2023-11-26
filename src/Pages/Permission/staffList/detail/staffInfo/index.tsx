import { EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { useState } from "react";

const StaffInfo = () => {
  let [staffInfo] = useState({});
  function countryCodeCb(val) {
    console.log("国家编号: ", val);
  }
  return (
    <div className="h-full bg-white mt-[var(--gap15)] rounded-[var(--border-radius)] p-[var(--gap20)]">
      <ul className="border border-[var(--border-color)]">
        <li className="grid grid-cols-[1.5rem_1fr_1.5rem_1fr] h-[.47rem] not-last:border-b border-[var(--border-color)]">
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-[var(--border-color)]">
            员工ID
          </span>
          <span className="flex items-center pl-[.4rem] border-r border-[var(--border-color)]">
            播报234
          </span>
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]">
            联系方式
          </span>
          <div className="flex items-center pl-[.4rem] w-full">
            <div className="w-full items-center flex justify-between pr-[var(--gap20)]">
              <ConfigProvider
                theme={{
                  components: {
                    Form: {
                      itemMarginBottom: 0,
                    },
                    Button: {
                      colorText: "var(--blue)",
                    },
                  },
                }}
              >
                {true ? (
                  <>
                    <span>+8617601630423</span>
                    <Button
                      type="link"
                      icon={<EditOutlined className="mr-[var(--gap10)]" />}
                    >
                      编辑
                    </Button>
                  </>
                ) : (
                  <Form className="flex w-full justify-between">
                    <Form.Item>
                      <Input
                        addonBefore={
                          <AddonBeforePhone onCountryCodeCb={countryCodeCb} />
                        }
                        placeholder="请输入联系方式"
                      />
                    </Form.Item>
                    <Form.Item className="mb-0">
                      <Button
                        type="link"
                        icon={<SaveOutlined />}
                        htmlType="submit"
                      >
                        保存
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </ConfigProvider>
            </div>
          </div>
        </li>
        <li className="grid grid-cols-[1.5rem_1fr_1.5rem_1fr] h-[.47rem] not-last:border-b border-[var(--border-color)]">
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-[var(--border-color)]">
            备注
          </span>
          <span className="flex items-center pl-[.4rem] border-r border-[var(--border-color)]">
            小红
          </span>
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]">
            创建时间
          </span>
          <div className="flex items-center pl-[.4rem]">
            <p>+8617601630423</p>
          </div>
        </li>
        <li className="grid grid-cols-[1.5rem_1fr_1.5rem_1fr] h-[.47rem] not-last:border-b border-[var(--border-color)]">
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-[var(--border-color)]">
            邮箱
          </span>
          <span className="flex items-center pl-[.4rem] border-r border-[var(--border-color)]">
            12222@163.com
          </span>
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]">
            创建人
          </span>
          <div className="flex items-center pl-[.4rem]">
            <p>flover</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
const AddonBeforePhone = (props) => {
  function selectChangeCb(val) {
    props?.onCountryCodeCb?.(val);
  }
  return (
    <div className="flex items-center">
      <PlusOutlined className="text-[14px] text-[#333]" />
      <Select
        className="text-[14px] text-[#333]"
        size="large"
        defaultValue="86"
        onChange={selectChangeCb}
        options={[{ value: "86", label: "86" }]}
      />
    </div>
  );
};
export default StaffInfo;
