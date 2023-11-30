import denied from "@/assets/images/access-denied.svg";
import styleScope from "./index.module.less";
import { useEffect, useState } from "react";
import Image from "@/Components/Image";
import { GetCrtIpAddreaaInterface } from "@/api";
import { clearSession } from "@/utils/base";
const Denied = () => {
  let [currentIp, setCurrentIp] = useState("");
  useEffect(() => {
    GetCrtIpAddreaaInterface().then((res) => {
      setCurrentIp(res.data);
      clearSession()
    });
  }, []);

  //获取用户本地ip的方法
  return (
    <Image src={denied} className="grid place-content-center h-[100vh]">
      <div className={styleScope["title"]}>
        <p>禁止访问提示</p>
        <p>您所在IP({currentIp})地址禁止访问系统</p>
      </div>
    </Image>
  );
};
export default Denied;
