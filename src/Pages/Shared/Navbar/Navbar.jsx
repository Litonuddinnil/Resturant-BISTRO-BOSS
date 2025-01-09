import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  
  const links = (
    <>
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link to={"/"} className="hover:text-primary  transition-all">Home</Link>
        </li>
        <li>
        <Link to={"/menu"} className="hover:text-primary transition-all"> Menu</Link> 
        </li>
        <li>
        <Link to={"/order/salad"} className="hover:text-primary transition-all">Order Food</Link> 
        </li>
        <li>
        <a className="hover:text-primary transition-all">About</a>
        </li>
        <li>
          <a className="hover:text-primary transition-all">Contact</a>
        </li>
      </ul>
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-black bg-opacity-80 text-white shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Brand Logo */}
        <a className="flex flex-col ml-4">
          <p className="text-2xl font-extrabold tracking-wide">BISTRO BOSS</p>
          <p className="text-sm font-light uppercase tracking-wide opacity-80">
            R e s t a u r a n t
          </p>
        </a>
      </div> 
      {/* Navbar End */}
      <div className="navbar-end">
      <div className="hidden lg:flex">{links}</div>
        <a className="btn btn-outline btn-primary hover:btn-secondary transition-all">
          Reserve Now
        </a>
      </div>
    </div>
  );
};

export default Navbar;
