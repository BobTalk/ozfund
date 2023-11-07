import Icon from "@/Components/Icon";
import styleScope from "./menu.module.less";
export const menuList = [
  {
    key: "/work-mange",
    icon: <Icon name="h-icon-shiwuguanli" className={styleScope["icon"]} />,
    label: "Ozfund事务管理",
    children: [
      {
        key: "/work-mange/todo",
        icon: <></>,
        label: "待办事务",
      },
      {
        key: "/work-mange/mange-site",
        icon: <></>,
        label: "管理员设置",
      },
      {
        key: "/work-mange/business-mange",
        icon: <></>,
        label: "TOTO业务管理",
      },
      {
        key: "/work-mange/toto-contract",
        icon: <></>,
        label: "TOTO合约设置",
      },
      {
        key: "/work-mange/ozc-contract",
        icon: <></>,
        label: "OZC合约设置",
      },
    ],
  },
  {
    key: "/website-operation",
    icon: <Icon name="h-icon-wangzhanyunying" className={styleScope["icon"]} />,
    label: "Ozfund网站运营",
    children: [
      {
        key: "/website-operation/zh-cn",
        icon: <></>,
        label: "简体中文",
      },
      {
        key: "/website-operation/zh-wt",
        icon: <></>,
        label: "繁体中文",
      },
      {
        key: "/website-operation/en",
        icon: <></>,
        label: "English",
      },
      {
        key: "/website-operation/japan",
        icon: <></>,
        label: "しろうと",
      },
    ],
  },
  {
    key: "/email",
    icon: <Icon name="h-icon-dingyueyouxiang" className={styleScope["icon"]} />,
    label: "Ozfund订阅邮箱",
    children: [
      {
        key: "/email/list",
        icon: <></>,
        label: "邮箱列表",
      },
      {
        key: "/email/temp",
        icon: <></>,
        label: "邮箱模板",
      },
      {
        key: "/email/send",
        icon: <></>,
        label: "邮件定时发送",
      },
      {
        key: "/email/record",
        icon: <></>,
        label: "邮件发送记录",
      },
    ],
  },
  {
    key: "/assets",
    icon: <Icon name="h-icon-zichantongji" className={styleScope["icon"]} />,
    label: "资产统计",
    children: [
      {
        key: "/assets/toto",
        icon: <></>,
        label: "TOTO",
      },
      {
        key: "/assets/ozc",
        icon: <></>,
        label: "OZC资产统计",
      },
      {
        key: "/assets/toto-price",
        icon: <></>,
        label: "TOTO兑换价格核算",
      },
      {
        key: "/assets/toto_ozc",
        icon: <></>,
        label: "TOTO/OZC价格统计",
      },
    ],
  },
  {
    key: "/permission",
    icon: <Icon name="h-icon-quanxianguanli" className={styleScope["icon"]} />,
    label: "权限管理",
    children: [
      {
        key: "/permission/staff-list",
        icon: <></>,
        label: "员工列表",
      },
    ],
  },
  {
    key: "/IP",
    icon: <Icon name="h-icon-IPguanli" className={styleScope["icon"]} />,
    label: "IP管理",
    children: [
      {
        key: "/IP/list",
        icon: <></>,
        label: "IP列表",
      },
      {
        key: "/IP/change-record",
        icon: <></>,
        label: "IP变动记录",
      },
    ],
  },
  {
    key: "/logs",
    icon: <Icon name="h-icon-rizhiguanli" className={styleScope["icon"]} />,
    label: "日志管理",
    children: [
      {
        key: "/logs/sign",
        icon: <></>,
        label: "登录日志",
      },
      {
        key: "/logs/operation",
        icon: <></>,
        label: "操作日志",
      },
      {
        key: "/logs/work",
        icon: <></>,
        label: "事务日志",
      },
    ],
  },
  {
    key: "/business",
    icon: <Icon name="h-icon-yewuguanli" className={styleScope["icon"]} />,
    label: "业务管理",
  },
  {
    key: "/personal",
    icon: <Icon name="h-icon-gerenziliao" className={styleScope["icon"]} />,
    label: "个人资料",
  },
];
