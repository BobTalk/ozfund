import Tabs from "@/Components/Tabs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
import { breadSite, getSession } from "@/utils/base";
const Toto = () => {
  let commonUrlPrefix = "/ozfund/assets/toto";
  let tabsRefs = useRef<any>();
  let { pathname, state } = useLocation();
  let navigate = useNavigate();
  let [tabsHeight, setTabsHeight] = useState(0);
  let [childrenRouter, setChildrenRouter] = useState([
    {
      label: "TOTO分配统计",
      key: `${commonUrlPrefix}/allocation-statistics`,
    },
    {
      label: "TOTO资产统计",
      key: `${commonUrlPrefix}/assets-statistics`,
    },
  ]);
  function tabClickCb(key: string) {
    if (!key) return;
    breadByPath(key);
    navigate(key, { state });
  }
  function breadByPath(path) {
    store.dispatch({
      type: "ADD_BREADCRUMB",
      data: breadSite(path),
    });
  }
  function findChildRouterPermiss() {
    let activePath: Array<string> = getSession("activePath");
    let findRouter = childrenRouter.filter((item) => {
      return activePath.includes(item.key);
    });
    tabClickCb(findRouter[0]?.key);
    setChildrenRouter(findRouter);
  }
  useLayoutEffect(() => {
    findChildRouterPermiss();
  }, []);
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
        list={childrenRouter}
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
