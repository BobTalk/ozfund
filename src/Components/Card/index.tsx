import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import { ReactNode } from "react";
import styleComp from "styled-components";
interface CardType {
  className?: string;
  style?: Object;
  bgImg?: string;
  children?: ReactNode;
  bgColor?: string;
  opacity?: number;
}

const Card = (props: CardType): ReactNode => {
  const CardComp = styleComp.div`
    ${(props: CardType) => formatImg(props["bg-img"])};
    ${(props: CardType) => ColorFormat(props["bg-color"])};
`;
  function formatImg(imgUrl) {
    if (imgUrl.startsWith("linear-gradient")) {
      return `background-image:${imgUrl}`;
    } else {
      return `background-image:url('${imgUrl}')`;
    }
  }
  function ColorFormat(color: string) {
    if (!color) return "";
    if (color.startsWith("linear-gradient")) {
      return formatImg(color);
    }
    if (color.startsWith("rgba")) return `background-color:${color}`;
    if (color.startsWith("rgb")) {
      return `background-color:rgba(${(color.slice(4, -1), props.opacity)})`;
    }
    return hexToRgba(color, props.opacity);
  }
  function hexToRgba(hex, opacity) {
    return (
      "background-color: rgba(" +
      parseInt("0x" + hex.slice(1, 3)) +
      "," +
      parseInt("0x" + hex.slice(3, 5)) +
      "," +
      parseInt("0x" + hex.slice(5, 7)) +
      "," +
      opacity +
      ")"
    );
  }
  return (
    <CardComp
      bg-img={props.bgImg}
      bg-color={props.bgColor}
      className={mergeClassName(styleScope["_card-box"], `${props.className}`)}
      style={props.style}
    >
      {props.children}
    </CardComp>
  );
};
Card.defaultProps = {
  opacity: 1,
  className: "",
  style: {},
  bgImg: "",
  children: <></>,
  bgColor: "",
};
export default Card;
