import { useStopPropagation } from "@/Hooks/StopPropagation";
import { mergeClassName } from "@/utils/base";

type MoreBtnType = {
  onMore?: Function;
  className?: string;
};
const MoreBtn = (props: MoreBtnType) => {
  let [stop] = useStopPropagation();
  function moreCb(e) {
    stop(e, () => {
      props?.onMore?.();
    });
  }
  return (
    <div
      className={mergeClassName(
        "pt-[var(--gap15)] pb-[.08rem] h-[63px]",
        props.className
      )}
    >
      <p className="grid place-items-center bg-[var(--white)] h-[.48rem] rounded-[var(--border-radius)]">
        <span
          onClick={moreCb}
          className="text-[14px] text-[#999] cursor-pointer"
        >
          查看更多
        </span>
      </p>
    </div>
  );
};
export default MoreBtn;
