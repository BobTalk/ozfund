import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
const CommonModule = (props) => {
  return (
    <div
      className={mergeClassName(
        "p-[.24rem] bg-[var(--white)] rounded-[.06rem]",
        `${props.className}`
      )}
      style={props.style}
    >
      <p className={styleScope["title"]}>
        <span>{props.title}</span>
        {props?.left}
      </p>
      {props.children}
    </div>
  );
};
export default CommonModule;
