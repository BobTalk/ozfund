import Tabs from "@/Components/Tabs";
import { breadSite, getSession } from "@/utils/base";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
const OzcContract = () => {
  let commonUrlPrefix = "/ozfund/work-mange/ozc-contract";
  let { pathname, state } = useLocation();
  let navigate = useNavigate();
  let tabsRefs = useRef<any>();
  let [tabsHeight, setTabsHeight] = useState(0);
  let [childrenRouter, setChildrenRouter] = useState([
    { label: "增发OZC", key: `${commonUrlPrefix}/publish-ozc` },
    { label: "冻结地址", key: `${commonUrlPrefix}/frezz-address` },
    { label: "销毁地址", key: `${commonUrlPrefix}/destroy-address` },
    {
      label: "可兑换代币新增与移除",
      key: `${commonUrlPrefix}/add-delete`,
    },
  ]);
  function tabClickCb(key) {
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
    findRouter.length && breadByPath(findRouter[0]?.key);
    findRouter.length && navigate(findRouter[0]?.key);
    if (findRouter.length !== childrenRouter.length) {
      setChildrenRouter(findRouter);
    }
  }
  useEffect(() => {
    let { height } = tabsRefs.current.getBoundingClientRect();
    findChildRouterPermiss();
    setTabsHeight(height);
  }, []);
  return (
    <>
      <Tabs
        ref={tabsRefs}
        defaultActiveKey={childrenRouter?.[0]?.["key"]}
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

export default OzcContract;
