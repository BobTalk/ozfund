import TabsComp from "@/Components/Tabs";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const BusinessMange = () => {
  const commonUrlPrefix = "/ozfund/work-mange/business-mange";
  let navigate = useNavigate();
  let { pathname } = useLocation();
  let tabsRefs = useRef<any>();
  let [tabsHeight, setTabsHeight] = useState<number>();
  function tabClickCb(key) {
    navigate(key);
  }
  useEffect(() => {
    let { height } = tabsRefs.current.getBoundingClientRect();
    setTabsHeight(height);
  }, []);
  return (
    <>
      <TabsComp
        defaultActiveKey={pathname}
        ref={tabsRefs}
        onTabClick={tabClickCb}
        className="bg-white pt-[2px] px-[var(--gap20)] rounded-[var(--border-radius)]"
        list={[
          { label: "自动空投地址", key: `${commonUrlPrefix}/aridrop-address` },
          { label: "批量转账", key: `${commonUrlPrefix}/batch-transfer` },
          { label: "提取合约中代币", key: `${commonUrlPrefix}/draws-contract` },
          { label: "TOTO解押", key: `${commonUrlPrefix}/release-custody` },
        ]}
      />
      <div
        style={{
          height: `calc(100% - ${tabsHeight}px - var(--gap15))`,
        }}
      >
        <Outlet />
      </div>
    </>
  );
};
export default BusinessMange;
