import { Tabs } from "antd";
import { Outlet } from "react-router-dom";
import styleScope from "./index.module.less";

const WorkMange = () => {
  return (
    <div className={styleScope['work-manage']}>
      <Tabs
        className="bg-white pt-[2px] px-[.2rem] rounded-[var(--border-radius)]"
        items={[
          { label: "自动空投地址", key: "1" },
          { label: "批量转账", key: "2" },
          { label: "提取合约中代币", key: "3" },
          { label: "TOTO解押", key: "4" },
        ]}
      />
      <Outlet />
    </div>
  );
};
export default WorkMange;
