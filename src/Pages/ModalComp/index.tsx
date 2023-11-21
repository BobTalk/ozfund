import ModalScope from "@/Components/Modal";
import { createStyles } from "antd-style";
import { memo } from "react";
const useStyle = createStyles((obj, { bool, props }) => {
  // props.style结构 ==> {
  //   header:{},
  //   body:{}
  // }
  let { body = {}, mask = {}, header = {}, footer = {}, content = {} } = props;
  return {
    "my-modal-body": body,
    "my-modal-mask": Object.assign(
      {
        boxShadow: `inset 0 0 15px #fff`,
      },
      mask
    ),

    "my-modal-header": Object.assign(
      {
        borderBottom: `1px solid var(--border-color)`,
        padding: ".2rem .3rem",
        marginBottom: `0 !important`,
      },
      header
    ),
    "my-modal-footer": Object.assign(
      {
        borderTop: `1px solid var(--border-color)`,
        marginTop: `0 !important`,
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
const ModalComp = (props) => {
  let { showFooter = true } = props;
  const { styles } = useStyle({ showFooter, props });
  const classNames = {
    body: styles["my-modal-body"],
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
  };
  return (
    <ModalScope
      cancelText={props.cancelText ?? "取消"}
      onOk={props.onOk}
      onCancel={props.onCancel}
      classNames={classNames}
      showFooter={showFooter}
      open={props.modalOpen}
      classTitleName={props.classTitleName}
      showTitleIcon={props.showTitleIcon ?? true}
      classIconName={props.classIconName}
      title={props.title}
    >
      {props.children}
    </ModalScope>
  );
};
export default memo(ModalComp, (prv, next) => prv.modalOpen == next.modalOpen);
