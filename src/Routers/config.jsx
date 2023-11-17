import Login from "@/Pages/Login";
import LayoutPage from "@/Pages/Layout";
import Denied from "@/Pages/Denied";
import PersonalInfo from "@/Pages/Personal";
import Assets from "@/Pages/Assets";
import AssetsOzc from "@/Pages/Assets/ozc";
import AssetsToto from "@/Pages/Assets/toto";
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
import WebsiteOperation from "@/Pages/WebsiteOperation";
import WebsiteOperationEn from "@/Pages/WebsiteOperation/en";
import WebsiteOperationJapan from "@/Pages/WebsiteOperation/japan";
import WebsiteOperationZhCn from "@/Pages/WebsiteOperation/zh-cn";
import WebsiteOperationZhWt from "@/Pages/WebsiteOperation/zh-wt";
import WorkMange from "@/Pages/WorkMange";
import WorkMangeBusinessMange from "@/Pages/WorkMange/businessMange";
import AddressAutoAirdrop from "@/Pages/WorkMange/businessMange/address";
import BatchTransferAccounts from "@/Pages/WorkMange/businessMange/transferAccounts";
import DrawsContractMoney from "@/Pages/WorkMange/businessMange/draws";
import TotoReleaseCustody from "@/Pages/WorkMange/businessMange/releaseCustody";
import WorkMangeMangeSite from "@/Pages/WorkMange/mangeSite";
import WorkOzcContract from "@/Pages/WorkMange/ozcContract";
import WorkTodo from "@/Pages/WorkMange/todo";
import WorkTotoContract from "@/Pages/WorkMange/totoContract";
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
    children: [
      {
        path: 'work-mange',
        element: <WorkMange />,
        isAuth: true,
        children: [
          {
            path: 'todo',
            element: <WorkTodo />,
            isAuth: true
          },
          {
            path: 'mange-site',
            element: <WorkMangeMangeSite />,
            isAuth: true
          },
          {
            path: 'business-mange',
            element: <WorkMangeBusinessMange />,
            isAuth: true,
            children: [
              {
                path: "aridrop-address",
                element: <AddressAutoAirdrop/>,
                isAuth: true,
              },
              {
                path: "batch-transfer",
                element: <BatchTransferAccounts />,
                isAuth: true,
              },
              {
                path: "draws-contract",
                element: <DrawsContractMoney />,
                isAuth: true,
              },
              {
                path: "release-custody",
                element: <TotoReleaseCustody />,
                isAuth: true,
              },
            ]
          },
          {
            path: 'toto-contract',
            element: <WorkTotoContract />,
            isAuth: true
          },
          {
            path: 'ozc-contract',
            element: <WorkOzcContract />,
            isAuth: true
          },
        ]
      },
      {
        path: 'website-operation',
        element: <WebsiteOperation />,
        isAuth: true,
        children: [
          {
            path: "zh-cn",
            element: <WebsiteOperationZhCn />,
            isAuth: true,
          },
          {
            path: "zh-wt",
            element: <WebsiteOperationZhWt />,
            isAuth: true,
          },
          {
            path: "en",
            element: <WebsiteOperationEn />,
            isAuth: true,
          },
          {
            path: "japan",
            element: <WebsiteOperationJapan />,
            isAuth: true,
          },
        ]
      },
      {
        path: 'email',
        element: <Email />,
        isAuth: true,
        children: [
          {
            path: 'list',
            element: <EmailList />,
            isAuth: true,
          },
          {
            path: 'temp',
            element: <EmailTemp />,
            isAuth: true,
          },
          {
            path: 'send',
            element: <EmailSend />,
            isAuth: true,
          },
          {
            path: 'record',
            element: <EmailRecord />,
            isAuth: true,
          },
        ]
      },
      {
        path: 'assets',
        element: <Assets />,
        isAuth: true,
        children: [
          {
            path: 'toto',
            element: <AssetsToto />,
            isAuth: true,
          },
          {
            path: 'ozc',
            element: <AssetsOzc />,
            isAuth: true,
          },
          {
            path: 'toto-price',
            element: <AssetsTotoPrice />,
            isAuth: true,
          },
          {
            path: 'toto_ozc',
            element: <AssetsTotoOzc />,
            isAuth: true,
          },
        ]
      },
      {
        path: 'permission',
        element: <Permission />,
        isAuth: true,
        children: [
          {
            path: 'staff-list',
            element: <PermissionStaffList />,
            isAuth: true,
          },
        ]
      },
      {
        path: 'IP',
        element: <IP />,
        isAuth: true,
        children: [
          {
            path: 'list',
            element: <IPList />,
            isAuth: true,
          },
          {
            path: 'change-record',
            element: <IPChangeRecord />,
            isAuth: true,
          },
        ]
      },
      {
        path: 'logs',
        element: <Logs />,
        isAuth: true,
        children: [
          {
            path: 'sign',
            element: <LogsSign />,
            isAuth: true,
          },
          {
            path: 'operation',
            element: <LogsOperation />,
            isAuth: true,
          },
          {
            path: 'work',
            element: <LogsWork />,
            isAuth: true,
          },
        ]
      },
      {
        path: 'business',
        element: <Business />,
        isAuth: true,
      },
      {
        path: 'personal',
        element: <PersonalInfo />,
        isAuth: true,
      },

    ],
  },
];
export default RouteList;
