import Tabs from "@/Components/Tabs";
import { breadSite, getSession } from "@/utils/base";
import { memo, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
import Denied from "../Denied";
const TabsScope = (props) => {
  let tabsRefs = useRef<any>();
  let { pathname, state } = useLocation();
  let commonUrlPrefix = `/ozfund/website-operation/${props.language}`;
  let navigate = useNavigate();
  let [tabsHeight, setTabsHeight] = useState(0);
  let [childrenRouter, setChildrenRouter] = useState([
    { label: "进程", key: `${commonUrlPrefix}/process` },
    { label: "动态", key: `${commonUrlPrefix}/trends` },
    { label: "公告", key: `${commonUrlPrefix}/notice` },
    {
      label: "常见问题",
      key: `${commonUrlPrefix}/problem`,
    },
  ]);
  function tabClickCb(key) {
    breadByPath(key);
    navigate(key, { state: { ...state, language: props.language } });
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
    navigate(findRouter[0]?.key, {
      state: { ...state, language: props.language },
    });
    setChildrenRouter(findRouter);
  }
  useEffect(() => {
    let { height } = tabsRefs.current.getBoundingClientRect();
    findChildRouterPermiss();
    setTabsHeight(height);
  }, []);
  return (
    <>
      {childrenRouter.length ? (
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
            {props.children}
          </div>
        </>
      ) : (
        <Denied />
      )}
    </>
  );
};
export default memo(TabsScope, (prv, next) => prv.language === next.language);
