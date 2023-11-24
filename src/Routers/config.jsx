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

const websiteOperationChildRouter = [
  {
    path: 'process',
    isAuth: true,
    element: <WebsiteProcess />
  },
  {
    path: 'trends',
    isAuth: true,
    element: <WebsiteTrends />
  },
  {
    path: 'notice',
    isAuth: true,
    element: <WebsiteNotice />
  },
  {
    path: 'problem',
    isAuth: true,
    element: <WebsiteProblem />
  },
]
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
                element: <AddressAutoAirdrop />,
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
            isAuth: true,
            children: [
              {
                path: 'publish-ozc',
                element: <PublishOzc />,
                isAuth: true
              },
              {
                path: 'frezz-address',
                element: <FrezzAddress />,
                isAuth: true
              },
              {
                path: 'destroy-address',
                element: <DestroyAddress />,
                isAuth: true
              },
              {
                path: 'add-delete',
                element: <DeleteOrAdd />,
                isAuth: true
              },
            ]
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
            children: websiteOperationChildRouter
          },
          {
            path: "zh-wt",
            element: <WebsiteOperationZhWt />,
            isAuth: true,
            children: websiteOperationChildRouter
          },
          {
            path: "en",
            element: <WebsiteOperationEn />,
            isAuth: true,
            children: websiteOperationChildRouter
          },
          {
            path: "japan",
            element: <WebsiteOperationJapan />,
            isAuth: true,
            children: websiteOperationChildRouter
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
            children:[
              {
                path:'allocation-statistics',
                isAuth: true,
                element:<AllocationToto/>
              },
              {
                path:'assets-statistics',
                isAuth: true,
                element:<ChildAssetsToto/>
              }
            ]
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
