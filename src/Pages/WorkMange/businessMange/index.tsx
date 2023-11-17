import TabsComp from "@/Components/Tabs";
import { Outlet, useNavigate } from "react-router-dom";

const BusinessMange = () => {
  const commonUrlPrefix = "/ozfund/work-mange/business-mange";
  let navigate = useNavigate();
  function tabClickCb(key) {
    navigate(key);
  }
  return (
    <>
      <TabsComp
        onTabClick={tabClickCb}
        className="bg-white pt-[2px] px-[.2rem] rounded-[var(--border-radius)]"
        list={[
          { label: "自动空投地址", key: `${commonUrlPrefix}/aridrop-address` },
          { label: "批量转账", key: `${commonUrlPrefix}/batch-transfer` },
          { label: "提取合约中代币", key: `${commonUrlPrefix}/draws-contract` },
          { label: "TOTO解押", key: `${commonUrlPrefix}/release-custody` },
        ]}
      />
      <Outlet />
    </>
  );
};
export default BusinessMange;
