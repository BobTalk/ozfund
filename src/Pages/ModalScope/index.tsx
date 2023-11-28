import { forwardRef } from "react";
import ModalScope from "@/Pages/ModalComp";
const ModalScopeComp = forwardRef((props: any, ref: any) => {
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

export default ModalScopeComp