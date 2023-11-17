import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Modal } from "antd";
import styleScope from "./index.module.less";
import { createStyles } from "antd-style";
import { memo } from "react";
const useStyle = createStyles((obj, props: any) => {
  let {
    body = {},
    mask = {},
    header = {},
    footer = {},
    content = {},
  } = props ?? {};
  return {
    "my-modal-body": Object.assign(
      {
        display: "grid",
        minHeight: ".99rem",
      },
      body
    ),
    "my-modal-mask": Object.assign(
      {
        boxShadow: `inset 0 0 15px #fff`,
      },
      mask
    ),
    "my-modal-header": Object.assign(
      {
        borderBottom: `1px solid var(--border-color)`,
        padding: ".2rem 0.3rem",
      },
      header
    ),
    "my-modal-footer": Object.assign(
      {
        padding: ".2rem .3rem .24rem",
        borderTop: `1px solid var(--border-color)`,
      },
      footer
    ),
    "my-modal-content": Object.assign(
      {
        padding: `0 !important`,
      },
      content
    ),
  };
});
const ModalScope = (props: any) => {
  const { styles } = useStyle(props);
  const classNames = {
    body: styles["my-modal-body"],
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
  };
  // props.style结构 ==> {
  //   header:{},
  //   body:{}
  // }
  let [stop] = useStopPropagation();
  function okCb(e) {
    stop(e, () => {
      props?.onOk();
    });
  }
  function cancelCb(e) {
    stop(e, () => {
      props?.onCancel();
    });
  }
  return (
    <Modal
      maskClosable={false}
      open={props.open}
      onOk={okCb}
      centered={true}
      keyboard={false}
      footer={props.showFooter ? undefined : null}
      cancelText={props.cancelText ?? "取消"}
      okText={props.okText ?? "确定"}
      onCancel={cancelCb}
      title={<ModalTitle {...props} />}
      classNames={classNames}
      styles={props.style}
    >
      {props.children}
    </Modal>
  );
};
const ModalTitle = (props) => {
  return props.showTitleIcon ? (
    <span className="flex items-center font-normal">
      <i className={styleScope["icon"]}></i>
      {props.title}
    </span>
  ) : (
    <>{props.title}</>
  );
};
export default memo(ModalScope, (prv, next) => prv.open === next.open);
