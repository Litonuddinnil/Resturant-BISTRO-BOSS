import {
    createBrowserRouter, 
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/SingUp/SingUp";
import Secret from "../Pages/Shared/Secret/Secret";
import PrivateRoutes from "./PrivateRoutes";
import DashBoard from "../Layout/DashBoard";
import Cart from "../Pages/DashBoard/Cart/Cart";
import AllUser from "../Pages/DashBoard/AllUser/AllUser";
import AddItems from "../Pages/DashBoard/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../Pages/DashBoard/ManageItems/ManageItems";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import AdminHome from "../Pages/DashBoard/AdminHome/AdminHome";
import UserHome from "../Pages/DashBoard/UserHome/UserHome";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/menu",
          element:<Menu></Menu>
        },
        {
          path:"/order/:category",
          element:<Order></Order>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/signUp",
          element:<SingUp></SingUp>
        },
        {
          path:"/secret",
          element:<PrivateRoutes><Secret></Secret></PrivateRoutes>
        }
      ]
    },
    {
      path:"dashboard",
      element:<PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
      children:[
        //normal users routes
        {
          path:"cart",
          element:<Cart></Cart>
        },
        {
            path:"payment",
            element:<Payment></Payment>
        },
        {
          path:"paymentHistory",
          element:<PaymentHistory></PaymentHistory>
        },
        {
          path:"userHome",
          element:<UserHome></UserHome>
        },
        //admin related routes
        {
         path:"addItems", 
         element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
        },
        {
          path:"manageItem",
          element:<AdminRoutes><ManageItems></ManageItems></AdminRoutes>
        },
        {
          path:"users",
          element:<AdminRoutes><AllUser></AllUser></AdminRoutes>
        },
        {
          path:"adminHome",
          element:<AdminRoutes><AdminHome></AdminHome></AdminRoutes>
        }
      ]
    }
  
  ]);
  export default router;