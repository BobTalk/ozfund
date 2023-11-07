import { useCountDown } from "@/Hooks/Countdown";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useState } from "react";

const GetCodeBtn = (props: any) => {
  let { operationId, btnName, module, email, username, onClick } = props;
  function loginCode(){
    console.log("登陆即可调用");
  }
  // 模块映射
  let moduleMap: any = new Map([
   [ 'login', loginCode]
  ]);
  let [stop] = useStopPropagation();
  let [codeMessage, setCodeMessage] = useState(btnName);
  let { start, count: timeDown } = useCountDown(
    59,
    () => {
      setCodeMessage(`${timeDown}s`);
    },
    () => {
      setCodeMessage(btnName);
    }
  );
  function getEmailCode(e: any) {
    stop(e, () => {
      start(() => {
        moduleMap?.get(module)?.();
      });
    });
  }
  return (
    <p
      onClick={getEmailCode}
      className="whitespace-nowrap text-[.3rem] text-[#1C63FF] ml-[.3rem]"
      color="primary"
    >
      {codeMessage}
    </p>
  );
};
GetCodeBtn.defaultProps = {
  operationId: undefined,
  btnName: "获取",
  module: "email", // login register Email resetpwd
  email: "",
  username: "",
  onClick: () => {},
};
export default GetCodeBtn;
