import React, { useState } from "react";
import { ConfigProvider, Layout } from "antd";
import LayoutMenu from "./menu";
import LayoutContent from "./content";
import LayoutHeader from "./header";
import LayoutLogo from "./logo";

const { Sider } = Layout;

const LayoutPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ConfigProvider
      theme={{
        components: {
          Input:{
            // colorBgContainer: 'red'
          },
          Breadcrumb: {
            lastItemColor: "#0385F2",
          },
          Alert: {
            colorInfoBorder: "transparent",
          },
          Tabs: {
            colorBorderSecondary: "transparent",
            fontSize: 16,
            inkBarColor: "#0385F2",
            itemSelectedColor: "#0385F2",
            itemColor: "#666",
            cardBg: "#fff",
            colorTextHeading: "#666",
            colorText: "#666",
            itemHoverColor: "#0385F2",
            colorFillAlter: "#fff",
            cardHeight: 60,
            margin: 0,
            horizontalItemPadding: "17px 0",
          },
          Pagination: {
            colorText: "#666",
            colorTextDisabled: "#B8BFCD",
          },
          Table: {
            borderColor: "#e9e9e9",
            colorText: "#666",
            fontWeightStrong: 400,
            headerColor: "#333",
            headerBg: "#FAFAFA",
            headerSplitColor: "transparent",
            rowHoverBg: "#F4F6FB",
          },
          Button: {
            colorPrimary: "#0385F2",
          },
          Menu: {
            itemHeight: 50,
            itemMarginBlock: 0,
            itemMarginInline: 0,
            itemHoverBg: "#0385F2",
            itemHoverColor: "#fff",
            subMenuItemBg: "transparent",
            itemSelectedColor: "#fff",
            itemSelectedBg: "#0385F2",
            itemColor: "#546078",
            itemActiveBg: "#0385F2",
          },
        },
        token: {
          fontFamily: "PingFangSC-Regular",
          colorBorder: "#C5CAD0",
          colorPrimary: '#0385F2',
          colorTextPlaceholder:"#C5CAD0"
        },
      }}
    >
      <Layout className="h-[100vh]">
        <Sider
          style={{
            backgroundColor: "#fff",
            borderRight: "1px solid #C5CAD0",
          }}
          width={300}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <LayoutLogo collapsed={collapsed} />
          <LayoutMenu />
        </Sider>
        <Layout>
          <LayoutHeader
            colorBgContainer="#ffffff"
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <LayoutContent />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutPage;
