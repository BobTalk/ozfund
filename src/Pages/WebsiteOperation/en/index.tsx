import { Outlet } from "react-router-dom";
import TabsScope from "../Tabs";

const En = () => {
  return (
    <TabsScope language="en">
      <Outlet />
    </TabsScope>
  );
};
export default En;
