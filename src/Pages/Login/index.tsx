import Image from "@/Components/Image";
import logo from "@/assets/images/logo_text.svg";
import loginBg from "@/assets/images/login-bg.svg";
import styleScope from "./index.module.less";
import "@/assets/style/form.less";
import Card from "@/Components/Card";
import { Button, Form, Input, message } from "antd";
// import GetCodeBtn from "@/Components/GetCode";
import { useRef, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { encryptByDES, getSession, setSession } from "@/utils/base";
import { useNavigate } from "react-router-dom";
import {
  GetAccessKeyInterface,
  GetAdminInfoInterface,
  GetPermissionInterface,
  LoginInterface,
} from "@/api";
const Login = () => {
  
  let crtIndex = useRef(0)
  return (
    <Card bgImg={loginBg} bgColor="#f6f7f9" className="w-[100vw] h-[100vh]">
      <div className="grid w-full h-full place-items-center">
        <div className={styleScope["login-box_info"]}>
          <Image src={logo} imgClassName="w-[1.8rem] m-[0_auto]">
            <p className={styleScope["summary"]}>Web3.0支付 | 管理中心 V1.0</p>
          </Image>
          <FormComp />
        </div>
      </div>
    </Card>
  );
};

const FormComp = () => {
  let jumpPath = [
    "/ozfund",
    "/ozfund/website-operation",
    "/ozfund/work-mange",
    "/ozfund/email",
    "/ozfund/assets",
    "/ozfund/permission",
    "/ozfund/IP",
    "/ozfund/logs",
    "/ozfund/business",
  ]
  let navigate = useNavigate();
  let userInfo = getSession("userInfo");
  let token = getSession("token");
  let [formInitVal, setFormInitVal] = useState({
    username: "",
    password: "",
    emailCode: "",
  });
  const messageScope = {
    username: "请输入用户名",
    password: "请输入密码",
    emailCode: "请输入邮箱验证码",
  };

  async function onFinish(formObj) {
    let { data } = await GetAccessKeyInterface();
    let {
      status,
      data: loginData,
      message: info,
    }: any = await LoginInterface({
      adminId: formObj.username,
      password: encryptByDES(formObj.password, data),
    });

    if (status) {
      setSession("token", loginData);
      let userInfo = await GetAdminInfoInterface();
      let { code, status, ...userInfoObj } = userInfo;
      if (status) {
        setSession("userInfo", userInfoObj);
        getPagePermission();
      }
    } else {
      message.error(info);
    }
  }
  function includesPath(routerList=[]){
    return routerList.find(item => !jumpPath.includes(item))
  }
  function getPagePermission() {
    GetPermissionInterface().then((res) => {
      if (res.status) {
        let { activePath, permissions } = res.data.reduce(
          (prv, next) => {
            prv.activePath.push(next.key);
            prv.permissions[next["key"]] = next.permission;
            return prv;
          },
          { activePath: [], permissions: {} }
        );
        setSession("activePath", JSON.stringify(activePath));
        setSession("permissions", JSON.stringify(permissions));
        if (activePath.length) {
          navigate(includesPath(activePath))
        } else {
          navigate("/denied");
        }
      } else {
        message.error(res.message);
      }
    });
  }
  return userInfo && token ? (
    <>{getPagePermission()}</>
  ) : (
    <Form
      autoComplete="off"
      initialValues={formInitVal}
      layout="vertical"
      onFinish={onFinish}
      className="_reset-form mt-[.49rem]"
    >
      <Form.Item
        className="hidden_start"
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: messageScope["username"],
          },
        ]}
      >
        <Input placeholder={messageScope["username"]} />
      </Form.Item>
      <Form.Item
        className="hidden_start"
        name="password"
        label="登录密码"
        rules={[
          {
            required: true,
            message: messageScope["password"],
          },
        ]}
      >
        <Input.Password
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          placeholder={messageScope["password"]}
        />
      </Form.Item>
      {/* <Form.Item
        className="hidden_start"
        name="emailCode"
        label={
          <div className="flex justify-between items-center flex-1">
            <span>邮箱验证码</span>
            <GetCodeBtn module="login" btnName="获取验证码"/>
          </div>
        }
        rules={[
          {
            required: true,
            message: message["emailCode"],
          },
        ]}
      >
        <Input placeholder={message["emailCode"]}/>
      </Form.Item> */}
      <Form.Item>
        <Button className="mt-[.24rem]" type="primary" block htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
