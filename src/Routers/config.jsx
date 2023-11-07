import Login from "@/Pages/Login";
import LayoutPage from "@/Pages/Layout";
import Denied from "@/Pages/Denied";
import PersonalInfo from "@/Pages/Personal";
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
        path: 'personal',
        element: <PersonalInfo />,
        isAuth: true,
      },

    ],
  },
];
export default RouteList;
