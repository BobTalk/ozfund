import Icon from "@/Components/Icon";
import { Button, ConfigProvider, Form, Input, Switch, message } from "antd";
import { useLayoutEffect, useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalFooter from "@/Components/ModalFooterBtn";
import ModalScopeComp from "@/Pages/ModalScope";
import { useLocation } from "react-router-dom";
import {
  CloseAccountInterface,
  GetAdminInfoInterface,
  ResetPwdInterface,
  SwitchFreezeAccountInterface,
} from "@/api";
const AccountManage = () => {
  let [stop] = useStopPropagation();
  let moduleContent = useRef<any>();
  let hasShowModalFooter = useRef<boolean>(true);
  let moduleTitle = useRef<string>("提示信息");
  let moduleFlag = useRef<string>("");
  let { state } = useLocation();
  let [pageInfo, setPageInfo] = useState<any>({});
  let [modalOpen, setModalOpen] = useState(false);
  let [customFooterModalOpen, setCustomFooterModalOpen] = useState(false);
  function accountStateChangeCb(bool) {
    moduleContent.current = tipMessage(
      `确认要${bool ? "启用" : "冻结"}此员工账户？`
    );
    hasShowModalFooter.current = true;
    moduleFlag.current = "accountState";
    setModalOpen(!modalOpen);
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
      setPageInfo(userInfo);
    } else {
      message.error(tipInfo);
    }
  }

  async function submitModalCb(values) {
    if (moduleFlag.current == "accountState") {
      let { status } = await SwitchFreezeAccountInterface({
        adminId: state.adminId,
      });
      if (status) {
        setPageInfo((pageInfo) => ({
          ...pageInfo,
          state: pageInfo.state == 1 ? 2 : 1,
        }));
      }
      moduleContent.current = resTip({ result: status, only: true });
      setModalOpen(!modalOpen);
      setCustomFooterModalOpen(!customFooterModalOpen);
    } else if (moduleFlag.current == "resetPwd") {
      let { status, message: tipInfo } = await ResetPwdInterface({
        adminId: state.adminId,
      });
      moduleContent.current = resTip({ result: status, only: true });
      setModalOpen(!modalOpen);
      setCustomFooterModalOpen(!customFooterModalOpen);
    } else if (moduleFlag.current == "closeAccount") {
      let { status } = await CloseAccountInterface({ adminId: state.adminId });
      hasShowModalFooter.current = false;
      setModalOpen(!modalOpen);
      if (status) {
        setPageInfo((pageInfo) => ({
          ...pageInfo,
          state: 3,
        }));
      }
      setCustomFooterModalOpen(!customFooterModalOpen);
      moduleContent.current = resTip({ result: status, only: true });
    } else {
      console.warn("暂无数据处理");
    }
  }
  function resetPwdCb(e) {
    stop(e, () => {
      hasShowModalFooter.current = true;
      moduleFlag.current = "resetPwd";
      moduleContent.current = ResetPwdTip;
      setModalOpen(!modalOpen);
    });
  }
  function closeAccountCb(e) {
    stop(e, () => {
      hasShowModalFooter.current = false;
      moduleFlag.current = "closeAccount";
      moduleContent.current = CloseAccountModle;
      setModalOpen(!modalOpen);
    });
  }
  function closeAccountModalOkCb() {
    setCustomFooterModalOpen(!customFooterModalOpen);
  }
  useLayoutEffect(() => {
    getInfoList();
  }, []);
  return (
    <>
      <ul className="h-full px-[var(--gap30)] py-[.05rem] mt-[var(--gap15)] bg-white overflow-y-auto rounded-[var(--border-radius)]">
        <ConfigProvider
          theme={{
            components: {
              Switch: {
                trackMinWidth: 36,
                trackHeight: 20,
                handleSize: 16,
                // handleBg: "#e6f2fd"
              },
            },
            token: {
              colorPrimary: "#0385f3",
              colorPrimaryHover: "#0385f3",
            },
          }}
        >
          {pageInfo.state != 3 ? (
            <li className="grid grid-cols-[.3rem_1fr] gap-x-[var(--gap10)] items-center">
              <Icon
                name="h-icon-status"
                purity={false}
                style={{
                  fontSize: ".3rem",
                }}
              />
              <div className="flex border-b border-dashed border-b-[var(--border-color)] py-[var(--gap25)] justify-between">
                <span className="text-[#666]">账户状态</span>
                <div className="flex gap-[var(--gap10)] text-[#666]">
                  <span>冻结</span>
                  <div className="flex gap-[var(--gap10)]">
                    <Switch
                      onChange={accountStateChangeCb}
                      checked={pageInfo.state == 1 ? true : false}
                    />
                    <span>启用</span>
                  </div>
                </div>
              </div>
            </li>
          ) : null}
          <li className="grid grid-cols-[.3rem_1fr] gap-x-[var(--gap10)] items-center">
            <Icon
              name="h-icon-email"
              purity={false}
              style={{
                fontSize: ".3rem",
              }}
            />
            <div className="flex border-b border-dashed border-b-[var(--border-color)] py-[var(--gap25)] justify-between">
              <span className="text-[#666]">邮箱</span>
              <span className="text-[#666]">{pageInfo.email || "--"}</span>
            </div>
          </li>
          <li className="grid grid-cols-[.3rem_1fr] gap-x-[var(--gap10)] items-center">
            <Icon
              name="h-icon-sign"
              purity={false}
              style={{
                fontSize: ".3rem",
              }}
            />
            <div className="flex border-b border-dashed border-b-[var(--border-color)] py-[var(--gap25)] justify-between">
              <span className="text-[#666]">登录密码</span>
              <span
                className="text-[#0459BF] cursor-pointer"
                onClick={resetPwdCb}
              >
                重置
              </span>
            </div>
          </li>
          <li className="grid grid-cols-[.3rem_1fr] gap-x-[var(--gap10)] items-center">
            <Icon
              name="h-icon-close1"
              purity={false}
              style={{
                fontSize: ".3rem",
              }}
            />
            <div className="flex py-[var(--gap25)] justify-between">
              <span className="text-[#666]">
                <span className="mr-[var(--gap10)]">关闭账户</span>
                <span className="text-[var(--blue)]">账户关闭后将无法使用</span>
              </span>
              {pageInfo.state == 3 ? (
                <span>已关闭</span>
              ) : (
                <span
                  className="cursor-pointer text-[#666]"
                  onClick={closeAccountCb}
                >
                  关闭
                </span>
              )}
              {/* <Switch onChange={closeAccountCb} /> */}
            </div>
          </li>
        </ConfigProvider>
      </ul>
      <ModalScopeComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={modalOpen}
        showFooter={hasShowModalFooter.current}
        onCancel={() => setModalOpen(!modalOpen)}
        onOk={(values) => submitModalCb(values)}
      />
      <ModalScopeComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={customFooterModalOpen}
        showFooter={false}
        onCancel={() => setCustomFooterModalOpen(!customFooterModalOpen)}
        onOk={closeAccountModalOkCb}
      />
    </>
  );
};
function resTip(params) {
  let [stop] = useStopPropagation();
  return (props) => {
    function submitCb(e) {
      stop(e, () => {
        props?.onOk();
      });
    }
    return (
      <>
        <div className="grid place-items-center py-[var(--gap30)]">
          {params.result ? (
            <>
              <Icon
                purity={false}
                style={{ fontSize: ".5rem" }}
                name="h-icon-right"
              />
              <p className="mt-[var(--gap20)]">操作成功</p>
            </>
          ) : (
            <>
              <Icon purity={false} name="h-icon-error" />
              <p className="mt-[var(--gap20)]">操作失败</p>
            </>
          )}
        </div>
        <ModalFooter only={params.only} onSubmit={submitCb} />
      </>
    );
  };
}
function ResetPwdTip() {
  return tipMessage(
    "<p>确认要重置登录密码，密码将重置为</p>123456，请及时修改密码"
  )();
}
function CloseAccountModle(props) {
  let [stop] = useStopPropagation();
  let [formInitVal] = useState({
    confirmInfo: "",
  });
  function cancelCb(e) {
    stop(e, () => {
      props?.onCancel?.();
    });
  }
  return (
    <div className="pt-[var(--gap30)]">
      <p className="text-center pb-[var(--gap20)] border-b border-b-[#e6e6e6] mx-[var(--gap30)]">
        确认要关闭此员工账户，关闭后将无法恢复？
      </p>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 30,
            },
            Input: {
              controlHeight: 42,
            },
          },
        }}
      >
        <Form
          className="clear_required mt-[var(--gap20)]"
          onFinish={props.onOk}
          layout="vertical"
          initialValues={formInitVal}
        >
          <Form.Item
            name="confirmInfo"
            rules={[
              {
                required: true,
                pattern: /确认关闭/gi,
                message: "输入《确认关闭》",
              },
            ]}
            className="mx-[var(--gap30)]"
            label={
              <span className="text-[var(--border-color)]">请输入确认关闭</span>
            }
          >
            <Input />
          </Form.Item>
          <Form.Item className="mb-0">
            <ModalFooter onCancel={(e) => cancelCb(e)} />
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
}
function tipMessage(summary) {
  return () => (
    <div
      className="grid p-[var(--gap30)] place-items-center"
      dangerouslySetInnerHTML={{ __html: summary }}
    ></div>
  );
}
export default AccountManage;
