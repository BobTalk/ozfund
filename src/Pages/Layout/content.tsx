import Message from "@/Components/Message";
import { Breadcrumb, Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import messageIcon from "@/assets/images/message.svg";
import siteIcon from "@/assets/images/site.svg";
import styleScope from "./content.module.less";
import closeIcon from "@/assets/images/close.svg";
import { useEffect, useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { getSession, mergeClassName, setSession } from "@/utils/base";
import store from "@/store";
let { Content } = Layout;
const LayoutContent = () => {
  let messageRefs = useRef<any>({});
  let { pathname } = useLocation();
  let [contentH, setContentH] = useState(0);
  let userInfo = getSession("userInfo")??{};
  let [usename] = useState(() => userInfo["adminId"]);
  let [showMessage, setShowMessage] = useState("");
  let [isShowLoginTip, setIsShowLoginTip] = useState<Boolean>(getSession('loginTip'));
  let [breadcrumb, setBreadcrumb] = useState(
    store.getState().breadcrumbReducer
  );
  let [stop] = useStopPropagation();
  function close(e) {
    stop(e, () => {
      setShowMessage("hidden");
      setIsShowLoginTip(true)
      setSession('loginTip', true)
    });
  }
  useEffect(()=>{
    setBreadcrumb(store.getState().breadcrumbReducer);
  },[store.getState().breadcrumbReducer])
  useEffect(() => {
    let { height } = messageRefs.current.getBoundingClientRect();
    setContentH(height);
  }, []);
  return (
    <Content
      className="overflow-y-auto"
      style={{
        padding: ".16rem .24rem",
        background: "var(--gray)",
      }}
    >
      {!isShowLoginTip ? (
        <Message
          ref={messageRefs}
          message={
            <p className={styleScope["message"]}>
              您好！欢迎您登录<span>aupay</span>后台管理：{usename}~
            </p>
          }
          className={mergeClassName(
            "text-[#333] mb-[.24rem]",
            `${showMessage}`
          )}
          action={
            <img
              src={closeIcon}
              alt=""
              className="cursor-pointer"
              onClick={close}
            />
          }
          prvIcon={<img src={messageIcon} alt="" />}
          showIcon={true}
        />
      ) : (
        <Message
          ref={messageRefs}
          message={
            <div className={styleScope["bread-crumb"]}>
              <span className="!text-[#AAA]">当前位置：</span>
              <Breadcrumb separator=">" items={breadcrumb} />
            </div>
          }
          className="text-[#333] mb-[.24rem] bg-[#FFF]"
          prvIcon={<img src={siteIcon} alt="" />}
          showIcon={true}
        />
      )}
      <div
        style={{
          height: `calc(100% - ${contentH}px - 0.32rem)`,
        }}
      >
        <Outlet />
      </div>
    </Content>
  );
};
export default LayoutContent;
