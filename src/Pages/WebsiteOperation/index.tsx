import Tabs from "@/Components/Tabs";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const WebSiteOperation = () => {
  let commonUrlPrefix = "/ozfund/work-mange/ozc-contract";
  let tabsRefs = useRef<any>();
  let { pathname } = useLocation();
  let navigate = useNavigate();
  let [tabsHeight, setTabsHeight] = useState(0);

  function tabClickCb(key) {
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
          { label: "增发OZC", key: `${commonUrlPrefix}/publish-ozc` },
          { label: "冻结地址", key: `${commonUrlPrefix}/frezz-address` },
          { label: "销毁地址", key: `${commonUrlPrefix}/destroy-address` },
          {
            label: "可兑换代币新增与移除",
            key: `${commonUrlPrefix}/add-delete`,
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
export default WebSiteOperation;
