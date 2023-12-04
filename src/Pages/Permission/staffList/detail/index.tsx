import TabsComp from "@/Components/Tabs";
import { breadSite, getSession } from "@/utils/base";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
const StaffDetail = () => {
  const commonUrlPrefix = "/ozfund/permission/staff-list/staff-detail";
  let navigate = useNavigate();
  let { pathname, state } = useLocation();
  let tabsRefs = useRef<any>();
  let [tabsHeight, setTabsHeight] = useState<number>();
  let [childrenRouter, setChildrenRouter] = useState([
    { label: "员工详情", key: `${commonUrlPrefix}/staff-info` },
    { label: "权限调整", key: `${commonUrlPrefix}/rights-adjust` },
    { label: "账户管理", key: `${commonUrlPrefix}/account` },
  ]);
  function tabClickCb(key) {
    breadByPath(key);
    navigate(key, { state });
  }
  function breadByPath(path:string) {
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
export default StaffDetail;
