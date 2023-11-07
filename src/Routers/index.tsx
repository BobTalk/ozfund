import { useRoutes } from "react-router-dom";
import RouteList from "./config";
import { Guard } from "./guard";
import { memo, useCallback } from "react";

function RouterConfigComp() {
  let el = useRoutes(RouteList);
  return useCallback(Guard(el), [el]);
}
export default RouterConfigComp;
