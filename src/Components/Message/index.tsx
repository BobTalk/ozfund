import { Alert as AlertComp } from "antd";
import { ReactNode, forwardRef, memo } from "react";
import styleScope from "./index.module.less";
import { mergeClassName } from "@/utils/base";
type PropsType = {
  message: ReactNode | string | null;
  showIcon: true;
  type?: "success" | "info" | "warning" | "error";
  description?: string;
  onClose?: Function;
  prvIcon?: ReactNode;
  showCloseIcon?: boolean;
  action?: ReactNode;
  className?: string;
  style?: Object;
};
const Message = forwardRef((props: PropsType, ref: any) => {
  return (
    <div ref={ref}>
      <AlertComp
        className={mergeClassName(
          styleScope["_alert-box"],
          `${props.className}`
        )}
        style={props.style}
        action={props.action}
        closable={props.showCloseIcon}
        icon={props.prvIcon}
        showIcon={props.showIcon}
        message={props.message}
        type={props.type}
        onClose={(e) => props?.onClose(e)}
        description={props.description}
      />
    </div>
  );
});
Message.defaultProps = {
  message: "",
  action: <></>,
  showIcon: true,
  type: "info",
  description: "",
  onClose: (e: MouseEvent): void => {},
  showCloseIcon: false,
  prvIcon: <></>,
  className: "",
  style: {},
};
export default memo(
  Message,
  (prv: any, next: any) => prv.message == next.message
);
