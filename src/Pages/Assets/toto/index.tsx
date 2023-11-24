import Tabs from "@/Components/Tabs";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Toto = () => {
  let commonUrlPrefix = "/ozfund/assets/toto";
  let tabsRefs = useRef<any>();
  let { pathname } = useLocation();
  let navigate = useNavigate();
  let [tabsHeight, setTabsHeight] = useState(0);
  function tabClickCb(key: string) {
    navigate(key);
  }
  useEffect(() => {
    let { height } = tabsRefs.current.getBoundingClientRect();
    setTabsHeight(height);
  }, []);
  return (
    <>
      <Tabs
        ref={tabsRefs}
        defaultActiveKey={pathname}
        onTabClick={tabClickCb}
        className="bg-white pt-[2px] px-[var(--gap20)] rounded-[var(--border-radius)]"
        list={[
          {
            label: "TOTO分配统计",
            key: `${commonUrlPrefix}/allocation-statistics`,
          },
          {
            label: "TOTO资产统计",
            key: `${commonUrlPrefix}/assets-statistics`,
          },
        ]}
      />
      <div
        className="mt-[var(--gap15)]"
        style={{
          height: `calc(100% - ${tabsHeight}px - var(--gap15))`,
        }}
      >
        <Outlet />
      </div>
    </>
  );
};
export default Toto;
