import { ConfigProvider, Divider } from "antd";
import { ReactNode } from "react";
type DividerCompType = {
  dashed?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  orientationMargin?: string | number;
};
const DividerComp = (props: DividerCompType) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          margin: 12,
        },
      }}
    >
      <div className="flex w-full">
        <div className="w-1/2">
          <Divider
            dashed={props.dashed}
            orientation="left"
            orientationMargin="0"
          >
            {props.left}
          </Divider>
        </div>
        <div className="w-1/2">
          <Divider
            dashed={props.dashed}
            orientation="right"
            className="w-1/2"
            orientationMargin={props.orientationMargin}
          >
            {props.right}
          </Divider>
        </div>
      </div>
    </ConfigProvider>
  );
};
DividerComp.defaultProps = {
  orientationMargin: 0,
} as DividerCompType;
export default DividerComp;
