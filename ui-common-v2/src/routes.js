
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Products from "./views/services/Products";

var routes = [
  {
    path: `/dashboard`,
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: process.env.PUBLIC_URL,
  },
  {
    path: `/products`,
    name: "Products",
    icon: "tim-icons icon-app",
    component: Products,
    layout: process.env.PUBLIC_URL,
  },
  {
    path: `/icons`,
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: process.env.PUBLIC_URL,
  },
  {
    path: `${process.env.PUBLIC_URL}/map`,
    name: "Map",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: process.env.PUBLIC_URL,
  },
  {
    path: `${process.env.PUBLIC_URL}/notifications`,
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: process.env.PUBLIC_URL,
  },
  {
    path: `${process.env.PUBLIC_URL}/user-profile`,
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: process.env.PUBLIC_URL,
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: process.env.PUBLIC_URL,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: process.env.PUBLIC_URL,
  },
];
export default routes;
