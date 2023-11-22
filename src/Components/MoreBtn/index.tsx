import { useStopPropagation } from "@/Hooks/StopPropagation";

type MoreBtnType = {
  onMore?: Function;
};
const MoreBtn = (props: MoreBtnType) => {
  let [stop] = useStopPropagation();
  function moreCb(e) {
    stop(e, () => {
      props?.onMore?.();
    });
  }
  return (
    <div className="pt-[var(--gap15)] pb-[.08rem]">
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
