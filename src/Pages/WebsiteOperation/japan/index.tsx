import { Outlet } from "react-router-dom";
import TabsScope from "../Tabs";

const Japan = () => {
  return  <TabsScope language="japan">
  <Outlet />
</TabsScope>
}
export default Japan;
