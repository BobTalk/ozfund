import { EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { ModalTitle } from "@/Components/Modal";
import { useState } from "react";
import { mergeClassName } from "@/utils/base";

const Personal = () => {
  return (
    <div className="bg-white mt-[var(--gap15)] rounded-[var(--border-radius)] p-[var(--gap20)]">
      <Title title="基本资料" />
      <ListItem />
      <Title title="安全信息" className="pt-[var(--gap30)]" />
      <ul className="border border-[var(--border-color)]">
        <li className="grid grid-cols-[1.5rem_1fr_1.5rem_1fr] h-[.47rem] not-last:border-b border-[var(--border-color)]">
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-[var(--border-color)]">
            邮箱
          </span>
          <span className="flex items-center pl-[.4rem] border-r border-[var(--border-color)]">
            13475876868@163.com
          </span>
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]">
            登录密码
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
                {false ? (
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
                      <Input.Password/>
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
const ListItem = (props) => {
  function countryCodeCb(val) {
    console.log("国家编号: ", val);
  }
  return (
    <ul className="border border-[var(--border-color)]">
      <li className="grid grid-cols-[1.5rem_1fr_1.5rem_1fr] h-[.47rem] not-last:border-b border-[var(--border-color)]">
        <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-[var(--border-color)]">
          员工ID
        </span>
        <span className="flex items-center pl-[.4rem] border-r border-[var(--border-color)]">
          播报234
        </span>
        <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]">
          创建时间
        </span>
        <span className="flex items-center pl-[.4rem]">+8617601630423</span>
      </li>
      <li className="grid grid-cols-[1.5rem_1fr_1.5rem_1fr] h-[.47rem] not-last:border-b border-[var(--border-color)]">
        <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-[var(--border-color)]">
          备注
        </span>
        <span className="flex items-center pl-[.4rem] border-r border-[var(--border-color)]">
          小红
        </span>
        <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]">
          创建人
        </span>
        <span className="flex items-center pl-[.4rem]">+8617601630423</span>
      </li>
      <li className="grid grid-cols-[1.5rem_1fr_1.5rem_1fr] h-[.47rem] not-last:border-b border-[var(--border-color)]">
        <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]">
          联系方式
        </span>
        <span className="flex items-center pl-[.4rem] border-r border-[var(--border-color)]">
          flover
        </span>
        <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]"></span>
        <span className="flex items-center pl-[.4rem]"></span>
      </li>
    </ul>
  );
};
const Title = ({ title, className = "" }) => {
  return (
    <ModalTitle
      showTitleIcon
      classTitleName={mergeClassName(
        "pb-[var(--gap20)] mb-[var(--gap20)]  border-b border-b-[#e6e6e6]",
        className
      )}
      classIconName="w-[.03rem] h-[.13rem]"
      title={<p className="text-[16px] text-[#333]">{title}</p>}
    />
  );
};
export default Personal;
