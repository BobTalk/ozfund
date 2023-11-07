import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Modal } from "antd";
import { createStyles } from "antd-style";
import { memo } from "react";
const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    display: "grid",
    gridTemplateColumns: `repeat(4, 1fr)`,
    gap: ".15rem",
    paddingInline: ".5rem",
    placeItems: "center",
    minHeight: ".99rem",
  },
  "my-modal-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-modal-header": {
    borderBottom: `1px solid var(--border-color)`,
    padding: ".2rem 0.3rem",
  },
  "my-modal-footer": {
    padding: ".2rem .3rem .24rem",
    borderTop: `1px solid var(--border-color)`,
  },
  "my-modal-content": {
    padding: `0 !important`,
  },
}));
const ModalScope = memo(
  (props: any) => {
    const { styles } = useStyle();
    const classNames = {
      body: styles["my-modal-body"],
      mask: styles["my-modal-mask"],
      header: styles["my-modal-header"],
      footer: styles["my-modal-footer"],
      content: styles["my-modal-content"],
    };
    const modalStyles = {
      header: {
        marginBottom: ".24rem",
      },
      body: {
        gridTemplateColumns: "1fr",
        padding: 0,
      },
    };
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
        footer={props.showFooter ? undefined : null}
        cancelText={props.cancelText}
        okText={props.okText ?? "确定"}
        onCancel={cancelCb}
        title={props.title}
        classNames={props.classNames ?? classNames}
        styles={props.style ?? modalStyles}
      >
        {props.children}
      </Modal>
    );
  },
  (prv, next) => prv.open === next.open
);
export default ModalScope;
