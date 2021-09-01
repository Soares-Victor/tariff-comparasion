
import Dashboard from "views/Dashboard.js";
import Products from "./views/services/tariff/Products";
import CostCalculate from "./views/services/costs/CostCalculate";
import CostUploadFileToProcess from "./views/services/costs/CostUploadFileToProcess";
import CostListAllFilesToProcess from "./views/services/costs/CostListAllFilesToProcess";
import CostListAllCalculation from "./views/services/costs/CostListAllCalculation";
import About from "./views/services/about/About";
import UserProfile from "./views/services/user/UserProfile";

var routes = [
  {
    path: `/dashboard`,
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: process.env.PUBLIC_URL,
    visible: true,
  },
  {
    path: `/products`,
    name: "Products",
    icon: "tim-icons icon-app",
    component: Products,
    layout: process.env.PUBLIC_URL,
    visible: true
  },
  {
    path: `/costs-calculate`,
    name: "Calculation Costs",
    icon: "tim-icons icon-money-coins",
    component: CostCalculate,
    layout: process.env.PUBLIC_URL,
    visible: true
  },
  {
    path: `/listall-calculation`,
    name: "Check All Calculations",
    icon: "tim-icons icon-chart-bar-32",
    component: CostListAllCalculation,
    layout: process.env.PUBLIC_URL,
    visible: true
  },
  {
    path: `/upload-file-toprocess`,
    name: "Upload File",
    icon: "tim-icons icon-cloud-upload-94",
    component: CostUploadFileToProcess,
    layout: process.env.PUBLIC_URL,
    visible: true
  },
  {
    path: `/listall-file-toprocess`,
    name: "Files to Process",
    icon: "tim-icons icon-single-copy-04",
    component: CostListAllFilesToProcess,
    layout: process.env.PUBLIC_URL,
    visible: true
  },
  {
    path: `/user-profile`,
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: process.env.PUBLIC_URL,
    visible: false
  },
  {
    path: `/about`,
    name: "About",
    icon: "tim-icons icon-paper",
    component: About,
    layout: process.env.PUBLIC_URL,
    visible: true
  },
];
export default routes;
