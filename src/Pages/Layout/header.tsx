import { Avatar, Badge, Button, Dropdown, Layout } from "antd";
import styleScope from "./header.module.less";
const { Header } = Layout;
import {
  UserOutlined,
  CaretDownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { getSession, timeFormate } from "@/utils/base";
import Icon from "@/Components/Icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LayoutHeader = ({ colorBgContainer, collapsed, setCollapsed }: any) => {
  let [userInfo] = useState(getSession("userInfo") ?? {});

  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="border-b-[1px_solid_var(--border-color)] h-[85px]"
    >
      <div className="flex justify-between items-center h-full pl-[var(--gap20)] pr-[var(--gap30)]">
        {collapsed ? (
          <MenuUnfoldOutlined className="text-[22px]" onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <MenuFoldOutlined className="text-[22px]" onClick={() => setCollapsed(!collapsed)} />
        )}

        <div className="flex items-center justify-end ">
          <p className={styleScope["time"]}>
            {timeFormate(userInfo.loginTime, "YYYY-MM-DD HH:mm")}
          </p>
          <Badge count={0} showZero={false} className="mx-[.24rem]">
            <Icon
              name="h-icon-notice"
              purity={false}
              style={{ fontSize: "var(--gap20)" }}
            ></Icon>
          </Badge>

          <DropDownScope userInfo={userInfo} />
        </div>
      </div>
    </Header>
  );
};
const DropDownScope = (props) => {
  let navigate = useNavigate();
  function logout() {}
  function customDropdown(menu) {
    return (
      <div className="bg-[var(--white)] p-[.1rem]">
        <p className="hover:bg-[var(--gray)] rounded-[.06rem] cursor-pointer leading-[var(--gap30)] my-[.1rem] text-center p-[.05rem]">
          个人中心
        </p>
        <p
          onClick={logout}
          className="hover:bg-[var(--gray)] rounded-[.06rem] cursor-pointer leading-[var(--gap30)] my-[.1rem] text-center p-[.05rem]"
        >
          退出
        </p>
      </div>
    );
  }
  return (
    <Dropdown arrow dropdownRender={customDropdown}>
      <a onClick={(e) => e.preventDefault()} className="hover:text-[#333]">
        <Avatar size={32} className="mr-[.14rem]" icon={<UserOutlined />} />
        <span className="mr-[.08rem] text-[#333]">
          {props.userInfo.adminId ?? "--"}
        </span>
        <CaretDownOutlined className="text-[333]" />
      </a>
    </Dropdown>
  );
};
export default LayoutHeader;
