import { Outlet } from "react-router-dom";
import TabsScope from "../Tabs";

const ZhWt = () => {
  return (
    <TabsScope language="zh-wt">
      <Outlet />
    </TabsScope>
  );
};
export default ZhWt;
