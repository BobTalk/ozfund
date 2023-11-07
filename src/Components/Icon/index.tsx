import React from "react";
import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import styleComp from "styled-components";
type IconProps = {
  name: string;
  className?: string;
  style?: StyleSheet;
  purity?: boolean;
  size?: "small" | "middle" | "large";
};
const IComp = styleComp.i`
  width: ${(props) => props?.style?.fontSize ?? "16px"};
  color: ${(props) => props?.style?.color ?? "currentColor !important"};
`;
const Icon = (props) => {
  let { name, className, style, size, purity } = props;
  return purity ? (
    <i
      className={mergeClassName(
        "iconfont",
        `${styleScope["font-box"]} ${styleScope[size]} ${name} ${className} `
      )}
      style={style}
    ></i>
  ) : (
    <IComp
      className={mergeClassName(
        `${styleScope["font-box"]} ${styleScope[size]} ${className} `
      )}
      style={style}
    >
      <svg aria-hidden="true" width="100%" height="100%">
        <use xlinkHref={"#" + name} />
      </svg>
    </IComp>
  );
};
Icon.defaultProps = {
  name: "",
  className: "",
  style: {},
  size: "small",
  purity: true,
};
export default Icon;
