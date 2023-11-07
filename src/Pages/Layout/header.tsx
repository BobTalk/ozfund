import { Avatar, Badge, Dropdown, Layout } from "antd";
import styleScope from "./header.module.less";
const { Header } = Layout;
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { getSession, timeFormate } from "@/utils/base";
import Icon from "@/Components/Icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LayoutHeader = ({ colorBgContainer }: any) => {
  let [userInfo] = useState(getSession("userInfo")??{});

  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="border-b-[1px_solid_var(--border-color)] h-[65px]"
    >
      <div className="flex items-center justify-end pr-[.3rem]">
        <p className={styleScope["time"]}>
          {timeFormate(userInfo.loginTime, "YYYY-MM-DD HH:mm")}
        </p>
        <Badge count={0} showZero={false} className="mx-[.24rem]">
          <Icon
            name="h-icon-xiaoxi"
            purity={false}
            style={{ fontSize: ".2rem" }}
          ></Icon>
        </Badge>

        <DropDownScope userInfo={userInfo} />
      </div>
    </Header>
  );
};
const DropDownScope = (props) => {
  console.log("props: ", props);
  let navigate = useNavigate();
  function logout() {}
  function customDropdown(menu) {
    return (
      <div className="bg-[var(--white)] p-[.1rem]">
        <p className="hover:bg-[var(--gray)] rounded-[.06rem] cursor-pointer leading-[.3rem] my-[.1rem] text-center p-[.05rem]">
          个人中心
        </p>
        <p
          onClick={logout}
          className="hover:bg-[var(--gray)] rounded-[.06rem] cursor-pointer leading-[.3rem] my-[.1rem] text-center p-[.05rem]"
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
