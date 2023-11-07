import { Menu } from "antd";
import styleScope from "./menu.module.less";
import { mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import store from "@/store";
import { menuList } from "./menuConfig";
import { activePath, activePathToName } from "./activeRouterConfig";
import { useEffect, useLayoutEffect } from "react";
const LayoutMenu = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  function menuSelectCb({ key, domEvent }) {
    stop(domEvent, () => {
      navigate(key, { state: { _title: activePathToName[key] } });
      breadSite(key);
    });
  }
  function breadSite(key) {
    let activeKey = activePathToName[key];
    let activeP = activePath[key];
    if (activeKey?.length > 1) {
      let res = activeKey.map((item, idx, arr) => {
        return (idx === arr.length - 1 || !idx)
          ? { title: item }
          : { title: item, href: activeP[idx] };
      });
      store.dispatch({ type: "ADD_BREADCRUMB", data: res });
    } else {
      store.dispatch({
        type: "ADD_BREADCRUMB",
        data: [{ title: activePathToName?.[key]?.[0]??'--' }],
      });
    }
   
  }
  useLayoutEffect(() => {
    breadSite(pathname);
  }, []);
  return (
    <Menu
      theme="light"
      onSelect={menuSelectCb}
      mode="inline"
      className={mergeClassName(
        styleScope["menu-box"],
        "pt-[.1rem] px-[.1rem]"
      )}
      defaultSelectedKeys={activePath[pathname]}
      items={menuList}
    />
  );
};
export default LayoutMenu;
