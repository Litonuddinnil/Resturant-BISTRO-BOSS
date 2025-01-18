import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { GiShoppingCart } from "react-icons/gi";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "cupcake" // Default to 'cupcake'
  );
  const handlerLogOut = () => {
    logOut()
      .then(() => {
        console.log("logOut");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // Update the `data-theme` attribute on the HTML element when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Save theme in localStorage
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prevTheme) =>
      prevTheme === "cupcake" ? "synthwave" : "cupcake"
    );
  };
  const NavbarLinks = () => (
    <ul className="menu menu-horizontal px-1 items-center">
      <li>
        <Link to={"/"} className="hover:text-primary transition-all">
          Home
        </Link>
      </li>
      <li>
        <Link to={"/menu"} className="hover:text-primary transition-all">
          Menu
        </Link>
      </li>
      <li>
        <Link to={"/order/salad"} className="hover:text-primary transition-all">
          Order Food
        </Link>
      </li> 
      <li>
        <Link to={"/secret"} className="hover:text-primary transition-all">
          Special Product
        </Link>
      </li>
      <li>
        <Link to={"/dashboard/cart"} className="btn badge badge-neutral text-amber-200 hover:text-red-400 transition-all"> 
            <span className="text-xl"> <GiShoppingCart></GiShoppingCart></span> +{cart.length}
        
        </Link>
      </li>  
      {user && (
        <li>
          <Link
            to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
            className="hover:text-primary transition-all"
          >
            Dashboard
          </Link>
        </li>
      )}
      {user ? (
        <>
          <button onClick={handlerLogOut} className="btn btn-error">
            Log Out
          </button>
          {user?.photoURL && (
            <div className="relative ml-4 group">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={user.photoURL}
                alt="User"
              />
              <span className="absolute  mt-2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-sm rounded py-1 px-2 shadow-lg">
                {user.displayName || "Anonymous"}
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          {" "}
          <li>
            <Link to={"/login"} className="hover:text-primary bg-blue-500 mx-2 transition-all">
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <div className="navbar fixed z-10 bg-black bg-opacity-80 text-white shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start ">
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
            <NavbarLinks /> 
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
      <div className="navbar-center">
        <div className="hidden lg:flex">
          <NavbarLinks />
        </div>
        {/* Theme Toggle */}
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value="synthwave"
            checked={theme === "synthwave"}
            onChange={handleThemeToggle}
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
