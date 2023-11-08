import ModalScope from "@/Components/Modal";
import { createStyles } from "antd-style";
import styleScope from "./index.module.less";
import { memo } from "react";
const useStyle = createStyles((obj, bool) => {
  return {
    "my-modal-body": {
      gap: ".15rem",
      paddingInline: bool ? ".5rem !important" : "0 !important",
      paddingBottom: bool ? ".3rem !important" : "0 !important",
    },
    "my-modal-mask": {
      boxShadow: `inset 0 0 15px #fff`,
    },
    "my-modal-header": {
      borderBottom: `1px solid var(--border-color)`,
      padding: ".2rem 0.3rem",
      marginBottom: ".2rem !important",
    },
    "my-modal-footer": {
      padding: ".2rem .3rem .24rem",
      borderTop: `1px solid var(--border-color)`,
      marginTop: `0 !important`,
    },
    "my-modal-content": {
      padding: `0 !important`,
    },
  };
});
const ModalComp = (props) => {
  let { showFooter = true } = props;
  const { styles } = useStyle(showFooter);
  const classNames = {
    body: styles["my-modal-body"],
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
  };
  return (
    <ModalScope
      cancelText="取消"
      onOk={props.onOk}
      onCancel={props.onCancel}
      classNames={classNames}
      showFooter={showFooter}
      open={props.modalOpen}
      title={
        <span className="flex items-center font-normal">
          <i className={styleScope["icon"]}></i>
          {props.title}
        </span>
      }
    >
      {props.children}
    </ModalScope>
  );
};
export default memo(ModalComp, (prv, next) => prv.modalOpen == next.modalOpen);
