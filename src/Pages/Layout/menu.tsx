import { Menu } from "antd";
import styleScope from "./menu.module.less";
import { breadSite, mergeClassName, setSession } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
import { menuList } from "./menuConfig";

import { useLayoutEffect } from "react";
import { activePath, activePathToName } from "./activeRouterConfig";
const LayoutMenu = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  function menuSelectCb({ key, domEvent }) {
    setSession("_crtRouter", key);
    stop(domEvent, () => {
      navigate(key, {
        state: {
          _title: activePathToName[key],
        },
      });
      store.dispatch({
        type: "ADD_BREADCRUMB",
        data: breadSite(key),
      });
    });
  }
  useLayoutEffect(() => {
    store.dispatch({
      type: "ADD_BREADCRUMB",
      data: breadSite(pathname),
    });
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
      defaultOpenKeys={activePath[pathname]}
      defaultSelectedKeys={activePath[pathname]}
      items={menuList}
    />
  );
};
export default LayoutMenu;
