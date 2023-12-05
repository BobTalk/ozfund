import { Outlet } from "react-router-dom";
import TabsScope from "../Tabs";
const ZhCN = () => {
  return (
    <TabsScope language="zh-cn">
      <Outlet />
    </TabsScope>
  );
};
export default ZhCN;
