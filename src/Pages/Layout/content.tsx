import Message from "@/Components/Message";
import { Breadcrumb, ConfigProvider, Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import siteIcon from "@/assets/images/site.svg";
import styleScope from "./content.module.less";
import { useEffect, useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { getSession } from "@/utils/base";
import store from "@/store";
let { Content } = Layout;
const LayoutContent = () => {
  let messageRefs = useRef<any>({});
  let { pathname } = useLocation();
  let [contentH, setContentH] = useState(0);
  let userInfo = getSession("userInfo") ?? {};

  let [breadcrumb, setBreadcrumb] = useState(
    store.getState().breadcrumbReducer
  );
  let [stop] = useStopPropagation();
  useEffect(() => {
    setBreadcrumb(store.getState().breadcrumbReducer);
  }, [store.getState().breadcrumbReducer]);
  useEffect(() => {
    let { height } = messageRefs.current.getBoundingClientRect();
    setContentH(height);
  }, []);
  return (
    <Content
      className="overflow-hidden"
      style={{
        padding: "0",
        background: "var(--gray)",
      }}
    >
      <Message
        ref={messageRefs}
        message={
          <div className={styleScope["bread-crumb"]}>
            <span className="!text-[#999]">您的当前位置：</span>
            <ConfigProvider
              theme={{
                components: {
                  Breadcrumb: {
                    itemColor: "#999",
                    separatorColor: "#999",
                    linkColor:"#999",
                    lastItemColor: "#0385F2",
                  },
                },
              }}
            >
              <Breadcrumb separator="/" items={breadcrumb} />
            </ConfigProvider>
          </div>
        }
        className="text-[#333] bg-[#FFF] rounded-[0]"
        prvIcon={<img src={siteIcon} alt="" />}
        showIcon={true}
      />
      <div
        style={{
          height: `calc(100% - ${contentH}px)`,
          padding: "var(--gap15)",
        }}
        className="overflow-y-auto bg-[var(--content-gray)]"
      >
        <Outlet />
      </div>
    </Content>
  );
};
export default LayoutContent;
