import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar'; 
const Main = () => {
    const location = useLocation();
     
    // console.log(location);

    const NoHeaderFooter = location.pathname.includes("/login") ||
    location.pathname.includes("/signUp");
    return (
        <div>
           {NoHeaderFooter ||  <Navbar></Navbar>}
            <Outlet></Outlet>
            {NoHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;