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
          colorSplit: "var(--border-color)",
          colorText: "#666",
        },
      }}
    >
      <div className="flex w-full">
        {props.left ? (
          <div className={props.right ? "w-1/2" : "w-full"}>
            <Divider
              dashed={props.dashed}
              orientation="left"
              orientationMargin="0"
            >
              {props.left}
            </Divider>
          </div>
        ) : null}
        {props.right ? (
          <div className={props.left ? "w-1/2" : "w-full"}>
            <Divider
              dashed={props.dashed}
              orientation="right"
              orientationMargin={props.orientationMargin}
            >
              {props.right}
            </Divider>
          </div>
        ) : null}
      </div>
    </ConfigProvider>
  );
};
DividerComp.defaultProps = {
  orientationMargin: 0,
} as DividerCompType;
export default DividerComp;
