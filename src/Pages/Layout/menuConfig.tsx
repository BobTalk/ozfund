import Icon from "@/Components/Icon";
import styleScope from "./menu.module.less";
export const menuList = [
  {
    key: "/ozfund/work-mange",
    icon: <Icon name="h-icon-shiwuguanli" className={styleScope["icon"]} />,
    label: "Ozfund事务管理",
    children: [
      {
        key: "/ozfund/work-mange/todo",
        icon: <></>,
        label: "待办事务",
      },
      {
        key: "/ozfund/work-mange/mange-site",
        icon: <></>,
        label: "管理员设置",
      },
      {
        key: "/ozfund/work-mange/business-mange",
        icon: <></>,
        label: "TOTO业务管理",                                                                                                                                    
      },
      {
        key: "/ozfund/work-mange/toto-contract",
        icon: <></>,
        label: "TOTO合约设置",
      },
      {
        key: "/ozfund/work-mange/ozc-contract",
        icon: <></>,
        label: "OZC合约设置",
      },
    ],
  },
  {
    key: "/ozfund/website-operation",
    icon: <Icon name="h-icon-wangzhanyunying" className={styleScope["icon"]} />,
    label: "Ozfund网站运营",
    children: [
      {
        key: "/ozfund/website-operation/zh-cn",
        icon: <></>,
        label: "简体中文",
      },
      {
        key: "/ozfund/website-operation/zh-wt",
        icon: <></>,
        label: "繁体中文",
      },
      {
        key: "/ozfund/website-operation/en",
        icon: <></>,
        label: "English",
      },
      {
        key: "/ozfund/website-operation/japan",
        icon: <></>,
        label: "しろうと",
      },
    ],
  },
  {
    key: "/ozfund/email",
    icon: <Icon name="h-icon-dingyueyouxiang" className={styleScope["icon"]} />,
    label: "Ozfund订阅邮箱",
    children: [
      {
        key: "/ozfund/email/list",
        icon: <></>,
        label: "邮箱列表",
      },
      {
        key: "/ozfund/email/temp",
        icon: <></>,
        label: "邮箱模板",
      },
      {
        key: "/ozfund/email/send",
        icon: <></>,
        label: "邮件定时发送",
      },
      {
        key: "/ozfund/email/record",
        icon: <></>,
        label: "邮件发送记录",
      },
    ],
  },
  {
    key: "/ozfund/assets",
    icon: <Icon name="h-icon-zichantongji" className={styleScope["icon"]} />,
    label: "资产统计",
    children: [
      {
        key: "/ozfund/assets/toto",
        icon: <></>,
        label: "TOTO",
      },
      {
        key: "/ozfund/assets/ozc",
        icon: <></>,
        label: "OZC资产统计",
      },
      {
        key: "/ozfund/assets/toto-price",
        icon: <></>,
        label: "TOTO兑换价格核算",
      },
      {
        key: "/ozfund/assets/toto_ozc",
        icon: <></>,
        label: "TOTO/OZC价格统计",
      },
    ],
  },
  {
    key: "/ozfund/permission",
    icon: <Icon name="h-icon-quanxianguanli" className={styleScope["icon"]} />,
    label: "权限管理",
    children: [
      {
        key: "/ozfund/permission/staff-list",
        icon: <></>,
        label: "员工列表",
      },
    ],
  },
  {
    key: "/ozfund/IP",
    icon: <Icon name="h-icon-IPguanli" className={styleScope["icon"]} />,
    label: "IP管理",
    children: [
      {
        key: "/ozfund/IP/list",
        icon: <></>,
        label: "IP列表",
      },
      {
        key: "/ozfund/IP/change-record",
        icon: <></>,
        label: "IP变动记录",
      },
    ],
  },
  {
    key: "/ozfund/logs",
    icon: <Icon name="h-icon-rizhiguanli" className={styleScope["icon"]} />,
    label: "日志管理",
    children: [
      {
        key: "/ozfund/logs/sign",
        icon: <></>,
        label: "登录日志",
      },
      {
        key: "/ozfund/logs/operation",
        icon: <></>,
        label: "操作日志",
      },
      {
        key: "/ozfund/logs/work",
        icon: <></>,
        label: "事务日志",
      },
    ],
  },
  {
    key: "/ozfund/business",
    icon: <Icon name="h-icon-yewuguanli" className={styleScope["icon"]} />,
    label: "业务管理",
  },
  {
    key: "/ozfund/personal",
    icon: <Icon name="h-icon-gerenziliao" className={styleScope["icon"]} />,
    label: "个人资料",
  },
];
