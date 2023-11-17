import { Tabs } from "antd";
import styleScope from "./index.module.less";
import { mergeClassName } from "@/utils/base";
import { CSSProperties } from "styled-components";
import { useStopPropagation } from "@/Hooks/StopPropagation";
type tabsCompType = {
  className?: string;
  style?: CSSProperties;
  list: Array<{ label: string; key: any }>;
  onTabClick?: Function;
};
const TabsComp = (props: tabsCompType) => {
  let [stop] = useStopPropagation();
  function tabClickCb(key, event) {
    stop(event, () => {
      props?.onTabClick?.(key);
    });
  }
  return (
    <Tabs
      onTabClick={tabClickCb}
      className={mergeClassName(styleScope["_tabs-box"], `${props.className}`)}
      style={props.style}
      items={props.list}
    />
  );
};
TabsComp.defaultProps = {
  list: [],
  style: {},
};
export default TabsComp;
