import Icon from "@/Components/Icon";
import { Button, ConfigProvider, Form, Input, Switch } from "antd";
import ModalScope from "@/Pages/ModalComp";
import { forwardRef, useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalFooter from "@/Components/ModalFooterBtn";
const AccountManage = () => {
  let [stop] = useStopPropagation();
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<string>("提示信息");
  let [modalOpen, setModalOpen] = useState(false);
  let [customFooterModalOpen, setCustomFooterModalOpen] = useState(false);
  function accountStateChangeCb(bool) {
    moduleContent.current = tipMessage(
      `确认要${bool ? "启用" : "冻结"}此员工账户？`
    );
    setModalOpen(!modalOpen);
  }
  function submitModalCb(values) {
    moduleContent.current = resTip({ result: true, only: true });
    setModalOpen(!modalOpen);
    setCustomFooterModalOpen(!customFooterModalOpen);
  }
  function resetPwdCb(e) {
    stop(e, () => {
      moduleContent.current = ResetPwdTip;
      setModalOpen(!modalOpen);
    });
  }
  function colseAccountCb(value) {
    moduleContent.current = CloseAccountModle;
    setCustomFooterModalOpen(!customFooterModalOpen);
  }
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
                  <Switch onChange={accountStateChangeCb} />
                  <span>启用</span>
                </div>
              </div>
            </div>
          </li>
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
              <span className="text-[#666]">13475876868@163.com</span>
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
              <Switch onChange={colseAccountCb} />
            </div>
          </li>
        </ConfigProvider>
      </ul>
      <ModalComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={modalOpen}
        showFooter
        onCancel={() => setModalOpen(!modalOpen)}
        onOk={(values) => submitModalCb(values)}
      />
      <ModalComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={customFooterModalOpen}
        showFooter={false}
        onCancel={() => setCustomFooterModalOpen(!customFooterModalOpen)}
        onOk={(values) => setCustomFooterModalOpen(!customFooterModalOpen)}
      />
    </>
  );
};
const ModalComp = forwardRef((props: any, ref: any) => {
  function cancelCb(value) {
    props?.onCancel?.(value);
  }
  function okCb(values) {
    props?.onOk?.(values);
  }
  let CompName = props.content;
  return props.modalOpen ? (
    <ModalScope
      onCancel={cancelCb}
      onOk={okCb}
      showFooter={props.showFooter ?? false}
      modalOpen={true}
      body={{
        paddingInline: 0,
        paddingBlock: 0,
      }}
      footer={{
        paddingInline: props.showFooter ? 20 : 0,
        paddingBlock: props.showFooter ? 20 : 0,
      }}
      title={props.title}
    >
      <CompName onCancel={cancelCb} onOk={okCb} />
    </ModalScope>
  ) : null;
});

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
          onFinish={props.onOk}
          layout="vertical"
          className="mt-[var(--gap20)]"
        >
          <Form.Item
            className="mx-[var(--gap30)]"
            label={<span className="text-[var(--border-color)]">请输入确认关闭</span>}
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
