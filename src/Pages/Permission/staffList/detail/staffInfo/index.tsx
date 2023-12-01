import { countryCodeEnum } from "@/Enum";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { GetAdminInfoInterface, UpdateInfoInterface } from "@/api";
import { formatEnum, timeFormate } from "@/utils/base";
import { EditFilled, EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select, message } from "antd";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const StaffInfo = () => {
  let { state } = useLocation();
  let [userInfo, setUserInfo] = useState<any>({});
  let [isEditor, setIsEditor] = useState(true);
  let [formList] = useState({
    mobile: "",
  });
  let [stop] = useStopPropagation();
  function countryCodeCb(val) {
    setUserInfo((user) => ({ ...user, countryCode: val }));
  }
  async function getInfoList() {
    let {
      status,
      message: tipInfo,
      code,
      ...userInfo
    } = await GetAdminInfoInterface({
      adminId: state.adminId,
    });
    if (status) {
      let [code, phone] = userInfo?.mobile?.split(" ");
      phone = code.length > 5 ? code : phone;
      code = code.length > 5 ? 86 : code;
      userInfo.countryCode = code;
      userInfo.mobile = phone;
      setUserInfo(userInfo);
    } else {
      message.error(tipInfo);
    }
  }
  function editorCb(e) {
    stop(e, () => {
      setIsEditor(!isEditor);
    });
  }
  async function updateMobile({mobile}) {
    let {status, message:tipInfo} = await UpdateInfoInterface({
      adminId: state.adminId,
      mobile: userInfo.countryCode + " " + mobile,
    });
    message[status?"success":"error"](tipInfo)
    setIsEditor(!isEditor)
  }
  useLayoutEffect(() => {
    getInfoList();
  }, []);
  return (
    <div className="h-full bg-white mt-[var(--gap15)] rounded-[var(--border-radius)] p-[var(--gap20)]">
      <ul className="border border-[var(--border-color)]">
        <li className="grid grid-cols-[1.5rem_1fr_1.5rem_1fr] h-[.47rem] not-last:border-b border-[var(--border-color)]">
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-[var(--border-color)]">
            员工ID
          </span>
          <span className="flex items-center pl-[.4rem] border-r border-[var(--border-color)]">
            {userInfo.adminId || "--"}
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
                {isEditor ? (
                  <>
                    <span className="flex items-center">
                      +{userInfo.countryCode} {userInfo.mobile || "--"}
                    </span>
                    <Button
                      onClick={editorCb}
                      type="link"
                      icon={<EditFilled className="mr-[var(.05rem)]" />}
                    >
                      编辑
                    </Button>
                  </>
                ) : (
                  <Form
                    onFinish={updateMobile}
                    initialValues={formList}
                    className="flex w-full justify-between"
                  >
                    <Form.Item name="mobile">
                      <Input
                        addonBefore={
                          <AddonBeforePhone
                            countryCode={userInfo.countryCode}
                            onCountryCodeCb={countryCodeCb}
                          />
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
            {userInfo.note}
          </span>
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]">
            创建时间
          </span>
          <div className="flex items-center pl-[.4rem]">
            <p>{timeFormate(userInfo.createTime)}</p>
          </div>
        </li>
        <li className="grid grid-cols-[1.5rem_1fr_1.5rem_1fr] h-[.47rem] not-last:border-b border-[var(--border-color)]">
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-[var(--border-color)]">
            邮箱
          </span>
          <span className="flex items-center pl-[.4rem] border-r border-[var(--border-color)]">
            {userInfo.email || "--"}
          </span>
          <span className="bg-[#f8f9fa] text-[#666] flex items-center justify-center border-r border-l border-[var(--border-color)]">
            创建人
          </span>
          <div className="flex items-center pl-[.4rem]">
            <p>{userInfo.creator || "--"}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
const AddonBeforePhone = (props) => {
  let countryCodeObj = JSON.parse(JSON.stringify(countryCodeEnum));
  function selectChangeCb(val) {
    props?.onCountryCodeCb?.(val);
  }
  return (
    <div className="flex items-center">
      <PlusOutlined className="text-[14px] text-[#333]" />
      <Select
        className="text-[14px] text-[#333] w-[.76rem]"
        size="large"
        optionLabelProp="value"
        value={props.countryCode}
        onChange={selectChangeCb}
        options={formatEnum(countryCodeEnum)}
      />
    </div>
  );
};
export default StaffInfo;
