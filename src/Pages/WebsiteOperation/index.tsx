import Tabs from "@/Components/Tabs";
import { getSession } from "@/utils/base";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const WebSiteOperation = () => {
  let tabsRefs = useRef<any>();
  let { pathname } = useLocation();
  let splitRouter = [];
  let lastName = "";
  let crtRouter = getSession("_crtRouter");
  if (crtRouter) {
    splitRouter = crtRouter?.split("/");
    lastName = splitRouter?.at(-1);
  }
  let commonUrlPrefix = `/ozfund/website-operation/${lastName}`;
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
          { label: "进程", key: `${commonUrlPrefix}/process` },
          { label: "动态", key: `${commonUrlPrefix}/trends` },
          { label: "公告", key: `${commonUrlPrefix}/notice` },
          {
            label: "常见问题",
            key: `${commonUrlPrefix}/problem`,
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
