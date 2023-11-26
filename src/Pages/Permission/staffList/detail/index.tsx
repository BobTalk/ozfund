import TabsComp from "@/Components/Tabs";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const StaffDetail = () => {
  const commonUrlPrefix = "/ozfund/permission/staff-list/staff-detail";
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
          { label: "员工详情", key: `${commonUrlPrefix}/staff-info` },
          { label: "权限调整", key: `${commonUrlPrefix}/rights-adjust` },
          { label: "账户管理", key: `${commonUrlPrefix}/account` },
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
export default StaffDetail;
