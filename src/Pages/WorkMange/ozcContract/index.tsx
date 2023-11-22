import Tabs from "@/Components/Tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const OzcContract = () => {
  const commonUrlPrefix = "/ozfund/work-mange/ozc-contract";
  let { pathname } = useLocation();
  let navigate = useNavigate();
  function tabClickCb(key) {
    navigate(key);
  }
  return (
    <>
      <Tabs
        defaultActiveKey={pathname}
        onTabClick={tabClickCb}
        className="bg-white pt-[2px] px-[.2rem] rounded-[var(--border-radius)]"
        list={[
          { label: "增发OZC", key: `${commonUrlPrefix}/publish-ozc` },
          { label: "冻结地址", key: `${commonUrlPrefix}/frezz-address` },
          { label: "销毁地址", key: `${commonUrlPrefix}/destroy-address` },
          {
            label: "可兑换代币新增与移除",
            key: `${commonUrlPrefix}/add-delete`,
          },
        ]}
      />
      <Outlet />
    </>
  );
};

export default OzcContract;
