import React from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaCalendar, FaHome, FaMoneyBill, FaShoppingCart, } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { PiContactlessPaymentBold } from 'react-icons/pi';
import { TbBrandBooking } from 'react-icons/tb';
import { VscOpenPreview } from 'react-icons/vsc';
import { NavLink, Outlet } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-orange-400 text-white">
        <h2 className='text-black font-extrabold line-clamp-4 text-2xl pt-4 text-center'>BISTRO BOSS</h2>
        <p className='text-black font-semibold text-center'>R e s t a u r a n t</p>
        <ul className="menu p-4 uppercase">
          <li>
            <NavLink
              to="/dashboard/userHome"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              <FaHome/>
              user home
            </NavLink> 
          </li>
          <li>
            <NavLink
              to="/dashboard/reservation"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              <FaCalendar/>
              reservation
            </NavLink> 
          </li>
          <li>
            <NavLink
              to="/dashboard/paymenthistory"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              <FaMoneyBill/>
              payment history
            </NavLink>   
          </li>
          <li>
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              <FaShoppingCart />
              My Cart
            </NavLink> 
          </li>
          <li>
            <NavLink
              to="/dashboard/review"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
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
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
                }`
              }
            >
             <TbBrandBooking />
              my booking
            </NavLink> 
          </li> 
          <div className='divider'></div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              <FaHome/>
              home
            </NavLink> 
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              <BiMenuAltLeft/>
              Menu
            </NavLink> 
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              <FaShop/>
              shop
            </NavLink> 
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-white text-orange-500' : 'hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              <PiContactlessPaymentBold/>
              Contact 
            </NavLink> 
          </li>
        </ul>

      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
