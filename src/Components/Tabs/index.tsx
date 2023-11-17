import { Tabs } from "antd";
import styleScope from "./index.module.less";
import { mergeClassName } from "@/utils/base";
import { CSSProperties } from "styled-components";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Fragment, forwardRef } from "react";
type tabsCompType = {
  className?: string;
  style?: CSSProperties;
  list: Array<{ label: string; key: any }>;
  onTabClick?: Function;
};
const TabsComp = (props: tabsCompType, ref) => {
  let [stop] = useStopPropagation();
  function tabClickCb(key, event) {
    stop(event, () => {
      props?.onTabClick?.(key);
    });
  }
  return (
    <div ref={ref}>
      <Tabs
        onTabClick={tabClickCb}
        className={mergeClassName(
          styleScope["_tabs-box"],
          `${props.className}`
        )}
        style={props?.style}
        items={props.list}
      />
    </div>
  );
};

export default forwardRef(TabsComp);
