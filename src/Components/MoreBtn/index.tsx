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
    <p
      onClick={moreCb}
      className="py-[var(--gap14)] bg-[var(--white)] text-center rounded-[var(--border-radius)] mt-[var(--gap15)]"
    >
      <span className="text-[14px] text-[#999] cursor-pointer">查看更多</span>
    </p>
  );
};
export default MoreBtn;
