import DividerComp from "@/Components/Divider";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { mergeClassName } from "@/utils/base";
import { ReactNode } from "react";
type splitCompType = {
  list: any[];
  onEditor?: Function;
  opertion?: ReactNode | undefined;
  className?: string;
  listClassName?: string;
};
const SplitComp = (props: splitCompType) => {
  let { list, onEditor, opertion } = props;
  function editorCb(item: any) {
    onEditor?.(item);
  }

  return (
    <ul className={props.className}>
      {list.map((item) => (
        <li
          className={mergeClassName(
            "grid items-center",
            `${props.listClassName ?? "grid-cols-[2rem_1fr] gap-[var(--gap30)]"}`
          )}
          key={item.id}
        >
          <span className="whitespace-nowrap text-[14px] text-[#333]">
            {item.title}
            {item.percentage ? "：" : ""}
          </span>
          <DividerComp
            dashed
            left={
              item.percentage ? (
                <span className="text-[14px] text-[#666]">
                  {item.percentage}%
                </span>
              ) : null
            }
            right={
              <RightModuleNode
                opertion={opertion}
                onEditor={() => editorCb(item)}
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};
const RightModuleNode = (props) => {
  let [stop] = useStopPropagation();
  function editorCb(e) {
    stop(e, () => {
      props?.onEditor?.();
    });
  }
  return props.opertion ? (
    <div onClick={editorCb} className="text-[var(--blue)] cursor-pointer">
      {props.opertion}
    </div>
  ) : null;
};
export default SplitComp;
