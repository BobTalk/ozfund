import { mergeClassName } from "@/utils/base";
import { ReactNode } from "react";

export type ImageType = {
  src: string;
  top?: ReactNode | null;
  bottom?: ReactNode | null;
  children?: ReactNode | null;
  className?: string;
  style?: Object;
  imgClassName?: string;
  imgStyle?: Object;
};
const Image = (props: ImageType) => {
  return (
    <figure className={props.className} style={props.style}>
      {props.top ? <figcaption>{props.top}</figcaption> : null}
      <img
        src={props.src}
        className={props.imgClassName}
        style={props.imgStyle}
      />
      {props.children ? (
        <figcaption>{props.children}</figcaption>
      ) : props.bottom ? (
        <figcaption>{props.bottom}</figcaption>
      ) : null}
    </figure>
  );
};
Image.defaultProps = {
  src: "",
  top: null,
  bottom: null,
  children: null,
  className: "grid place-content-center",
  style: {},
  imgClassName: "",
  imgStyle: {},
};
export default Image;
