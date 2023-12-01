import TabsComp from "@/Components/Tabs";
import { breadSite, getSession } from "@/utils/base";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
const BusinessMange = () => {
  const commonUrlPrefix = "/ozfund/work-mange/business-mange";
  let navigate = useNavigate();
  let { pathname, state } = useLocation();
  let tabsRefs = useRef<any>();
  let [tabsHeight, setTabsHeight] = useState<number>();
  let [childrenRouter, setChildrenRouter] = useState([
    { label: "自动空投地址", key: `${commonUrlPrefix}/aridrop-address` },
    { label: "批量转账", key: `${commonUrlPrefix}/batch-transfer` },
    { label: "提取合约中代币", key: `${commonUrlPrefix}/draws-contract` },
    { label: "TOTO解押", key: `${commonUrlPrefix}/release-custody` },
  ]);
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
    findRouter.length && breadByPath(findRouter[0]?.key);
    if (findRouter.length !== childrenRouter.length) {
      setChildrenRouter(findRouter);
    }
  }
  function tabClickCb(key) {
    breadByPath(key);
    navigate(key, { state });
  }
  useEffect(() => {
    let { height } = tabsRefs.current.getBoundingClientRect();
    findChildRouterPermiss();
    setTabsHeight(height);
  }, []);
  return (
    <>
      <TabsComp
        defaultActiveKey={pathname}
        ref={tabsRefs}
        onTabClick={tabClickCb}
        className="bg-white pt-[2px] px-[var(--gap20)] rounded-[var(--border-radius)]"
        list={childrenRouter}
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
