import Login from "@/Pages/Login";
import LayoutPage from "@/Pages/Layout";
import Denied from "@/Pages/Denied";
import PersonalInfo from "@/Pages/Personal";
import Assets from "@/Pages/Assets";
import AssetsOzc from "@/Pages/Assets/ozc";
import AssetsToto from "@/Pages/Assets/toto";
import AllocationToto from "@/Pages/Assets/toto/allocation";
import ChildAssetsToto from "@/Pages/Assets/toto/childAssets";
import AssetsTotoOzc from "@/Pages/Assets/totoOzc";
import AssetsTotoPrice from "@/Pages/Assets/totoPrice";
import Business from "@/Pages/Business";
import Email from "@/Pages/Email";
import EmailList from "@/Pages/Email/list";
import EmailSend from "@/Pages/Email/send";
import EmailTemp from "@/Pages/Email/temp";
import EmailRecord from "@/Pages/Email/record";
import IP from "@/Pages/IP";
import IPList from "@/Pages/IP/list";
import IPChangeRecord from "@/Pages/IP/changeRecord";
import Logs from "@/Pages/Logs";
import LogsOperation from "@/Pages/logs/operation";
import LogsSign from "@/Pages/logs/sign";
import LogsWork from "@/Pages/logs/work";
import Permission from "@/Pages/Permission";
import PermissionStaffList from "@/Pages/Permission/staffList";
import StaffDetail from "@/Pages/Permission/staffList/detail";
import StaffStaffInfo from "@/Pages/Permission/staffList/detail/staffInfo";
import StaffRightsAdjust from "@/Pages/Permission/staffList/detail/rightsAdjust";
import StaffAccountManage from "@/Pages/Permission/staffList/detail/accountManage";
import WebsiteOperation from "@/Pages/WebsiteOperation";
import WebsiteOperationEn from "@/Pages/WebsiteOperation/en";
import WebsiteOperationJapan from "@/Pages/WebsiteOperation/japan";
import WebsiteOperationZhCn from "@/Pages/WebsiteOperation/zh-cn";
import WebsiteOperationZhWt from "@/Pages/WebsiteOperation/zh-wt";
import WebsiteNotice from "@/Pages/WebsiteOperation/common/notice";
import WebsiteProblem from "@/Pages/WebsiteOperation/common/problem";
import WebsiteProcess from "@/Pages/WebsiteOperation/common/process";
import WebsiteTrends from "@/Pages/WebsiteOperation/common/trends";
import WorkMange from "@/Pages/WorkMange";
import WorkMangeBusinessMange from "@/Pages/WorkMange/businessMange";
import AddressAutoAirdrop from "@/Pages/WorkMange/businessMange/address";
import BatchTransferAccounts from "@/Pages/WorkMange/businessMange/transferAccounts";
import DrawsContractMoney from "@/Pages/WorkMange/businessMange/draws";
import TotoReleaseCustody from "@/Pages/WorkMange/businessMange/releaseCustody";
import WorkMangeMangeSite from "@/Pages/WorkMange/mangeSite";
import WorkOzcContract from "@/Pages/WorkMange/ozcContract";
import PublishOzc from "@/Pages/WorkMange/ozcContract/add";
import FrezzAddress from "@/Pages/WorkMange/ozcContract/frezz";
import DestroyAddress from "@/Pages/WorkMange/ozcContract/destroy";
import DeleteOrAdd from "@/Pages/WorkMange/ozcContract/delete";
import WorkTodo from "@/Pages/WorkMange/todo";
import WorkTotoContract from "@/Pages/WorkMange/totoContract";

const websiteOperationChildRouter = ()=>([
  {
    path: 'process',
    isAuth: true,
    title: "进程",
    element: <WebsiteProcess />
  },
  {
    path: 'trends',
    isAuth: true,
    title: "动态",
    element: <WebsiteTrends />
  },
  {
    path: 'notice',
    isAuth: true,
    title: "公告",
    element: <WebsiteNotice />
  },
  {
    path: 'problem',
    isAuth: true,
    title: "常见问题",
    element: <WebsiteProblem />
  },
])
const RouteList = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/denied",
    element: <Denied />,
  },
  {
    path: "/ozfund",
    element: <LayoutPage />,
    isAuth: true,
    title: '记录中心',
    children: [
      {
        path: 'work-mange',
        element: <WorkMange />,
        isAuth: true,
        title: 'Ozfund事务中心',
        children: [
          {
            path: 'todo',
            element: <WorkTodo />,
            isAuth: true,
            title: "待办事务"
          },
          {
            path: 'mange-site',
            element: <WorkMangeMangeSite />,
            isAuth: true,
            title: "管理员设置"
          },
          {
            path: 'business-mange',
            element: <WorkMangeBusinessMange />,
            isAuth: true,
            title: "TOTO业务管理",
            children: [
              {
                path: "aridrop-address",
                element: <AddressAutoAirdrop />,
                isAuth: true,
                title: "自动空投地址"
              },
              {
                path: "batch-transfer",
                element: <BatchTransferAccounts />,
                isAuth: true,
                title: "批量转账"
              },
              {
                path: "draws-contract",
                element: <DrawsContractMoney />,
                isAuth: true,
                title: "提取合约中代币"
              },
              {
                path: "release-custody",
                element: <TotoReleaseCustody />,
                isAuth: true,
                title: "TOTO解押"
              },
            ]
          },
          {
            path: 'toto-contract',
            element: <WorkTotoContract />,
            isAuth: true,
            title: "TOTO合约设置"
          },
          {
            path: 'ozc-contract',
            element: <WorkOzcContract />,
            isAuth: true,
            title: "OZC合约设置",
            children: [
              {
                path: 'publish-ozc',
                element: <PublishOzc />,
                isAuth: true,
                title: "增发OZC"
              },
              {
                path: 'frezz-address',
                element: <FrezzAddress />,
                isAuth: true,
                title: "冻结地址"
              },
              {
                path: 'destroy-address',
                element: <DestroyAddress />,
                isAuth: true,
                title: "销毁地址"
              },
              {
                path: 'add-delete',
                element: <DeleteOrAdd />,
                isAuth: true,
                title: "可兑换代币新增与移除"
              },
            ]
          },
        ]
      },
      {
        path: 'website-operation',
        element: <WebsiteOperation />,
        isAuth: true,
        title: "Ozfund网站运营",
        children: [
          {
            path: "zh-cn",
            element: <WebsiteOperationZhCn />,
            isAuth: true,
            children: websiteOperationChildRouter(),
            title: "简体中文"
          },
          {
            path: "zh-wt",
            element: <WebsiteOperationZhWt />,
            isAuth: true,
            children: websiteOperationChildRouter(),
            title: "繁体中文"
          },
          {
            path: "en",
            element: <WebsiteOperationEn />,
            isAuth: true,
            children: websiteOperationChildRouter(),
            title: "English"
          },
          {
            path: "japan",
            element: <WebsiteOperationJapan />,
            isAuth: true,
            children: websiteOperationChildRouter(),
            title: "しろうと"
          },
        ]
      },
      {
        path: 'email',
        element: <Email />,
        isAuth: true,
        title: "Ozfund订阅邮箱",
        children: [
          {
            path: 'list',
            element: <EmailList />,
            isAuth: true,
            title: "邮箱列表"
          },
          {
            path: 'temp',
            element: <EmailTemp />,
            isAuth: true,
            title: "邮箱模板"
          },
          {
            path: 'send',
            element: <EmailSend />,
            isAuth: true,
            title: "邮件定时发送"
          },
          {
            path: 'record',
            element: <EmailRecord />,
            isAuth: true,
            title: "邮件发送记录"
          },
        ]
      },
      {
        path: 'assets',
        element: <Assets />,
        isAuth: true,
        title: "资产统计",
        children: [
          {
            path: 'toto',
            element: <AssetsToto />,
            isAuth: true,
            title: "TOTO",
            children: [
              {
                path: 'allocation-statistics',
                isAuth: true,
                element: <AllocationToto />,
                title: "TOTO分配统计"
              },
              {
                path: 'assets-statistics',
                isAuth: true,
                element: <ChildAssetsToto />,
                title: "TOTO资产统计"
              }
            ]
          },
          {
            path: 'ozc',
            element: <AssetsOzc />,
            isAuth: true,
            title: "OZC资产统计"
          },
          {
            path: 'toto-price',
            element: <AssetsTotoPrice />,
            isAuth: true,
            title: "TOTO兑换价格核算"
          },
          {
            path: 'toto_ozc',
            element: <AssetsTotoOzc />,
            isAuth: true,
            title: "TOTO/OZC价格统计"
          },
        ]
      },
      {
        path: 'permission',
        element: <Permission />,
        isAuth: true,
        title: "权限管理",
        children: [
          {
            path: 'staff-list',
            element: <PermissionStaffList />,
            isAuth: true,
            title: "员工列表",
            children: [
              {
                path: 'staff-detail',
                element: <StaffDetail />,
                isAuth: true,
                title: "",
                children: [
                  {
                    path: 'staff-info',
                    element: <StaffStaffInfo />,
                    isAuth: true,
                    title: "员工详情"
                  },
                  {
                    path: 'rights-adjust',
                    element: <StaffRightsAdjust />,
                    isAuth: true,
                    title: "权限调整"
                  },
                  {
                    path: 'account',
                    element: <StaffAccountManage />,
                    isAuth: true,
                    title: "账户管理"
                  },
                ]
              }
            ]
          },
        ]
      },
      {
        path: 'IP',
        element: <IP />,
        isAuth: true,
        title: "IP管理",
        children: [
          {
            path: 'list',
            element: <IPList />,
            isAuth: true,
            title: "IP列表"
          },
          {
            path: 'change-record',
            element: <IPChangeRecord />,
            isAuth: true,
            title: "IP变动记录"
          },
        ]
      },
      {
        path: 'logs',
        element: <Logs />,
        isAuth: true,
        title: "日志管理",
        children: [
          {
            path: 'sign',
            element: <LogsSign />,
            isAuth: true,
            title: "登录日志"
          },
          {
            path: 'operation',
            element: <LogsOperation />,
            isAuth: true,
            title: "操作日志"
          },
          {
            path: 'work',
            element: <LogsWork />,
            isAuth: true,
            title: "事务日志"
          },
        ]
      },
      {
        path: 'business',
        element: <Business />,
        isAuth: true,
        title: "业务管理"
      },
      {
        path: 'personal',
        element: <PersonalInfo />,
        isAuth: true,
        title: "个人资料"
      },

    ],
  },
];
export default RouteList;
