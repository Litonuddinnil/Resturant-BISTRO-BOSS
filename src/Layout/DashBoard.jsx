import React, { useState } from "react";
import { BiMenu, BiMenuAltLeft } from "react-icons/bi";
import {
  FaBook,
  FaCalendar,
  FaHome,
  FaList,
  FaMoneyBill,
  FaShoppingCart,
  FaUsers,
  FaUtensils, 
} from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { HiX } from "react-icons/hi"; 
import { TbBrandBooking } from "react-icons/tb";
import { VscOpenPreview } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { MdContactPhone } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const [cart] = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //admin related work from the database
  const  [isAdmin] = useAdmin();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen ">
      {/* Sidebar */}
      <div
        className={`lg:w-64  bg-orange-400 text-white ${
          isSidebarOpen ? "block" : "hidden"
        } lg:block`}
      
      >
        <h2 className="text-black font-extrabold text-2xl pt-4 text-center">
          BISTRO BOSS
        </h2>
        <p className="text-black font-semibold text-center">
          R e s t a u r a n t
        </p>
        <ul className="menu p-4 uppercase">
         {
          isAdmin ? <>
            <li>
            <NavLink
              to="/dashboard/adminHome"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <FaHome />
              Admin home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/addItems"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            > 
               <FaUtensils></FaUtensils>
              Add Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manageItem"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <FaList />
               Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/booking"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                } relative`
              }
            >
             <FaBook />
             Manage bookings
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
               <FaUsers></FaUsers>
               all user
            </NavLink>
          </li> 
          </>:<>
          <li>
            <NavLink
              to="/dashboard/userHome"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <FaHome />
              user home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/reservation"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <FaCalendar />
              reservation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <FaMoneyBill />
              payment history
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                } relative`
              }
            >
              <FaShoppingCart />
              <span className="relative">
                My Cart
                <span className="absolute top-0 -right-3 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/review"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <VscOpenPreview />
              add review
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/booking"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <TbBrandBooking />
              my booking
            </NavLink>
          </li>
          </>
         }
          {/* Shared navlink  component */}
          <div className="divider"></div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <FaHome />
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <BiMenuAltLeft />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              <FaShop />
              shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
             <MdContactPhone />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Toggle Button for Small Screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <HiX /> : <BiMenu></BiMenu>}
      </button>

      {/* Scrollable Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
