import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Modal } from "antd";
import styleScope from "./index.module.less";
import { memo } from "react";
import { mergeClassName } from "@/utils/base";
const ModalScope = (props: any) => {
  let [stop] = useStopPropagation();
  function okCb(e) {
    stop(e, () => {
      props?.onOk(!props.open);
    });
  }
  function cancelCb(e) {
    stop(e, () => {
      props?.onCancel(!props.open);
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
      classNames={props.classNames}
      styles={props.style}
    >
      {props.children}
    </Modal>
  );
};
const ModalTitle = (props) => {
  return props.showTitleIcon ? (
    <div className={mergeClassName("flex items-center font-normal", props.classTitleName)}>
      <i className={mergeClassName(styleScope["icon"], props.classIconName)}></i>
      {props.title}
    </div>
  ) : (
    <>{props.title}</>
  );
};
export {ModalTitle}
export default memo(ModalScope, (prv, next) => prv.open === next.open);
