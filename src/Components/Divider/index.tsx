import { Divider } from "antd";
import { ReactNode } from "react";
type DividerCompType = {
  dashed?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  orientationMargin?: string | number;
};
const DividerComp = (props: DividerCompType) => {
  return (
    <div className="flex w-full">
      <div className="w-1/2">
        <Divider dashed={props.dashed} orientation="left" orientationMargin="0">
          {props.left}
        </Divider>
      </div>
      <div className="w-1/2">
        <Divider
          dashed={props.dashed}
          orientation="right"
          className="w-1/2"
          orientationMargin="0"
        >
          {props.right}
        </Divider>
      </div>
    </div>
  );
};
DividerComp.defaultProps = {} as DividerCompType;
export default DividerComp;
